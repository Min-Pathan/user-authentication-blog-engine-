import { z } from "zod";

export const registerSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(
        3,
        "Username must be at least 3 characters",
      )
      .max(
        50,
        "Username cannot exceed 50 characters",
      ),

    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email(
        "Enter a valid email address",
      ),

    phone: z
      .string()
      .min(
        10,
        "At least 10 digits required",
      ),

    password: z
      .string()
      .min(
        6,
        "Password must be at least 6 characters",
      ),

    confirmPassword: z
      .string()
      .min(
        1,
        "Please confirm your password",
      ),
  })
  .refine(
    (data) =>
      data.password ===
      data.confirmPassword,
    {
      message:
        "Passwords do not match",
      path: ["confirmPassword"],
    },
  );