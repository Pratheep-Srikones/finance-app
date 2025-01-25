import { Request, Response } from "express";
import { addUserModel, getUserbyUsernameModal } from "../models/user.model";
import { comparePassword, hashPassword } from "../utils/password.util";
import { generateJwtToken } from "../utils/auth.util";

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
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body; // Extract the username and password from the request body
  const result = await getUserbyUsernameModal(username); // Fetch the user data from the model

  if (Array.isArray(result) && result.length > 0) {
    const user = result[0];
    console.log("user: ", user);
    if (comparePassword(password, user.password)) {
      const token = generateJwtToken({
        user_id: user.id,
        username: user.username,
        email: user.email,
        picture_link: user.picture_link,
      });

      res.status(200).json({
        message: "Login successful",
        token,
        user: {
          username: user.username,
          id: user.id,
          email: user.email,
          picture_link: user.picture_link,
        },
      });
    } else {
      res.status(401).json({ error: "Invalid username or password" });
    }
  } else {
    res.status(404).json({ error: "User not found" });
  }
};
