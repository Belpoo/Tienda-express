import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//aquí hice un cambio para verificar q git lo sigue
function Login({ setIsAuthenticated }) {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {

    if (!email || !password) {
      setMessage("Por favor completa todos los campos");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Error al iniciar sesión");
        return;
      }

      // Guardamos token y rol
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      setIsAuthenticated(true);
      setMessage("Has ingresado correctamente ✅");

      setTimeout(() => {
        if (data.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/Home");
        }
      }, 1000);

    } catch (error) {
      setMessage("Error al conectar con el servidor");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2>Iniciar Sesión</h2>

        <input
          style={inputStyle}
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={inputStyle}
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={buttonStyle} onClick={handleLogin}>
          Ingresar
        </button>

        {message && <p>{message}</p>}

        <Link to="/Registro">¿No tienes cuenta? Regístrate</Link>
      </div>
    </div>
  );
}

/* ---------- ESTILOS ---------- */

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#f5f5f5"
};

const cardStyle = {
  backgroundColor: "white",
  padding: "30px",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  width: "300px",
  display: "flex",
  flexDirection: "column",
  gap: "10px"
};

const inputStyle = {
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc"
};

const buttonStyle = {
  padding: "10px",
  backgroundColor: "black",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

export default Login;