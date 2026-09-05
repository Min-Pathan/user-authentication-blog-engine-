import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";

import {
  Box,
  Button,
  Container,
  Paper, 
  Typography,
} from "@mui/material";

import { Link } from "react-router";

const features = [
  {
    title: "Write & Publish",
    description:
      "Share tutorials, experiences, ideas, and stories with readers through a simple publishing experience.",
    icon: <EditNoteOutlinedIcon />,
  },         
  {
    title: "Discover Ideas",
    description:
      "Explore articles across technology, careers, design, and other topics shared by our community.",
    icon: <AutoStoriesOutlinedIcon />,
  },
  {
    title: "Join Conversations",
    description:
      "Like articles, share your perspective through comments, and connect with other writers and readers.",
    icon: <ChatBubbleOutlineIcon />,
  },
];

function AboutPage() {
  return (
    <Box component="main">
      {/* Hero */}
      <Box
        sx={{
          bgcolor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            py: {
              xs: 7,
              md: 11,
            },
            textAlign: "center",
          }}
        >
          <Typography
            color="primary.main"
            sx={{
              fontWeight: 700,
              mb: 2,
            }}
          >
            ABOUT BLOGGER
          </Typography>

          <Typography
            component="h1"
            sx={{
              fontSize: {
                xs: "2.5rem",
                md: "4rem",
              },
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.045em",
            }}
          >
            A place for ideas worth sharing.
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              mt: 3,
              mx: "auto",
              maxWidth: 680,
              fontSize: {
                xs: "1rem",
                md: "1.1rem",
              },
              lineHeight: 1.8,
            }}
          >
            Blogger is a community-driven platform where writers can share
            knowledge, experiences, and perspectives while readers discover
            thoughtful stories from different voices.
          </Typography>
        </Container>
      </Box>

      {/* Features */}
      <Container
        maxWidth="lg"
        sx={{
          py: {
            xs: 6,
            md: 9,
          },
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            mb: 5,
          }}
        >
          <Typography
            component="h2"
            variant="h4"
            sx={{
              fontWeight: 800,
              letterSpacing: "-0.03em",
            }}
          >
            Built for writers and readers
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              mt: 1.5,
            }}
          >
            Everything you need for a simple and meaningful blogging
            experience.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(3, 1fr)",
            },
            gap: 3,
          }}
        >
          {features.map((feature) => (
            <Paper
              key={feature.title}
              elevation={0}
              sx={{
                p: 4,
                border: "1px solid",
                borderColor: "divider",
                height: "100%",
              }}
            >
              <Box
                sx={{
                  width: 52,
                  height: 52,
                  display: "grid",
                  placeItems: "center",
                  borderRadius: 2.5,
                  bgcolor: "#EFF6FF",
                  color: "primary.main",
                  mb: 3,

                  "& svg": {
                    fontSize: 28,
                  },
                }}
              >
                {feature.icon}
              </Box>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                }}
              >
                {feature.title}
              </Typography>

              <Typography
                color="text.secondary"
                sx={{
                  mt: 1.5,
                  lineHeight: 1.8,
                }}
              >
                {feature.description}
              </Typography>
            </Paper>
          ))}
        </Box>

        {/* CTA */}
        <Paper
          elevation={0}
          sx={{
            mt: {
              xs: 6,
              md: 8,
            },
            p: {
              xs: 4,
              md: 6,
            },
            bgcolor: "#EFF6FF",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
            }}
          >
            Ready to discover something new?
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              mt: 1.5,
            }}
          >
            Explore stories from our growing community.
          </Typography>

          <Button
            component={Link}
            to="/blogs"
            variant="contained"
            size="large"
            sx={{
              mt: 3,
            }}
          >
            Explore blogs
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}

export default AboutPage;