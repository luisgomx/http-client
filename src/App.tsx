import { RequestContextProvider } from './context/RequestContext'
import { RequestBuilder } from './features/request-builder'
import { ResponseViewer } from './features/response-viewer'

function App() {
  return (
    <RequestContextProvider>
      <div className="h-screen bg-gray-950 text-white flex flex-col overflow-hidden">
        <header className="border-b border-gray-800 px-6 py-3 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="font-semibold text-white tracking-tight">HTTP Client</span>
          </div>
          <span className="text-gray-600 text-sm">API Request Inspector</span>
        </header>
        <main className="flex flex-1 overflow-hidden gap-4 p-4">
          <div className="w-1/2 overflow-y-auto">
            <RequestBuilder />
          </div>
          <div className="w-1/2 overflow-y-auto">
            <ResponseViewer />
          </div>
        </main>
      </div>
    </RequestContextProvider>
  )
}

export default App
