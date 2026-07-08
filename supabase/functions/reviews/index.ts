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

    if (req.method === "POST") {
      const bodyText = await req.text();
      let body = {};
      if (bodyText) {
        try { body = JSON.parse(bodyText); } catch(e) {}
      }
      
      const { calificacion, comentario, action } = body as any;

      if (action === 'GET') {
        const { data, error } = await supabaseAdmin
          .from("resenas")
          .select("*")
          .order("created_at", { ascending: false });
          
        if (error) throw error;
        
        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        });
      }

      // If it's not GET, it's a POST to create a review
      const authHeader = req.headers.get("Authorization");
      if (!authHeader) throw new Error("Missing Authorization header");
      
      const token = authHeader.replace("Bearer ", "");
      const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);
      if (authError || !user) throw new Error("Unauthorized");
      
      if (!calificacion || !comentario) {
        throw new Error("Calificacion and comentario are required");
      }

      const { data, error } = await supabaseAdmin
        .from("resenas")
        .insert({
          user_id: user.id,
          calificacion,
          comentario
        })
        .select()
        .single();
        
      if (error) throw error;
      
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 201,
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
