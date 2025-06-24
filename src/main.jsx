import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ApiServiceProvider } from './context/Context.jsx';

createRoot(document.getElementById('root')).render(
    <ApiServiceProvider>
      <App />
    </ApiServiceProvider>
)
