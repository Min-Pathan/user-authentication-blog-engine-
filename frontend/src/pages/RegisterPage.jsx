import { Container, Typography } from "@mui/material";

function RegisterPage() {
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
        Register
      </Typography>
    </Container>
  );
}

export default RegisterPage;