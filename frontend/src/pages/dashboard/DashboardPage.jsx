import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import {
  Box,
  Button,
  Chip,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

import { Link } from "react-router";
import useDashboard from "../../features/dashboard/useDashboard.js";

function DashboardPage() {
  const {
    data,
    isLoading,
    isError,
    isFetching,
    error,
    refetch,
  } = useDashboard();

  const stats = [
    {
      label: "Total Blogs",
      value: data?.stats.totalBlogs ?? 0,
      icon: <ArticleOutlinedIcon />,
    },
    {
      label: "Likes Received",
      value: data?.stats.totalLikes ?? 0,
      icon: <FavoriteBorderIcon />,
    },
    {
      label: "Comments Received",
      value: data?.stats.totalComments ?? 0,
      icon: <ChatBubbleOutlineIcon />,
    },
  ];

  const recentBlogs = data?.recentBlogs ?? [];

  return (
    <Box>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
        sx={{ mb: 4 }}
      >
        <Box>
          <Typography
            component="h1"
            variant="h4"
            sx={{ fontWeight: 800, letterSpacing: "-0.03em" }}
          >
            Dashboard
          </Typography>

          <Typography color="text.secondary" sx={{ mt: 0.75 }}>
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

      {isLoading ? (
        <Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(3, 1fr)",
              },
              gap: 2.5,
            }}
          >
            {[1, 2, 3].map((item) => (
              <Skeleton
                key={item}
                variant="rounded"
                height={140}
              />
            ))}
          </Box>

          <Skeleton
            variant="rounded"
            height={300}
            sx={{ mt: 4 }}
          />
        </Box>
      ) : isError && !data ? (
        error?.response?.status === 401 ? null : (
          <Box sx={{ py: 6, textAlign: "center" }}>
            <Typography color="text.secondary">
              Could not load your dashboard.
            </Typography>

            <Button
              onClick={() => refetch()}
              disabled={isFetching}
              sx={{ mt: 1 }}
            >
              {isFetching ? "Retrying..." : "Try again"}
            </Button>
          </Box>
        )
      ) : data ? (
        <>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(3, 1fr)",
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
                  spacing={1}
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
                      sx={{ mt: 1, fontWeight: 800 }}
                    >
                      {stat.value}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      flexShrink: 0,
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
              spacing={2}
              sx={{
                px: 3,
                py: 2.5,
                borderBottom: "1px solid",
                borderColor: "divider",
              }}
            >
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Recent Blogs
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Your recently published stories.
                </Typography>
              </Box>

              <Button
                component={Link}
                to="/dashboard/my-blogs"
                sx={{ flexShrink: 0 }}
              >
                View all
              </Button>
            </Stack>

            {recentBlogs.length === 0 ? (
              <Box sx={{ p: 5, textAlign: "center" }}>
                <Typography sx={{ fontWeight: 600 }}>
                  No blogs yet
                </Typography>

                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  Create your first blog to get started.
                </Typography>
              </Box>
            ) : (
              recentBlogs.map((blog, index) => (
                <Stack
                  key={blog.id}
                  direction={{ xs: "column", sm: "row" }}
                  justifyContent="space-between"
                  alignItems={{ xs: "flex-start", sm: "center" }}
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
                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      component={Link}
                      to={`/blogs/${blog.id}`}
                      sx={{
                        fontWeight: 600,
                        color: "text.primary",
                        textDecoration: "none",
                        overflowWrap: "anywhere",
                        "&:hover": { color: "primary.main" },
                      }}
                    >
                      {blog.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 0.5 }}
                    >
                      {new Date(blog.created_at).toLocaleDateString()}
                    </Typography>
                  </Box>

                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ flexWrap: "wrap", rowGap: 1 }}
                  >
                    <Chip
                      label={blog.category || "Uncategorized"}
                      size="small"
                      sx={{
                        bgcolor: "#EFF6FF",
                        color: "primary.main",
                      }}
                    />

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ whiteSpace: "nowrap" }}
                    >
                      ♥ {blog.like_count}
                    </Typography>

                    <Button
                      component={Link}
                      to={`/dashboard/blogs/${blog.id}/edit`}
                      size="small"
                    >
                      Edit
                    </Button>
                  </Stack>
                </Stack>
              ))
            )}
          </Paper>
        </>
      ) : null}
    </Box>
  );
}

export default DashboardPage;