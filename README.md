# HTTP Client

A browser-based API request inspector built with React and TypeScript. Select an HTTP method, enter a URL, configure headers and a request body, send the request, and inspect the response — status code, formatted JSON, and response headers.

## Getting started

```bash
npm install
npm run dev
```

---

## Project structure

```
src/
├── types/
│   └── http.types.ts
├── context/
│   └── RequestContext.tsx
├── hooks/
│   └── useHttpRequest.ts
├── features/
│   ├── request-builder/
│   │   ├── RequestBuilder.tsx
│   │   ├── index.ts
│   │   ├── data/
│   │   │   └── presets.ts
│   │   ├── components/
│   │   │   ├── ApiPresets.tsx
│   │   │   ├── MethodSelector.tsx
│   │   │   ├── UrlInput.tsx
│   │   │   ├── HeadersEditor.tsx
│   │   │   ├── HeaderRow.tsx
│   │   │   ├── BodyEditor.tsx
│   │   │   └── SendButton.tsx
│   │   └── hooks/
│   │       └── useRequestForm.ts
│   └── response-viewer/
│       ├── ResponseViewer.tsx
│       ├── index.ts
│       ├── components/
│       │   ├── StatusBadge.tsx
│       │   ├── ResponseTabs.tsx
│       │   ├── JsonViewer.tsx
│       │   └── ResponseHeadersTable.tsx
│       └── hooks/
│           └── useResponseDisplay.ts
└── shared/
    ├── components/
    │   ├── Spinner.tsx
    │   └── EmptyState.tsx
    └── utils/
        ├── formatJson.ts
        └── statusColor.ts
```

---

## Architecture

### Feature-based layout

The `src/features/` directory is the core of the codebase. Each feature is self-contained: its components, hooks, and data live together and are exported through a single `index.ts` barrel. Features communicate only through shared context — they never import from each other.

```
App
└── RequestContextProvider
    ├── RequestBuilder   (left panel)
    └── ResponseViewer  (right panel)
```

### State management

All shared state lives in `RequestContext` (`src/context/RequestContext.tsx`), which uses `useReducer` internally. The context value exposes `{ state, dispatch }` to any consumer.

```
RequestState
├── config       — the last committed request (method, url, headers, body)
├── response     — ResponseData | null
├── loading      — boolean
└── error        — string | null
```

`RequestBuilder` reads `state.loading` to disable the send button. `ResponseViewer` reads `state.response`, `state.loading`, and `state.error` to decide what to render. Neither feature imports anything from the other.

### Separation of form state from request state

`useRequestForm` (`request-builder/hooks/`) holds ephemeral form state — method, URL, headers array, body text — as local component state. This state is never written to context while the user is typing. Only when the user clicks Send does `buildConfig()` serialize the form into a `RequestConfig` and hand it to `useHttpRequest`. This keeps `ResponseViewer` from re-rendering on every keystroke.

### Data flow

```
User edits form
      │
      ▼
useRequestForm          (local state in RequestBuilder)
      │
      │  buildConfig()
      ▼
useHttpRequest(config)  (src/hooks/)
      │
      ├─ dispatch(SEND_REQUEST)     → loading: true
      │
      ├─ fetch() with AbortController
      │
      └─ dispatch(REQUEST_SUCCESS)  → response: ResponseData
         dispatch(REQUEST_ERROR)    → error: string
                  │
                  ▼
         RequestContext.state
                  │
                  ▼
         ResponseViewer reads and renders
```

### HTTP layer

`useHttpRequest` (`src/hooks/useHttpRequest.ts`) is the only place `fetch` is called. Responsibilities:

- Builds the `Headers` object from enabled header entries only
- Attaches a body only for `POST`, `PUT`, and `PATCH`
- Uses `AbortController` so in-flight requests can be cancelled
- Reads the response body as text, then attempts `JSON.parse` to set `isJson` and `parsedBody`
- Collects response headers via `response.headers.forEach`
- Measures duration with `performance.now()`

### Shared utilities

| File | Purpose |
|---|---|
| `shared/utils/formatJson.ts` | Attempts `JSON.parse` on a string; returns either a pretty-printed result or the raw string |
| `shared/utils/statusColor.ts` | Maps a status code to Tailwind color classes (2xx green, 3xx blue, 4xx yellow, 5xx red) |
| `shared/components/Spinner.tsx` | Animated SVG spinner, size `sm` or `md` |
| `shared/components/EmptyState.tsx` | Centered placeholder shown before any request is made |

### Preset API definitions

`request-builder/data/presets.ts` holds a static list of `ApiPreset` objects (JSONPlaceholder endpoints). Selecting a preset populates the form — method, URL, headers, and body — in one action via `handleLoadPreset` in `RequestBuilder`. No network calls happen until the user clicks Send.

---

## Tech stack

| | |
|---|---|
| Framework | React 18 + TypeScript |
| Build tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| HTTP | Native `fetch` API |
| State | `useReducer` + React Context |
