import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useToast } from "../context/ToastContext.js";
import useForgotPassword from "../features/auth/mutations/useForgotPassword.js";

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Enter a valid email address")
    .toLowerCase(),
});

function ForgotPasswordPage() {
  const { showToast } = useToast();

  const {
    mutate,
    isPending,
    isSuccess,
    reset: resetMutation,
  } = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values) => {
    mutate(values, {
      onError: (error) => {
        showToast(
          error.response?.data?.message ||
            "Could not submit your request. Please try again.",
          "error",
        );
      },
    });
  };

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 6, md: 10 } }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, sm: 5 },
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
        }}
      >
        {isSuccess ? (
          <Stack spacing={3} sx={{ textAlign: "center" }}>
            <Typography
              component="h1"
              variant="h4"
              sx={{ fontWeight: 800 }}
            >
              Check your email
            </Typography>

            <Typography color="text.secondary" role="status">
              If an account exists with this email, we’ve sent
              instructions to reset your password.
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Check your inbox and spam folder. The link expires
              in 15 minutes.
            </Typography>

            <Button
              component={Link}
              to="/login"
              variant="contained"
              disableElevation
            >
              Back to login
            </Button>

            <Button onClick={() => resetMutation()}>
              Use a different email
            </Button>
          </Stack>
        ) : (
          <>
            <Typography
              component="h1"
              variant="h4"
              sx={{ fontWeight: 800, mb: 1.5 }}
            >
              Forgot password?
            </Typography>

            <Typography color="text.secondary" sx={{ mb: 4 }}>
              Enter your email and we’ll send you instructions
              to reset your password.
            </Typography>

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
            >
              <Stack spacing={3}>
                <TextField
                  {...register("email")}
                  label="Email address"
                  type="email"
                  autoComplete="email"
                  fullWidth
                  disabled={isPending}
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disableElevation
                  disabled={isPending}
                >
                  {isPending
                    ? "Sending..."
                    : "Send reset link"}
                </Button>

                <Button component={Link} to="/login">
                  Back to login
                </Button>
              </Stack>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
}

export default ForgotPasswordPage;