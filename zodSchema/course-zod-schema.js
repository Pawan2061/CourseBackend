import { z } from "zod";
export const courseZodSchema = z.object({
  name: z.string().min(4, "Name of course should be more than 4 chars"),
  price: z.number(),
});
