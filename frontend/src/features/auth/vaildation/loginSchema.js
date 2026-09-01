import {z} from "zod"
export const loginSchema = z.object({
    email: z.string().min(1, "Email is required").email("Enter a valid email"),
    password: z.string().min(1, "Passowrd is required").min(6, "PAssword must be at least 6 chartacters").max(10, "Password msut be less than 10 charcters")
})