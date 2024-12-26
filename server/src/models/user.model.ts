import { supabase } from "../supabase";
export const getAllUsersModel = async () => {
  try {
    const { data, error } = await supabase.from("users").select("*");

    if (error) throw error;
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching users:", (error as Error).message);
    throw { data: null, error, message: "Database Query Failed" };
  }
};
