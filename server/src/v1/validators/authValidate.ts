import { checkSchema } from "express-validator";

export const registerValidate = checkSchema({
  name: {
    in: ["body"],
    exists: { errorMessage: "Name is required" },
    isString: { errorMessage: "Name must be a string" },
    trim: true,
    isLength: {
      options: { min: 2, max: 50 },
      errorMessage: "Name must be 2–50 characters",
    },
  },
  email: {
    in: ["body"],
    exists: { errorMessage: "Email is required" },
    isEmail: { errorMessage: "Invalid email format" },
    normalizeEmail: true,
  },
  password: {
    in: ["body"],
    exists: { errorMessage: "Password is required" },
    isLength: {
      options: { min: 6, max: 100 },
      errorMessage: "Password must be 6–100 characters",
    },
  },
});

export const loginValidate = checkSchema({
  email: {
    in: ["body"],
    exists: { errorMessage: "Email is required" },
    isEmail: { errorMessage: "Invalid email format" },
    normalizeEmail: true,
  },
  password: {
    in: ["body"],
    exists: { errorMessage: "Password is required" },
    notEmpty: { errorMessage: "Password cannot be empty" },
  },
});
