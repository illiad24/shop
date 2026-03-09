import { checkSchema } from "express-validator";

export const updateQuantityValidate = checkSchema({
  quantity: {
    in: ["body"],
    exists: { errorMessage: "Quantity is required" },
    isInt: {
      options: { min: 0 },
      errorMessage: "Quantity must be a non-negative integer",
    },
    toInt: true,
  },
});
