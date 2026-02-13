import { Router } from "express";
import ProductController from "../controllers/products.controller";
import { UserRole } from "../../types/auth.types";
import { requireRole } from "../../middlewares/role.middleware";
import { authMiddleware } from "../../middlewares/auth";
import { productValidate } from "../validators/ProductValidate";
import { validateRequest } from "../../middlewares/validator";

const router = Router();

router.get("/", ProductController.getAll);
router.get("/:productId", ProductController.getById);
router.post(
  "/",
  authMiddleware,
  requireRole([UserRole.ADMIN, UserRole.USER]),
  productValidate,
  ProductController.create,
);
router.put(
  "/:productId",
  authMiddleware,

  //   requireRole([UserRole.ADMIN]),
  productValidate,
  validateRequest,
  ProductController.update,
);
router.delete(
  "/:productId",
  authMiddleware,
  // requireRole([UserRole.ADMIN]),
  validateRequest,
  ProductController.delete,
);

export default router;
