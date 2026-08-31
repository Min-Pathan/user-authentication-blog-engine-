import { Container, Typography } from "@mui/material";

function LoginPage() {
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
        Login
      </Typography>
    </Container>
  );
}

export default LoginPage;