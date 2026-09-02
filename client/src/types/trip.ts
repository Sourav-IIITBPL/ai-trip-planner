export type StopCategory =
  | "food"
  | "sightseeing"
  | "beach"
  | "nature"
  | "shopping"
  | "culture"
  | "nightlife"
  | "activity"
  | "other";

export interface Stop {
  id: string;
  name: string;
  description: string;
  time: string;
  durationMinutes: number;
  category: StopCategory;
}

export interface Day {
  day: number;
  title: string;
  stops: Stop[];
}

export interface Itinerary {
  title: string;
  destination: string;
  summary: string;
  days: Day[];
}