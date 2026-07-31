import {
  createBlogs,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  getBlogsCount,
  getMyBlogs,
  updateBlog,
} from "../models/blogModel.js";
import getBlogByIdHelper from "../models/helperModel.js";

const createBlogsController = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
      });
    }

    let mediaUrl = null;
    let mediaType = null;

    if (req.file) {
      mediaUrl = `/uploads/blog-media/${req.file.filename}`;

      if (req.file.mimetype.startsWith("image/")) {
        mediaType = "image";
      } else if (req.file.mimetype.startsWith("video/")) {
        mediaType = "video";
      }
    }

    const blog = await createBlogs(
      title,
      content,
      userId,
      mediaUrl,
      mediaType
    );

    return res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    console.error("Create blog error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateBlogsController = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const existingBlog = await getBlogById(id);

    if (!existingBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    if (
      Number(existingBlog.user_id) !== Number(userId)
    ) {
      console.log("yess")
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this blog",
      });
    }

    const title = req.body.title ?? existingBlog.title;
    const content = req.body.content ?? existingBlog.content;

    let mediaUrl = existingBlog.media_url;
    let mediaType = existingBlog.media_type;

    if (req.file) {
      mediaUrl = `/uploads/blog-media/${req.file.filename}`;

      if (req.file.mimetype.startsWith("image/")) {
        mediaType = "image";
      } else if (req.file.mimetype.startsWith("video/")) {
        mediaType = "video";
      }

      if (existingBlog.media_url) {
        const oldFilePath = path.join(
          process.cwd(),
          existingBlog.media_url
        );

        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }
    }

    const updatedBlog = await updateBlog(
      id,
      title,
      content,
      mediaUrl,
      mediaType
    );

    return res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (error) {
    console.error("Update blog error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;
    const existingBlog = await getBlogByIdHelper(id);
    if (!existingBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
    if (Number(existingBlog.user_id) !== Number(user_id)) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own blog",
      });
    }
    const result = await deleteBlog(id);
    if(existingBlog.media_url){
      const relativeMediaPath = existingBlog.media_url.replace(/^\/+/, "");
      const mediaPath = path.join(
        process.cwd(),
        relativeMediaPath
      )
       if (fs.existsSync(mediaPath)) {
        fs.unlinkSync(mediaPath);
      }
    }
   return res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
      blog: deletedBlog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getBlogByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await getBlogById(id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
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
