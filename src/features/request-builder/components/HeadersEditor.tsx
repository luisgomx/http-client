import type { HeaderEntry } from '../../../types/http.types';
import { HeaderRow } from './HeaderRow';

interface HeadersEditorProps {
  headers: HeaderEntry[];
  onAddHeader: () => void;
  onRemoveHeader: (id: string) => void;
  onToggleHeader: (id: string) => void;
  onUpdateHeader: (id: string, field: 'key' | 'value', value: string) => void;
}

export function HeadersEditor({
  headers,
  onAddHeader,
  onRemoveHeader,
  onToggleHeader,
  onUpdateHeader,
}: HeadersEditorProps) {
  return (
    <div className="flex flex-col gap-2">
      {headers.length === 0 && (
        <p className="text-gray-500 text-sm py-2">No headers added yet.</p>
      )}
      {headers.map((header) => (
        <HeaderRow
          key={header.id}
          header={header}
          onToggle={() => onToggleHeader(header.id)}
          onRemove={() => onRemoveHeader(header.id)}
          onUpdateKey={(value) => onUpdateHeader(header.id, 'key', value)}
          onUpdateValue={(value) => onUpdateHeader(header.id, 'value', value)}
        />
      ))}
      <button
        onClick={onAddHeader}
        className="self-start mt-1 px-3 py-1 text-sm text-blue-400 border border-gray-700 rounded hover:bg-gray-800 hover:border-blue-500 transition-colors"
      >
        + Add Header
      </button>
    </div>
  );
}
