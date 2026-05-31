import express from "express";
import { createBlogsController, getAllBlogsController, getBlogByIdController, getMyBlogsController } from "../controllers/blogController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/createBlog", authMiddleware, createBlogsController);
router.get("/my-blogs", authMiddleware, getMyBlogsController)
router.get("/:id", getBlogByIdController);
router.get("/", getAllBlogsController);

export default router;