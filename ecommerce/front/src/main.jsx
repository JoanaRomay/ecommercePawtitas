import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from '../src/App';
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="238632083591-6rg3re9e693s9u9amt5lvd8vlba82frc.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
);
