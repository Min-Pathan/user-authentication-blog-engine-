import {
  Box,
} from "@mui/material";
import Navbar from "./components/navigation/Navbar";
import HeroSection from "./components/home/HeroSection";
import CategoryFilter from "./components/home/CategoryFilter";
import mockBlogs from "./mocks/blogs";
import LatestStories from "./components/home/LatestStories";
import FeaturedStory from "./components/home/FeaturedStory";

function App() {
    const featuredBlog = mockBlogs[0];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Navbar />
      <HeroSection />
      <CategoryFilter />
      <FeaturedStory blog={featuredBlog} />

     <LatestStories blogs={mockBlogs.slice(1)} />
    </Box>
  );
}

export default App;