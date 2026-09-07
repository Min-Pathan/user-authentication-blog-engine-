import { useEffect } from "react";
import { Box } from '@mui/material';
import HeroSection from '../components/home/HeroSection';
import CategoryFilter from '../components/home/CategoryFilter';
import FeaturedStory from '../components/home/FeaturedStory';
import LatestStories from '../components/home/LatestStories';
import mockBlogs from '../mocks/blogs';
import axiosInstance from "../api/axiosInstance.js";

const HomePage = () => {

    useEffect(() => {
        const checkBackendConnection = async () => {
            try {
                const response = await axiosInstance.get("/");
                console.log("Backend connected", response.data)
            }
            catch (error) {
                console.error(
                    "Backend connection failed:",
                    error,
                );
            }
        }
        checkBackendConnection()
    }, [])
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
