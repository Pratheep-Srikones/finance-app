import { supabase } from "../supabase";

export interface JWTToken {
  user_id: string;
  username: string;
  email: string;
  picture_link: string;
}
export const changePasswordModel = async (
  username: string,
  password: string
) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .update({ password })
      .eq("username", username);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error changing password:", (error as Error).message);
    throw { data: null, error, message: "Database Query Failed" };
  }
};
