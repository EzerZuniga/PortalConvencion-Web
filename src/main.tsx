import React from 'react'
import ReactDOM from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import App from './App.tsx'
import './assets/css/style.css'

// IMPORTANTE: Configura tu Client ID en el archivo .env
// Crea un archivo .env en la raíz del proyecto y agrega:
// VITE_GOOGLE_CLIENT_ID=tu_client_id_aqui.apps.googleusercontent.com
// 
// Para obtener tu Client ID, sigue los pasos en GOOGLE_OAUTH_SETUP.md
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "CONFIGURA_TU_CLIENT_ID"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
)