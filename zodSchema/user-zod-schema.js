import { z } from "zod";

export const userZodSchema = z.object({
  username: z.string().min(3, "Username should be at least 3 chars long"),
  password: z.string().min(8, "Password should be at least 8 chars long"),
  email: z.string().email(),
  isAdmin: z.boolean(),
});
