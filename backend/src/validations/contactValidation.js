import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim()
    .min(2, "Name must contain at least 2 characters")
    .max(80, "Name cannot exceed 80 characters"),

  email: z.string().trim()
    .email("Enter a valid email address")
    .max(254, "Email is too long")
    .toLowerCase(),

  subject: z.string().trim()
    .min(3, "Subject must contain at least 3 characters")
    .max(150, "Subject cannot exceed 150 characters")
    .regex(/^[^\r\n]*$/, "Subject must be a single line"),

  message: z.string().trim()
    .min(10, "Message must contain at least 10 characters")
    .max(5000, "Message cannot exceed 5000 characters"),
});