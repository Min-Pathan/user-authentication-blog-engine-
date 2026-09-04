import { Box } from "@mui/material";
import { Outlet } from "react-router";

import Footer from "../components/navigation/Footer.jsx";
import Navbar from "../components/navigation/Navbar.jsx";

function MainLayout() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
      }}
    >
      <Navbar />

      <Box
        sx={{
          flexGrow: 1,
        }}
      >
        <Outlet />
      </Box>

      <Footer />
    </Box>
  );
}

export default MainLayout;