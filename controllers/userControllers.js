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

export const verification = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Authorization Token is missing or invalid'
      
      })
    }

    const token = authHeader.split(' ')[1]

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.SECRET_KEY)
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Invalid token'
      })
    }

    user.token = null;
    user.isVerified = true;
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Email verified successfully'
    })
  } catch(error) {
    return res.status(500).json({
      success: false,
      error: error.message
    })
  }
}

