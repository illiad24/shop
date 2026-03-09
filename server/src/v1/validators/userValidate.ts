import { checkSchema } from "express-validator";

export const updateMeValidate = checkSchema({
  name: {
    in: ["body"],
    optional: true,
    isString: { errorMessage: "Name must be a string" },
    trim: true,
    isLength: {
      options: { min: 2, max: 50 },
      errorMessage: "Name must be 2–50 characters",
    },
  },
  email: {
    in: ["body"],
    optional: true,
    isEmail: { errorMessage: "Invalid email format" },
    normalizeEmail: true,
  },
});
