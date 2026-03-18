import express from "express";
import {
  authlogin,
  authRegister,
  authLogOut,
  authRefreshToken,
  forgotPassword,
  requestEmailVerification,
  resetPassword,
  verifyResetCode,
  verifyEmail,
} from "../controllers/AuthController.js";

const router = express.Router();

router.post("/register", authRegister);
router.post("/login", authlogin);
router.post("/logout", authLogOut);
router.post("/refresh-token", authRefreshToken);
router.post("/forgot-password", forgotPassword);
router.post("/request-email-verification", requestEmailVerification);
router.post("/verify-email", verifyEmail);
router.post("/verify-reset-code", verifyResetCode);
router.post("/reset-password", resetPassword);
export default router;
