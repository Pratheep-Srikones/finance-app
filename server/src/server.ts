import app from "./app";
import config from "./config/config";
import { supabase } from "./supabase";
import { Request, Response } from "express";

const PORT = config.port || 5002;

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
