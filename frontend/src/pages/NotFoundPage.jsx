import {
  Box,
  Button,
  Container,
  Typography,
} from "@mui/material";
import { Link } from "react-router";

function NotFoundPage() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: {
              xs: "5rem",
              md: "8rem",
            },
            fontWeight: 800,
            color: "primary.main",
            lineHeight: 1,
          }}
        >
          404
        </Typography>

        <Typography
          variant="h4"
          sx={{
            mt: 2,
            fontWeight: 700,
          }}
        >
          Page not found
        </Typography>

        <Typography
          color="text.secondary"
          sx={{
            mt: 1,
          }}
        >
          The page you're looking for doesn't exist.
        </Typography>

        <Button
          component={Link}
          to="/"
          variant="contained"
          sx={{
            mt: 3,
          }}
        >
          Back to home
        </Button>
      </Box>
    </Container>
  );
}

export default NotFoundPage;