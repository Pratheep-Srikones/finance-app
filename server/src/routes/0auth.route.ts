import { Router } from "express";
import { signUp } from "../controllers/0auth.controller";

const router = Router();
router.post("/signup", signUp);

export default router;
