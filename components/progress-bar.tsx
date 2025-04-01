interface ProgressBarProps {
  value: number;
  label?: string;
}

export function ProgressBar({ value, label }: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, value));

  return (
    <div className="relative h-5 w-full overflow-hidden rounded-full bg-gray-200">
      <div
        className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-400 via-green-500 to-green-600 transition-all duration-500"
        style={{ width: `${percentage}%` }}
      />
      {label && (
        <span className="absolute top-1/2 w-full -translate-y-1/2 text-center text-xs font-semibold text-white">
          {label}
        </span>
      )}
    </div>
  );
}
