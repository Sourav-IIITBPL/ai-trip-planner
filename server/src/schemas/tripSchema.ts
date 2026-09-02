import { z } from "zod";

export const stopSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  description: z.string().min(1),
  time: z.string().min(1),
  durationMinutes: z.number().int().positive(),
  category: z.enum([
    "food",
    "sightseeing",
    "beach",
    "nature",
    "shopping",
    "culture",
    "nightlife",
    "activity",
    "other"
  ])
});

export const daySchema = z.object({
  day: z.number().int().positive(),
  title: z.string().min(1),
  stops: z.array(stopSchema)
});

export const itinerarySchema = z.object({
  title: z.string().min(1),
  destination: z.string().min(1),
  summary: z.string().min(1),
  days: z.array(daySchema).min(1)
});

export type Stop = z.infer<typeof stopSchema>;
export type Day = z.infer<typeof daySchema>;
export type Itinerary = z.infer<typeof itinerarySchema>;