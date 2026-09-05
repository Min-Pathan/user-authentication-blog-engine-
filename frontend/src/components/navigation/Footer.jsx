import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import { Link } from "react-router";

const exploreLinks = [
  { label: "Home", path: "/" },
  { label: "Blogs", path: "/blogs" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
  { label: 'Dashboard', path:'/dashboard'}
];

const accountLinks = [
  { label: "Login", path: "/login" },
  { label: "Register", path: "/register" },
];

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        bgcolor: "#F1F5F9",
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      {/* Main footer */}
      <Container
        maxWidth="lg"
        sx={{
          py: {
            xs: 6,
            md: 8,
          },
        }}
      >
        <Box
          sx={{
            display: "grid",

            gridTemplateColumns: {
              xs: "1fr",
              sm: "1.5fr 1fr 1fr",
              md: "2fr 1fr 1fr 1fr",
            },

            gap: {
              xs: 5,
              md: 6,
            },
          }}
        >
          {/* Brand */}
          <Box>
            <Typography
              component={Link}
              to="/"
              sx={{
                display: "inline-block",
                color: "text.primary",
                textDecoration: "none",
                fontSize: "1.8rem",
                fontWeight: 800,
                letterSpacing: "-0.05em",
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

            <Typography
              color="text.secondary"
              sx={{
                mt: 2,
                maxWidth: 380,
                lineHeight: 1.8,
              }}
            >
              A thoughtful space for writers and readers to
              share ideas, experiences, tutorials, and stories
              worth discovering.
            </Typography>

            <Button
              component={Link}
              to="/register"
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              disableElevation
              sx={{
                mt: 3,
                px: 2.5,
                py: 1.1,
              }}
            >
              Start writing
            </Button>
          </Box>

          {/* Explore */}
          <Box>
            <Typography
              sx={{
                fontWeight: 700,
                mb: 2.2,
              }}
            >
              Explore
            </Typography>

            <Stack spacing={1.5}>
              {exploreLinks.map((link) => (
                <Typography
                  key={link.path}
                  component={Link}
                  to={link.path}
                  variant="body2"
                  sx={{
                    width: "fit-content",
                    color: "text.secondary",
                    textDecoration: "none",
                    transition: "all 0.2s ease",

                    "&:hover": {
                      color: "primary.main",
                      transform: "translateX(3px)",
                    },
                  }}
                >
                  {link.label}
                </Typography>
              ))}
            </Stack>
          </Box>

          {/* Account */}
          <Box>
            <Typography
              sx={{
                fontWeight: 700,
                mb: 2.2,
              }}
            >
              Account
            </Typography>

            <Stack spacing={1.5}>
              {accountLinks.map((link) => (
                <Typography
                  key={link.path}
                  component={Link}
                  to={link.path}
                  variant="body2"
                  sx={{
                    width: "fit-content",
                    color: "text.secondary",
                    textDecoration: "none",
                    transition: "all 0.2s ease",

                    "&:hover": {
                      color: "primary.main",
                      transform: "translateX(3px)",
                    },
                  }}
                >
                  {link.label}
                </Typography>
              ))}
            </Stack>
          </Box>

          {/* Social */}
          <Box>
            <Typography
              sx={{
                fontWeight: 700,
                mb: 2.2,
              }}
            >
              Follow us
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                lineHeight: 1.7,
                mb: 2,
              }}
            >
              Stay connected with the community.
            </Typography>

            <Stack
              direction="row"
              spacing={1}
            >
              <IconButton
                aria-label="GitHub"
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: "background.paper",
                  border: "1px solid",
                  borderColor: "divider",

                  "&:hover": {
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                    borderColor: "primary.main",
                    transform: "translateY(-2px)",
                  },

                  transition: "all 0.2s ease",
                }}
              >
                <GitHubIcon fontSize="small" />
              </IconButton>

              <IconButton
                aria-label="LinkedIn"
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: "background.paper",
                  border: "1px solid",
                  borderColor: "divider",

                  "&:hover": {
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                    borderColor: "primary.main",
                    transform: "translateY(-2px)",
                  },

                  transition: "all 0.2s ease",
                }}
              >
                <LinkedInIcon fontSize="small" />
              </IconButton>

              <IconButton
                aria-label="Instagram"
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: "background.paper",
                  border: "1px solid",
                  borderColor: "divider",

                  "&:hover": {
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                    borderColor: "primary.main",
                    transform: "translateY(-2px)",
                  },

                  transition: "all 0.2s ease",
                }}
              >
                <InstagramIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Box>
        </Box>
      </Container>

      {/* Bottom section */}
      <Box
        sx={{
          bgcolor: "background.paper",
        }}
      >
        <Container maxWidth="lg">
          <Divider />

          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            justifyContent="space-between"
            alignItems={{
              xs: "flex-start",
              sm: "center",
            }}
            spacing={2}
            sx={{
              py: 3,
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
            >
              © 2026 Blogger. Built for sharing ideas.
            </Typography>

            <Stack
              direction="row"
              spacing={3}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  cursor: "pointer",

                  "&:hover": {
                    color: "primary.main",
                  },
                }}
              >
                Privacy
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  cursor: "pointer",

                  "&:hover": {
                    color: "primary.main",
                  },
                }}
              >
                Terms
              </Typography>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}

export default Footer;