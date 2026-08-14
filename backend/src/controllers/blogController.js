import fs from "fs";

import {
  createBlogs,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  getBlogsCount,
  getMyBlogs,
  updateBlog,
} from "../models/blogModel.js";

import AppError from '../Errors/AppError.js'
import { deleteFromCloudinary, uploadToCloudinary } from "../utils/cloudinaryUpload.js";

const createBlogsController = async (req, res, next) => {
  try {
    const { title, content, category_id } = req.validatedData ?? req.body;
    const userId = req.user.id;

    let mediaUrl = null;
    let mediaType = null;
    let mediaPublicId = null;

    if (req.file) {
      const cloudinaryResult = await uploadToCloudinary(
        req.file.path
      )

      mediaUrl = cloudinaryResult.secureUrl;
      mediaType = cloudinaryResult.resourceType;
      mediaPublicId = cloudinaryResult.publicId;

      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path)
      }
    }

    const newBlog = await createBlogs(
      title,
      content,
      userId,
      mediaUrl,
      mediaType,
      mediaPublicId,
      category_id
    );

    return res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog: newBlog,
    });
  } catch (error) {
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    return next(error);
  }
};

const updateBlogsController = async (req, res, next) => {
  let newPublicId = null;
  let newResourceType = null;

  try {
    const { id } = req.params;
    const userId = req.user.id;

    const existingBlog = await getBlogById(id);

    if (!existingBlog) {
      throw new AppError("Blog not found", 404);
    }

    if (
      Number(existingBlog.user_id) !== Number(userId) &&
      req.user.role !== "admin"
    ) {
      throw new AppError(
        "You are not allowed to update this blog",
        403
      );
    }

    // Use Zod-cleaned data after validation
    const data = req.validatedData ?? req.body;

    const title = data.title ?? existingBlog.title;
    const content = data.content ?? existingBlog.content;
    const categoryId =
      data.category_id ?? existingBlog.category_id;

    let mediaUrl = existingBlog.media_url;
    let mediaType = existingBlog.media_type;
    let mediaPublicId = existingBlog.media_public_id;

    const oldPublicId = existingBlog.media_public_id;
    const oldMediaType = existingBlog.media_type;

const removeMedia = data.remove_media === true;

      if (req.file && removeMedia) {
      throw new AppError(
        "Choose either a new media file or remove the existing media",
        400
      );
    }
//case 1 : replace existing file
    if (req.file) {
      const uploadedMedia = await uploadToCloudinary(
        req.file.path
      );

      mediaUrl = uploadedMedia.secureUrl;
      mediaType = uploadedMedia.resourceType;
      mediaPublicId = uploadedMedia.publicId;

      newPublicId = uploadedMedia.publicId;
      newResourceType = uploadedMedia.resourceType;

      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
    }

    //case 2: remove exiting file
    if(removeMedia){
      mediaUrl=null
      mediaType=null;
      mediaPublicId=null
    }

    console.log("req.body:", req.body);
console.log("req.validatedData:", req.validatedData);
    const updatedBlog = await updateBlog(
      id,
      title,
      content,
      mediaUrl,
      mediaType,
      mediaPublicId,
      categoryId
    );

    console.log("validated data:", data);
console.log("removeMedia:", removeMedia, typeof removeMedia);

    // Delete old Cloudinary asset only after DB update succeeds
    if ((req.file || removeMedia) && oldPublicId) {
      await deleteFromCloudinary(
        oldPublicId,
        oldMediaType || "image"
      );
    }

    return res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (error) {
    // Remove temporary local file
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    if (newPublicId) {
      try {
        await deleteFromCloudinary(
          newPublicId,
          newResourceType || "image"
        );
      } catch (cleanupError) {
        console.error(
          "New Cloudinary media cleanup failed:",
          cleanupError.message
        );
      }
    }

    return next(error);
  }
};

const deleteBlogController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const existingBlog = await getBlogById(id);

    if (!existingBlog) {
      throw new AppError("Blog not found", 404);
    }

    if (
      Number(existingBlog.user_id) !== Number(userId) &&
      req.user.role !== "admin"
    ) {
      throw new AppError(
        "You are not allowed to delete this blog",
        403
      );
    }

    const deletedBlog = await deleteBlog(id);

    if (existingBlog.media_public_id) {
      try {
        await deleteFromCloudinary(
          existingBlog.media_public_id,
          existingBlog.media_type
        );
      } catch (cloudinaryError) {
        /*
          Blog is already deleted from DB.
          Log Cloudinary failure so it can be cleaned later.
        */
        console.error(
          "Failed to delete Cloudinary media:",
          cloudinaryError.message
        );
      }
    }

    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
      blog: deletedBlog,
    });
  } catch (error) {
    return next(error);
  }
};

const getAllBlogsController = async (req, res) => {

  try {

    let { page, limit, keyword } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 2;

    const offset = (page - 1) * limit;

    const blogs = await getAllBlogs(
      limit,
      offset,
      keyword
    );

    const totalBlogs = await getBlogsCount(keyword);

    res.status(200).json({
      success: true,
      totalBlogs,
      page,
      limit,
      totalPages: Math.ceil(
        totalBlogs / limit
      ),
      count: blogs.length,
      blogs,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const getMyBlogsController = async (req, res) => {
  try {
    const userId = req.user.id;
    const blogs = await getMyBlogs(userId);
    return res.status(200).json({
      success: true,
      count: blogs.length,
      blogs,
    });
  }
  catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getBlogByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blog = await getBlogById(id);
    if (!blog) {
      throw new AppError('Blog not found', 404)
    }

    return res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    console.log(error)
    next(error)
  }
};

export {
  createBlogsController,
  updateBlogsController,
  getAllBlogsController,
  getMyBlogsController,
  getBlogByIdController,
  deleteBlogController,
};
