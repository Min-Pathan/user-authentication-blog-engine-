import { Link, NavLink, useNavigate } from "react-router";
import { useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
  MenuItem,
  Menu
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { clearAuth } from "../../features/auth/authStorage";
import { clearCredentials } from "../../features/auth/authSlice";

const navItems = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Blogs",
    path: "/blogs",
  },
  {
    label: "About",
    path: "/about",
  },
  {
    label: "Contact",
    path: "/contact",
  },
];

const accountMenuItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: DashboardOutlinedIcon,
  },
  {
    label: "My Blogs",
    path: "/dashboard/my-blogs",
    icon: ArticleOutlinedIcon,
  },
  {
    label: "Create Blog",
    path: "/dashboard/create",
    icon: AddBoxOutlinedIcon,
  },
  {
    label: "Profile",
    path: "/dashboard/profile",
    icon: PersonOutlineIcon,
  },
];

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth)
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const profileOpen = Boolean(profileAnchorEl);

  const userInitial = user?.username?.charAt(0).toUpperCase() || "U";

  const handleProfileOpen = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setProfileAnchorEl(null);
  };
  const handleLogout = () => {
    clearAuth();
    dispatch(clearCredentials())
    setDrawerOpen(false);

    navigate("/login")
  }

  const handleOpenDrawer = () => {
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        sx={{
          bgcolor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              minHeight: 72,
            }}
          >
            {/* Logo */}
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                fontWeight: 800,
                color: "text.primary",
                letterSpacing: "-0.03em",
                textDecoration: "none",
              }}
            >
              Blogger
              <Box
                component="span"
                sx={{
                  color: "primary.main",
                }}
              >
                .
              </Box>
            </Typography>

            {/* Desktop Navigation */}
            <Stack
              direction="row"
              spacing={1}
              sx={{
                ml: 6,

                display: {
                  xs: "none",
                  md: "flex",
                },
              }}
            >
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  component={NavLink}
                  to={item.path}
                  color="inherit"
                  sx={{
                    color: "text.secondary",
                    fontWeight: 500,

                    "&.active": {
                      color: "primary.main",
                      fontWeight: 600,
                    },

                    "&:hover": {
                      color: "primary.main",
                      bgcolor: "transparent",
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Stack>

            {/* Push right-side content */}
            <Box sx={{ flexGrow: 1 }} />

            {/* Desktop Auth Buttons */}
            {isAuthenticated ? (
              <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
              >
                <Button
                  component={NavLink}
                  to="/dashboard/create"
                  variant="contained"
                  disableElevation
                  startIcon={<EditOutlinedIcon />}
                  sx={{
                    display: {
                      xs: "none",
                      md: "inline-flex",
                    },
                  }}
                >
                  Write
                </Button>

                <IconButton
                  onClick={handleProfileOpen}
                  aria-label="Open account menu"
                  aria-controls={profileOpen ? "profile-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={profileOpen ? "true" : undefined}
                >
                  <Avatar
                    sx={{
                      width: 34,
                      height: 34,
                      bgcolor: "primary.main",
                      fontSize: "0.9rem",
                    }}
                  >
                    {userInitial}
                  </Avatar>
                </IconButton>

                <Menu
                  id="profile-menu"
                  anchorEl={profileAnchorEl}
                  open={profileOpen}
                  onClose={handleProfileClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  {/* User header */}
                  <Box sx={{ px: 2, py: 1.25 }}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Avatar
                        sx={{
                          width: 36,
                          height: 36,
                          bgcolor: "primary.main",
                          fontSize: "0.9rem",
                        }}
                      >
                        {userInitial}
                      </Avatar>

                      <Box sx={{ minWidth: 0 }}>
                        <Typography sx={{ fontWeight: 600 }} noWrap>
                          {user?.username || "User"}
                        </Typography>

                        {user?.email && (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            noWrap
                          >
                            {user.email}
                          </Typography>
                        )}
                      </Box>
                    </Stack>
                  </Box>

                  <Divider sx={{ my: 0.5 }} />

                  {accountMenuItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <MenuItem
                        key={item.path}
                        component={NavLink}
                        to={item.path}
                        onClick={handleProfileClose}
                      >
                        <ListItemIcon>
                          <Icon fontSize="small" />
                        </ListItemIcon>
                        {item.label}
                      </MenuItem>
                    );
                  })}

                  <Divider sx={{ my: 0.5 }} />

                  <MenuItem
                    onClick={() => {
                      handleProfileClose();
                      handleLogout();
                    }}
                    sx={{ color: "error.main" }}
                  >
                    <ListItemIcon>
                      <LogoutOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </Stack>

            ) :
              (<Stack
                direction="row"
                spacing={1.5}
                sx={{
                  display: {
                    xs: "none",
                    md: "flex",
                  },
                }}
              >
                <Button
                  variant="text"
                  component={NavLink}
                  to="/login"
                  sx={{
                    color: "text.primary",
                  }}
                >
                  Login
                </Button>

                <Button
                  variant="contained"
                  disableElevation
                  component={NavLink}
                  to="/register"
                >
                  Register
                </Button>
              </Stack>)}

            {/* Mobile Menu Button */}
            <IconButton
              onClick={handleOpenDrawer}
              aria-label="open navigation menu"
              sx={{
                display: {
                  xs: "flex",
                  md: "none",
                },

                color: "text.primary",
              }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleCloseDrawer}
        PaperProps={{
          sx: {
            width: {
              xs: "85%",
              sm: 360,
            },

            maxWidth: 360,
          },
        }}
      >
        <Box
          sx={{
            p: 2.5,
          }}
        >
          {/* Drawer Header */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              variant="h6"
              component={Link}
              to="/"
              onClick={handleCloseDrawer}
              sx={{
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "text.primary",
                textDecoration: "none",
              }}
            >
              Blogger
              <Box
                component="span"
                sx={{
                  color: "primary.main",
                }}
              >
                .
              </Box>
            </Typography>

            <IconButton
              onClick={handleCloseDrawer}
              aria-label="close navigation menu"
            >
              <CloseIcon />
            </IconButton>
          </Stack>

          <Divider
            sx={{
              my: 2,
            }}
          />

          {/* User header */}
          {isAuthenticated && (
            <>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor: "primary.main",
                    fontWeight: 600,
                  }}
                >
                  {userInitial}
                </Avatar>

                <Box sx={{ minWidth: 0 }}>
                  <Typography sx={{ fontWeight: 600 }} noWrap>
                    {user?.username || "User"}
                  </Typography>

                  {user?.email && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      noWrap
                    >
                      {user.email}
                    </Typography>
                  )}
                </Box>
              </Stack>

              <Divider sx={{ my: 2 }} />
            </>
          )}

          {/* Mobile Navigation */}
          <List disablePadding>
            {navItems.map((item) => (
              <ListItemButton
                key={item.path}
                component={NavLink}
                to={item.path}
                onClick={handleCloseDrawer}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  color: "text.primary",

                  "&.active": {
                    bgcolor: "#EFF6FF",
                    color: "primary.main",
                  },

                  "&:hover": {
                    bgcolor: "action.hover",
                    color: "primary.main",
                  },
                }}
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: 500,
                  }}
                />
              </ListItemButton>
            ))}
          </List>

          {isAuthenticated && (
            <>
              <Divider sx={{ my: 2 }} />

              {/* Account Navigation */}
              <List disablePadding>
                {accountMenuItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <ListItemButton
                      key={item.path}
                      component={NavLink}
                      to={item.path}
                      onClick={handleCloseDrawer}
                      sx={{
                        borderRadius: 2,
                        mb: 0.5,
                        color: "text.primary",

                        "&.active": {
                          bgcolor: "#EFF6FF",
                          color: "primary.main",
                        },

                        "&:hover": {
                          bgcolor: "action.hover",
                          color: "primary.main",
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 36,
                          color: "inherit",
                        }}
                      >
                        <Icon fontSize="small" />
                      </ListItemIcon>

                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{
                          fontWeight: 500,
                        }}
                      />
                    </ListItemButton>
                  );
                })}
              </List>

              <Button
                color="error"
                fullWidth
                startIcon={<LogoutOutlinedIcon />}
                onClick={handleLogout}
                sx={{
                  justifyContent: "flex-start",
                  mt: 1,
                }}
              >
                Logout
              </Button>
            </>
          )}

          {!isAuthenticated && (
            <>
              <Divider sx={{ my: 2 }} />

              <Stack spacing={1}>
                <Button
                  component={NavLink}
                  to="/login"
                  onClick={() =>
                    setDrawerOpen(false)
                  }
                  fullWidth
                >
                  Login
                </Button>

                <Button
                  component={NavLink}
                  to="/register"
                  onClick={() =>
                    setDrawerOpen(false)
                  }
                  variant="contained"
                  fullWidth
                >
                  Register
                </Button>
              </Stack>
            </>
          )}
        </Box>
      </Drawer>
    </>
  );
}

export default Navbar;
