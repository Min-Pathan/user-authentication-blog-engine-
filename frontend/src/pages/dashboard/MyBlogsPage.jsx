import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { useState } from "react";

import { Link } from "react-router";

import mockBlogs from "../../mocks/blogs.js";

function MyBlogsPage() {
  // Temporary until GET /api/blogs/my-blogs integration
  const [myBlogs, setMyBlogs] = useState(() =>
    mockBlogs.slice(0, 4),
  );

  const [blogToDelete, setBlogToDelete] =
    useState(null);

  const handleDeleteClick = (blog) => {
    setBlogToDelete(blog);
  };

  const handleCloseDelete = () => {
    setBlogToDelete(null);
  };

  const handleConfirmDelete = () => {
    setMyBlogs((previousBlogs) =>
      previousBlogs.filter(
        (blog) =>
          blog.id !== blogToDelete.id,
      ),
    );

    setBlogToDelete(null);
  };

  return (
    <Box>
      {/* Heading */}
      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        justifyContent="space-between"
        alignItems={{
          xs: "flex-start",
          sm: "center",
        }}
        spacing={2}
        sx={{ mb: 4 }}
      >
        <Box>
          <Typography
            component="h1"
            variant="h4"
            sx={{
              fontWeight: 800,
              letterSpacing: "-0.03em",
            }}
          >
            My Blogs
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 0.75 }}
          >
            Manage, edit, and review your published stories.
          </Typography>
        </Box>

        <Button
          component={Link}
          to="/dashboard/create"
          variant="contained"
          disableElevation
        >
          Create Blog
        </Button>
      </Stack>

      {myBlogs.length > 0 ? (
        <Stack spacing={2}>
          {myBlogs.map((blog) => (
            <Paper
              key={blog.id}
              elevation={0}
              sx={{
                p: {
                  xs: 2,
                  sm: 2.5,
                },

                border: "1px solid",
                borderColor: "divider",

                transition:
                  "border-color 0.2s ease",

                "&:hover": {
                  borderColor: "primary.light",
                },
              }}
            >
              <Stack
                direction={{
                  xs: "column",
                  md: "row",
                }}
                spacing={2.5}
                alignItems={{
                  xs: "stretch",
                  md: "center",
                }}
              >
                {/* Image */}
                {blog.media_url && (
                  <Box
                    component="img"
                    src={blog.media_url}
                    alt={blog.title}
                    sx={{
                      width: {
                        xs: "100%",
                        md: 150,
                      },

                      height: {
                        xs: 180,
                        md: 100,
                      },

                      objectFit: "cover",
                      borderRadius: 2,
                      flexShrink: 0,
                    }}
                  />
                )}

                {/* Info */}
                <Box
                  sx={{
                    flexGrow: 1,
                    minWidth: 0,
                  }}
                >
                  <Chip
                    label={blog.category}
                    size="small"
                    sx={{
                      mb: 1,
                      bgcolor: "#EFF6FF",
                      color: "primary.main",
                    }}
                  />

                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: "1.05rem",
                    }}
                  >
                    {blog.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mt: 0.75,

                      display: "-webkit-box",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient:
                        "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {blog.content}
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{ mt: 1.5 }}
                  >
                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      ♥ {blog.like_count ?? 0} likes
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      💬 {blog.comment_count ?? 0} comments
                    </Typography>
                  </Stack>
                </Box>

                {/* Actions */}
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    alignSelf: {
                      xs: "flex-end",
                      md: "center",
                    },
                  }}
                >
                  <IconButton
                    component={Link}
                    to={`/dashboard/blogs/${blog.id}/edit`}
                    aria-label="Edit blog"
                    sx={{
                      border: "1px solid",
                      borderColor: "divider",

                      "&:hover": {
                        color: "primary.main",
                        borderColor:
                          "primary.main",
                      },
                    }}
                  >
                    <EditOutlinedIcon />
                  </IconButton>

                  <IconButton
                    aria-label="Delete blog"
                    onClick={() =>
                      handleDeleteClick(blog)
                    }
                    sx={{
                      border: "1px solid",
                      borderColor: "divider",

                      "&:hover": {
                        color: "error.main",
                        borderColor:
                          "error.main",
                        bgcolor: "#FEF2F2",
                      },
                    }}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </Stack>
              </Stack>
            </Paper>
          ))}
        </Stack>
      ) : (
        <Paper
          elevation={0}
          sx={{
            p: 6,
            textAlign: "center",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 700 }}
          >
            No blogs yet
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            Create your first blog and start sharing your ideas.
          </Typography>

          <Button
            component={Link}
            to="/dashboard/create"
            variant="contained"
            sx={{ mt: 3 }}
          >
            Create Blog
          </Button>
        </Paper>
      )}
      <Dialog
        open={Boolean(blogToDelete)}
        onClose={handleCloseDelete}
        maxWidth="xs"
        fullWidth>
        <DialogTitle
          sx={{
            fontWeight: 700,
          }}>
          Delete blog?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete{" "}
            <strong>
              {blogToDelete?.title}
            </strong>
            ?
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            px: 3,
            pb: 3,
          }}>
          <Button
            color="inherit"
            onClick={handleCloseDelete}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            color="error"
            disableElevation
            onClick={handleConfirmDelete}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default MyBlogsPage;