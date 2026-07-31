import { getStatusColor, getStatusBgColor } from '../../../shared/utils/statusColor';

interface StatusBadgeProps {
  status: number;
  statusText: string;
  durationMs: number;
}

export function StatusBadge({ status, statusText, durationMs }: StatusBadgeProps) {
  const textColor = getStatusColor(status);
  const bgColor = getStatusBgColor(status);

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
      <div className="flex items-center gap-3">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded font-mono text-sm font-bold ${textColor} ${bgColor} border border-current/20`}
        >
          {status}
        </span>
        <span className={`text-sm font-medium ${textColor}`}>{statusText}</span>
      </div>
      <span className="text-sm font-mono text-gray-400">
        {durationMs} ms
      </span>
    </div>
  );
}
