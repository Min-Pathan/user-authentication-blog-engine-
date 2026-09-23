
import { useSelector } from "react-redux";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import {
  Alert,
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";

import BlogForm from "../../components/blogs/BlogForm.jsx";

import BlogDetailsSkeleton from "../../components/common/BlogDetailsSkeleton.jsx";
import useBlog from "../../features/blogs/queries/useBlog.js";
import { useToast } from "../../context/ToastContext.js";
import useUpdateBlog from "../../features/blogs/mutations/useUpdateBlog.js";

function EditBlogPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const user = useSelector((state) => state.auth.user);
  const {
    data,
    isLoading,
    isError,
    error,
  } = useBlog(id);

  const {
    mutateAsync: saveBlog,
    isPending,
  } = useUpdateBlog();

  const blog = data?.blog;

  const canEdit = Boolean(
    user &&
    blog &&
    (
      Number(user.id) === Number(blog.user_id) ||
      user.role === "admin"
    ),
  );

  const handleUpdateBlog = async (values) => {
    if (!canEdit || isPending) return;

    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("category_id", values.category);

    // Send media only when a new file is selected.
    if (values.media instanceof File) {
      formData.append("media", values.media);
    }

    try {
      const response = await saveBlog({
        id,
        formData,
      });

      showToast(
        response.message || "Blog updated successfully",
        "success",
      );

      navigate("/dashboard/my-blogs");
    } catch (requestError) {
      const message =
        requestError?.response?.status === 401
          ? "Your session has expired. Please log in again."
          : requestError?.response?.data?.message ||
          "Could not update your blog. Please try again.";

      showToast(message, "error");
    }
  };

  return (
    <Box>
      <Stack
        spacing={2}
        alignItems="flex-start"
        sx={{ mb: 4 }}
      >
        <Button
          component={Link}
          to="/dashboard/my-blogs"
          startIcon={<ArrowBackIcon />}
          disabled={isPending}
        >
          Back to My Blogs
        </Button>

        <Box>
          <Typography
            component="h1"
            variant="h4"
            sx={{
              fontWeight: 800,
              letterSpacing: "-0.03em",
            }}
          >
            Edit Blog
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 0.75 }}
          >
            Update your story, category, or image.
          </Typography>
        </Box>
      </Stack>

      {isLoading ? (
        <BlogDetailsSkeleton />
      ) : isError ? (
        <Alert severity="error">
          {error?.response?.data?.message || "Failed to load blog."}
        </Alert>
      ) : !blog ? (
        <Alert severity="info">Blog not found.</Alert>
      ) : !canEdit ? (
        <Alert severity="error">
          You can only edit your own blog.
        </Alert>
      ) : (
        <BlogForm
          key={blog.id}
          defaultValues={{
            title: blog.title ?? "",
            content: blog.content ?? "",
            category:
              blog.category_id == null
                ? ""
                : String(blog.category_id),
          }}
          existingMedia={
            blog.media_url
              ? {
                url: blog.media_url,
                type: blog.media_type || "image",
              }
              : null
          }
          submitLabel="Update Blog"
          onSubmit={handleUpdateBlog}
          submitting={isPending}
        />
      )}
    </Box>
  );
}

export default EditBlogPage;