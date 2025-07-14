import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' // Make sure this path is correct: ./App.jsx or ./App.tsx
import './index.css' // Crucial: This imports your Tailwind CSS

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
