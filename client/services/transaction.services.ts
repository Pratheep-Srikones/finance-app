import axiosInstance from "@/config/axios.config";
import { Expense } from "@/types/types";

export const addExpense = async (expense: Expense) => {
  try {
    const response = await axiosInstance.post("/expenses", {
      type: expense.type,
      amount: expense.amount,
      description: expense.description,
      user_id: localStorage.getItem("user_id"),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMonthlyExpensesByUserId = async (
  user_id: string,
  month: number,
  year: number
) => {
  try {
    const response = await axiosInstance.get("/expenses", {
      params: { user_id, month, year },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
