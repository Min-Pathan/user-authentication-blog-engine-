import express from 'express'
import {
    createcommentController,
    getCommentByIdController,
    updateCommentController,
    deleteCommentController,
} from '../controllers/commentController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { createCommentSchema, updateCommentSchema } from '../validations/commentValidation.js';
import validate from '../middlewares/validateMiddleware.js';
const router = express.Router();

router.get("/:id", getCommentByIdController);
router.post("/createComment", authMiddleware, validate(createCommentSchema), createcommentController)
router.put("/:id", authMiddleware, validate(updateCommentSchema), updateCommentController)
router.delete("/:id", authMiddleware, deleteCommentController)
export default router;