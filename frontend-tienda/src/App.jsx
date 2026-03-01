import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import Register from "./pages/Registro";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import AdminProducts from "./pages/admin/AdminProducts";
import EditProduct from "./pages/admin/EditProduct";
import NewProduct from "./pages/admin/NewProduct";
import UserLayout from "./pages/UserLayout";

function App() {

  // Revisamos si hay usuario guardado
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token") ? true : false
  );

  return (
    <>
      {isAuthenticated}

      <Routes>
        {/* Públicas */}
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />

        <Route path="/registro"
          element={<Register />}
        />


        {/* Privadas */}
        {isAuthenticated && (
          <>

            {/* Rutas con navbar */}
            <Route element={<UserLayout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
            </Route>

            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/admin" element={<AdminProducts />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/products/edit/:id" element={<EditProduct />} />
            <Route path="/admin/products/create" element={<NewProduct />} />
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