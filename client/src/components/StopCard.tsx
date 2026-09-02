import type { Stop } from "../types/trip";

interface StopCardProps {
  stop: Stop;
  onRemove: (stopId: string) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
}

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
      <div>
        <span>{stop.category}</span>

        <h3>{stop.name}</h3>

        <p>{stop.description}</p>

        <small>
          {stop.time} · {stop.durationMinutes} minutes
        </small>
      </div>

      <div className="stop-actions">
        <button
          onClick={onMoveUp}
          disabled={isFirst}
          type="button"
        >
          ↑
        </button>

        <button
          onClick={onMoveDown}
          disabled={isLast}
          type="button"
        >
          ↓
        </button>

        <button
          onClick={() => onRemove(stop.id)}
          type="button"
        >
          Remove
        </button>
      </div>
    </article>
  );
}