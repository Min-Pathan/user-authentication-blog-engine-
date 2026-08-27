import {
  Box,
} from "@mui/material";
import Navbar from "./components/navigation/Navbar";
import HeroSection from "./components/home/HeroSection";
import CategoryFilter from "./components/home/CategoryFilter";

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
    </Box>
  );
}

export default App;