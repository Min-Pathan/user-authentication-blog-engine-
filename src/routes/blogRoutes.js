import express from "express";
import { createBlogsController } from "../controllers/blogController.js";

const router = express.Router();
router.post("/createBlog", createBlogsController);

export default router;