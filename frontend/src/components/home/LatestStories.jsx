import { Box, Button, Container, Stack, Typography } from "@mui/material"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BlogCard from "./BlogCard";

const LatestStories = ({ blogs }) => {
    return (
        <Box component="section"
            sx={{
                pb: {
                    xs: 6, md: 10
                }
            }}>
            <Container maxWidth="lg">
                <Stack direction={{
                    xs: "column", md: "row"
                }}
                    justifyContent="space-between"
                    alignItems={{
                        xs: "flex-start",
                        sm: "center",
                    }}
                    spacing={2}
                    sx={{
                        mb: 3,
                    }}
                >
                    <Box>
                        <Typography component="h2" variant="h4" sx={{ fontWeight: 800, letterSpacing: "-0.03rem" }}>
                            Latest Stories
                        </Typography>
                        <Typography
                            color="text.secondary"
                            sx={{
                                mt: 0.75,
                            }}
                        >
                            Fresh ideas, tutorials, and experiences from our community.
                        </Typography>
                    </Box>
                    <Button
                        variant="text"
                        endIcon={<ArrowForwardIcon />}
                        sx={{ px: 0 }}>
                        View all posts
                    </Button>
                </Stack>
                {/* blog grid */}
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

                        <BlogCard key={blog.id} blog={blog} />
                    ))}
                </Box>
            </Container>
        </Box>
    )
}

export default LatestStories
