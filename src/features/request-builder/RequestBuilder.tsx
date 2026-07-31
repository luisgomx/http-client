import { useState } from 'react';
import { useRequestForm } from './hooks/useRequestForm';
import { useRequestContext } from '../../context/RequestContext';
import { useHttpRequest } from '../../hooks/useHttpRequest';
import { MethodSelector } from './components/MethodSelector';
import { UrlInput } from './components/UrlInput';
import { HeadersEditor } from './components/HeadersEditor';
import { BodyEditor } from './components/BodyEditor';
import { SendButton } from './components/SendButton';
import { ApiPresets } from './components/ApiPresets';
import type { ApiPreset } from './data/presets';
import type { HttpMethod } from '../../types/http.types';

const BODY_METHODS = new Set(['POST', 'PUT', 'PATCH']);

type Tab = 'headers' | 'body';

export function RequestBuilder() {
  const {
    method,
    setMethod,
    url,
    setUrl,
    headers,
    setHeaders,
    addHeader,
    removeHeader,
    toggleHeader,
    updateHeader,
    body,
    setBody,
    buildConfig,
  } = useRequestForm();

  const { state } = useRequestContext();
  const { sendRequest, cancel } = useHttpRequest();

  const showBodyTab = BODY_METHODS.has(method);
  const [activeTab, setActiveTab] = useState<Tab>('headers');

  // If the method changes to one that doesn't support body, reset to headers tab
  const handleMethodChange = (newMethod: HttpMethod) => {
    setMethod(newMethod);
    if (!BODY_METHODS.has(newMethod) && activeTab === 'body') {
      setActiveTab('headers');
    }
  };

  const handleSend = () => {
    if (!url.trim()) return;
    sendRequest(buildConfig());
  };

  const handleLoadPreset = (preset: ApiPreset) => {
    handleMethodChange(preset.method);
    setUrl(preset.url);
    setBody(preset.body ?? '');
    if (preset.headers) {
      setHeaders(
        Object.entries(preset.headers).map(([key, value]) => ({
          id: crypto.randomUUID(),
          key,
          value,
          enabled: true,
        }))
      );
    } else {
      setHeaders([]);
    }
    if (preset.body && BODY_METHODS.has(preset.method)) {
      setActiveTab('body');
    }
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: 'headers', label: `Headers${headers.length > 0 ? ` (${headers.length})` : ''}` },
    ...(showBodyTab ? [{ id: 'body' as Tab, label: 'Body' }] : []),
  ];

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 flex flex-col gap-4">
      {/* Preset picker */}
      <ApiPresets onSelect={handleLoadPreset} />

      {/* Method + URL row */}
      <div className="flex items-center gap-2">
        <MethodSelector method={method} onMethodChange={handleMethodChange} />
        <UrlInput url={url} onChange={setUrl} onSend={handleSend} />
      </div>

      {/* Tabs */}
      <div className="flex flex-col gap-0">
        <div className="flex border-b border-gray-700">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="pt-3">
          {activeTab === 'headers' && (
            <HeadersEditor
              headers={headers}
              onAddHeader={addHeader}
              onRemoveHeader={removeHeader}
              onToggleHeader={toggleHeader}
              onUpdateHeader={updateHeader}
            />
          )}
          {activeTab === 'body' && showBodyTab && (
            <BodyEditor body={body} onChange={setBody} />
          )}
        </div>
      </div>

      {/* Send / Cancel */}
      <div className="flex justify-end pt-1">
        <SendButton
          loading={state.loading}
          onSend={handleSend}
          onCancel={cancel}
          disabled={!url.trim()}
        />
      </div>
    </div>
  );
}
