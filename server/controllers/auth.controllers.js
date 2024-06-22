import User from "../models/user.model.js";
import generateToken from "../utils/generate.token.js";
import asyncHandler from "express-async-handler";

export const signup = asyncHandler(async (req, res) => {
  const { fullName, username, password } = req.body;

  const userExists = await User.findOne({ username });
  if (userExists) {
    res.status(400);
    throw new Error("Username already exists");
  }

  const newUser = new User({
    fullName,
    username,
    password,
  });

  if (newUser) {
    generateToken(newUser._id, res);
    await newUser.save();

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

export const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user && (await user.comparePassword(password))) {
    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
    });
  } else {
    res.status(401);
    throw new Error("Invalid username or password");
  }
});

export const logout = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};
