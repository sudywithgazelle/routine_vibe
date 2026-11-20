import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return Response.json({ error: "Method not allowed" }, { status: 405, headers: corsHeaders });

  try {
    const { username, password } = await req.json();
    const normalized = String(username ?? "").trim().toLowerCase();
    if (!/^[a-z0-9_]{3,24}$/.test(normalized) || typeof password !== "string" || password.length < 8) {
      return Response.json({ error: "Invalid username or password." }, { status: 400, headers: corsHeaders });
    }

    const url = Deno.env.get("SUPABASE_URL")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const admin = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
    const auth = createClient(url, anonKey, { auth: { persistSession: false, autoRefreshToken: false } });

    const { data: profile, error: profileError } = await admin
      .from("profiles").select("user_id").eq("username", normalized).maybeSingle();
    if (profileError || !profile?.user_id) {
      return Response.json({ error: "Invalid username or password." }, { status: 401, headers: corsHeaders });
    }

    const { data: userData, error: userError } = await admin.auth.admin.getUserById(profile.user_id);
    const email = userData?.user?.email;
    if (userError || !email) {
      return Response.json({ error: "This account cannot sign in with a username yet." }, { status: 401, headers: corsHeaders });
    }

    const { data, error } = await auth.auth.signInWithPassword({ email, password });
    if (error || !data.session) {
      return Response.json({ error: "Invalid username or password." }, { status: 401, headers: corsHeaders });
    }

    return Response.json({
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      token_type: data.session.token_type,
      expires_in: data.session.expires_in,
    }, { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (_error) {
    return Response.json({ error: "Unable to sign in. Please try again." }, { status: 400, headers: corsHeaders });
  }
});
