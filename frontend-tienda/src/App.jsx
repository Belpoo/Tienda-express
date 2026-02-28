import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import Register from "./pages/Registro";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import ProductDetail from "./pages/ProductDetail";

function App() {

  // Revisamos si hay usuario guardado
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token") ? true : false
  );

  return (
    <>
      {isAuthenticated && <Navbar />}

      <Routes>
        {/* Públicas */}
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />

        <Route path="/registro" element={<Register />} />

        {/* Privadas */}
        {isAuthenticated && (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/admin" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </>
        )}

        {/* Redirect */}
        <Route
          path="*"
          element={
            isAuthenticated
              ? <Navigate to="/home" />
              : <Navigate to="/login" />
          }
        />
      </Routes>
    </>
  );
}
export default App;