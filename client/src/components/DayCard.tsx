import { useState } from "react";
import type { Day, Stop, StopCategory } from "../types/trip";
import { StopCard } from "./StopCard";

interface DayCardProps {
  day: Day;
  onRemoveStop: (dayNumber: number, stopId: string) => void;
  onMoveStop: (dayNumber: number, stopIndex: number, direction: "up" | "down") => void;
  onEditStop: (dayNumber: number, stopId: string, updatedStop: Partial<Stop>) => void;
  onAddStop: (dayNumber: number, stop: Stop) => void;
}

export function DayCard({
  day,
  onRemoveStop,
  onMoveStop,
  onEditStop,
  onAddStop
}: DayCardProps) {
  const [expanded, setExpanded] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newStop, setNewStop] = useState<Partial<Stop>>({
    name: "", description: "", time: "", durationMinutes: 60, category: "other"
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddStop(day.day, {
      ...newStop,
      id: crypto.randomUUID(),
    } as Stop);
    setIsAdding(false);
    setNewStop({ name: "", description: "", time: "", durationMinutes: 60, category: "other" });
  };

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
              onRemove={(stopId) => onRemoveStop(day.day, stopId)}
              onMoveUp={() => onMoveStop(day.day, index, "up")}
              onMoveDown={() => onMoveStop(day.day, index, "down")}
              onEdit={(stopId, updated) => onEditStop(day.day, stopId, updated)}
              isFirst={index === 0}
              isLast={index === day.stops.length - 1}
            />
          ))}
          
          {isAdding ? (
            <form className="edit-stop-form" onSubmit={handleAddSubmit}>
              <h4>Add New Stop</h4>
              <input value={newStop.name} onChange={e => setNewStop({...newStop, name: e.target.value})} placeholder="Stop Name" required />
              <input value={newStop.description} onChange={e => setNewStop({...newStop, description: e.target.value})} placeholder="Description" required />
              <div className="form-row">
                <input value={newStop.time} onChange={e => setNewStop({...newStop, time: e.target.value})} placeholder="Time (e.g. 10:00 AM)" required />
                <input type="number" value={newStop.durationMinutes} onChange={e => setNewStop({...newStop, durationMinutes: Number(e.target.value)})} placeholder="Duration (min)" min={1} required />
                <select value={newStop.category} onChange={e => setNewStop({...newStop, category: e.target.value as StopCategory})}>
                  <option value="food">food</option>
                  <option value="sightseeing">sightseeing</option>
                  <option value="beach">beach</option>
                  <option value="nature">nature</option>
                  <option value="shopping">shopping</option>
                  <option value="culture">culture</option>
                  <option value="nightlife">nightlife</option>
                  <option value="activity">activity</option>
                  <option value="other">other</option>
                </select>
              </div>
              <div className="stop-actions">
                <button type="submit" className="btn-primary">Add Stop</button>
                <button type="button" onClick={() => setIsAdding(false)}>Cancel</button>
              </div>
            </form>
          ) : (
            <button className="btn-add-stop" onClick={() => setIsAdding(true)}>
              + Add a Stop
            </button>
          )}
        </div>
      )}
    </section>
  );
}