import yup from "yup"

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
})
