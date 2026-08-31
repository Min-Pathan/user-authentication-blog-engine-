import {
  Box,
  Paper,
  Typography,
} from "@mui/material";

import BlogCard from "../home/BlogCard.jsx";

function BlogGrid({ blogs }) {
  if (blogs.length === 0) {
    return (
      <Paper
        elevation={0}
        sx={{
          py: 8,
          px: 3,
          textAlign: "center",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
          }}
        >
          No blogs found
        </Typography>

        <Typography
          color="text.secondary"
          sx={{
            mt: 1,
          }}
        >
          Try changing your search or category.
        </Typography>
      </Paper>
    );
  }

  return (
    <Box
      sx={{
        display: "grid",

        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, minmax(0, 1fr))",
          md: "repeat(3, minmax(0, 1fr))",
        },

        gap: {
          xs: 2,
          md: 3,
        },
      }}
    >
      {blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          blog={blog}
        />
      ))}
    </Box>
  );
}

export default BlogGrid;