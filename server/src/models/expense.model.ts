import { supabase } from "../supabase";

export const addExpenseModel = async (
  user_id: string,
  amount: number,
  type: string,
  description: string
) => {
  try {
    const { data, error } = await supabase
      .from("expenses")
      .insert([{ user_id, amount, type, description }]);
    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error fetching users:", (error as Error).message);
    throw { data: null, error, message: "Database Query Failed" };
  }
};

export const getMonthlyExpensesByIDModel = async (
  user_id: string,
  month: number,
  year: number
) => {
  try {
    //console.log("Calling RPC with:", { user_id, month, year });

    const { data, error } = await supabase.rpc("get_expenses_by_month", {
      input_year: year,
      input_month: month,
      input_user_id: user_id,
    });

    if (error) {
      console.error("RPC Error:", error);
      throw error;
    }

    //console.log("RPC Data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching expenses:", error);
    throw { data: null, error, message: "Database Query Failed" };
  }
};

export const getLatestExpensesModel = async (user_id: string) => {
  try {
    const { data, error } = await supabase.rpc("get_latest_expenses", {
      input_user_id: user_id,
    });

    if (error) {
      console.error("RPC Error:", error);
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error fetching expenses:", error);
    throw { data: null, error, message: "Database Query Failed" };
  }
};

export const deleteExpenseModel = async (expense_id: string) => {
  try {
    const { data, error } = await supabase
      .from("expenses")
      .delete()
      .match({ expense_id });
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error deleting expense:", error);
    throw { data: null, error, message: "Database Query Failed" };
  }
};

export const updateExpeseModel = async (
  expense_id: string,
  amount: number,
  type: string,
  description: string
) => {
  try {
    const { data, error } = await supabase
      .from("expenses")
      .update({ amount, type, description })
      .match({ expense_id });
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error updating expense:", error);
    throw { data: null, error, message: "Database Query Failed" };
  }
};

export const getTotalExpenseByTypeModel = async (
  user_id: string,
  month: number,
  year: number
) => {
  try {
    const { data, error } = await supabase.rpc("get_totals_by_category", {
      in_user_id: user_id,
      in_month: month,
      in_year: year,
    });

    if (error) {
      console.error("RPC Error:", error);
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error fetching expenses:", error);
    throw { data: null, error, message: "Database Query Failed" };
  }
};

export const getTotalExpenseByMonthModel = async (
  user_id: string,
  year: number
) => {
  try {
    const { data, error } = await supabase.rpc("get_totals_by_month", {
      in_user_id: user_id,
      in_year: year,
    });

    if (error) {
      console.error("RPC Error:", error);
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error fetching expenses:", error);
    throw { data: null, error, message: "Database Query Failed" };
  }
};
