import express from 'express'
import {
    createcommentController,
    getCommentByIdController,
    updateCommentController,
    deleteCommentController,
} from '../controllers/commentController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
const router = express.Router();

router.get("/:id", getCommentByIdController);
router.post("/createComment", authMiddleware, createcommentController)
router.put("/:id", authMiddleware, updateCommentController)
router.delete("/:id", authMiddleware, deleteCommentController)
export default router;