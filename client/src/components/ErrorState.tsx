interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ErrorState({
  message,
  onRetry
}: ErrorStateProps) {
  return (
    <div className="state error">
      <h2>We couldn't plan your trip</h2>

      <p>{message}</p>

      <button onClick={onRetry} type="button">
        Try Again
      </button>
    </div>
  );
}