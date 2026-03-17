import express from "express";
import { deleteAuthorById, getAllAuthors, getAuthorById, postAuthor, updateAuthorById } from "../controllers/AuthorController.js";
import { protectedRoute, verifyAdmin } from "../middlewares/AuthMiddleWare.js";

const router = express.Router();

router.get("/", getAllAuthors);
router.get("/:id", getAuthorById);

router.use(protectedRoute, verifyAdmin);

router.post("/", postAuthor);
router.put("/:id", updateAuthorById);
router.delete("/:id", deleteAuthorById);
export default router;