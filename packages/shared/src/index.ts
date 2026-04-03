import { z } from "zod";

export const UserRoleSchema = z.enum(["ARTIST", "BRIDE", "ADMIN"]);
export type UserRole = z.infer<typeof UserRoleSchema>;

export const LangSchema = z.enum(["EN", "TA"]);
export type Lang = z.infer<typeof LangSchema>;

export const ProfileSchema = z.object({
    id: z.string().cuid().optional(),
    displayName: z.string().min(2),
    username: z.string().min(3),
    tagline: z.string().max(120).optional(),
    bio: z.string().optional(),
    city: z.string(),
    state: z.string().default("Tamil Nadu"),
    specializations: z.string().optional(),
    priceMin: z.number().optional(),
    priceMax: z.number().optional(),
    isVerified: z.boolean().default(false),
    whatsappNumber: z.string().optional(),
    instagramHandle: z.string().optional(),
});

export type Profile = z.infer<typeof ProfileSchema>;

export const PostSchema = z.object({
    id: z.string().optional(),
    content: z.string().min(1),
    authorId: z.string(),
    image: z.string().optional(),
});

export type Post = z.infer<typeof PostSchema>;

export const BookingSchema = z.object({
    artistProfileId: z.string(),
    desiredDate: z.string().or(z.date()),
    eventType: z.string(),
    eventCity: z.string(),
    message: z.string().optional(),
});

export type Booking = z.infer<typeof BookingSchema>;
