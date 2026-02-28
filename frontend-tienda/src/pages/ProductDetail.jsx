import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loadingCart, setLoadingCart] = useState(false);
  const [message, setMessage] = useState("");

  // 🔹 TRAER PRODUCTO
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  // 🔹 AGREGAR AL CARRITO
  const addToCart = async () => {
    try {
      setLoadingCart(true);
      setMessage("");

      await API.post("/cart", {
        product: product._id,
        quantity: 1,
      });

      setMessage("✅ Producto agregado al carrito");
    } catch (error) {
      console.log(error);
      setMessage("❌ Error al agregar al carrito");
    } finally {
      setLoadingCart(false);
    }
  };

  if (!product) return <p style={{ textAlign: "center" }}>Cargando...</p>;

  return (
    <div style={container}>
      <div style={card}>
        <h2>{product.name}</h2>

        <p style={price}>${product.price}</p>

        <p style={description}>
          {product.description || "Sin descripción disponible"}
        </p>

        <div style={buttonContainer}>
          <button
            style={cartButton}
            onClick={addToCart}
            disabled={loadingCart}
          >
            {loadingCart ? "Agregando..." : "🛒 Agregar al carrito"}
          </button>

          <button style={favButton}>❤️ Favoritos</button>
        </div>

        {message && <p style={msg}>{message}</p>}
      </div>
    </div>
  );
}

export default ProductDetail;

const container = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "80vh",
};

const card = {
  background: "#fff",
  padding: "30px",
  borderRadius: "12px",
  width: "350px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
  textAlign: "center",
};

const price = {
  fontSize: "20px",
  fontWeight: "bold",
  margin: "10px 0",
};

const description = {
  color: "#555",
  marginBottom: "20px",
};

const buttonContainer = {
  display: "flex",
  gap: "10px",
  justifyContent: "center",
};

const cartButton = {
  padding: "10px",
  border: "none",
  borderRadius: "6px",
  background: "black",
  color: "white",
  cursor: "pointer",
};

const favButton = {
  padding: "10px",
  border: "1px solid black",
  borderRadius: "6px",
  background: "white",
  cursor: "pointer",
};

const msg = {
  marginTop: "15px",
  fontWeight: "bold",
  color: "green",
};