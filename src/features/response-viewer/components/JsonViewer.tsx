import { useCallback } from 'react';
import { useResponseDisplay } from '../hooks/useResponseDisplay';

interface JsonViewerProps {
  body: string;
  isJson: boolean;
  parsedBody: unknown | null;
}

function syntaxHighlight(json: string): string {
  // Escape HTML entities first to prevent injection
  const escaped = json
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  return escaped.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
    (match) => {
      // Object key: quoted string followed by colon
      if (/^"/.test(match) && /:$/.test(match)) {
        // Key includes trailing colon — split it out so the colon is punctuation-colored
        const key = match.slice(0, -1);
        return `<span class="text-purple-300">${key}</span><span class="text-gray-400">:</span>`;
      }
      // Regular string value
      if (/^"/.test(match)) {
        return `<span class="text-green-400">${match}</span>`;
      }
      // Boolean or null
      if (/true|false|null/.test(match)) {
        return `<span class="text-yellow-400">${match}</span>`;
      }
      // Number
      return `<span class="text-blue-400">${match}</span>`;
    },
  );
}

export function JsonViewer({ body, isJson, parsedBody }: JsonViewerProps) {
  const { copied, copyToClipboard } = useResponseDisplay();

  const formattedJson = isJson && parsedBody !== null
    ? JSON.stringify(parsedBody, null, 2)
    : null;

  const handleCopy = useCallback(() => {
    if (formattedJson !== null) {
      void copyToClipboard(formattedJson);
    } else {
      void copyToClipboard(body);
    }
  }, [formattedJson, body, copyToClipboard]);

  if (isJson && parsedBody !== null && formattedJson !== null) {
    const highlighted = syntaxHighlight(formattedJson);

    return (
      <div className="relative h-full">
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded bg-gray-700 hover:bg-gray-600 text-xs text-gray-300 hover:text-white transition-colors border border-gray-600"
          aria-label="Copy JSON"
        >
          {copied ? (
            <>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <rect x="1" y="3" width="7" height="8" rx="1" stroke="currentColor" strokeWidth="1.2" />
                <path d="M4 3V2a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              Copy
            </>
          )}
        </button>
        <pre
          className="font-mono text-sm text-gray-300 p-4 overflow-auto h-full leading-relaxed whitespace-pre"
          // Safe: content comes from JSON.stringify output run through an HTML-escaping step
          // before the regex. No user-controlled strings can introduce script tags.
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </div>
    );
  }

  return (
    <div className="relative h-full">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded bg-gray-700 hover:bg-gray-600 text-xs text-gray-300 hover:text-white transition-colors border border-gray-600"
        aria-label="Copy response body"
      >
        {copied ? (
          <>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Copied
          </>
        ) : (
          <>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <rect x="1" y="3" width="7" height="8" rx="1" stroke="currentColor" strokeWidth="1.2" />
              <path d="M4 3V2a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            Copy
          </>
        )}
      </button>
      <pre className="font-mono text-sm text-gray-300 p-4 overflow-auto h-full leading-relaxed whitespace-pre-wrap break-words">
        {body}
      </pre>
    </div>
  );
}
