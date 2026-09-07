import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

import {
  Box,
  Button,
  Divider,
  Stack,
} from "@mui/material";

import { NavLink } from "react-router";

const menuItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: <DashboardOutlinedIcon />,
  },
  {
    label: "My Blogs",
    path: "/dashboard/my-blogs",
    icon: <ArticleOutlinedIcon />,
  },
  {
    label: "Create Blog",
    path: "/dashboard/create",
    icon: <AddBoxOutlinedIcon />,
  },
  {
    label: "Profile",
    path: "/dashboard/profile",
    icon: <PersonOutlineIcon />,
  },
];

function DashboardSidebar({ onNavigate }) {
  return (
    <Box
      sx={{
        width: 260,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
     

      {/* Navigation */}
      <Stack
        spacing={0.75}
        sx={{
          p: 2,
          flexGrow: 1,
        }}
      >
        {menuItems.map((item) => (
          <Button
            key={item.path}
            component={NavLink}
            to={item.path}
            onClick={onNavigate}
            startIcon={item.icon}
            sx={{
              justifyContent: "flex-start",
              px: 2,
              py: 1.3,
              color: "text.secondary",
              fontWeight: 500,

              "&.active": {
                bgcolor: "#EFF6FF",
                color: "primary.main",
                fontWeight: 700,
              },

              "&:hover": {
                bgcolor: "#F8FAFC",
              },
            }}
          >
            {item.label}
          </Button>
        ))}
      </Stack>

      <Divider />

      {/* Logout - UI only for now */}
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          startIcon={<LogoutOutlinedIcon />}
          sx={{
            justifyContent: "flex-start",
            px: 2,
            py: 1.2,
            color: "error.main",
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
}

export default DashboardSidebar;