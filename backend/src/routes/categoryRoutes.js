import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { createCategoryController, getAllCategoriesController } from "../controllers/categoryController.js";

const router = express.Router();

router.post("/", authMiddleware, createCategoryController);

router.get("/", getAllCategoriesController);

export default router;