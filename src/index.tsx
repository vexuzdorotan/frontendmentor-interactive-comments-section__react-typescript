import React from 'react'
import ReactDOM from 'react-dom/client'

import reportAccessibility from './utils/reportAccessibility'
import './index.css'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

reportAccessibility(React)
