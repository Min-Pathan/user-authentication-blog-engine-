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

import { Link } from "react-router";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../features/auth/vaildation/registerSchema";


function RegisterPage() {
  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    const {
      // confirmPassword,
      ...registerData
    } = data;

    console.log(
      "Registration data:",
      registerData,
    );
  };

  return (
    <Box
      component="main"
      sx={{
        py: {
          xs: 5,
          md: 8,
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
          {/* Heading */}
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
              Create your account
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                mt: 1,
                lineHeight: 1.7,
              }}
            >
              Join our community and start
              sharing your stories.
            </Typography>
          </Box>

          {/* Form */}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <Stack spacing={2.5}>
              {/* Name */}
              <TextField
                label="Name"
                fullWidth
                autoComplete="name"
                error={Boolean(errors.name)}
                helperText={
                  errors.name?.message
                }
                {...register("name")}
              />

              {/* Email */}
              <TextField
                label="Email"
                type="email"
                fullWidth
                autoComplete="email"
                error={Boolean(errors.email)}
                helperText={
                  errors.email?.message
                }
                {...register("email")}
              />

              {/* Phone */}
              <TextField
                label="Phone number"
                type="tel"
                fullWidth
                autoComplete="tel"
                placeholder=""Phone number
                error={Boolean(errors.phone)}
                helperText={
                  errors.phone?.message
                }
                {...register("phone")}
         
              />

              {/* Password */}
              <TextField
                label="Password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                fullWidth
                autoComplete="new-password"
                error={Boolean(
                  errors.password,
                )}
                helperText={
                  errors.password?.message
                }
                {...register("password")}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          type="button"
                          edge="end"
                          aria-label={
                            showPassword
                              ? "Hide password"
                              : "Show password"
                          }
                          onClick={() =>
                            setShowPassword(
                              (previousValue) =>
                                !previousValue,
                            )
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

              {/* Confirm Password */}
              <TextField
                label="Confirm password"
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                fullWidth
                autoComplete="new-password"
                error={Boolean(
                  errors.confirmPassword,
                )}
                helperText={
                  errors.confirmPassword
                    ?.message
                }
                {...register(
                  "confirmPassword",
                )}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          type="button"
                          edge="end"
                          aria-label={
                            showConfirmPassword
                              ? "Hide confirm password"
                              : "Show confirm password"
                          }
                          onClick={() =>
                            setShowConfirmPassword(
                              (previousValue) =>
                                !previousValue,
                            )
                          }
                        >
                          {showConfirmPassword ? (
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

              {/* Submit */}
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
                  ? "Creating account..."
                  : "Create account"}
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
            Already have an account?{" "}
            <Typography
              component={Link}
              to="/login"
              variant="body2"
              sx={{
                color: "primary.main",
                fontWeight: 600,
                textDecoration: "none",

                "&:hover": {
                  textDecoration:
                    "underline",
                },
              }}
            >
              Sign in
            </Typography>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default RegisterPage;