import type { HeaderEntry } from '../../../types/http.types';

interface HeaderRowProps {
  header: HeaderEntry;
  onToggle: () => void;
  onRemove: () => void;
  onUpdateKey: (value: string) => void;
  onUpdateValue: (value: string) => void;
}

export function HeaderRow({
  header,
  onToggle,
  onRemove,
  onUpdateKey,
  onUpdateValue,
}: HeaderRowProps) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={header.enabled}
        onChange={onToggle}
        className="w-4 h-4 accent-blue-500 cursor-pointer flex-shrink-0"
      />
      <input
        type="text"
        value={header.key}
        onChange={(e) => onUpdateKey(e.target.value)}
        placeholder="Key"
        className={`flex-1 bg-gray-800 border border-gray-700 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent ${
          header.enabled ? 'text-white' : 'text-gray-500'
        }`}
      />
      <input
        type="text"
        value={header.value}
        onChange={(e) => onUpdateValue(e.target.value)}
        placeholder="Value"
        className={`flex-1 bg-gray-800 border border-gray-700 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent ${
          header.enabled ? 'text-white' : 'text-gray-500'
        }`}
      />
      <button
        onClick={onRemove}
        className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded transition-colors text-sm"
        aria-label="Remove header"
      >
        ×
      </button>
    </div>
  );
}
