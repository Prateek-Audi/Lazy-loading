import React from 'react';
import App from './App';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from './reportWebVitals';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
