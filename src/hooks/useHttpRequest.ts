import { useRef, useCallback } from 'react';
import type { RequestConfig, ResponseData } from '../types/http.types';
import { useRequestContext } from '../context/RequestContext';

const BODY_METHODS = new Set(['POST', 'PUT', 'PATCH']);

export function useHttpRequest() {
  const { dispatch } = useRequestContext();
  const abortControllerRef = useRef<AbortController | null>(null);

  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  const sendRequest = useCallback(
    async (config: RequestConfig): Promise<void> => {
      cancel();

      const controller = new AbortController();
      abortControllerRef.current = controller;

      dispatch({ type: 'SEND_REQUEST' });

      const startTime = performance.now();

      try {
        const enabledHeaders = config.headers.filter((h) => h.enabled && h.key.trim() !== '');
        const headersInit: Record<string, string> = {};
        for (const header of enabledHeaders) {
          headersInit[header.key] = header.value;
        }

        const fetchOptions: RequestInit = {
          method: config.method,
          headers: headersInit,
          signal: controller.signal,
        };

        if (BODY_METHODS.has(config.method) && config.body) {
          fetchOptions.body = config.body;
        }

        const response = await fetch(config.url, fetchOptions);

        const durationMs = performance.now() - startTime;

        const bodyText = await response.text();

        let parsedBody: unknown | null = null;
        let isJson = false;
        try {
          parsedBody = JSON.parse(bodyText);
          isJson = true;
        } catch {
          parsedBody = null;
          isJson = false;
        }

        const responseHeaders: Record<string, string> = {};
        response.headers.forEach((value, key) => {
          responseHeaders[key] = value;
        });

        const responseData: ResponseData = {
          status: response.status,
          statusText: response.statusText,
          headers: responseHeaders,
          body: bodyText,
          parsedBody,
          isJson,
          durationMs,
          timestamp: new Date(),
        };

        dispatch({ type: 'REQUEST_SUCCESS', payload: responseData });
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
        const message = err instanceof Error ? err.message : String(err);
        dispatch({ type: 'REQUEST_ERROR', payload: message });
      } finally {
        if (abortControllerRef.current === controller) {
          abortControllerRef.current = null;
        }
      }
    },
    [cancel, dispatch],
  );

  return { sendRequest, cancel };
}
