interface SpinnerProps {
  label?: string;
}

/** Loading state shared by route-level loading.tsx files and async sections. */
export function Spinner({ label = "Loading" }: SpinnerProps) {
  return (
    <div role="status" aria-live="polite" className="flex min-h-[40vh] items-center justify-center">
      <span className="size-8 animate-spin rounded-full border-2 border-muted border-t-primary" aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </div>
  );
}
