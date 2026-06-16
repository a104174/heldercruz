import { z } from "zod";

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((value) => value || undefined);

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  company: optionalText(100),
  projectType: optionalText(80),
  budget: optionalText(80),
  message: z.string().trim().min(20).max(3000),
  website: z.string().trim().max(200).optional().default(""),
  origin: optionalText(300)
});

export type ContactPayload = z.infer<typeof contactSchema>;
