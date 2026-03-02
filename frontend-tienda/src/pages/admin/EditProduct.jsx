import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../services/api";


function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: ""
  });

  const categories = [
    "Lácteos",
    "Cereales",
    "Bebidas",
    "Snacks",
    "Aseo"
  ];

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/api/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/api/products/update/${id}`, product);
      navigate("/admin/products");
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  if (loading) {
    return <div style={loadingContainer}><span style={spinner}></span></div>;
  }

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={title}>Editar Producto</h2>

        <form onSubmit={handleUpdate} style={form}>
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
            <label style={label}>Descripcion</label>
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
            <button type="button" style={cancelBtn} onClick={() => navigate(-1)}>
              Cancelar
            </button>

            <button type="submit" style={saveBtn}>
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;

const loadingContainer = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "400px",
};

const spinner = {
  width: "30px",
  height: "30px",
  border: "4px solid #e0e0e0",
  borderTop: "4px solid #333",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
};

const container = {
  maxWidth: "600px",
  margin: "60px auto",
  padding: "0 20px",
};

const card = {
  background: "#fff",
  padding: "30px",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
};

const title = {
  marginBottom: "25px",
  fontSize: "24px",
  fontWeight: "600",
  color: "#1a1a1a",
};

const form = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const field = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
};

const label = {
  fontSize: "13px",
  fontWeight: "600",
  color: "#555",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};

const input = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ddd",
  fontSize: "14px",
};

const buttonGroup = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "10px",
  marginTop: "10px",
};

const saveBtn = {
  padding: "10px 16px",
  background: "#333",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const cancelBtn = {
  padding: "10px 16px",
  background: "#e0e0e0",
  color: "#333",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};