import { useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";

import {
  Avatar,
  Box,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import { Outlet } from "react-router";

import DashboardSidebar from "../components/dashboard/DashboardSidebar.jsx";

const SIDEBAR_WIDTH = 260;

function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeDrawer = () => {
    setMobileOpen(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F8FAFC",
        display: "flex",
      }}
    >
      {/* Desktop Sidebar */}
      <Box
        sx={{
          display: {
            xs: "none",
            md: "block",
          },

          width: SIDEBAR_WIDTH,
          flexShrink: 0,
        }}
      >
        <Box
          sx={{
            position: "fixed",
            width: SIDEBAR_WIDTH,
            height: "100vh",
          }}
        >
          <DashboardSidebar />
        </Box>
      </Box>

      {/* Mobile Drawer */}
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

      {/* Main Area */}
      <Box
        sx={{
          flexGrow: 1,
          minWidth: 0,
        }}
      >
        {/* Dashboard topbar */}
        <Box
          sx={{
            height: 72,
            px: {
              xs: 2,
              sm: 3,
              md: 4,
            },

            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",

            bgcolor: "background.paper",

            borderBottom: "1px solid",
            borderColor: "divider",

            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
          >
            <IconButton
              onClick={() =>
                setMobileOpen(true)
              }
              sx={{
                display: {
                  xs: "inline-flex",
                  md: "none",
                },
              }}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              sx={{
                fontWeight: 700,
              }}
            >
              Writer Dashboard
            </Typography>
          </Stack>

          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
          >
            <Box
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                },
                textAlign: "right",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                }}
              >
                Minaz
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
              >
                Writer
              </Typography>
            </Box>

            <Avatar
              sx={{
                width: 38,
                height: 38,
                bgcolor: "primary.main",
              }}
            >
              M
            </Avatar>
          </Stack>
        </Box>

        {/* Child Dashboard Pages */}
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
  );
}

export default DashboardLayout;