import { useState, useCallback } from 'react';

interface ResponseHeadersTableProps {
  headers: Record<string, string>;
}

function CopyIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <rect x="1" y="3" width="7" height="8" rx="1" stroke="currentColor" strokeWidth="1.2" />
      <path d="M4 3V2a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ResponseHeadersTable({ headers }: ResponseHeadersTableProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = useCallback(async (key: string, value: string) => {
    await navigator.clipboard.writeText(`${key}: ${value}`);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  }, []);

  const entries = Object.entries(headers);

  if (entries.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 text-sm text-gray-500">
        No headers
      </div>
    );
  }

  return (
    <div className="overflow-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-400 w-2/5">
              Header Name
            </th>
            <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
              Value
            </th>
            <th className="px-4 py-2.5 w-10" aria-label="Actions" />
          </tr>
        </thead>
        <tbody>
          {entries.map(([key, value], index) => {
            const isCopied = copiedKey === key;
            const isEven = index % 2 === 0;
            return (
              <tr
                key={key}
                className={`group border-b border-gray-700/50 ${isEven ? 'bg-gray-800/40' : 'bg-gray-900/40'} hover:bg-gray-700/30 transition-colors`}
              >
                <td className="px-4 py-2.5 font-mono text-purple-300 align-top break-all">
                  {key}
                </td>
                <td className="px-4 py-2.5 font-mono text-gray-300 align-top break-all">
                  {value}
                </td>
                <td className="px-3 py-2.5 align-top">
                  <button
                    onClick={() => void handleCopy(key, value)}
                    className="opacity-0 group-hover:opacity-100 focus:opacity-100 p-1 rounded text-gray-500 hover:text-gray-200 hover:bg-gray-600 transition-all"
                    aria-label={`Copy ${key} header`}
                    title={isCopied ? 'Copied!' : `Copy "${key}: ${value}"`}
                  >
                    {isCopied ? <CheckIcon /> : <CopyIcon />}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
