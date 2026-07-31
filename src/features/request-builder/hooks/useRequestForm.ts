import { useState, useCallback } from 'react';
import type { HttpMethod, HeaderEntry, RequestConfig } from '../../../types/http.types';

export function useRequestForm() {
  const [method, setMethod] = useState<HttpMethod>('GET');
  const [url, setUrl] = useState<string>('');
  const [headers, setHeaders] = useState<HeaderEntry[]>([]);
  const [body, setBody] = useState<string>('');

  const addHeader = useCallback(() => {
    const newHeader: HeaderEntry = {
      id: crypto.randomUUID(),
      key: '',
      value: '',
      enabled: true,
    };
    setHeaders((prev) => [...prev, newHeader]);
  }, []);

  const removeHeader = useCallback((id: string) => {
    setHeaders((prev) => prev.filter((h) => h.id !== id));
  }, []);

  const toggleHeader = useCallback((id: string) => {
    setHeaders((prev) =>
      prev.map((h) => (h.id === id ? { ...h, enabled: !h.enabled } : h)),
    );
  }, []);

  const updateHeader = useCallback(
    (id: string, field: 'key' | 'value', value: string) => {
      setHeaders((prev) =>
        prev.map((h) => (h.id === id ? { ...h, [field]: value } : h)),
      );
    },
    [],
  );

  const buildConfig = useCallback((): RequestConfig => {
    return { method, url, headers, body };
  }, [method, url, headers, body]);

  return {
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
  };
}
