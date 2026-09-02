import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { itinerarySchema } from "../schemas/tripSchema.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

const itineraryJsonSchema = {
  type: "object",
  properties: {
    title: {
      type: "string"
    },
    destination: {
      type: "string"
    },
    summary: {
      type: "string"
    },
    days: {
      type: "array",
      items: {
        type: "object",
        properties: {
          day: {
            type: "integer"
          },
          title: {
            type: "string"
          },
          stops: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: {
                  type: "string"
                },
                name: {
                  type: "string"
                },
                description: {
                  type: "string"
                },
                time: {
                  type: "string"
                },
                durationMinutes: {
                  type: "integer"
                },
                category: {
                  type: "string",
                  enum: [
                    "food",
                    "sightseeing",
                    "beach",
                    "nature",
                    "shopping",
                    "culture",
                    "nightlife",
                    "activity",
                    "other"
                  ]
                }
              },
              required: [
                "id",
                "name",
                "description",
                "time",
                "durationMinutes",
                "category"
              ]
            }
          }
        },
        required: ["day", "title", "stops"]
      }
    }
  },
  required: ["title", "destination", "summary", "days"]
};

export async function generateItinerary(
  tripDescription: string
) {
  const prompt = `
You are a travel itinerary generator.

Create a practical day-by-day travel itinerary based on the user's request.

User request:
${tripDescription}

Rules:
- Return only structured JSON matching the provided schema.
- Do not include markdown.
- Do not include commentary outside the JSON.
- Make the itinerary realistic.
- Keep the number of stops reasonable for each day.
- Each stop must have a unique id.
- durationMinutes must be a positive integer.
- category must use one of the allowed categories.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.7-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: itineraryJsonSchema
    }
  });

  if (!response.text) {
    throw new Error("AI returned an empty response");
  }

  let parsed: unknown;

  try {
    parsed = JSON.parse(response.text);
  } catch {
    throw new Error("AI returned malformed JSON");
  }

  const validated = itinerarySchema.safeParse(parsed);

  if (!validated.success) {
    throw new Error("AI returned an invalid itinerary structure");
  }

  if (validated.data.days.length === 0) {
    throw new Error("AI returned an empty itinerary");
  }

  return validated.data;
}