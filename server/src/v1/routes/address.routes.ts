import { Router } from "express";
import { AddressController } from "../controllers/address.controller";
import { authMiddleware as auth } from "../../middlewares/auth";

const router = Router();

router.get("/", auth, AddressController.getAll);
router.post("/", auth, AddressController.add);
router.delete("/:id", auth, AddressController.remove);

export default router;
 