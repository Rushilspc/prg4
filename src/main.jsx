import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { HoursProvider } from './context/HoursContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HoursProvider>
      <App />
    </HoursProvider>
  </React.StrictMode>,
)
