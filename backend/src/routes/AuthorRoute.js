import express from "express";
import { deleteAuthorById, getAllAuthors, getAuthorById, postAuthor, updateAuthorById } from "../controllers/AuthorController.js";
import { protectedRoute, verifyAdmin } from "../middlewares/AuthMiddleWare.js";

const router = express.Router();

router.post("/", postAuthor);
router.get("/", getAllAuthors);

router.use(protectedRoute, verifyAdmin);

router.get("/:id", getAuthorById);
router.put("/:id", updateAuthorById);
router.delete("/:id", deleteAuthorById);
export default router;