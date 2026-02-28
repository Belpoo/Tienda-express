import { useEffect, useState } from "react";
import API from "../services/api";

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await API.get("/cart");
        setCart(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Cargando carrito...</h2>;
  }

  if (!cart || cart.items.length === 0) {
    return <h2 style={{ textAlign: "center" }}>Tu carrito está vacío 🛒</h2>;
  }

  const total = cart.items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div style={container}>
      <h2 style={{ marginBottom: "20px" }}>🛒 Tu carrito</h2>

      {cart.items.map((item) => (
        <div key={item.product._id} style={card}>
          <div>
            <h3>{item.product.name}</h3>
            <p>Cantidad: {item.quantity}</p>
          </div>

          <p style={price}>${item.product.price}</p>
        </div>
      ))}

      <h3 style={totalStyle}>Total: ${total}</h3>
    </div>
  );
}

export default Cart;

const container = {
  maxWidth: "600px",
  margin: "40px auto",
  padding: "20px",
};

const card = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "#fff",
  padding: "15px",
  borderRadius: "10px",
  marginBottom: "15px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
};

const price = {
  fontWeight: "bold",
  fontSize: "18px",
};

const totalStyle = {
  textAlign: "right",
  marginTop: "20px",
};