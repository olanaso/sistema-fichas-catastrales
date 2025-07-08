import React from 'react'
import { AppProvider } from './context/AppContext'
import AppRoutes from './routes/AppRoutes'
import './App.css'

function App() {
  return (
    <div className="App">
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </div>
  )
}

export default App
