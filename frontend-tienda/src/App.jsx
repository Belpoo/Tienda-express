import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import Register from "./pages/Registro";
import Login from "./pages/Login";

function App() {

  // Revisamos si hay usuario guardado
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token") ? true : false
  );

  return (
    <Routes>

      {/* Rutas públicas */}
      <Route
        path="/Login"
        element={<Login setIsAuthenticated={setIsAuthenticated} />}
      />

      <Route path="/Registro" element={<Register />} />

      {/* Rutas protegidas */}
      {isAuthenticated && (
        <>
          <Route path="/admin" element={<Home />} />
          <Route path="/Home" element={<Home />} />
        </>
      )}

      {/* Redirección automática */}
      <Route
        path="*"
        element={
          isAuthenticated
            ? <Navigate to="/Home" />
            : <Navigate to="/Login" />
        }
      />

    </Routes>
  );
}

export default App;