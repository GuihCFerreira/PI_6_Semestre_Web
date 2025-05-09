import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/AuthContext"; // Correção para usar useAuth
import "../styles/formStyles.css"; // Estilo comum

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Obtenha a função login do contexto

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password); // Use a função login do contexto
      navigate("/recommendation"); // Redireciona para a tela de recomendação após login
    } catch (error) {
      setErrorMessage("Erro ao fazer login. Verifique os dados e tente novamente.");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <h2 className="auth-title">Login</h2>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button type="submit" className="submit-btn">Entrar</button>
        <p>
          Não tem uma conta? <a href="/cadastro">Cadastre-se</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
