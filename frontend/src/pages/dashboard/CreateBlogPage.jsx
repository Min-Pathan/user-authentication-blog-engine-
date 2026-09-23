
import {
  Alert,
  Box,
  Typography,
} from "@mui/material";

import { useNavigate } from 'react-router'

import BlogForm from "../../components/blogs/BlogForm.jsx";
import { useState } from "react";
import { useToast } from "../../context/ToastContext.js";
import useCreateBlog from "../../features/blogs/mutations/useCreateBlog.js";


function CreateBlogPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [submitError, setSubmitError] = useState("");

  const {
    mutateAsync: submitBlog,
    isPending
  } = useCreateBlog();

  const handleCreateBlog = async (
    values,
  ) => {
    if (isPending) return;

    setSubmitError('');
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
      const message = error?.response?.status === 401 ?
        "Your session has expired. Please log in again"
        : error?.response?.data?.message ||
        "Could not create your blog. Please try again.";
      setSubmitError(message);
      showToast(message, "error");
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
      {submitError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {submitError}
        </Alert>
      )}

      <BlogForm
        submitLabel="Create Blog"
        onSubmit={handleCreateBlog}
        submitting={isPending}
      />
    </Box>
  );
}

export default CreateBlogPage;