import express from "express";
import { createBlogsController, deleteBlogController, getAllBlogsController, getBlogByIdController, getMyBlogsController, updateBlogsController } from "../controllers/blogController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/createBlog", authMiddleware, createBlogsController);
router.put("/:id", authMiddleware, updateBlogsController);
router.get("/my-blogs", authMiddleware, getMyBlogsController)
router.get("/:id", getBlogByIdController);
router.get("/", getAllBlogsController);
router.delete("/:id", authMiddleware, deleteBlogController)

export default router;