import express from "express";
import { getProfile, updateProfile } from "../controllers/UserController.js";
import { protectedRoute, verifyUser } from "../middlewares/AuthMiddleWare.js";

const router = express.Router();

router.use(protectedRoute);
router.get("/profile", verifyUser, getProfile);
router.put("/profile", verifyUser, updateProfile);

export default router;
