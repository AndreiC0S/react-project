import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContexProvider } from './context/authContext';
import { CartContextProvider } from "./context/cartContext";
import { LrContextProvider } from './context/lrContext';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContexProvider>
      <CartContextProvider>
        <LrContextProvider>


          <App />

        </LrContextProvider>
      </CartContextProvider>
    </AuthContexProvider>


  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

