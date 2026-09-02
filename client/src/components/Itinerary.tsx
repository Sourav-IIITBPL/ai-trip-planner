import { useState } from "react";
import type { Itinerary as ItineraryType, Stop } from "../types/trip";
import { DayCard } from "./DayCard";

interface ItineraryProps {
  itinerary: ItineraryType;
  onRemoveStop: (dayNumber: number, stopId: string) => void;
  onMoveStop: (dayNumber: number, stopIndex: number, direction: "up" | "down") => void;
  onEditStop: (dayNumber: number, stopId: string, updatedStop: Partial<Stop>) => void;
  onAddStop: (dayNumber: number, stop: Stop) => void;
  onRefine: (instruction: string) => void;
  isRefining: boolean;
}

export function Itinerary({
  itinerary,
  onRemoveStop,
  onMoveStop,
  onEditStop,
  onAddStop,
  onRefine,
  isRefining
}: ItineraryProps) {
  const [refineText, setRefineText] = useState("");

  return (
    <main>
      <header>
        <p>{itinerary.destination}</p>
        <h1>{itinerary.title}</h1>
        <p>{itinerary.summary}</p>
      </header>

      {itinerary.days.map((day) => (
        <DayCard
          key={day.day}
          day={day}
          onRemoveStop={onRemoveStop}
          onMoveStop={onMoveStop}
          onEditStop={onEditStop}
          onAddStop={onAddStop}
        />
      ))}

      <section className="refine-section">
        <input
          value={refineText}
          onChange={(e) => setRefineText(e.target.value)}
          placeholder="Ask AI to refine (e.g., make it cheaper, add more food)"
          disabled={isRefining}
        />
        <button
          className="btn-primary"
          onClick={() => {
            if (refineText.trim()) {
              onRefine(refineText);
              setRefineText("");
            }
          }}
          disabled={isRefining || !refineText.trim()}
        >
          {isRefining ? "Refining..." : "Refine with AI"}
        </button>
      </section>
    </main>
  );
}