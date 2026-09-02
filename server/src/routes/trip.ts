import { Router } from "express";
import { z } from "zod";
import { generateItinerary } from "../services/gemini.js";

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

    const message =
      error instanceof Error
        ? error.message
        : "Failed to generate itinerary";

    return res.status(502).json({
      error: message
    });
  }
});

export default router;