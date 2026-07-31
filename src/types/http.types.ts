export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface HeaderEntry {
  id: string;
  key: string;
  value: string;
  enabled: boolean;
}

export interface RequestConfig {
  method: HttpMethod;
  url: string;
  headers: HeaderEntry[];
  body: string;
}

export interface ResponseData {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: string;
  parsedBody: unknown | null;
  isJson: boolean;
  durationMs: number;
  timestamp: Date;
}

export interface RequestState {
  config: RequestConfig;
  response: ResponseData | null;
  loading: boolean;
  error: string | null;
}

export type RequestAction =
  | { type: 'SET_METHOD'; payload: HttpMethod }
  | { type: 'SET_URL'; payload: string }
  | { type: 'SET_HEADERS'; payload: HeaderEntry[] }
  | { type: 'SET_BODY'; payload: string }
  | { type: 'SEND_REQUEST' }
  | { type: 'REQUEST_SUCCESS'; payload: ResponseData }
  | { type: 'REQUEST_ERROR'; payload: string }
  | { type: 'RESET' };
