import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";

import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

function ContactPage() {
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Contact form UI only");
  };

  return (
    <Box
      component="main"
      sx={{
        py: {
          xs: 6,
          md: 9,
        },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",

            gridTemplateColumns: {
              xs: "1fr",
              md: "0.8fr 1.2fr",
            },

            gap: {
              xs: 5,
              md: 8,
            },

            alignItems: "start",
          }}
        >
          {/* Left Side */}
          <Box>
            <Typography
              color="primary.main"
              sx={{
                fontWeight: 700,
              }}
            >
              CONTACT
            </Typography>

            <Typography
              component="h1"
              sx={{
                mt: 2,

                fontSize: {
                  xs: "2.5rem",
                  md: "3.5rem",
                },

                fontWeight: 800,
                letterSpacing: "-0.04em",
                lineHeight: 1.1,
              }}
            >
              Let's start a conversation.
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                mt: 2.5,
                maxWidth: 500,
                lineHeight: 1.8,
              }}
            >
              Have a question, suggestion, or feedback about Blogger? Send us
              a message and we'll be happy to hear from you.
            </Typography>

            <Stack
              spacing={3}
              sx={{
                mt: 5,
              }}
            >
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
              >
                <Box
                  sx={{
                    width: 46,
                    height: 46,
                    borderRadius: 2,
                    display: "grid",
                    placeItems: "center",
                    bgcolor: "#EFF6FF",
                    color: "primary.main",
                  }}
                >
                  <EmailOutlinedIcon />
                </Box>

                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Email
                  </Typography>

                  <Typography
                    sx={{
                      fontWeight: 600,
                    }}
                  >
                    hello@blogger.com
                  </Typography>
                </Box>
              </Stack>

              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
              >
                <Box
                  sx={{
                    width: 46,
                    height: 46,
                    borderRadius: 2,
                    display: "grid",
                    placeItems: "center",
                    bgcolor: "#EFF6FF",
                    color: "primary.main",
                  }}
                >
                  <ForumOutlinedIcon />
                </Box>

                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Community
                  </Typography>

                  <Typography
                    sx={{
                      fontWeight: 600,
                    }}
                  >
                    Join the conversation
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Box>

          {/* Contact Form */}
          <Paper
            elevation={0}
            sx={{
              p: {
                xs: 3,
                sm: 5,
              },

              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                mb: 3,
              }}
            >
              Send a message
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
            >
              <Stack spacing={2.5}>
                <TextField
                  label="Name"
                  fullWidth
                />

                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                />

                <TextField
                  label="Subject"
                  fullWidth
                />

                <TextField
                  label="Message"
                  multiline
                  rows={6}
                  fullWidth
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disableElevation
                  sx={{
                    alignSelf: {
                      xs: "stretch",
                      sm: "flex-start",
                    },
                    px: 4,
                  }}
                >
                  Send message
                </Button>
              </Stack>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}

export default ContactPage;