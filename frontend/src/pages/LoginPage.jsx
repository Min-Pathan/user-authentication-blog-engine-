import { useState } from "react";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { Link, useNavigate } from "react-router";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../features/auth/vaildation/loginSchema";
import { loginUser } from "../services/authService";
import { useToast } from "../context/ToastContext";

import {
  useDispatch,
} from "react-redux";

import {
  setCredentials,
} from "../features/auth/authSlice.js";

import {
  saveAuthData,
} from "../features/auth/authStorage.js";


function LoginPage() {

  const navigate = useNavigate();
  const { showToast } = useToast();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);
      const {
        user,
        token,
      } = response;
      saveAuthData({ user, token })
      dispatch(setCredentials({ user, token }))
      showToast(
        response.message ||
        "Login successful",
        "success",
      );

       setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
    }
    catch (error) {
      showToast(
        error.response?.data?.message ||
        "Login failed. Please try again.",
        "error",
      );

    }
  };

  return (
    <Box
      component="main"
      sx={{
        py: {
          xs: 5,
          md: 9,
        },
      }}
    >
      <Container maxWidth="sm">
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
          <Box
            sx={{
              mb: 4,
            }}
          >
            <Typography
              component="h1"
              variant="h4"
              sx={{
                fontWeight: 800,
                letterSpacing: "-0.03em",
              }}
            >
              Welcome back
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                mt: 1,
                lineHeight: 1.7,
              }}
            >
              Sign in to continue writing, reading, and managing your
              stories.
            </Typography>
          </Box>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <Stack spacing={2.5}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                autoComplete="email"
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                {...register("email")}
              />

              <TextField
                label="Password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                fullWidth
                autoComplete="current-password"
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
                {...register("password")}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          type="button"
                          onClick={() =>
                            setShowPassword(
                              (previousValue) =>
                                !previousValue,
                            )
                          }
                          edge="end"
                          aria-label={
                            showPassword
                              ? "Hide password"
                              : "Show password"
                          }
                        >
                          {showPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disableElevation
                disabled={isSubmitting}
                sx={{
                  minHeight: 48,
                }}
              >
                {isSubmitting
                  ? "Signing in..."
                  : "Sign in"}
              </Button>
            </Stack>
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            sx={{
              mt: 3,
            }}
          >
            Don't have an account?{" "}
            <Typography
              component={Link}
              to="/register"
              variant="body2"
              sx={{
                color: "primary.main",
                fontWeight: 600,
                textDecoration: "none",

                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Register
            </Typography>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default LoginPage;