import express from "express";
import { getProfile, updateProfile } from "../controllers/UserController.js";
import { getAddresses, createAddress, updateAddress, deleteAddress, setDefaultAddress } from "../controllers/AddressController.js";
import { protectedRoute, verifyUser } from "../middlewares/AuthMiddleWare.js";

const router = express.Router();

router.use(protectedRoute);
router.get("/profile", verifyUser, getProfile);
router.put("/profile", verifyUser, updateProfile);

// Address routes
router.get("/addresses", verifyUser, getAddresses);
router.post("/addresses", verifyUser, createAddress);
router.put("/addresses/:id", verifyUser, updateAddress);
router.delete("/addresses/:id", verifyUser, deleteAddress);
router.put("/addresses/:id/default", verifyUser, setDefaultAddress);

export default router;
