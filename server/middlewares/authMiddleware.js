// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// dotenv.config();

// export const protect = (req, res, next) => {
//   console.log('req.user:', req.user);
// console.log('userId:', userId);
//   const authHeader = req.headers.authorization;
//   if (!authHeader?.startsWith("Bearer")) {
//     return res.status(401).json({ error: "Unauthorized" });
//   }

//   const token = authHeader.split(" ")[1];
//   try {
//     const payload = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = payload;
//     next();
//   } catch {
//     return res.status(401).json({ error: "Invalid token" });
//   }
// };


import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js"; // ✅ import your User model
dotenv.config();

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ fetch the full user object from DB
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user; // ✅ set full user on req
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
