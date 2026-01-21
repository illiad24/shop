import { Router } from "express";
import ProductController from "../controllers/products.controller";

const router = Router();

router.get("/list", ProductController.getAll);
router.get("/:productId", ProductController.getById);
router.post("/", ProductController.create);
router.put("/:productId", ProductController.update);
router.delete("/:productId", ProductController.delete);

export default router;
