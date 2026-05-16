import * as z from "zod";

export const registerSchema = z.object({
  email: z.email({ error: "Please enter a valid email" }).trim(),
  password: z
    .string()
    .min(6, { error: "Password must be at least 6 characters" }),
  // .regex(/[a-zA-Z]/, { error: "Contain at least one letter." })
  // .regex(/[0-9]/, { error: "Contain at least one number" })
  // .trim(),
});

export const loginSchema = z.object({
  email: z.email({ error: "Invalid email" }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
