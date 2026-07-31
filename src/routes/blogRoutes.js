import express from "express";
import { createBlogsController, deleteBlogController, getAllBlogsController, getBlogByIdController, getMyBlogsController, updateBlogsController } from "../controllers/blogController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { getCommentsByBlogIdController } from "../controllers/commentController.js";
import uploadBlogMedia from "../middlewares/blogMediaUploadMiddleware.js";

const router = express.Router();
router.post("/createBlog", authMiddleware, uploadBlogMedia.single("media"), createBlogsController);
router.put("/:id", authMiddleware, uploadBlogMedia.single("media"), updateBlogsController);
router.get("/my-blogs", authMiddleware, getMyBlogsController)
router.get("/:id/comments", getCommentsByBlogIdController);
router.get("/:id", getBlogByIdController);
router.get("/", getAllBlogsController);
router.delete("/:id", authMiddleware, deleteBlogController)

export default router;