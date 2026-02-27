import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Registro() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {

    if (!name || !email || !password) {
      setMessage("Completa todos los campos");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "Error al crear la cuenta");
        return;
      }

      setMessage("¡Cuenta creada con éxito! 🎉 Redirigiendo...");
      setTimeout(() => navigate("/Login"), 1500);

    } catch (error) {
      setMessage("Error al conectar con el servidor");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2>Crear Cuenta</h2>

        <input
          type="text"
          placeholder="Nombre completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <button onClick={handleRegister} style={buttonStyle}>
          Registrarme
        </button>

        {message && <p style={{ marginTop: "10px" }}>{message}</p>}

        <p style={{ marginTop: "15px" }}>
          ¿Ya tienes cuenta?{" "}
          <Link to="/login">Inicia sesión aquí</Link>
        </p>
      </div>
    </div>
  );
}

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

export default Registro;