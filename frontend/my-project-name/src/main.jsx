import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react'

// Vite mein .env variables import.meta.env se access hote hain
const PUBLISHABLE_KEY = import.meta.env.pk_test_bW9kZXJuLXNuYWtlLTQyODQuY2xlcmsuYWNjb3VudHMuZGV2JA

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <App />
    </ClerkProvider>
  </React.StrictMode>,
)