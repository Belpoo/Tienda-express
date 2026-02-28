import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

/**
 * PRODUCT DETAIL - Página individual del producto
 * Muestra detalles completos y permite agregar al carrito
 */
function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" o "error"

  // Obtener datos del producto
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        setMessage("❌ Error al cargar el producto");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Agregar producto al carrito
  const handleAddToCart = async () => {
    try {
      setMessage("");
      await API.post("/cart", {
        product: product._id,
        quantity: 1,
      });

      setMessageType("success");
      setMessage("✅ Producto agregado al carrito");
    } catch (error) {
      setMessageType("error");
      setMessage("❌ Error al agregar al carrito");
      console.error(error);
    }
  };

  if (loading) {
    return <p style={styles.centerText}>Cargando producto...</p>;
  }

  if (!product) {
    return <p style={styles.centerText}>Producto no encontrado</p>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>{product.name}</h1>

        <p style={styles.price}>${product.price}</p>

        <p style={styles.description}>
          {product.description || "Sin descripción disponible"}
        </p>

        <div style={styles.buttonGroup}>
          <button onClick={handleAddToCart} style={styles.buttonPrimary}>
            🛒 Agregar al carrito
          </button>
          <button style={styles.buttonSecondary}>❤️ Favoritos</button>
        </div>

        {message && (
          <p style={{
            ...styles.message,
            color: messageType === "success" ? "#27ae60" : "#e74c3c"
          }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "80vh",
    padding: "20px",
  },
  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "8px",
    width: "100%",
    maxWidth: "500px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  title: {
    margin: "0 0 16px 0",
    fontSize: "28px",
    fontWeight: "600",
    color: "#1a1a1a",
  },
  price: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#27ae60",
    margin: "8px 0 20px 0",
  },
  description: {
    color: "#666",
    margin: "0 0 24px 0",
    lineHeight: "1.6",
  },
  buttonGroup: {
    display: "flex",
    gap: "12px",
    marginBottom: "20px",
  },
  buttonPrimary: {
    flex: 1,
    padding: "12px",
    backgroundColor: "#333",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    transition: "background 0.2s",
  },
  buttonSecondary: {
    flex: 1,
    padding: "12px",
    backgroundColor: "#fff",
    color: "#333",
    border: "2px solid #333",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    transition: "all 0.2s",
  },
  message: {
    padding: "12px",
    borderRadius: "6px",
    fontSize: "14px",
    textAlign: "center",
  },
  centerText: {
    textAlign: "center",
    padding: "40px 20px",
    fontSize: "16px",
    color: "#999",
  },
};

export default ProductDetail;