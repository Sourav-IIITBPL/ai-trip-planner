interface TripFormProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
}

export function TripForm({
  value,
  onChange,
  onSubmit,
  loading
}: TripFormProps) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <label htmlFor="trip-description">
        Describe your trip
      </label>

      <textarea
        id="trip-description"
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder="Example: Plan a 4-day Goa trip focused on beaches, local food and nightlife..."
        rows={6}
        disabled={loading}
      />

      <button
        type="submit"
        disabled={loading || value.trim().length < 10}
      >
        {loading
          ? "Generating..."
          : "Generate Trip"}
      </button>
    </form>
  );
}