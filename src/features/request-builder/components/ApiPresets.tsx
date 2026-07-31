import { useState } from 'react';
import { API_PRESETS, type ApiPreset } from '../data/presets';

const METHOD_COLORS: Record<string, string> = {
  GET: 'text-green-400 bg-green-400/10',
  POST: 'text-blue-400 bg-blue-400/10',
  PUT: 'text-yellow-400 bg-yellow-400/10',
  PATCH: 'text-orange-400 bg-orange-400/10',
  DELETE: 'text-red-400 bg-red-400/10',
};

interface ApiPresetsProps {
  onSelect: (preset: ApiPreset) => void;
}

export function ApiPresets({ onSelect }: ApiPresetsProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-sm text-gray-300 hover:text-white transition-colors"
      >
        <div className="flex items-center gap-2">
          <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className="font-medium">Quick test — JSONPlaceholder</span>
        </div>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="bg-gray-900 border-t border-gray-700 p-3 flex flex-wrap gap-2">
          {API_PRESETS.map((preset) => (
            <button
              key={`${preset.method}-${preset.url}`}
              onClick={() => {
                onSelect(preset);
                setOpen(false);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-gray-700 bg-gray-800 hover:bg-gray-700 hover:border-gray-600 transition-colors group"
            >
              <span className={`text-[10px] font-bold font-mono px-1 py-0.5 rounded ${METHOD_COLORS[preset.method] ?? 'text-gray-400'}`}>
                {preset.method}
              </span>
              <span className="text-xs text-gray-300 group-hover:text-white transition-colors">
                {preset.label}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
