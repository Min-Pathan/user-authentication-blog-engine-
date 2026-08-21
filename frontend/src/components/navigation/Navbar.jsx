import { useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import {
  AppBar,
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
} from "@mui/material";

const navItems = [
  "Home",
  "Blogs",
  "Categories",
  "About",
  "Contact",
];

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

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
        <Container maxWidth="lg">
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
                  key={item}
                  color="inherit"
                  sx={{
                    color:
                      item === "Home"
                        ? "primary.main"
                        : "text.secondary",

                    fontWeight:
                      item === "Home"
                        ? 600
                        : 500,

                    "&:hover": {
                      color: "primary.main",
                      bgcolor: "transparent",
                    },
                  }}
                >
                  {item}
                </Button>
              ))}
            </Stack>

            {/* Push right-side content */}
            <Box sx={{ flexGrow: 1 }} />

            {/* Desktop Auth Buttons */}
            <Stack
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
                sx={{
                  color: "text.primary",
                }}
              >
                Login
              </Button>

              <Button
                variant="contained"
                disableElevation
              >
                Register
              </Button>
            </Stack>

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
                key={item}
                onClick={handleCloseDrawer}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,

                  color:
                    item === "Home"
                      ? "primary.main"
                      : "text.primary",

                  "&:hover": {
                    bgcolor: "action.hover",
                    color: "primary.main",
                  },
                }}
              >
                <ListItemText
                  primary={item}
                  primaryTypographyProps={{
                    fontWeight:
                      item === "Home"
                        ? 600
                        : 500,
                  }}
                />
              </ListItemButton>
            ))}
          </List>

          <Divider
            sx={{
              my: 2,
            }}
          />

          {/* Mobile Auth Buttons */}
          <Stack spacing={1.5}>
            <Button
              variant="outlined"
              fullWidth
            >
              Login
            </Button>

            <Button
              variant="contained"
              fullWidth
              disableElevation
            >
              Register
            </Button>
          </Stack>
        </Box>
      </Drawer>
    </>
  );
}

export default Navbar;