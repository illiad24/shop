import { checkSchema } from "express-validator";

export const createOrderValidate = checkSchema({
  firstName: {
    in: ["body"],
    exists: { errorMessage: "First name is required" },
    isString: { errorMessage: "First name must be a string" },
    trim: true,
    isLength: { options: { min: 1, max: 50 }, errorMessage: "First name must be 1–50 characters" },
  },
  lastName: {
    in: ["body"],
    exists: { errorMessage: "Last name is required" },
    isString: { errorMessage: "Last name must be a string" },
    trim: true,
    isLength: { options: { min: 1, max: 50 }, errorMessage: "Last name must be 1–50 characters" },
  },
  email: {
    in: ["body"],
    exists: { errorMessage: "Email is required" },
    isEmail: { errorMessage: "Invalid email format" },
    normalizeEmail: true,
  },
  phone: {
    in: ["body"],
    exists: { errorMessage: "Phone is required" },
    isString: { errorMessage: "Phone must be a string" },
    trim: true,
    isLength: { options: { min: 7, max: 20 }, errorMessage: "Phone must be 7–20 characters" },
  },
  street: {
    in: ["body"],
    exists: { errorMessage: "Street is required" },
    isString: { errorMessage: "Street must be a string" },
    trim: true,
    isLength: { options: { min: 2, max: 100 }, errorMessage: "Street must be 2–100 characters" },
  },
  postalCode: {
    in: ["body"],
    exists: { errorMessage: "Postal code is required" },
    isString: { errorMessage: "Postal code must be a string" },
    trim: true,
    isLength: { options: { min: 2, max: 20 }, errorMessage: "Postal code must be 2–20 characters" },
  },
  deliveryType: {
    in: ["body"],
    exists: { errorMessage: "Delivery type is required" },
    isIn: {
      options: [["pickup", "delivery", "courier"]],
      errorMessage: "Delivery type must be: pickup, delivery or courier",
    },
  },
  paymentType: {
    in: ["body"],
    exists: { errorMessage: "Payment type is required" },
    isIn: {
      options: [["card", "online", "monobank"]],
      errorMessage: "Payment type must be: card, online or monobank",
    },
  },
});
