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

export const getUserbyUsernameModal = async (username: string) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching users:", (error as Error).message);
    throw { data: null, error, message: "Database Query Failed" };
  }
};

export const addUserModel = async (
  username: string,
  email: string,
  picture_link: string,
  password: string
) => {
  if (!username || !email || !password) {
    throw { data: null, error: null, message: "All fields are required" };
  }
  try {
    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .or(`username.eq.${username},email.eq.${email}`);

    if ((existingUser ?? []).length > 0) {
      throw { data: null, message: "Username or Email is Already being used" };
    }
    const { data, error } = await supabase
      .from("users")
      .insert([{ username, email, password, picture_link }]);

    if (error) throw error;
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error adding user:", (error as Error).message);
    throw { data: null, error, message: "Database Query Failed" };
  }
};
