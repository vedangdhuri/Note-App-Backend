import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { verifyEmail } from "../emailVerify/verifyEmail.js";
import { sendOtpMail } from "../emailVerify/sendOtpMail.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      return res.status(400).json({
        success: false,
        message: "Username, password, and email are required.",
      });
    }
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Username or email already exits...",
      });
    }

    const handlePassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: handlePassword,
      email,
    });

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "10m",
    });
    verifyEmail(token, newUser.email);
    newUser.token = token;
    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
