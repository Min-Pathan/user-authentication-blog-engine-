import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .min(2, "Name must be at least 2 characters"),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Enter a valid email address"),

    phone: z
      .string()
      .min(1, "Phone number is required")
      .refine(
        (value) => {
          const digits = value.replace(/\D/g, "");

          return digits.length >= 10 && digits.length <= 15;
        },
        {
          message: "Enter a valid phone number",
        },
      ),

    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters"),

    confirmPassword: z
      .string()
      .min(1, "Please confirm your password"),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    },
  );