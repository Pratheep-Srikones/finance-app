import { v2 as cloudinary } from "cloudinary";
import config from "./config/config";
cloudinary.config({
  cloud_name: config.cloudName,
  api_key: config.cloudAPI,
  api_secret: config.cloudApiSecret,
});

export default cloudinary;
