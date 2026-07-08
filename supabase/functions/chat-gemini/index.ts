import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Missing Authorization header" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }

    const body = await req.json();
    const { mensaje, conversacion_id: requestConvId } = body;

    let conversacion_id = requestConvId;

    if (!conversacion_id) {
      const { data: newConv, error: convError } = await supabaseAdmin
        .from("conversaciones")
        .insert({ user_id: user.id, titulo: "Chat Reserva" })
        .select()
        .single();

      if (convError) throw convError;
      conversacion_id = newConv.id;
    }

    // Guardar el mensaje del usuario
    const { error: msgError } = await supabaseAdmin
      .from("mensajes")
      .insert({
        conversacion_id,
        rol: 'user',
        contenido: mensaje
      });
    if (msgError) throw msgError;

    // Traer historial para contexto
    const { data: previousMessages } = await supabaseAdmin
      .from("mensajes")
      .select("rol, contenido")
      .eq("conversacion_id", conversacion_id)
      .order("created_at", { ascending: true });

    const contents = (previousMessages || []).map(m => ({
      role: m.rol === 'user' ? 'user' : 'model',
      parts: [{ text: m.contenido }]
    }));

    const geminiKey = Deno.env.get("GEMINI_API_KEY");
    if (!geminiKey) throw new Error("Missing GEMINI_API_KEY in environment");

    const today = new Date().toISOString().split('T')[0];
    const systemPrompt = `Eres el asistente de reservas del restaurante El Bodegón.
Hoy es ${today}. Ayudas al usuario a reservar mesa, solicitando fecha, hora y cantidad de comensales.
Responde SIEMPRE en formato JSON sin formato markdown extra, usando exactamente esta estructura:
{
  "response": "Tu texto de respuesta al usuario",
  "action": "reserve" o "none",
  "reservationDetails": {
    "fecha": "YYYY-MM-DD" o null,
    "hora": "HH:MM:SS" o null,
    "cantidad_comensales": numero o null
  }
}
Solo usa "action": "reserve" si el usuario ya dio toda la información requerida de manera firme.`;

    const geminiBody = {
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      },
      contents,
      generationConfig: {
        responseMimeType: "application/json"
      }
    };

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${geminiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(geminiBody),
    });

    const geminiData = await response.json();
    if (!response.ok) throw new Error("Gemini API Error: " + JSON.stringify(geminiData));

    const aiText = geminiData.candidates[0].content.parts[0].text;

    let parsedAiResponse;
    try {
      parsedAiResponse = JSON.parse(aiText);
    } catch (e) {
      parsedAiResponse = { response: "Hubo un error interpretando mi respuesta.", action: "none" };
    }

    const { action, reservationDetails, response: assistantReply } = parsedAiResponse;
    let finalReply = assistantReply;

    // Intentar crear reserva
    if (action === "reserve" && reservationDetails) {
      const { fecha, hora, cantidad_comensales } = reservationDetails;
      if (fecha && hora && cantidad_comensales) {
        const { error: reserveError } = await supabaseAdmin
          .from("reservas")
          .insert({
            user_id: user.id,
            fecha,
            hora,
            cantidad_comensales,
            origen: 'chat'
          });

        if (reserveError) {
          finalReply += "\n\n(No pudimos guardar la reserva en el sistema por un error técnico)";
        } else {
          finalReply += "\n\n¡Listo! He registrado la reserva en nuestro sistema.";
        }
      }
    }

    // Guardar respuesta del asistente
    const { error: astError } = await supabaseAdmin
      .from("mensajes")
      .insert({
        conversacion_id,
        rol: 'assistant',
        contenido: finalReply
      });

    if (astError) throw astError;

    return new Response(JSON.stringify({
      conversacion_id,
      respuesta: finalReply
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
