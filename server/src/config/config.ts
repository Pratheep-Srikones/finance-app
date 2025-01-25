import assert from "assert";
import dotenv from "dotenv";

dotenv.config();

const {
  PORT,
  HOST_URL,
  SUPABASE_URL,
  SUPABASE_API_KEY,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = process.env;

// validate the required configuration information
assert(PORT, "PORT configuration is required.");
assert(HOST_URL, "HOST_URL configuration is required.");

assert(SUPABASE_URL, "SUPABASE_URL configuration is required.");
assert(SUPABASE_API_KEY, "SUPABASE_API_KEY configuration is required.");

assert(
  CLOUDINARY_CLOUD_NAME,
  "CLOUDINARY_CLOUD_NAME configuration is required."
);
assert(CLOUDINARY_API_KEY, "CLOUDINARY_API_KEY configuration is required.");
assert(
  CLOUDINARY_API_SECRET,
  "CLOUDINARY_API_SECRET configuration is required."
);

export default {
  port: PORT,
  hostUrl: HOST_URL,
  supabaseUrl: SUPABASE_URL,
  supabaseApiKey: SUPABASE_API_KEY,
  cloudName: CLOUDINARY_CLOUD_NAME,
  cloudAPI: CLOUDINARY_API_KEY,
  cloudApiSecret: CLOUDINARY_API_SECRET,
};
