import { z } from "zod";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
)

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

  phone: z.string().min(10, "at least 10 digits required").regex(phoneRegex, "Invalid phone number"),

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