import type { Itinerary } from "../types/trip";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function generateTrip(
  tripDescription: string,
  signal?: AbortSignal
): Promise<Itinerary> {
  const response = await fetch(
    `${API_URL}/api/trip/generate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        tripDescription
      }),
      signal
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error || "Failed to generate itinerary"
    );
  }

  return data;
}

export async function refineTrip(
  itinerary: Itinerary,
  instruction: string,
  signal?: AbortSignal
): Promise<Itinerary> {
  const response = await fetch(
    `${API_URL}/api/trip/refine`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        itinerary,
        instruction
      }),
      signal
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error || "Failed to refine itinerary"
    );
  }

  return data;
}