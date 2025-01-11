import { Router } from "express";
import { addExpense } from "../controllers/expense.controller";

const router = Router();

router.post("/", addExpense);

export default router;
