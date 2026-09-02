import { useRef, useState, useEffect } from "react";
import { TripForm } from "./components/TripForm";
import { Itinerary } from "./components/Itinerary";
import { LoadingState } from "./components/LoadingState";
import { ErrorState } from "./components/ErrorState";
import { EmptyState } from "./components/EmptyState";
import { generateTrip, refineTrip } from "./services/api";
import type { Itinerary as ItineraryType, Stop } from "./types/trip";
import "./App.css";

function App() {
  const [description, setDescription] = useState("");
  
  // Load initial itinerary from local storage
  const [itinerary, setItinerary] = useState<ItineraryType | null>(() => {
    const saved = localStorage.getItem('savedTrip');
    return saved ? JSON.parse(saved) : null;
  });

  const [loading, setLoading] = useState(false);
  const [refining, setRefining] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestController = useRef<AbortController | null>(null);

  // Save itinerary to local storage whenever it changes
  useEffect(() => {
    if (itinerary) {
      localStorage.setItem('savedTrip', JSON.stringify(itinerary));
    } else {
      localStorage.removeItem('savedTrip');
    }
  }, [itinerary]);

  async function handleGenerate() {
    requestController.current?.abort();
    const controller = new AbortController();
    requestController.current = controller;

    setLoading(true);
    setError(null);
    setItinerary(null);

    try {
      const result = await generateTrip(description, controller.signal);
      if (controller.signal.aborted) return;
      setItinerary(result);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setError(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }

  async function handleRefine(instruction: string) {
    if (!itinerary) return;
    
    requestController.current?.abort();
    const controller = new AbortController();
    requestController.current = controller;

    setRefining(true);
    setError(null);

    try {
      const result = await refineTrip(itinerary, instruction, controller.signal);
      if (controller.signal.aborted) return;
      setItinerary(result);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setError(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      if (!controller.signal.aborted) setRefining(false);
    }
  }

  function removeStop(dayNumber: number, stopId: string) {
    setItinerary((current) => {
      if (!current) return current;
      return {
        ...current,
        days: current.days.map((day) =>
          day.day === dayNumber
            ? { ...day, stops: day.stops.filter((stop) => stop.id !== stopId) }
            : day
        )
      };
    });
  }

  function editStop(dayNumber: number, stopId: string, updatedStop: Partial<Stop>) {
    setItinerary((current) => {
      if (!current) return current;
      return {
        ...current,
        days: current.days.map((day) =>
          day.day === dayNumber
            ? { ...day, stops: day.stops.map(stop => stop.id === stopId ? { ...stop, ...updatedStop } : stop) }
            : day
        )
      };
    });
  }

  function addStop(dayNumber: number, newStop: Stop) {
    setItinerary((current) => {
      if (!current) return current;
      return {
        ...current,
        days: current.days.map((day) =>
          day.day === dayNumber
            ? { ...day, stops: [...day.stops, newStop] }
            : day
        )
      };
    });
  }

  function moveStop(dayNumber: number, stopIndex: number, direction: "up" | "down") {
    setItinerary((current) => {
      if (!current) return current;
      return {
        ...current,
        days: current.days.map((day) => {
          if (day.day !== dayNumber) return day;
          
          const newStops = [...day.stops];
          const targetIndex = direction === "up" ? stopIndex - 1 : stopIndex + 1;

          if (targetIndex < 0 || targetIndex >= newStops.length) return day;

          [newStops[stopIndex], newStops[targetIndex]] = [newStops[targetIndex], newStops[stopIndex]];
          return { ...day, stops: newStops };
        })
      };
    });
  }

  return (
    <div className="app">
      <header className="hero">
        <p className="eyebrow">AI TRIP PLANNER</p>
        <h1>
          Turn your trip idea into
          <span> an itinerary.</span>
        </h1>
        <p>
          Describe your trip and get an interactive day-by-day plan.
        </p>
      </header>

      <TripForm
        value={description}
        onChange={setDescription}
        onSubmit={handleGenerate}
        loading={loading}
      />

      <section className="results">
        {loading && <LoadingState />}
        
        {!loading && error && (
          <ErrorState message={error} onRetry={handleGenerate} />
        )}
        
        {!loading && !error && !itinerary && <EmptyState />}
        
        {!loading && !error && itinerary && (
          <Itinerary
            itinerary={itinerary}
            onRemoveStop={removeStop}
            onMoveStop={moveStop}
            onEditStop={editStop}
            onAddStop={addStop}
            onRefine={handleRefine}
            isRefining={refining}
          />
        )}
      </section>
    </div>
  );
}

export default App;