import { useState } from "react";
import { Link } from "react-router-dom";

function Registro() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = () => {

    if (!email || !password) {
      setMessage("Completa todos los campos");
      return;
    }

    // Simulamos creación de cuenta
    setMessage("Tu cuenta ha sido creada con éxito 🎉");

    setTimeout(() => {
      window.location.href = "/login";
    }, 1500);
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2>Crear Cuenta</h2>

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