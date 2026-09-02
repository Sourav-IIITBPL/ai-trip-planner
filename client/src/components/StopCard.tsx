import type { Stop } from "../types/trip";

interface StopCardProps {
  stop: Stop;
  onRemove: (stopId: string) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const categoryEmojis: Record<string, string> = {
  food: "🍽️",
  sightseeing: "📸",
  beach: "🏖️",
  nature: "🌲",
  shopping: "🛍️",
  culture: "🏛️",
  nightlife: "🌃",
  activity: "🏃",
  other: "📍"
};

export function StopCard({
  stop,
  onRemove,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast
}: StopCardProps) {
  return (
    <article className="stop-card">
      <div className="stop-info">
        <span className="stop-category">
          {categoryEmojis[stop.category] || "📍"} {stop.category}
        </span>
        <h3>{stop.name}</h3>
        <p>{stop.description}</p>
        <div className="stop-meta">
          <span>🕒 {stop.time}</span>
          <span>•</span>
          <span>⏳ {stop.durationMinutes} min</span>
        </div>
      </div>

      <div className="stop-actions">
        <button
          className="btn-icon"
          onClick={onMoveUp}
          disabled={isFirst}
          type="button"
          aria-label="Move up"
        >
          ↑
        </button>

        <button
          className="btn-icon"
          onClick={onMoveDown}
          disabled={isLast}
          type="button"
          aria-label="Move down"
        >
          ↓
        </button>

        <button
          className="btn-remove"
          onClick={() => onRemove(stop.id)}
          type="button"
        >
          Remove
        </button>
      </div>
    </article>
  );
}