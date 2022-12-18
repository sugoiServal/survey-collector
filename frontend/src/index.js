import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';
import './index.css'
import { AuthContextProvider } from './context/AuthContext'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleReCaptchaProvider
      reCaptchaKey={"6LdjfoYjAAAAAHzWYeMWeUzTYjQUUevXfgDDhNed"}
    >
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
    </GoogleReCaptchaProvider>
  </React.StrictMode>
);

