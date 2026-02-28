import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/**
 * LOGIN - Iniciar sesión en la cuenta
 */
function Login({ setIsAuthenticated }) {
  const navigate = useNavigate();

  // Estados del formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Enviar credenciales al backend
  const handleLogin = async () => {
    if (!email || !password) {
      setMessage("⚠️ Completa todos los campos");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage("❌ " + (data.message || "Error al iniciar sesión"));
        return;
      }

      // Guardar token y rol en localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      setIsAuthenticated(true);
      setMessage("✅ Sesión iniciada");

      // Redirigir según el rol
      setTimeout(() => {
        navigate(data.role === "admin" ? "/admin" : "/home");
      }, 1000);
    } catch (error) {
      setMessage("❌ Error al conectar con el servidor");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Iniciar Sesión</h2>

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          style={styles.button}
        >
          {loading ? "Ingresando..." : "Ingresar"}
        </button>

        {message && (
          <p style={{
            ...styles.message,
            color: message.includes("✅") ? "#27ae60" : "#e74c3c"
          }}>
            {message}
          </p>
        )}

        <p style={styles.link}>
          ¿No tienes cuenta?{" "}
          <Link to="/registro" style={styles.linkText}>Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    padding: "20px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "350px",
  },
  title: {
    margin: "0 0 24px 0",
    fontSize: "24px",
    fontWeight: "600",
    color: "#1a1a1a",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "14px",
    boxSizing: "border-box",
    fontFamily: "inherit",
  },
  button: {
    width: "100%",
    padding: "12px",
    marginTop: "12px",
    backgroundColor: "#333",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    transition: "background 0.2s",
  },
  message: {
    marginTop: "16px",
    padding: "12px",
    borderRadius: "6px",
    fontSize: "14px",
    textAlign: "center",
  },
  link: {
    marginTop: "16px",
    fontSize: "14px",
    color: "#666",
    textAlign: "center",
    margin: "16px 0 0 0",
  },
  linkText: {
    color: "#333",
    textDecoration: "none",
    fontWeight: "600",
  },
};

export default Login;