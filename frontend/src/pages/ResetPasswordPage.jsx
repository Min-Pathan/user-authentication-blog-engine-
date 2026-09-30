import {
    Box,
    Button,
    Container,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import {
    Link,
    useNavigate,
    useSearchParams,
} from "react-router";
import { useToast } from "../context/ToastContext";
import useResetPassword from "../features/auth/mutations/useResetPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { clearAuth } from "../features/auth/authStorage";
import { clearCredentials } from "../features/auth/authSlice";
import z from "zod";

const resetPasswordSchema = z
    .object({
        password: z
            .string()
            .min(6, "Password must be at least 6 characters")
            .max(100, "Password is too long")
            .refine(
                (value) => new TextEncoder().encode(value).length <= 72,
                "Password is too long. Please use a shorter password.",
            ),

        confirmPassword: z
            .string()
            .min(1, "Please confirm your password"),
    })
    .refine(
        (values) => values.password === values.confirmPassword,
        {
            message: "Passwords do not match",
            path: ["confirmPassword"],
        },
    );

const ResetPasswordPage = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token") || "";
    return <ResetPasswordForm key={token} token={token} />
}

function ResetPasswordForm({ token }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const { showToast } = useToast();

    const {
        mutate,
        isPending,
        isSuccess,
        error,
    } = useResetPassword();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });
    const hasValidTokenFormat = /^[a-f0-9]{64}$/.test(token);
    const serverRejectedLink = error?.response?.status === 400 &&
        error?.response?.data?.message ===
        "This reset link is invalid or has expired.";

    const showInvalidLink =
        !hasValidTokenFormat || serverRejectedLink;
    const onSubmit = ({ password }) => {
        if (showInvalidLink || isPending || isSuccess) return;
        mutate(
            { token, password },
            {
                onSuccess: async (response) => {
                    clearAuth();
                    dispatch(clearCredentials())
                    await queryClient.cancelQueries()
                    queryClient.clear()

                    showToast(response.message ||
                        "Password reset successfully. Please log in.",
                        "success",)
                    navigate("/login", { replace: true })
                },
                onError: (requestError) => {
                    const message = requestError.response?.data?.message

                    if (requestError.response?.status === 400 &&
                        message === "This reset link is invalid or has expired."
                    ) { return }

                    showToast(
                        message ||
                        "Could not reset your password. Please try again.",
                        "error",
                    );
                }
            }
        )
    }
    return (
        <Container maxWidth="sm" sx={{ py: { xs: 6, md: 10 } }}>
            <Paper elevation={0}
                sx={{
                    p: { xs: 3, sm: 5 },
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 3,

                }}>
                {showInvalidLink ? (
                    <Stack spacing={3} sx={{ textAlign: 'center' }}>
                        <Typography component="h1" variant="h4" sx={{ fontWeight: 800 }}>
                            Request a new link
                        </Typography>

                        <Typography color="text.secondary" role="status">
                            This reset link is invalid or has expired.
                            Please request a new one.
                        </Typography>
                        <Button
                            component={Link}
                            to="/forgot-password"
                            variant="contained"
                            disableElevation
                        >
                            Request reset link
                        </Button>
                        <Button component={Link} to="/login">
                            Back to login
                        </Button>
                    </Stack>
                ) : (
                    <>
                        <Typography
                            component="h1"
                            variant="h4"
                            sx={{ fontWeight: 800, mb: 1.5 }}
                        >
                            Reset password
                        </Typography>

                        <Typography color="text.secondary" sx={{ mb: 4 }}>
                            Enter and confirm your new password.
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <Stack spacing={3}>
                                <TextField
                                    {...register("password")}
                                    label="New password"
                                    type="password"
                                    autoComplete="new-password"
                                    fullWidth
                                    disabled={isPending || isSuccess}
                                    error={Boolean(errors.password)}
                                    helperText={
                                        errors.password?.message ||
                                        "Use at least 6 characters."
                                    }
                                />
                                <TextField
                                    {...register("confirmPassword")}
                                    label="Confirm new password"
                                    type="password"
                                    autoComplete="new-password"
                                    fullWidth
                                    disabled={isPending || isSuccess}
                                    error={Boolean(errors.confirmPassword)}
                                    helperText={errors.confirmPassword?.message}
                                />

                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    disableElevation
                                    disabled={isPending || isSuccess}
                                >
                                    {isPending || isSuccess
                                        ? "Resetting..."
                                        : "Reset password"}
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
    )
}
export default ResetPasswordPage