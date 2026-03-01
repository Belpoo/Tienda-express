import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

const categories = [
  "Lácteos",
  "Cereales",
  "Bebidas",
  "Snacks",
  "Aseo"
];

function NewProduct() {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: ""
  });

  const [loading, setLoading] = useState(false);

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post("/products", product);
      navigate("/admin/products");
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={title}>Nuevo Producto</h2>

        <form onSubmit={handleCreate} style={form}>
          <div style={field}>
            <label style={label}>Nombre</label>
            <input
              style={input}
              type="text"
              value={product.name}
              onChange={(e) =>
                setProduct({ ...product, name: e.target.value })
              }
              required
            />
          </div>

          <div style={field}>
            <label style={label}>Descripción</label>
            <input
              style={input}
              type="text"
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
              required
            />
          </div>

          <div style={field}>
            <label style={label}>Precio</label>
            <input
              style={input}
              type="number"
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
              required
            />
          </div>

          <div style={field}>
            <label style={label}>Stock</label>
            <input
              style={input}
              type="number"
              value={product.stock}
              onChange={(e) =>
                setProduct({ ...product, stock: e.target.value })
              }
              required
            />
          </div>

          <div style={field}>
            <label style={label}>Categoría</label>
            <select
              style={input}
              value={product.category}
              onChange={(e) =>
                setProduct({ ...product, category: e.target.value })
              }
              required
            >
              <option value="">Seleccione una categoría</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div style={buttonGroup}>
            <button
              type="button"
              style={cancelBtn}
              onClick={() => navigate(-1)}
            >
              Cancelar
            </button>

            <button type="submit" style={saveBtn} disabled={loading}>
              {loading ? "Creando..." : "Crear Producto"}
            </button>

            
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewProduct;

// ========== ESTILOS ==========

const container = {
  maxWidth: "600px",
  margin: "40px auto",
  padding: "0 20px"
};

const card = {
  background: "#fff",
  padding: "30px",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
};

const title = {
  fontSize: "24px",
  fontWeight: "600",
  marginBottom: "20px",
  color: "#1a1a1a",
};

const form = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};

const field = {
  display: "flex",
  flexDirection: "column",
};

const label = {
  fontSize: "14px",
  fontWeight: "500",
  color: "#555",
  marginBottom: "6px",
};

const input = {
  padding: "10px 12px",
  border: "1px solid #ddd",
  borderRadius: "6px",
  fontSize: "14px",
  outline: "none",
  transition: "border-color 0.2s ease",
};

const buttonGroup = {
  display: "flex",
  gap: "12px",
  marginTop: "10px",
};

const cancelBtn = {
  padding: "10px 16px",
  background: "#666",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "14px",
};

const saveBtn = {
  padding: "10px 16px",
  background: "#333",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "14px",
  flex: 1,
};