import { z } from "zod";

export const createCommentSchema = z.object({
  comment: z
    .string({
      required_error: "Comment is required",
    })
    .trim()
    .min(2, "Comment must be at least 2 characters")
    .max(200, "Comment cannot exceed 200 characters"),

  blog_id: z.coerce
    .number({
      required_error: "Blog ID is required",
    })
    .int("Blog ID must be an integer")
    .positive("Blog ID must be positive"),
});

export const updateCommentSchema = z.object({
  comment: z
    .string({
      required_error: "Comment is required",
    })
    .trim()
    .min(2, "Comment must be at least 2 characters")
    .max(200, "Comment cannot exceed 200 characters"),
});