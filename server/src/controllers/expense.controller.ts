import { addExpenseModel } from "../models/expense.model";
import { Request, Response } from "express";

export const addExpense = async (req: Request, res: Response) => {
  const { type, amount, description, user_id } = req.body;

  try {
    const result = await addExpenseModel(user_id, amount, type, description);
    // console.log("Received data:", { type, amount, description, user_id });
    // console.log(result);

    res.status(201).json({ message: "Expense added successfully" });
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
