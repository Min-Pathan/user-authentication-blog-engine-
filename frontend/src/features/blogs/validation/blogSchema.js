import {z} from "zod"
export const blogSchema = z.object({
    title : z.string().trim().min(1, "title is required").min(5, "Title must be at least 5 characters")
    .max(100, "Title cannot exceed 100 characters"),

    content: z.string().trim().min(1, "content is required").max(300, "Content cannot exceed 300 characters"),

    category: z.string().min(1, "Please select a category"),

    media:z.any().optional()
})