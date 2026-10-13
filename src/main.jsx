import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Si le site est déployé dans un sous-dossier, ajoutez basename="/dossier" */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
