export function Spinner({ className = '' }: { className?: string }) {
  return (
    <div
      role="status"
      className={`inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent ${className}`}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
