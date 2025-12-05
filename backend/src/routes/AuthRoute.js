import express from "express";
import { authlogin, authRegister } from "../controllers/AuthController.js";

const router = express.Router();

router.post("/register", authRegister);
router.post("/login", authlogin);
export default router;