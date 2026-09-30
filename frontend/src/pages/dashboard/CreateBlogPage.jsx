
import {
  Box,
  Typography,
} from "@mui/material";

import { useNavigate } from 'react-router'

import BlogForm from "../../components/blogs/BlogForm.jsx";
import { useToast } from "../../context/ToastContext.js";
import useCreateBlog from "../../features/blogs/mutations/useCreateBlog.js";


function CreateBlogPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const {
    mutateAsync: submitBlog,
    isPending
  } = useCreateBlog();

  const handleCreateBlog = async (
    values,
  ) => {
    if (isPending) return;

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("category_id", values.category);
    if (values.media instanceof File) {
      formData.append("media", values.media)
    }
    try {
      const response = await submitBlog(formData);
      showToast(response.message || 'Blog created successfully', "success");

      navigate("/dashboard/my-blogs")
    }
    catch (error) {
      if (error?.response?.status === 401) return;

      showToast(
        error?.response?.data?.message ||
        "Could not create your blog. Please try again.",
        "error",
      );
    }
  };

  return (
    <Box

    >
      <Box sx={{ mb: 4 }}>

        <Typography
          component="h1"
          variant="h4"
          sx={{
            fontWeight: 800,
            letterSpacing: "-0.03em",
          }}
        >
          Create Blog
        </Typography>

        <Typography
          color="text.secondary"
          sx={{
            mt: 0.75,
          }}
        >
          Write and publish a new story.
        </Typography>
      </Box>

      <BlogForm
        submitLabel="Create Blog"
        onSubmit={handleCreateBlog}
        submitting={isPending}
      />
    </Box>
  );
}

export default CreateBlogPage;