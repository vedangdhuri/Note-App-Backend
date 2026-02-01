import yup, { Schema } from "yup";

export const userSchema = yup.object({
  username: yup
    .string()
    .trim()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export const validateUser = (schema) => async (req, res, next) => {
  try {
    await schema.validate(data);
    next();
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
