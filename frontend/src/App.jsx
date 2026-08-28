import {
  Box,
} from "@mui/material";
import Navbar from "./components/navigation/Navbar";
import HeroSection from "./components/home/HeroSection";
import CategoryFilter from "./components/home/CategoryFilter";
import mockBlogs from "./mocks/blogs";
import LatestStories from "./components/home/LatestStories";

function App() {
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
      <LatestStories blogs={mockBlogs} />
    </Box>
  );
}

export default App;