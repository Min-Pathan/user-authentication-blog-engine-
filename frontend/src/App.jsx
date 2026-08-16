import {
  Box,
  Button,
  Chip,
  Container,
  Stack,
  Typography,
} from "@mui/material";

function App() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            py: {
              xs: 6,
              md: 12,
            },
          }}
        >
          <Chip
            label="Welcome to Blogger"
            color="primary"
            variant="outlined"
            sx={{
              mb: 3,
            }}
          />

          <Typography
            variant="h1"
            sx={{
              maxWidth: 800,

              fontSize: {
                xs: "2.5rem",
                sm: "3.5rem",
                md: "5rem",
              },

              lineHeight: 1.05,
            }}
          >
            Ideas worth sharing.
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              mt: 3,
              maxWidth: 650,

              fontSize: {
                xs: "1rem",
                md: "1.15rem",
              },

              lineHeight: 1.8,
            }}
          >
            Discover stories, share your knowledge, and connect with writers
            through thoughtful articles and meaningful conversations.
          </Typography>

          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            spacing={2}
            sx={{
              mt: 4,
              alignItems: {
                xs: "stretch",
                sm: "center",
              },
            }}
          >
            <Button
              variant="contained"
              size="large"
            >
              Explore blogs
            </Button>

            <Button
              variant="outlined"
              size="large"
            >
              Start writing
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

export default App;