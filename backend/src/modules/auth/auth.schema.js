const { z } = require("zod");

const registerSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password cannot be empty"),
});

const refreshSchema = z.object({
  refreshToken: z.string().min(1),
});

module.exports = { registerSchema, loginSchema, refreshSchema };
