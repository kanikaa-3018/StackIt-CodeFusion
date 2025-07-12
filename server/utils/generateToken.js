import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const createToken = (payload, expiresIn) => {
  return jwt.sign({ payload }, JWT_SECRET, { expiresIn });
};

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
