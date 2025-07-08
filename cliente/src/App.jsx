import React from 'react'
import { AppProvider } from './context/AppContext'
import { ToastProvider } from './components'
import AppRoutes from './routes/AppRoutes'
import './App.css'

function App() {
  return (
    <div className="App">
      <ToastProvider>
        <AppProvider>
          <AppRoutes />
        </AppProvider>
      </ToastProvider>
    </div>
  )
}

export default App
