import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import {
  Box,
  Button,
  Typography,
} from "@mui/material";

import BlogForm from "../../components/blogs/BlogForm.jsx";
import { Link } from "react-router";

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
      sx={{
        maxWidth: 900,
        mx: "auto",
      }}
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