import { Router } from "express";
import {
  addExpense,
  getMonthlyExpensesByUserId,
} from "../controllers/expense.controller";

const router = Router();

router.post("/", addExpense);
router.get("/", getMonthlyExpensesByUserId);

export default router;
