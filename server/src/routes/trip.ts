import { Router } from "express";
import { z } from "zod";
import { generateItinerary, refineItinerary } from "../services/gemini.js";

const router = Router();

const requestSchema = z.object({
  tripDescription: z.string().trim().min(10).max(5000)
});

router.post("/generate", async (req, res) => {
  try {
    const parsed = requestSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        error: "Please provide a trip description of at least 10 characters."
      });
    }

    const itinerary = await generateItinerary(
      parsed.data.tripDescription
    );

    return res.json(itinerary);
  } catch (error) {
    console.error("Trip generation failed:", error);

    let message = "Failed to generate itinerary";

    if (error instanceof Error) {
      try {
        // Try to parse Gemini's JSON error response
        const parsedError = JSON.parse(error.message);
        message = parsedError.error?.message || error.message;
      } catch {
        // If it's not JSON, just use the error message
        message = error.message;
      }
    }

    return res.status(502).json({
      error: message
    });
  }
});

const refineSchema = z.object({
  itinerary: z.any(),
  instruction: z.string().trim().min(5).max(1000)
});

router.post("/refine", async (req, res) => {
  try {
    const parsed = refineSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        error: "Please provide a valid instruction and existing itinerary."
      });
    }

    const itinerary = await refineItinerary(
      parsed.data.itinerary,
      parsed.data.instruction
    );

    return res.json(itinerary);
  } catch (error) {
    console.error("Trip refinement failed:", error);

    let message = "Failed to refine itinerary";

    if (error instanceof Error) {
      try {
        const parsedError = JSON.parse(error.message);
        message = parsedError.error?.message || error.message;
      } catch {
        message = error.message;
      }
    }

    return res.status(502).json({
      error: message
    });
  }
});

export default router;