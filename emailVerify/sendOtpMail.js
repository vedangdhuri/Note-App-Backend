import nodemailer from "nodemailer";
import dotenv from "dotenv/config";

export const sendOtpMail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "OTP for Email Verification",
    html: `<h2>Your OTP for password reset is: <b>${otp}</b>. It is valid for 10 minutes.</h2>`,
  };

  await transporter.sendMail(mailOptions);
};
