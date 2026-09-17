import { NavLink, useNavigate } from "react-router";
import { useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

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

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth)
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);


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

  const handleProfileOpen = () => {
    setProfileOpen(true)
  };

  const handleProfileClose = () => {
    setProfileOpen(false)
  }

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
              sx={{
                fontWeight: 800,
                color: "text.primary",
                letterSpacing: "-0.03em",
                cursor: "pointer",
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

                <Button component={NavLink}
                  to="/dashboard" color="inherit"
                  sx={{
                    color: "text.secondary",
                    fontWeight: 600,

                    "&.active": {
                      color: "primary.main",
                    },

                    "&:hover": {
                      color: "primary.main",
                      bgcolor: "transparent",
                    },
                  }}>
                  Dashboard
                </Button>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                >
                  <Avatar
                    sx={{
                      width: 34,
                      height: 34,
                      bgcolor: "primary.main",
                      fontSize: "0.9rem",
                    }}
                    onClick={handleProfileOpen}
                  >
                    {user?.username
                      ?.charAt(0)
                      .toUpperCase() || "U"}
                  </Avatar>

                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                    }}
                  >
                    {user?.username}
                  </Typography>
                </Stack>

                {profileOpen && (
                  <Menu
                    anchorEl={profileOpen}
                    open={Boolean(profileOpen)}
                    onClose={handleProfileClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center'
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: "center"
                    }}
                    sx={{
                      pointerEvents: 'none',
                      '& .MuiMenu-paper': {
                        pointerEvents: 'auto',
                      },
                    }}
                  >
                    <MenuItem>
                      Profile
                    </MenuItem>
                    <MenuItem>
                      <Button
                        color="inherit"
                        onClick={handleLogout}
                        sx={{
                          color: "text.secondary",

                          "&:hover": {
                            color: "error.main",
                            bgcolor: "transparent",
                          },
                        }}
                      >
                        Logout
                      </Button>
                    </MenuItem>
                  </Menu>
                )}
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
              sx={{
                fontWeight: 800,
                letterSpacing: "-0.03em",
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

          <Divider sx={{ my: 2 }} />

          {isAuthenticated ? (
            <Stack spacing={1}>
              <Button
                component={NavLink}
                to="/dashboard"
                onClick={() =>
                  setDrawerOpen(false)
                }
                fullWidth
                sx={{
                  justifyContent: "flex-start",
                }}
              >
                Dashboard
              </Button>

              <Button
                color="error"
                onClick={handleLogout}
                fullWidth
                sx={{
                  justifyContent: "flex-start",
                }}
              >
                Logout
              </Button>
            </Stack>
          ) : (
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
          )}
        </Box>
      </Drawer>
    </>
  );
}

export default Navbar;