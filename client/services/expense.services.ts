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
    return response.data.result;
  } catch (error) {
    console.error("cannot get expenses", error);
    throw error;
  }
};

export const getLatestExpenseByUserId = async (user_id: string) => {
  try {
    const response = await axiosInstance.get("/expenses/latest", {
      params: { user_id },
    });
    return response.data.result;
  } catch (error) {
    throw error;
  }
};

export const deleteExpenseById = async (expense_id: string) => {
  try {
    const response = await axiosInstance.delete("/expenses", {
      params: { expense_id },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateExpense = async (expense: Expense) => {
  if (!expense.expense_id) {
    throw new Error("Expense ID is required");
  }

  if (expense.expense_id !== localStorage.getItem("user_id")) {
    throw new Error("Unauthorized access");
  }
  try {
    const response = await axiosInstance.put("/expenses", {
      expense_id: expense.expense_id,
      type: expense.type,
      amount: expense.amount,
      description: expense.description,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTotalExpenseByType = async (
  user_id: string,
  month: number,
  year: number
) => {
  if (user_id !== localStorage.getItem("user_id")) {
    throw new Error("Unauthorized access");
  }
  try {
    const response = await axiosInstance.get("/expenses/types", {
      params: { user_id, month, year },
    });
    return response.data.result;
  } catch (error) {
    throw error;
  }
};

export const getTotalExpenseByMonth = async (user_id: string, year: number) => {
  if (user_id !== localStorage.getItem("user_id")) {
    throw new Error("Unauthorized access");
  }
  try {
    const response = await axiosInstance.get("/expenses/months", {
      params: { user_id, year },
    });
    return response.data.result;
  } catch (error) {
    throw error;
  }
};
