import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  terms: z
    .boolean()
    .refine((value) => value, {
      message: "You must accept the terms and conditions",
    }),
});

export type RegisterType = z.infer<typeof registerSchema>;
