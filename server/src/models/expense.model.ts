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
    console.log("Calling RPC with:", { user_id, month, year });

    const { data, error } = await supabase.rpc("get_expenses_by_month", {
      input_year: year,
      input_month: month,
      input_user_id: user_id,
    });

    if (error) {
      console.error("RPC Error:", error);
      throw error;
    }

    console.log("RPC Data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching expenses:", error);
    throw { data: null, error, message: "Database Query Failed" };
  }
};
