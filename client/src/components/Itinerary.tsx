import type { Itinerary as ItineraryType } from "../types/trip";
import { DayCard } from "./DayCard";

interface ItineraryProps {
  itinerary: ItineraryType;
  onRemoveStop: (
    dayNumber: number,
    stopId: string
  ) => void;
  onMoveStop: (
    dayNumber: number,
    stopIndex: number,
    direction: "up" | "down"
  ) => void;
}

export function Itinerary({
  itinerary,
  onRemoveStop,
  onMoveStop
}: ItineraryProps) {
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
        />
      ))}
    </main>
  );
}