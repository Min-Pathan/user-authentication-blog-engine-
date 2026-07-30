import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { getBlogLikesController, toggleLikeController } from "../controllers/likesController.js";

const router = express.Router();

router.post(
    "/:blogId/toggle",
    authMiddleware,
    toggleLikeController
);
router.get(
    "/:blogId",
    authMiddleware,
    getBlogLikesController
);
export default router;