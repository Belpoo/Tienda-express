import { useEffect, useState } from "react";
import API from "../services/api";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <div style={loadingContainer}><span style={spinner}></span></div>;
  }

  return (
    <div style={container}>
      <div style={headerSection}>
        <h2 style={title}>Inventario 🛠️</h2>
        <p style={subtitle}>{products.length} productos</p>
      </div>

      <div style={tableWrapper}>
        <table style={table}>
          <thead>
            <tr style={headerRow}>
              <th style={headerCell}>Producto</th>
              <th style={headerCell}>Precio</th>
              <th style={{ ...headerCell, textAlign: "center" }}>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product._id} style={bodyRow}>
                <td style={cell}>{product.name}</td>
                <td style={priceCell}>${product.price}</td>
                <td style={actionCell}>
                  <button style={editBtn} title="Editar">✏️</button>
                  <button style={deleteBtn} title="Eliminar">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminProducts;

// ========== ESTILOS ==========

const loadingContainer = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "400px",
};

const spinner = {
  display: "inline-block",
  width: "30px",
  height: "30px",
  border: "4px solid #e0e0e0",
  borderTop: "4px solid #333",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
};

const container = {
  maxWidth: "1000px",
  margin: "40px auto",
  padding: "0 20px",
};

const headerSection = {
  marginBottom: "30px",
};

const title = {
  fontSize: "28px",
  fontWeight: "600",
  margin: "0 0 8px 0",
  color: "#1a1a1a",
};

const subtitle = {
  fontSize: "14px",
  color: "#666",
  margin: 0,
};

const tableWrapper = {
  borderRadius: "8px",
  overflow: "hidden",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
  background: "#fff",
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};

const headerRow = {
  background: "#f8f9fa",
  borderBottom: "2px solid #e0e0e0",
};

const headerCell = {
  padding: "16px",
  textAlign: "left",
  fontSize: "13px",
  fontWeight: "600",
  color: "#555",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};

const bodyRow = {
  borderBottom: "1px solid #f0f0f0",
  transition: "background-color 0.2s ease",
  ":hover": {
    backgroundColor: "#fafafa",
  },
};

const cell = {
  padding: "14px 16px",
  color: "#1a1a1a",
  fontSize: "14px",
};

const priceCell = {
  ...cell,
  fontWeight: "600",
  color: "#2ecc71",
};

const actionCell = {
  padding: "14px 16px",
  textAlign: "center",
  display: "flex",
  gap: "8px",
  justifyContent: "center",
  alignItems: "center",
};

const buttonBase = {
  padding: "8px 12px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "16px",
  transition: "all 0.2s ease",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
};

const editBtn = {
  ...buttonBase,
  background: "#333",
  color: "#fff",
  ":hover": {
    background: "#111",
    transform: "scale(1.1)",
  },
};

const deleteBtn = {
  ...buttonBase,
  background: "#ff4757",
  color: "#fff",
  ":hover": {
    background: "#ee3a47",
    transform: "scale(1.1)",
  },
};
