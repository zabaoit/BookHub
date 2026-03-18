import express from "express";
import { getProfile, updateProfile, getAllUsers, updateUserById, deleteUserById, createUserByAdmin } from "../controllers/UserController.js";
import { getAddresses, createAddress, updateAddress, deleteAddress, setDefaultAddress } from "../controllers/AddressController.js";
import { addToWishlist, getWishlist, getWishlistStatus, removeFromWishlist } from "../controllers/WishlistController.js";
import { protectedRoute, verifyAdmin, verifyUser } from "../middlewares/AuthMiddleWare.js";

const router = express.Router();

router.use(protectedRoute);
router.get("/admin/all", verifyAdmin, getAllUsers);
router.post("/admin", verifyAdmin, createUserByAdmin);
router.put("/admin/:id", verifyAdmin, updateUserById);
router.delete("/admin/:id", verifyAdmin, deleteUserById);
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
