// src/supabase.ts
import config from "./config/config";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = config.supabaseUrl || "";
const SUPABASE_API_KEY = config.supabaseApiKey || "";

if (!SUPABASE_URL || !SUPABASE_API_KEY) {
  throw new Error(
    "Supabase URL and API Key must be set in environment variables"
  );
}

// Initialize Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);
