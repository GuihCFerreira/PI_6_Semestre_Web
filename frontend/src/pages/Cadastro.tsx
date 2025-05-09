// src/pages/Cadastro.tsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Cadastro = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://pi-6-semestre-1edb53abee65.herokuapp.com/sign-in",
        {
          name,
          email,
          password,
        }
      );

      setMessage("Cadastro realizado com sucesso!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error: any) {
      console.error("Erro ao cadastrar:", error.response || error);

      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Erro ao cadastrar. Verifique os dados e tente novamente.");
      }
    }

  };

  return (
    <div style={{ background: "#FCFCFC", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <form
        onSubmit={handleRegister}
        style={{
          background: "#fff",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          minWidth: "300px",
        }}
      >
        <h2 style={{ color: "#2C003E", marginBottom: "1rem" }}>Cadastro</h2>

        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>
          Cadastrar
        </button>

        <p style={{ marginTop: "1rem" }}>
          Já tem uma conta? <Link to="/login">Entrar</Link>
        </p>

        {message && <p style={{ marginTop: "1rem", color: "#2C003E" }}>{message}</p>}
      </form>
    </div>
  );
};

const inputStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  marginBottom: "1rem",
  padding: "0.5rem",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem",
  background: "#2C003E",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

export default Cadastro;
