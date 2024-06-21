import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const getProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePicture: user.profilePicture,
    });
  } catch (error) {
    console.log(`Error in get profile controller: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { fullName, username, password, profilePicture } = req.body;

    const user = await User.findById(userId);
    if (user) {
      user.fullName = fullName || user.fullName;
      user.username = username || user.username;
      user.profilePicture = profilePicture || user.profilePicture;

      if (password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword;
      }

      const updatedUser = await user.save();

      res.status(200).json({
        _id: updatedUser._id,
        fullName: updatedUser.fullName,
        username: updatedUser.username,
        profilePicture: updatedUser.profilePicture,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(`Error in update profile controller: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
