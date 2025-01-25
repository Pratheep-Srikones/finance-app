import { Request, Response } from "express";
import { addUserModel } from "../models/user.model";
import { hashPassword } from "../utils/password.util";

export const signUp = async (req: Request, res: Response) => {
  const { username, email, picture_link, password } = req.body;
  try {
    const hashed_password = hashPassword(password);
    const result = await addUserModel(
      username,
      email,
      picture_link,
      hashed_password
    );
    res.status(200).json({ message: "User added successfully", result });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
