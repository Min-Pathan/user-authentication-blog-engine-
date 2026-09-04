import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

import {
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { Link } from "react-router";

import mockBlogs from "../../mocks/blogs.js";

const stats = [
  {
    label: "Total Blogs",
    value: 12,
    icon: <ArticleOutlinedIcon />,
  },
  {
    label: "Total Likes",
    value: 248,
    icon: <FavoriteBorderIcon />,
  },
  {
    label: "Comments",
    value: 67,
    icon: <ChatBubbleOutlineIcon />,
  },
  {
    label: "Total Views",
    value: "3.8K",
    icon: <VisibilityOutlinedIcon />,
  },
];

function DashboardPage() {
  const recentBlogs = mockBlogs.slice(0, 3);

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
            Dashboard
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 0.75 }}
          >
            Here's what's happening with your stories.
          </Typography>
        </Box>

        <Button
          component={Link}
          to="/dashboard/create"
          variant="contained"
          disableElevation
        >
          Create new blog
        </Button>
      </Stack>

      {/* Stats */}
      <Box
        sx={{
          display: "grid",

          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          },

          gap: 2.5,
        }}
      >
        {stats.map((stat) => (
          <Paper
            key={stat.label}
            elevation={0}
            sx={{
              p: 3,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {stat.label}
                </Typography>

                <Typography
                  variant="h4"
                  sx={{
                    mt: 1,
                    fontWeight: 800,
                  }}
                >
                  {stat.value}
                </Typography>
              </Box>

              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 2,
                  display: "grid",
                  placeItems: "center",
                  bgcolor: "#EFF6FF",
                  color: "primary.main",
                }}
              >
                {stat.icon}
              </Box>
            </Stack>
          </Paper>
        ))}
      </Box>

      {/* Recent Blogs */}
      <Paper
        elevation={0}
        sx={{
          mt: 4,
          border: "1px solid",
          borderColor: "divider",
          overflow: "hidden",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            px: 3,
            py: 2.5,
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700 }}
            >
              Recent Blogs
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Your recently published stories.
            </Typography>
          </Box>

          <Button
            component={Link}
            to="/dashboard/my-blogs"
          >
            View all
          </Button>
        </Stack>

        {recentBlogs.map((blog, index) => (
          <Stack
            key={blog.id}
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
            sx={{
              px: 3,
              py: 2.5,

              borderBottom:
                index !== recentBlogs.length - 1
                  ? "1px solid"
                  : "none",

              borderColor: "divider",
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontWeight: 600,
                }}
              >
                {blog.title}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                {new Date(
                  blog.created_at,
                ).toLocaleDateString()}
              </Typography>
            </Box>

            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
            >
              <Chip
                label={blog.category}
                size="small"
                sx={{
                  bgcolor: "#EFF6FF",
                  color: "primary.main",
                }}
              />

              <Typography
                variant="body2"
                color="text.secondary"
              >
                ♥ {blog.like_count ?? 0}
              </Typography>
            </Stack>
          </Stack>
        ))}
      </Paper>
    </Box>
  );
}

export default DashboardPage;