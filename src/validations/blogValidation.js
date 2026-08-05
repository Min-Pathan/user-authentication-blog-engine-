import { z } from "zod";

export const createBlogSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(225, "Title cannot exceed 225 characters"),

  content: z
    .string({
      required_error: "Content is required",
    })
    .trim()
    .min(5, "Content must be at least 5 characters"),

  category: z
    .string()
    .trim()
    .min(1, "Category is required")
    .optional(),
});

export const updateBlogSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(3, "Title must be at least 3 characters")
      .max(225, "Title cannot exceed 225 characters")
      .optional(),

    content: z
      .string()
      .trim()
      .min(5, "Content must be at least 5 characters")
      .optional(),

    category: z
      .string()
      .trim()
      .min(1, "Category cannot be empty")
      .optional(),
  })
  .refine(
    (data) =>
      data.title !== undefined ||
      data.content !== undefined ||
      data.category !== undefined,
    {
      message: "Provide at least one field to update",
    }
  );

export const updateBlogSchemaWithOptionalMedia = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(225, "Title cannot exceed 225 characters")
    .optional(),

  content: z
    .string()
    .trim()
    .min(3, "Content must be at least 3 characters")
    .optional(),

  category_id: z.coerce
    .number()
    .int()
    .positive()
    .optional(),

  remove_media: z
    .enum(["true", "false"])
    .transform((value) => value === "true")
    .optional(),
});