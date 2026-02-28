import { useEffect, useState } from "react";
import API from "../services/api";

/**
 * CART - Carrito de compras
 * Muestra los productos agregados y el total
 */
function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  // Obtener carrito del backend
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await API.get("/cart");
        setCart(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  if (loading) {
    return <p style={styles.centerText}>Cargando carrito...</p>;
  }

  if (!cart || cart.items.length === 0) {
    return <p style={styles.centerText}>Tu carrito está vacío 🛒</p>;
  }

  // Calcular total
  const total = cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🛒 Tu carrito</h1>

      {/* Productos */}
      <div style={styles.itemsList}>
        {cart.items.map((item) => (
          <div key={item.product._id} style={styles.item}>
            <div style={styles.itemInfo}>
              <h3 style={styles.itemName}>{item.product.name}</h3>
              <p style={styles.itemQuantity}>Cantidad: {item.quantity}</p>
            </div>
            <p style={styles.itemPrice}>${item.product.price}</p>
          </div>
        ))}
      </div>

      {/* Total */}
      <div style={styles.footer}>
        <h2 style={styles.total}>Total: ${total.toFixed(2)}</h2>
       {/* <button style={styles.checkoutButton}>Proceder al pago</button> */}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "700px",
    margin: "40px auto",
    padding: "20px",
  },
  title: {
    margin: "0 0 24px 0",
    fontSize: "28px",
    fontWeight: "600",
    color: "#1a1a1a",
  },
  itemsList: {
    marginBottom: "24px",
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: "16px",
    borderRadius: "6px",
    marginBottom: "12px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
    borderLeft: "4px solid #333",
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    margin: "0 0 4px 0",
    fontSize: "16px",
    fontWeight: "600",
    color: "#1a1a1a",
  },
  itemQuantity: {
    margin: 0,
    fontSize: "14px",
    color: "#666",
  },
  itemPrice: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "700",
    color: "#27ae60",
  },
  footer: {
    backgroundColor: "#f5f5f5",
    padding: "24px",
    borderRadius: "6px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
  },
  total: {
    margin: 0,
    fontSize: "22px",
    fontWeight: "700",
    color: "#1a1a1a",
  },
  checkoutButton: {
    padding: "12px 24px",
    backgroundColor: "#333",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    transition: "background 0.2s",
    whiteSpace: "nowrap",
  },
  centerText: {
    textAlign: "center",
    padding: "60px 20px",
    fontSize: "18px",
    color: "#999",
  },
};

export default Cart;