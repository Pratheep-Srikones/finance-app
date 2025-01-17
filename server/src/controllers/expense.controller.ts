import {
  addExpenseModel,
  deleteExpenseModel,
  getLatestExpensesModel,
  getMonthlyExpensesByIDModel,
  getTotalExpenseByMonthModel,
  getTotalExpenseByTypeModel,
  updateExpeseModel,
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
  console.log("got request");

  console.log(req.query);
  const user_id = req.query.user_id as string;
  const month = req.query.month as unknown as number;
  const year = req.query.year as unknown as number;

  console.log("processing:", { user_id, month, year });

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
    console.log("result:", result);
    res
      .status(200)
      .json({ message: "Expenses Fetched Successfully", result: result });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

export const getLatestExpenses = async (req: Request, res: Response) => {
  const user_id = req.query.user_id as string;

  if (!user_id) {
    res.status(400).json({ error: "Missing required parameter: user_id" });
    return;
  }

  try {
    const result = await getLatestExpensesModel(user_id);
    res
      .status(200)
      .json({ message: "Expenses Fetched Successfully", result: result });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

export const deleteExpense = async (req: Request, res: Response) => {
  const expense_id = req.query.expense_id as string;

  if (!expense_id) {
    res.status(400).json({ error: "Missing required parameter: expense_id" });
    return;
  }

  try {
    const result = await deleteExpenseModel(expense_id);
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

export const updateExpense = async (req: Request, res: Response) => {
  const { expense_id, type, amount, description } = req.body;

  try {
    const result = await updateExpeseModel(
      expense_id,
      amount,
      type,
      description
    );
    res.status(200).json({ message: "Expense updated successfully" });
  } catch (error) {
    console.error("Error updating expense:", error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

export const getTotalExpenseByType = async (req: Request, res: Response) => {
  const user_id = req.query.user_id as string;
  const month = req.query.month as unknown as number;
  const year = req.query.year as unknown as number;

  try {
    const result = await getTotalExpenseByTypeModel(user_id, month, year);
    res.status(200).json({ message: "Expenses fetched successfully", result });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

export const getTotalExpenseByMonth = async (req: Request, res: Response) => {
  const user_id = req.query.user_id as string;
  const year = req.query.year as unknown as number;

  try {
    const result = await getTotalExpenseByMonthModel(user_id, year);
    res.status(200).json({ message: "Expenses fetched successfully", result });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
};
