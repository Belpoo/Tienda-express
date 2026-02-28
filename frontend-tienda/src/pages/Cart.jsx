import { useEffect, useState } from "react";
import API from "../services/api";

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const res = await API.get("/cart");
      setCart(res.data.products || []);
    };

    fetchCart();
  }, []);

  return (
    <div style={container}>
      <h2>🛒 Mi carrito</h2>

      {cart.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        cart.map((item) => (
          <div key={item._id} style={itemCard}>
            <div>
              <h4>{item.name}</h4>
              <p>${item.price}</p>
            </div>

            <button style={removeButton}>Eliminar</button>
          </div>
        ))
      )}
    </div>
  );
}

export default Cart;

const container = {
  maxWidth: "600px",
  margin: "40px auto",
};

const itemCard = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px",
  marginBottom: "10px",
  borderRadius: "8px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
  background: "#fff",
};

const removeButton = {
  border: "none",
  background: "crimson",
  color: "white",
  padding: "8px 12px",
  borderRadius: "6px",
  cursor: "pointer",
};