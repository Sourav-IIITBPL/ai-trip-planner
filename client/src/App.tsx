import { useRef, useState } from "react";
import { TripForm } from "./components/TripForm";
import { Itinerary } from "./components/Itinerary";
import { LoadingState } from "./components/LoadingState";
import { ErrorState } from "./components/ErrorState";
import { EmptyState } from "./components/EmptyState";
import { generateTrip } from "./services/api";
import type { Itinerary as ItineraryType } from "./types/trip";
import "./App.css";

function App() {
  const [description, setDescription] = useState("");
  const [itinerary, setItinerary] =
    useState<ItineraryType | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestController =
    useRef<AbortController | null>(null);

  async function handleGenerate() {
    requestController.current?.abort();

    const controller = new AbortController();

    requestController.current = controller;

    setLoading(true);
    setError(null);

    try {
      const result = await generateTrip(
        description,
        controller.signal
      );

      if (controller.signal.aborted) {
        return;
      }

      setItinerary(result);
    } catch (error) {
      if (
        error instanceof DOMException &&
        error.name === "AbortError"
      ) {
        return;
      }

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  }

  function removeStop(
    dayNumber: number,
    stopId: string
  ) {
    setItinerary((current) => {
      if (!current) return current;

      return {
        ...current,
        days: current.days.map((day) =>
          day.day === dayNumber
            ? {
                ...day,
                stops: day.stops.filter(
                  (stop) => stop.id !== stopId
                )
              }
            : day
        )
      };
    });
  }

  function moveStop(
    dayNumber: number,
    stopIndex: number,
    direction: "up" | "down"
  ) {
    setItinerary((current) => {
      if (!current) return current;

      return {
        ...current,
        days: current.days.map((day) => {
          if (day.day !== dayNumber) {
            return day;
          }

          const newStops = [...day.stops];

          const targetIndex =
            direction === "up"
              ? stopIndex - 1
              : stopIndex + 1;

          if (
            targetIndex < 0 ||
            targetIndex >= newStops.length
          ) {
            return day;
          }

          [
            newStops[stopIndex],
            newStops[targetIndex]
          ] = [
            newStops[targetIndex],
            newStops[stopIndex]
          ];

          return {
            ...day,
            stops: newStops
          };
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
          Describe your trip and get an
          interactive day-by-day plan.
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
          <ErrorState
            message={error}
            onRetry={handleGenerate}
          />
        )}

        {!loading && !error && !itinerary && (
          <EmptyState />
        )}

        {!loading && !error && itinerary && (
          <Itinerary
            itinerary={itinerary}
            onRemoveStop={removeStop}
            onMoveStop={moveStop}
          />
        )}
      </section>
    </div>
  );
}

export default App;