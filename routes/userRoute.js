import express from "express";
import {
    loginUser, logoutUser, registerUser, verification, forgotPassword, verifyOTP, changePassword,
} from "../controllers/userControllers.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { validateUser } from "../validatiors/userValidate.js";

const router = express.Router();

router.post("/register", validateUser(userSchema), registerUser);
router.post("/verify", verification);
router.post("/login", loginUser);
router.post("/logout", isAuthenticated, logoutUser);
router.post("/forgot-password", forgotPassword);
router.post("/verifyOtp/:email", verifyOTP);
router.post("/change-password/:email", changePassword);

export default router;

// http://localhost:8000/users/register
// http://localhost:8000/users/verify
// http://localhost:8000/users/login
// http://localhost:8000/users/logout
// http://localhost:8000/users/forgot-password
// http://localhost:8000/users/verifyOtp/:email
// http://localhost:8000/users/change-password/:email