interface BodyEditorProps {
  body: string;
  onChange: (value: string) => void;
}

export function BodyEditor({ body, onChange }: BodyEditorProps) {
  const handleFormatJson = () => {
    try {
      const parsed = JSON.parse(body);
      onChange(JSON.stringify(parsed, null, 2));
    } catch {
      // Silently ignore invalid JSON
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400 uppercase tracking-wide">Body (JSON)</span>
        <button
          onClick={handleFormatJson}
          className="px-2 py-0.5 text-xs text-gray-300 border border-gray-700 rounded hover:bg-gray-700 hover:text-white transition-colors"
        >
          Format JSON
        </button>
      </div>
      <textarea
        value={body}
        onChange={(e) => onChange(e.target.value)}
        placeholder='{"key": "value"}'
        rows={8}
        className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white text-sm font-mono placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
      />
    </div>
  );
}
