import { useState } from "react";
import type { Day } from "../types/trip";
import { StopCard } from "./StopCard";

interface DayCardProps {
  day: Day;
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

export function DayCard({
  day,
  onRemoveStop,
  onMoveStop
}: DayCardProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <section className="day-card">
      <button
        className="day-header"
        onClick={() => setExpanded((value) => !value)}
        type="button"
      >
        <div>
          <span>Day {day.day}</span>
          <h2>{day.title}</h2>
        </div>

        <span>{expanded ? "−" : "+"}</span>
      </button>

      {expanded && (
        <div className="stops">
          {day.stops.map((stop, index) => (
            <StopCard
              key={stop.id}
              stop={stop}
              onRemove={(stopId) =>
                onRemoveStop(day.day, stopId)
              }
              onMoveUp={() =>
                onMoveStop(day.day, index, "up")
              }
              onMoveDown={() =>
                onMoveStop(day.day, index, "down")
              }
              isFirst={index === 0}
              isLast={index === day.stops.length - 1}
            />
          ))}
        </div>
      )}
    </section>
  );
}