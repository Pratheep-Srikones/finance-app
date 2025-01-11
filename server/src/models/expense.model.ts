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
