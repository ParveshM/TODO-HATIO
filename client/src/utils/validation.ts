import * as Yup from "yup";
export const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

export const signupValidationSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .required("Email is required*")
    .matches(emailRegex, "Invalid email format."),
  password: Yup.string()
    .trim()
    .required("Password is required*")
    .min(6, "Password must be at least 6 characters long.")
    .matches(/[a-z]/, "Password must contain lowercase letters.")
    .matches(/[A-Z]/, "Password must contain uppercase letters.")
    .matches(/\d/, "Password must contain at least one digit."),
  confirmPassword: Yup.string()
    .trim()
    .required("Required.")
    .oneOf([Yup.ref("password")], "Password is not matching"),
});

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .matches(emailRegex, "Invalid email format.")
    .required("Email is required."),
  password: Yup.string().trim().required("Password is required."),
});

export const TitleValidationSchema = Yup.object().shape({
  title: Yup.string()
    .trim()
    .required("Title is required.")
    .matches(
      /^([A-Z][a-z]*)(\s[A-Z][a-z]*)*$/,
      "Title must start with an uppercase letter and can be followed by other words with the same pattern"
    )
    .min(5, "Title should be at least 5 characters long.")
    .max(15, "Title should not exceed 15 characters."),
});
