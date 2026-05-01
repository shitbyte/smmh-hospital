// lib/supabaseClient.js
// ─── Supabase client (browser-safe) ─────────────────────────────────────────
import { createClient } from "@supabase/supabase-js";

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnon) {
  throw new Error(
    "Supabase environment variables are not set.\n" +
    "Copy .env.local.example → .env.local and fill in your project credentials."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnon);
