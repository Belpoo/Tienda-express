// Importamos React
import React from "react";
import ReactDOM from "react-dom/client";

// Importamos BrowserRouter (SOLO AQUÍ)
import { BrowserRouter } from "react-router-dom";

import App from "./App";

// Renderizamos la app dentro del div root del index.html
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* BrowserRouter envuelve TODA la aplicación */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);