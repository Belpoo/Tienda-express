//Barra de navegación
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; 

function Navbar() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  }
  return (
    
    //Link para navegar sin recargar la página.
    <nav style={navStyle}>
      <Link to="/">Home</Link>
      <Link to="/cart">Carrito</Link>
      <button onClick={logout}>Cerrar sesión</button> 
    </nav>
  );
}

const navStyle = {
  display: "flex",
  gap: "20px",
  padding: "15px",
  backgroundColor: "#eee"
};

export default Navbar;