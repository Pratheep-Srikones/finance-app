import { Router } from "express";

import { cloudUpload } from "../controllers/0upload.controller";
import upload from "../middleware/multer";
const router = Router();
router.post("/", upload.single("file"), cloudUpload);

export default router;
