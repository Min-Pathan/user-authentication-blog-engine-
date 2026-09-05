import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import {
    Avatar,
    Box,
    Button,
    Chip,
    Container,
    Divider,
    Stack,
    Typography,
} from "@mui/material";

import { Link, useParams } from "react-router";

import mockBlogs from "../mocks/blogs.js";
import { useState } from "react";
import CommentsSection from "../components/comments/CommentsSection.jsx";

function BlogDetailsPage() {
    const { id } = useParams();
    const [liked, setLiked] = useState(false);

    const blog = mockBlogs.find(
        (blog) => blog.id === Number(id),
    );

    if (!blog) {
        return (
            <Container
                maxWidth="md"
                sx={{
                    py: 10,
                    textAlign: "center",
                }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 800,
                    }}
                >
                    Blog not found
                </Typography>

                <Typography
                    color="text.secondary"
                    sx={{
                        mt: 2,
                    }}
                >
                    The article you're looking for doesn't exist.
                </Typography>

                <Button
                    component={Link}
                    to="/blogs"
                    variant="contained"
                    startIcon={<ArrowBackIcon />}
                    sx={{
                        mt: 4,
                    }}
                >
                    Back to blogs
                </Button>
            </Container>
        );
    }
    const displayLikeCount =
        (blog?.like_count ?? 0) +
        (liked ? 1 : 0);

    const handleLike = () => {
        setLiked((previous) => !previous);
    };

    const {
        title,
        content,
        category,
        username,
        created_at,
        media_url,
        media_type,
    } = blog;

    const formattedDate = new Date(
        created_at,
    ).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    const authorInitial =
        username?.charAt(0).toUpperCase() || "?";

    return (
        <Box
            component="main"
            sx={{
                bgcolor: "background.paper",
            }}
        >
            <Container
                maxWidth="md"
                sx={{
                    py: {
                        xs: 5,
                        md: 8,
                    },
                }}
            >
                <Stack
                    spacing={2}
                    alignItems="flex-start"
                    sx={{
                        mb: 3,
                    }}
                >
                    <Button
                        component={Link}
                        to="/blogs"
                        startIcon={<ArrowBackIcon />}
                        sx={{
                            px: 0,
                        }}
                    >
                        Back to blogs
                    </Button>

                    <Chip
                        label={category}
                        size="small"
                        sx={{
                            bgcolor: "#EFF6FF",
                            color: "primary.main",
                            fontWeight: 600,
                        }}
                    />
                </Stack>

                <Typography
                    component="h1"
                    sx={{
                        fontSize: {
                            xs: "2.3rem",
                            sm: "3rem",
                            md: "4rem",
                        },
                        fontWeight: 800,
                        lineHeight: 1.08,
                        letterSpacing: "-0.045em",
                    }}
                >
                    {title}
                </Typography>

                {/* Author + metadata */}
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
                    sx={{
                        mt: 4,
                    }}
                >
                    <Stack
                        direction="row"
                        spacing={1.25}
                        alignItems="center"
                    >
                        <Avatar
                            sx={{
                                bgcolor: "primary.main",
                                fontWeight: 600,
                            }}
                        >
                            {authorInitial}
                        </Avatar>

                        <Box>
                            <Typography
                                sx={{
                                    fontWeight: 600,
                                }}
                            >
                                {username}
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                {formattedDate}
                            </Typography>
                        </Box>
                    </Stack>

                    <Button
                        type="button"
                        onClick={handleLike}
                        startIcon={
                            liked ? (
                                <FavoriteIcon />
                            ) : (
                                <FavoriteBorderIcon />
                            )
                        }
                        color={liked ? "error" : "inherit"}
                        sx={{
                            minWidth: 0,
                            color: liked
                                ? "error.main"
                                : "text.secondary",
                        }}
                    >
                        {displayLikeCount}
                    </Button>
                </Stack>

                <Divider
                    sx={{
                        my: 4,
                    }}
                />

                {/* Blog media */}
                {media_url && (
                    <Box
                        sx={{
                            width: "100%",
                            overflow: "hidden",
                            borderRadius: 3,
                            bgcolor: "#F1F5F9",
                        }}
                    >
                        {media_type === "video" ? (
                            <Box
                                component="video"
                                src={media_url}
                                controls
                                sx={{
                                    display: "block",
                                    width: "100%",
                                    maxHeight: 600,
                                }}
                            />
                        ) : (
                            <Box
                                component="img"
                                src={media_url}
                                alt={title}
                                sx={{
                                    display: "block",
                                    width: "100%",
                                    maxHeight: 600,
                                    objectFit: "cover",
                                }}
                            />
                        )}
                    </Box>
                )}

                {/* Article content */}
                <Typography
                    component="div"
                    sx={{
                        mt: 5,
                        fontSize: {
                            xs: "1rem",
                            md: "1.1rem",
                        },
                        lineHeight: 1.9,
                        color: "text.primary",
                        whiteSpace: "pre-line",
                    }}
                >
                    {content}
                </Typography>

                <CommentsSection />
            </Container>
        </Box>
    );
}

export default BlogDetailsPage;