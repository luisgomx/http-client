import { useRequestContext } from '../../context/RequestContext';
import { EmptyState } from '../../shared/components/EmptyState';
import { Spinner } from '../../shared/components/Spinner';
import { useResponseDisplay } from './hooks/useResponseDisplay';
import { StatusBadge } from './components/StatusBadge';
import { ResponseTabs } from './components/ResponseTabs';
import { JsonViewer } from './components/JsonViewer';
import { ResponseHeadersTable } from './components/ResponseHeadersTable';

export function ResponseViewer() {
  const { state } = useRequestContext();
  const { loading, error, response } = state;
  const { activeTab, setActiveTab } = useResponseDisplay();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-900">
        <Spinner size="md" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-900 p-6">
        <div className="flex items-start gap-3 max-w-lg w-full bg-red-900/20 border border-red-700/50 rounded-lg px-4 py-3">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            className="mt-0.5 shrink-0 text-red-400"
          >
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8 5v3.5M8 11h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <p className="text-sm text-red-400 leading-relaxed">{error}</p>
        </div>
      </div>
    );
  }

  if (!response) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-900">
        <EmptyState message="Send a request to see the response" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      <StatusBadge
        status={response.status}
        statusText={response.statusText}
        durationMs={response.durationMs}
      />
      <ResponseTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 overflow-hidden">
        {activeTab === 'body' ? (
          <JsonViewer
            body={response.body}
            isJson={response.isJson}
            parsedBody={response.parsedBody}
          />
        ) : (
          <ResponseHeadersTable headers={response.headers} />
        )}
      </div>
    </div>
  );
}
