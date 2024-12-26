import { getAllUsersModel } from "../models/user.model";
import { Request, Response } from "express";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await getAllUsersModel(); // Fetch the user data from the model

    // Check if the result is in the expected format
    if (Array.isArray(result)) {
      res.status(200).json({ users: result }); // Send the users as response
    } else {
      res.status(404).json({ error: "Users not found" });
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
