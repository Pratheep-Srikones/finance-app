import { Router } from "express";
import {
  addExpense,
  deleteExpense,
  getLatestExpenses,
  getMonthlyExpensesByUserId,
  getTotalExpenseByMonth,
  getTotalExpenseByType,
  updateExpense,
} from "../controllers/expense.controller";

const router = Router();

router.post("/", addExpense);
router.get("/", getMonthlyExpensesByUserId);
router.get("/latest", getLatestExpenses);
router.get("/types", getTotalExpenseByType);
router.get("/months", getTotalExpenseByMonth);
router.delete("/", deleteExpense);
router.put("/", updateExpense);

export default router;
