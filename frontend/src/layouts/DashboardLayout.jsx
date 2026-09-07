import { useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";

import {
  Box,
  Drawer,
  IconButton,
  Typography,
} from "@mui/material";

import { Outlet } from "react-router";

import DashboardSidebar from "../components/dashboard/DashboardSidebar.jsx";
import Navbar from "../components/navigation/Navbar.jsx";

const SIDEBAR_WIDTH = 260;

function DashboardLayout() {
  const [mobileOpen, setMobileOpen] =
    useState(false);

  const closeDrawer = () => {
    setMobileOpen(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F8FAFC",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Main website navbar */}
      <Navbar />

      {/* Dashboard area */}
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          minWidth: 0,
        }}
      >
        {/* Desktop sidebar */}
        <Box
          sx={{
            width: SIDEBAR_WIDTH,
            flexShrink: 0,

            display: {
              xs: "none",
              md: "block",
            },
          }}
        >
          <DashboardSidebar />
        </Box>

        {/* Mobile sidebar drawer */}
        <Drawer
          open={mobileOpen}
          onClose={closeDrawer}
          sx={{
            display: {
              xs: "block",
              md: "none",
            },

            "& .MuiDrawer-paper": {
              width: SIDEBAR_WIDTH,
            },
          }}
        >
          <DashboardSidebar
            onNavigate={closeDrawer}
          />
        </Drawer>

        {/* Dashboard content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            minWidth: 0,
          }}
        >
          {/* Mobile dashboard menu */}
          <Box
            sx={{
              display: {
                xs: "flex",
                md: "none",
              },

              alignItems: "center",
              gap: 1,

              px: 2,
              py: 1.5,

              bgcolor: "background.paper",

              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          >
            <IconButton
              onClick={() =>
                setMobileOpen(true)
              }
              aria-label="Open dashboard menu"
            >
              <MenuIcon />
            </IconButton>

            <Typography
              sx={{
                fontWeight: 600,
              }}
            >
              Dashboard Menu
            </Typography>
          </Box>

          <Box
            sx={{
              p: {
                xs: 2,
                sm: 3,
                md: 4,
              },
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default DashboardLayout;