// Este componente representa UNA tarjeta de producto
// Recibe datos por "props" (propiedades)
import { useNavigate } from "react-router-dom";

//{product} significa que estamos recibiendo algo llamado product
function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div style={cardStyle}>
      <h3>{product.name}</h3>
      <p>Precio: ${product.price}</p>

      <button 
        onClick={() => navigate(`/product/${product._id}`)} style={buttonStyle}>
        Ver detalles
      </button>
    </div>
  );
}

// Estilos básicos en JavaScript
const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "16px",
  width: "200px",
  textAlign: "center",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
};

const buttonStyle = {
  marginTop: "10px",
  padding: "8px 12px",
  backgroundColor: "black",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

export default ProductCard;