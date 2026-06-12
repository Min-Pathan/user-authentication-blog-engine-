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
    const user_id = req.user.id;

    const newBlog = await createBlogs(title, content, user_id);

    res.status(201).json({
      success: true,
      blog: newBlog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateBlogsController = async (req, res) => {
  try {
    const { title, content } = req.body;
    const id = req.params.id;
    const user_id = req.user.id;
    const blog = await getBlogByIdHelper(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
    if (Number(blog.user_id) !== Number(user_id)) {
      return res.status(403).json({
        success: false,
        message: "You can only update your own blog",
      });
    }

    const updatedBlog = await updateBlog(id, title, content);

    return res.status(200).json({
      success: true,
      blog: updatedBlog,
    });
  } catch (error) {
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
    const blog = await getBlogByIdHelper(id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
    if (Number(blog.user_id) !== Number(user_id)) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own blog",
      });
    }
    const result = await deleteBlog(id);
    return res.status(200).json({
      success: true,
      message: "deleted successfully",
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
