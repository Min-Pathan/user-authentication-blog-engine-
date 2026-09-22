import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import {
    Alert,
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
import CommentsSection from "../components/comments/CommentsSection.jsx";
import BlogDetailsSkeleton from "../components/common/BlogDetailsSkeleton.jsx";
import useBlog from "../features/blogs/queries/useBlog.js";
import LikeButton from "../components/blogs/LikeButton.jsx";

function BlogDetailsPage() {
    const { id } = useParams();
    const { data, isLoading, isError, error } = useBlog(id);
    const blog = data?.blog;

    if (isLoading) {
        return (
            <Container
                maxWidth="md"
                sx={{
                    py: {
                        xs: 4,
                        md: 7,
                    },
                }}
            >
                <BlogDetailsSkeleton />
            </Container>
        );
    }

    const isNotFound = error?.response?.status === 404;

    if (isError && !isNotFound) {
        return (
            <Container maxWidth="md" sx={{ py: 8 }}>
                <Alert severity="error">
                    {error?.response?.data?.message ||
                        "Failed to load blog."}
                </Alert>
            </Container>
        );
    }

    if (isNotFound || !blog) {
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

                    <LikeButton
                        key={blog.id}
                        blogId={blog.id}
                        initialCount={blog.like_count}
                    />
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

                <CommentsSection blogId={blog.id} />
            </Container>
        </Box>
    );
}

export default BlogDetailsPage;
