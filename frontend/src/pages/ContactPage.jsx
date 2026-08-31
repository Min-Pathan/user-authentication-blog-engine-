import { Container, Typography } from "@mui/material";

function ContactPage() {
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
        Contact
      </Typography>
    </Container>
  );
}

export default ContactPage;