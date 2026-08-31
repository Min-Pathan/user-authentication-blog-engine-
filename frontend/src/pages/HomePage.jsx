import { Box } from '@mui/material';
import HeroSection from '../components/home/HeroSection';
import CategoryFilter from '../components/home/CategoryFilter';
import FeaturedStory from '../components/home/FeaturedStory';
import LatestStories from '../components/home/LatestStories';
import mockBlogs from '../mocks/blogs';

const HomePage = () => {
    const featuredBlog = mockBlogs[0];

    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "background.default",
            }}
        >
            <HeroSection />
            <CategoryFilter />
            <FeaturedStory blog={featuredBlog} />

            <LatestStories blogs={mockBlogs.slice(1)} />
        </Box>
    );
}

export default HomePage
