import { useState, useEffect } from 'react'
import { RequestContextProvider } from './context/RequestContext'
import { useRequestContext } from './context/RequestContext'
import { RequestBuilder } from './features/request-builder'
import { ResponseViewer } from './features/response-viewer'

type MobilePanel = 'request' | 'response'

function AppLayout() {
  const [mobilePanel, setMobilePanel] = useState<MobilePanel>('request')
  const { state } = useRequestContext()

  useEffect(() => {
    if (state.response || state.error) {
      setMobilePanel('response')
    }
  }, [state.response, state.error])

  return (
    <div className="h-screen bg-gray-950 text-white flex flex-col overflow-hidden">
      <header className="border-b border-gray-800 px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500 shrink-0" />
          <span className="font-semibold text-white tracking-tight">HTTP Client</span>
          <span className="hidden sm:inline text-gray-600 text-sm">API Request Inspector</span>
        </div>

        {/* Mobile panel toggle — hidden on md+ */}
        <div className="flex md:hidden bg-gray-800 rounded-lg p-0.5 gap-0.5">
          {(['request', 'response'] as MobilePanel[]).map((panel) => (
            <button
              key={panel}
              onClick={() => setMobilePanel(panel)}
              className={`relative px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-colors ${
                mobilePanel === panel
                  ? 'bg-gray-600 text-white'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {panel}
              {panel === 'response' && state.response && (
                <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-green-400" />
              )}
              {panel === 'response' && state.error && (
                <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-red-400" />
              )}
            </button>
          ))}
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden gap-4 p-4">
        <div className={`overflow-y-auto md:block md:w-1/2 ${mobilePanel === 'request' ? 'flex-1' : 'hidden'}`}>
          <RequestBuilder />
        </div>
        <div className={`overflow-y-auto md:block md:w-1/2 ${mobilePanel === 'response' ? 'flex-1' : 'hidden'}`}>
          <ResponseViewer />
        </div>
      </main>
    </div>
  )
}

function App() {
  return (
    <RequestContextProvider>
      <AppLayout />
    </RequestContextProvider>
  )
}

export default App
