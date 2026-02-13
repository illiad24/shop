import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationError } from "express-validator";

interface ValidationErrorResponse {
  message: string;
  errors: {
    field: string;
    message: string;
  }[];
}

export const validateRequest = (
  req: Request,
  res: Response<ValidationErrorResponse>,
  next: NextFunction,
): void | Response<ValidationErrorResponse> => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    const formattedErrors = result.array().map((error: ValidationError) => {
      if (error.type === "field") {
        return {
          field: error.path, // ✅ ЗАМІСТЬ param
          message: error.msg,
        };
      }

      // fallback для AlternativeValidationError
      return {
        field: "unknown",
        message: error.msg,
      };
    });

    return res.status(400).json({
      message: "Validation error",
      errors: formattedErrors,
    });
  }

  next();
};
