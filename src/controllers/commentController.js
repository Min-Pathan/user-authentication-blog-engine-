import { getBlogById } from "../models/blogModel.js";
import {
  createComment,
  getAllComments,
  getCommentById,
  updateComment,
  deleteComment,
  getCommentsByBlogId,
} from "../models/commentModel.js";


const getCommentsByBlogIdController = async(req, res)=>{
  try{
    const {id} = req.params;
    const comments = await getCommentsByBlogId(id);
     return res.status(200).json({
      success: true,
      count: comments.length,
      comments
    });
  }
   catch (err) {
    return res.status(500).json({
      success: false,
      err: err.message,
    });
  }
}

const createcommentController = async (req, res) => {
  try {
    const { comment, blog_id } = req.body;
    const user_id = req.user.id;
    if (!comment || comment.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Enter comment",
      });
    }

    if (comment.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Comment must be at least 2 characters",
      });
    }

    if (comment.length > 200) {
      return res.status(400).json({
        success: false,
        message: "Comment cannot exceed 200 characters",
      });
    }

    if (!blog_id) {
      return res.status(400).json({
        success: false,
        message: "Blog is required",
      });
    }
    const blogExists = await getBlogById(blog_id);
    if (!blogExists) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }
    const newComment = await createComment(comment, user_id, blog_id);
    return res.status(201).json({
      success: true,
      comment: newComment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCommentByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await getCommentById(id);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }
    return res.status(200).json({
      success: true,
      comment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateCommentController = async (req, res) => {
  try {
    const { comment } = req.body;
    const id = req.params.id;
    const user_id = req.user.id;

    if (!comment || comment.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Enter comment",
      });
    }

    const existingComment = await getCommentById(id);
    if (!existingComment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    if (Number(existingComment.user_id) !== Number(user_id)) {
      return res.status(403).json({
        success: false,
        message: "You can only update your own comment",
      });
    }

    const updatedComment = await updateComment(id, comment);
    return res.status(200).json({
      success: true,
      comment: updatedComment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteCommentController = async (req, res) => {
  try {
    const id = req.params.id;
    const user_id = req.user.id;

    const existingComment = await getCommentById(id);
    if (!existingComment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    if (Number(existingComment.user_id) !== Number(user_id)) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own comment",
      });
    }

    await deleteComment(id);
    return res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  getCommentsByBlogIdController,
  createcommentController,
  getCommentByIdController,
  updateCommentController,
  deleteCommentController,
};
