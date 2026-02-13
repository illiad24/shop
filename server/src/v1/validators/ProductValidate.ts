import { checkSchema } from "express-validator";

export const productValidate = checkSchema({
  title: {
    in: ["body"],
    exists: {
      errorMessage: "Title is required",
    },
    isString: {
      errorMessage: "Title must be a string",
    },
    isLength: {
      options: { min: 3 },
      errorMessage: "Title must be at least 3 characters long",
    },
    trim: true,
  },

  category: {
    in: ["body"],
    exists: {
      errorMessage: "Category is required",
    },
    isString: {
      errorMessage: "Category must be a string",
    },
    notEmpty: {
      errorMessage: "Category cannot be empty",
    },
  },

  description: {
    in: ["body"],
    exists: {
      errorMessage: "Description is required",
    },
    isString: {
      errorMessage: "Description must be a string",
    },
    isLength: {
      options: { min: 10 },
      errorMessage: "Description must be at least 10 characters long",
    },
    trim: true,
  },

  portionWeightGrams: {
    in: ["body"],
    exists: {
      errorMessage: "Portion weight is required",
    },
    isFloat: {
      options: { min: 10 },
      errorMessage: "Portion weight must be a number and at least 10 grams",
    },
    toFloat: true,
  },

  price: {
    in: ["body"],
    exists: {
      errorMessage: "Price is required",
    },
    isFloat: {
      options: { min: 1 },
      errorMessage: "Price must be a number greater than 0",
    },
    toFloat: true,
  },

  stockPortions: {
    in: ["body"],
    exists: {
      errorMessage: "Stock portions is required",
    },
    isInt: {
      options: { min: 1 },
      errorMessage: "Stock portions must be an integer greater than 0",
    },
    toInt: true,
  },
  label: {
    in: ["body"],
    exists: {
      errorMessage: "Description is required",
    },
    isString: {
      errorMessage: "Description must be a string",
    },
  },
});
