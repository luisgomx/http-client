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
  const inputClass = `flex-1 bg-gray-800 border border-gray-700 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent ${
    header.enabled ? 'text-white' : 'text-gray-500'
  }`;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
      {/* Key row: checkbox + key input */}
      <div className="flex items-center gap-2 flex-1">
        <input
          type="checkbox"
          checked={header.enabled}
          onChange={onToggle}
          className="w-4 h-4 accent-blue-500 cursor-pointer shrink-0"
        />
        <input
          type="text"
          value={header.key}
          onChange={(e) => onUpdateKey(e.target.value)}
          placeholder="Key"
          className={inputClass}
        />
      </div>

      {/* Value row: value input + remove button */}
      <div className="flex items-center gap-2 flex-1 pl-6 sm:pl-0">
        <input
          type="text"
          value={header.value}
          onChange={(e) => onUpdateValue(e.target.value)}
          placeholder="Value"
          className={inputClass}
        />
        <button
          onClick={onRemove}
          className="shrink-0 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded transition-colors text-sm"
          aria-label="Remove header"
        >
          ×
        </button>
      </div>
    </div>
  );
}
