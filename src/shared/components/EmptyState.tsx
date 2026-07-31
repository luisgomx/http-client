interface EmptyStateProps {
  message: string;
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
        className="text-gray-600"
      >
        {/* Document outline */}
        <rect
          x="8"
          y="4"
          width="28"
          height="36"
          rx="3"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        {/* Folded corner */}
        <path
          d="M28 4 L36 12 L28 12 Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Empty lines */}
        <line x1="14" y1="20" x2="30" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="14" y1="26" x2="26" y2="26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        {/* Small arrow indicating outgoing request */}
        <path
          d="M34 34 L42 34 M38 30 L42 34 L38 38"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <h3 className="text-base font-medium text-gray-400">No response yet</h3>
      <p className="text-sm text-gray-500 max-w-xs">{message}</p>
    </div>
  );
}
