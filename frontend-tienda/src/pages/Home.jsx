import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

/**
 * HOME - Página principal
 * Muestra el catálogo de productos obtenidos del backend
 */
function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener productos al montar el componente
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/products");
        if (!response.ok) throw new Error("Error al conectar con el servidor");
        
        const data = await response.json();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p style={styles.centerText}>Cargando productos...</p>;
  }

  if (error) {
    return <p style={{ ...styles.centerText, color: "#e74c3c" }}>⚠️ {error}</p>;
  }

  if (products.length === 0) {
    return <p style={styles.centerText}>No hay productos disponibles</p>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Catálogo de Productos</h1>
      <p style={styles.subtitle}>{products.length} productos disponibles</p>

      <div style={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 20px",
  },
  title: {
    fontSize: "32px",
    fontWeight: "700",
    margin: "0 0 8px 0",
    color: "#1a1a1a",
  },
  subtitle: {
    fontSize: "14px",
    color: "#666",
    margin: "0 0 30px 0",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "20px",
  },
  centerText: {
    textAlign: "center",
    padding: "60px 20px",
    fontSize: "18px",
    color: "#999",
  },
};

export default Home;