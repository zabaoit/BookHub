import express from "express";
import { authlogin, authRegister, authLogOut, authRefreshToken } from "../controllers/AuthController.js";

const router = express.Router();

router.post("/register", authRegister);
router.post("/login", authlogin);
router.post("/logout", authLogOut);
router.post("/refresh-token", authRefreshToken);
export default router;