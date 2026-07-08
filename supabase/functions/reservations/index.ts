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
    if (!authHeader) throw new Error("Missing Authorization header");
    
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);
    if (authError || !user) throw new Error("Unauthorized");

    const url = new URL(req.url);

    if (req.method === "GET") {
      const { data, error } = await supabaseAdmin
        .from("reservas")
        .select("*")
        .eq("user_id", user.id)
        .order("fecha", { ascending: true });
        
      if (error) throw error;
      
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    if (req.method === "POST") {
      const body = await req.json();
      const { fecha, hora, cantidad_comensales, nombre_contacto, telefono_contacto, notas } = body;
      
      const { data, error } = await supabaseAdmin
        .from("reservas")
        .insert({
          user_id: user.id,
          fecha,
          hora,
          cantidad_comensales,
          nombre_contacto,
          telefono_contacto,
          notas,
          origen: 'formulario'
        })
        .select()
        .single();
        
      if (error) throw error;
      
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 201,
      });
    }

    if (req.method === "DELETE") {
      const id = url.searchParams.get("id");
      if (!id) throw new Error("Missing reservation ID");

      const { data, error } = await supabaseAdmin
        .from("reservas")
        .update({ estado: 'cancelada' })
        .eq("id", id)
        .eq("user_id", user.id)
        .select()
        .single();
        
      if (error) throw error;

      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 405,
    });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
