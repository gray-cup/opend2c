import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY!;

// Server-side only — uses secret key, bypasses RLS
export const supabaseAdmin = createClient(supabaseUrl, supabaseSecretKey);
