import express from "express";
import { getProfile, updateProfile } from "../controllers/UserController.js";
import { getAddresses, createAddress, updateAddress, deleteAddress, setDefaultAddress } from "../controllers/AddressController.js";
import { addToWishlist, getWishlist, getWishlistStatus, removeFromWishlist } from "../controllers/WishlistController.js";
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

// Wishlist routes
router.get("/wishlist", verifyUser, getWishlist);
router.get("/wishlist/:bookId/status", verifyUser, getWishlistStatus);
router.post("/wishlist", verifyUser, addToWishlist);
router.delete("/wishlist/:bookId", verifyUser, removeFromWishlist);

export default router;
