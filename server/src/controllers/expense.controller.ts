import {
  addExpenseModel,
  getMonthlyExpensesByIDModel,
} from "../models/expense.model";
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

export const getMonthlyExpensesByUserId = async (
  req: Request,
  res: Response
) => {
  // console.log(req.params);

  console.log(req.query);
  const user_id = req.query.user_id as string;
  const month = req.query.month as unknown as number;
  const year = req.query.year as unknown as number;

  //console.log({ user_id, month, year });

  if (!user_id) {
    res.status(400).json({ error: "Missing required parameter: user_id" });
    return;
  }
  if (!month) {
    res.status(400).json({ error: "Missing required parameter: month" });
    return;
  }
  if (!year) {
    res.status(400).json({ error: "Missing required parameter: year" });
    return;
  }

  try {
    const result = await getMonthlyExpensesByIDModel(user_id, month, year);
    res
      .status(200)
      .json({ message: "Expenses Fetched Successfully", result: result });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
};
