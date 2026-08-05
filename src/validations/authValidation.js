import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
    })
    .trim()
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username cannot exceed 50 characters"),

  email: z
    .string({
      required_error: "Email is required",
    })
    .trim()
    .email("Enter a valid email address")
    .toLowerCase(),

  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password is too long"),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .trim()
    .email("Enter a valid email address")
    .toLowerCase(),

  password: z
    .string({
      required_error: "Password is required",
    })
    .min(1, "Password is required"),
});