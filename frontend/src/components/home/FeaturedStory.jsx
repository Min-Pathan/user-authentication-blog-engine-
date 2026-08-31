import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

function FeaturedStory({ blog }) {
  const {
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
    <Box
      component="section"
      sx={{
        pb: {
          xs: 6,
          md: 9,
        },
      }}
    >
      <Container maxWidth="lg">
        <Typography
          component="h2"
          variant="h4"
          sx={{
            mb: 3,
            fontWeight: 800,
            letterSpacing: "-0.03em",
          }}
        >
          Featured Story
        </Typography>

        <Paper
          elevation={0}
          sx={{
            overflow: "hidden",
            border: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "1.15fr 1fr",
              },
            }}
          >
            {/* Media */}
            <Box
              sx={{
                minHeight: {
                  xs: 260,
                  md: 460,
                },

                bgcolor: "#F1F5F9",
                overflow: "hidden",
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
                      minHeight: "inherit",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <Box
                    component="img"
                    src={media_url}
                    alt={title}
                    sx={{
                      width: "100%",
                      height: "100%",
                      minHeight: "inherit",
                      objectFit: "cover",

                      transition: "transform 0.5s ease",

                      "&:hover": {
                        transform: "scale(1.02)",
                      },
                    }}
                  />
                )
              ) : (
                <Box
                  sx={{
                    minHeight: "inherit",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <Typography color="text.secondary">
                    No media available
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Content */}
            <Box
              sx={{
                p: {
                  xs: 3,
                  sm: 4,
                  md: 5,
                },

                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Stack
                direction="row"
                spacing={1}
                flexWrap="wrap"
                useFlexGap
                sx={{
                  mb: 2.5,
                }}
              >
                <Chip
                  label="Featured"
                  size="small"
                  color="primary"
                  sx={{
                    fontWeight: 600,
                  }}
                />

                <Chip
                  label={category}
                  size="small"
                  variant="outlined"
                  sx={{
                    fontWeight: 500,
                  }}
                />
              </Stack>

              <Typography
                component="h3"
                sx={{
                  fontSize: {
                    xs: "1.8rem",
                    sm: "2.25rem",
                    md: "2.6rem",
                  },

                  fontWeight: 800,
                  lineHeight: 1.15,
                  letterSpacing: "-0.035em",
                }}
              >
                {title}
              </Typography>

              <Typography
                color="text.secondary"
                sx={{
                  mt: 2,
                  lineHeight: 1.8,
                  fontSize: {
                    xs: "0.95rem",
                    md: "1.05rem",
                  },

                  display: "-webkit-box",
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {content}
              </Typography>

              {/* Author */}
              <Stack
                direction="row"
                spacing={1.25}
                alignItems="center"
                sx={{
                  mt: 3,
                }}
              >
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor: "primary.main",
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

              {/* Likes and comments */}
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  mt: 2.5,
                  color: "text.secondary",
                }}
              >
                <Stack
                  direction="row"
                  spacing={0.5}
                  alignItems="center"
                >
                  <FavoriteBorderIcon
                    sx={{
                      fontSize: 19,
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
                      fontSize: 19,
                    }}
                  />

                  <Typography variant="body2">
                    {comment_count ?? 0}
                  </Typography>
                </Stack>
              </Stack>

              <Button
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                disableElevation
                sx={{
                  mt: 3.5,
                  alignSelf: "flex-start",
                }}
              >
                Read article
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default FeaturedStory;