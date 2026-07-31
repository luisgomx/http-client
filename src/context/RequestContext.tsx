import {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from 'react';
import type {
  RequestState,
  RequestAction,
  HttpMethod,
} from '../types/http.types';

const initialState: RequestState = {
  config: {
    method: 'GET' as HttpMethod,
    url: '',
    headers: [],
    body: '',
  },
  response: null,
  loading: false,
  error: null,
};

function requestReducer(state: RequestState, action: RequestAction): RequestState {
  switch (action.type) {
    case 'SET_METHOD':
      return {
        ...state,
        config: { ...state.config, method: action.payload },
      };
    case 'SET_URL':
      return {
        ...state,
        config: { ...state.config, url: action.payload },
      };
    case 'SET_HEADERS':
      return {
        ...state,
        config: { ...state.config, headers: action.payload },
      };
    case 'SET_BODY':
      return {
        ...state,
        config: { ...state.config, body: action.payload },
      };
    case 'SEND_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
        response: null,
      };
    case 'REQUEST_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        response: action.payload,
      };
    case 'REQUEST_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
        response: null,
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

interface RequestContextValue {
  state: RequestState;
  dispatch: React.Dispatch<RequestAction>;
}

const RequestContext = createContext<RequestContextValue | null>(null);

interface RequestContextProviderProps {
  children: ReactNode;
}

export function RequestContextProvider({ children }: RequestContextProviderProps) {
  const [state, dispatch] = useReducer(requestReducer, initialState);

  return (
    <RequestContext.Provider value={{ state, dispatch }}>
      {children}
    </RequestContext.Provider>
  );
}

export function useRequestContext(): RequestContextValue {
  const context = useContext(RequestContext);
  if (context === null) {
    throw new Error('useRequestContext must be used within a RequestContextProvider');
  }
  return context;
}
