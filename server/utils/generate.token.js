import jwt from "jsonwebtoken";

const generateToken = (userId, res) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });
  } catch (error) {
    console.log(`Error in generate token function: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default generateToken;
