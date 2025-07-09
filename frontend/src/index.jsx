import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

// Si tienes reportWebVitals y lo usas, puedes importarlo, si no, bórralo
// import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Si quieres usar reportWebVitals, descomenta la siguiente línea
// reportWebVitals();
