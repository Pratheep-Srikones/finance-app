import { Router } from "express";
import { changePassword, login, signUp } from "../controllers/0auth.controller";

const router = Router();
router.post("/signup", signUp);
router.post("/login", login);
router.post("/password", changePassword);
export default router;
