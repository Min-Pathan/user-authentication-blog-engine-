import { createBlogs } from "../models/blogModel.js";

const createBlogsController = async (req, res) => {
  try {
    const { title, content, user_id } = req.body;

    const newBlog = await createBlogs(title, content, user_id);

    res.status(201).json({
      success: true,
      blog: newBlog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export { createBlogsController };
