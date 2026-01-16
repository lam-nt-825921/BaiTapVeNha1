import { z } from "zod";

export const profileSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    street: z.string().optional(),
    suite: z.string().optional(),
    city: z.string().optional(),
    zipcode: z.string().optional(),
    phone: z.string().optional(),
    website: z.string().optional(),
    companyName: z.string().optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

export type ProfileFieldErrors = Partial<
    Record<keyof ProfileFormValues, string>
>;

