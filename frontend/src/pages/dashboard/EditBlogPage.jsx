import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Button,
  Typography,
} from "@mui/material";

import {
  Link,
  useParams,
} from "react-router";

import BlogForm from "../../components/blogs/BlogForm.jsx";

import mockBlogs from "../../mocks/blogs.js";

function EditBlogPage() {
  const { id } = useParams();

  const blog = mockBlogs.find(
    (blogItem) =>
      blogItem.id === Number(id),
  );

  if (!blog) {
    return (
      <Box
        sx={{
          py: 8,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
          }}
        >
          Blog not found
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mt: 1.5 }}
        >
          The blog you're trying to edit
          doesn't exist.
        </Typography>

        <Button
          component={Link}
          to="/dashboard/my-blogs"
          variant="contained"
          sx={{ mt: 3 }}
        >
          Back to My Blogs
        </Button>
      </Box>
    );
  }

  const defaultValues = {
    title: blog.title,
    content: blog.content,
    category: blog.category,
  };

  const existingMedia =
    blog.media_url
      ? {
          url: blog.media_url,
          type: blog.media_type,
        }
      : null;

  const handleUpdateBlog = async (
    data,
  ) => {
    console.log(
      "Update blog:",
      id,
      data,
    );

    if (data.media) {
      console.log(
        "Replacement media:",
        data.media,
      );
    }
  };

  return (
    <Box
     
    >
      <Box sx={{ mb: 4 }}>
        <Button
        component={Link}
        to="/dashboard/my-blogs"
        startIcon={<ArrowBackIcon/>}
        sx={{
          mb:3, px:2
        }}>
          Back
        </Button>
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
          sx={{
            mt: 0.75,
          }}
        >
          Update your story and its media.
        </Typography>
      </Box>

      <BlogForm
        defaultValues={
          defaultValues
        }
        existingMedia={
          existingMedia
        }
        submitLabel="Update Blog"
        onSubmit={
          handleUpdateBlog
        }
      />
    </Box>
  );
}

export default EditBlogPage;