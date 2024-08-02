import { emailRegex } from "../constants";
import * as Yup from "yup";

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
