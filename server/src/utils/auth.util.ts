import config from "../config/config";
import { JWTToken } from "../models/0auth.model";
import jwt from "jsonwebtoken";

export const generateJwtToken = (data: JWTToken) => {
  //sets maxAge to 10 hours
  const maxAge = 10 * 60 * 60;
  return jwt.sign(data, config.jwtSecret, {
    expiresIn: maxAge,
  });
};
