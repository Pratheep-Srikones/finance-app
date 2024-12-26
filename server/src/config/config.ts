import assert from "assert";
import dotenv from "dotenv";

dotenv.config();

const { PORT, HOST_URL, SUPABASE_URL, SUPABASE_API_KEY } = process.env;

// validate the required configuration information
assert(PORT, "PORT configuration is required.");
assert(HOST_URL, "HOST_URL configuration is required.");

assert(SUPABASE_URL, "SUPABASE_URL configuration is required.");
assert(SUPABASE_API_KEY, "SUPABASE_API_KEY configuration is required.");

export default {
  port: PORT,
  hostUrl: HOST_URL,
  supabaseUrl: SUPABASE_URL,
  supabaseApiKey: SUPABASE_API_KEY,
};
