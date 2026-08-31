import { Container, Typography } from "@mui/material";

function AboutPage() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 8,
      }}
    >
      <Typography
        component="h1"
        variant="h3"
      >
        About
      </Typography>
    </Container>
  );
}

export default AboutPage;