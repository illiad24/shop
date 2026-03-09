import { Router } from "express";
import { AddressController } from "../controllers/address.controller";
import { authMiddleware as auth } from "../../middlewares/auth";
import { addAddressValidate } from "../validators/addressValidate";
import { validateRequest } from "../../middlewares/validator";

const router = Router();

router.get("/", auth, AddressController.getAll);
router.post("/", auth, addAddressValidate, validateRequest, AddressController.add);
router.delete("/:id", auth, AddressController.remove);

export default router;
