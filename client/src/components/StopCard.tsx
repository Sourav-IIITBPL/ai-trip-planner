import { useState } from "react";
import type { Stop, StopCategory } from "../types/trip";

interface StopCardProps {
  stop: Stop;
  onRemove: (stopId: string) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onEdit: (stopId: string, updatedStop: Partial<Stop>) => void;
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
  onEdit,
  isFirst,
  isLast
}: StopCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(stop);

  if (isEditing) {
    return (
      <article className="stop-card edit-mode">
        <form
          className="edit-stop-form"
          onSubmit={(e) => {
            e.preventDefault();
            onEdit(stop.id, editForm);
            setIsEditing(false);
          }}
        >
          <input
            value={editForm.name}
            onChange={e => setEditForm({...editForm, name: e.target.value})}
            placeholder="Stop Name"
            required
          />
          <input
            value={editForm.description}
            onChange={e => setEditForm({...editForm, description: e.target.value})}
            placeholder="Description"
            required
          />
          <div className="form-row">
            <input
              value={editForm.time}
              onChange={e => setEditForm({...editForm, time: e.target.value})}
              placeholder="e.g. 10:00 AM"
              required
            />
            <input
              type="number"
              value={editForm.durationMinutes}
              onChange={e => setEditForm({...editForm, durationMinutes: Number(e.target.value)})}
              placeholder="Duration (min)"
              min={1}
              required
            />
            <select
              value={editForm.category}
              onChange={e => setEditForm({...editForm, category: e.target.value as StopCategory})}
            >
              {Object.keys(categoryEmojis).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="stop-actions">
            <button type="submit" className="btn-primary">Save</button>
            <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </form>
      </article>
    );
  }

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
          className="btn-icon"
          onClick={() => setIsEditing(true)}
          type="button"
          aria-label="Edit"
        >
          ✎
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