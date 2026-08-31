import { Box, Container, Pagination, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import mockBlogs from '../mocks/blogs';
import BlogFilters from '../components/blogs/BlogFilters';
import BlogGrid from '../components/blogs/BlogsGrid';

const BlogsPage = () => {
    const [search, seatSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const filterBlogs = mockBlogs.filter((blog) => {
        const searchValue = search.trim().toLowerCase();
        const matchedSearch = blog.title.toLowerCase().includes(searchValue) || 
            blog.content.toLowerCase().includes(searchValue) ||
            blog.username.toLowerCase().includes(searchValue);

        const matchedCategory = selectedCategory === 'All' || blog.category === selectedCategory

        return matchedCategory && matchedSearch;
    })
    return (
        <Box component="section"
            sx={{
                py: {
                    xs: 5, md: 8
                }
            }}>
            <Container maxWidth="lg"    >
                <Box sx={{ mb: 4 }}>
                    <Typography component="h1"
                        sx={{
                            fontSize: {
                                xs: '2.4em', md: '3.5em'
                            },
                            fontWeight: 800, letterSpacing: '-0.04em'
                        }}>
                        Explore Stories
                    </Typography>
                    <Typography
                        color="text.secondary"
                        sx={{
                            mt: 1.5,
                            maxWidth: 650,
                            lineHeight: 1.8,
                        }}
                    >
                        Discover articles, tutorials, experiences,
                        and ideas shared by our community.
                    </Typography>
                </Box>
                <BlogFilters search={search} onSearchChange={seatSearch} selectedCategory={selectedCategory} onCategorychange={setSelectedCategory} />
                {/* Result count */}
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mt: 4,
                        mb: 2,
                    }}
                >
                    {filterBlogs.length}{" "}
                    {filterBlogs.length === 1
                        ? "story"
                        : "stories"}{" "}
                    found
                </Typography>

                {/* {blogs} */}
                <BlogGrid blogs={filterBlogs} />

                {/* pagination  */}
                {filterBlogs.length > 0 && (
                    <Stack alignItems="center"
                        sx={{
                            mt: {
                                xs: 5,
                                md: 7,
                            },
                        }}>
                        <Pagination count={3} page={1} color='primary' shape='rounded' />
                    </Stack>
                )}
            </Container>
        </Box>
    )
}

export default BlogsPage
