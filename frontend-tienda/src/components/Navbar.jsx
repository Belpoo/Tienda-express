//Barra de navegación
import { Link } from "react-router-dom";

function Navbar() {
  return (
    //Link para navegar sin recargar la página.
    <nav style={navStyle}>
      <Link to="/">Home</Link>
      <Link to="/cart">Carrito</Link>
      <Link to="/favorites">Favoritos</Link>
      <Link to="/orders">Órdenes</Link>
    </nav>
  );
}

const logout = () => {
  localStorage.removeItem("user");
  window.location.reload(); // recarga la app
};

const navStyle = {
  display: "flex",
  gap: "20px",
  padding: "15px",
  backgroundColor: "#eee"
};

export default Navbar;