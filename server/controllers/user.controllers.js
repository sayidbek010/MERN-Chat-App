import User from "../models/user.model.js";
import asyncHandler from "express-async-handler";

export const getProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json({
    _id: user._id,
    fullName: user.fullName,
    username: user.username,
    profilePicture: user.profilePicture,
  });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { fullName, username, password, profilePicture } = req.body;

  const user = await User.findById(userId);
  if (user) {
    user.fullName = fullName || user.fullName;
    user.username = username || user.username;
    user.profilePicture = profilePicture || user.profilePicture;

    if (password) {
      user.password = password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      fullName: updatedUser.fullName,
      username: updatedUser.username,
      profilePicture: updatedUser.profilePicture,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
