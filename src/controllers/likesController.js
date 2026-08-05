import AppError from "../Errors/AppError.js";
import { getBlogById } from "../models/blogModel.js";
import {
  findLike,
  createLike,
  deleteLike,
  getLikeCount,
  getLikeStatus,
} from "../models/likeModel.js";

const toggleLikeController = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    const userId = req.user.id;

    const blog = await getBlogById(blogId);

    if (!blog) {
      throw new AppError("Blog not found", 404)
    }

    const existingLike = await findLike(userId, blogId);

    if (existingLike) {
      await deleteLike(userId, blogId);

      return res.status(200).json({
        success: true,
        liked: false,
        message: "Blog unliked successfully",
      });
    }

    const like = await createLike(userId, blogId);

    return res.status(201).json({
      success: true,
      liked: true,
      message: "Blog liked successfully",
      like,
    });
  } catch (error) {
    next(error)
  }
};


const getBlogLikesController = async (req, res) => {
  try {
    const { blogId } = req.params;

    // Auth middleware can provide this.
    const userId = req.user.id;

    const likeCount = await getLikeCount(blogId);
    const likedByCurrentUser = await getLikeStatus(userId, blogId);

    return res.status(200).json({
      success: true,
      blogId: Number(blogId),
      likeCount,
      likedByCurrentUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { toggleLikeController, getBlogLikesController };