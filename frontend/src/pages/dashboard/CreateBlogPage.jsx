
import {
  Box,
  Typography,
} from "@mui/material";

import BlogForm from "../../components/blogs/BlogForm.jsx";

function CreateBlogPage() {
  const handleCreateBlog = async (
    data,
  ) => {
    console.log(
      "Create blog:",
      data,
    );

    if (data.media) {
      console.log(
        "Selected file:",
        data.media,
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
      />
    </Box>
  );
}

export default CreateBlogPage;