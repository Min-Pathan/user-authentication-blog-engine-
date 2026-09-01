import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router";

function BlogCard({ blog }) {
  const {
    id,
    title,
    content,
    category,
    username,
    created_at,
    media_url,
    media_type,
    like_count,
    comment_count,
  } = blog;

  const formattedDate = new Date(created_at).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  );

  const authorInitial =
    username?.charAt(0).toUpperCase() || "?";

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        border: "1px solid",
        borderColor: "divider",
        boxShadow: "none",

        transition:
          "transform 0.25s ease, box-shadow 0.25s ease",

        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 16px 40px rgba(15, 23, 42, 0.08)",
        },

        "&:hover .blog-card-image": {
          transform: "scale(1.03)",
        },
      }}
    >
      {/* Media */}
      <Box
        sx={{
          height: 220,
          overflow: "hidden",
          bgcolor: "#F1F5F9",
        }}
      >
        {media_url ? (
          media_type === "video" ? (
            <Box
              component="video"
              src={media_url}
              controls
              preload="metadata"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <CardMedia
              component="img"
              image={media_url}
              alt={title}
              className="blog-card-image"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",

                transition: "transform 0.4s ease",
              }}
            />
          )
        ) : (
          <Box
            sx={{
              height: "100%",
              display: "grid",
              placeItems: "center",
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
            >
              No media available
            </Typography>
          </Box>
        )}
      </Box>

      {/* Content */}
      <CardContent
        sx={{
          p: 2.5,
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,

          "&:last-child": {
            pb: 2.5,
          },
        }}
      >
        <Chip
          label={category}
          size="small"
          sx={{
            alignSelf: "flex-start",
            mb: 2,
            bgcolor: "#EFF6FF",
            color: "primary.main",
            fontWeight: 600,
          }}
        />

       <Typography
  component={Link}
  to={`/blogs/${id}`}
  variant="h6"
  sx={{
    color: "text.primary",
    textDecoration: "none",
    fontWeight: 700,
    lineHeight: 1.35,

    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",

    transition: "color 0.2s ease",

    "&:hover": {
      color: "primary.main",
    },
  }}
>
  {title}
</Typography>
        <Typography
          color="text.secondary"
          sx={{
            mt: 1.25,
            lineHeight: 1.7,
            fontSize: "0.95rem",

            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {content}
        </Typography>

        {/* Bottom metadata */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap={2}
          flexWrap="wrap"
          sx={{
            mt: "auto",
            pt: 3,
          }}
        >
          {/* Author */}
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
          >
            <Avatar
              sx={{
                width: 34,
                height: 34,
                bgcolor: "primary.main",
                fontSize: "0.9rem",
                fontWeight: 600,
              }}
            >
              {authorInitial}
            </Avatar>

            <Box>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                }}
              >
                {username}
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
              >
                {formattedDate}
              </Typography>
            </Box>
          </Stack>

          {/* Likes + Comments */}
          <Stack
            direction="row"
            spacing={1.5}
            color="text.secondary"
          >
            <Stack
              direction="row"
              spacing={0.5}
              alignItems="center"
            >
              <FavoriteBorderIcon
                sx={{
                  fontSize: 18,
                }}
              />

              <Typography variant="body2">
                {like_count ?? 0}
              </Typography>
            </Stack>

            <Stack
              direction="row"
              spacing={0.5}
              alignItems="center"
            >
              <ChatBubbleOutlineIcon
                sx={{
                  fontSize: 18,
                }}
              />

              <Typography variant="body2">
                {comment_count ?? 0}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default BlogCard;