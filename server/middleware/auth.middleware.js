import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import asyncHandler from "express-async-handler";

const protectRoute = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, No token provided");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) {
    res.status(401);
    throw new Error("Not authorized, Invalid token");
  }

  const user = await User.findById(decoded.userId).select("-password");
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  req.user = user;
  next();
});

export default protectRoute;
