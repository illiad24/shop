import { checkSchema } from "express-validator";

export const addAddressValidate = checkSchema({
  city: {
    in: ["body"],
    exists: { errorMessage: "City is required" },
    isString: { errorMessage: "City must be a string" },
    trim: true,
    isLength: { options: { min: 2, max: 100 }, errorMessage: "City must be 2–100 characters" },
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
  recipientName: {
    in: ["body"],
    exists: { errorMessage: "Recipient name is required" },
    isString: { errorMessage: "Recipient name must be a string" },
    trim: true,
    isLength: { options: { min: 2, max: 100 }, errorMessage: "Recipient name must be 2–100 characters" },
  },
  apartment: {
    in: ["body"],
    optional: true,
    isString: { errorMessage: "Apartment must be a string" },
    trim: true,
  },
});
