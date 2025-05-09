// src/components/Login.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://pi-6-semestre-1edb53abee65.herokuapp.com/login",
        {
          email,
          password,
        }
      );
      const { token } = response.data;
      localStorage.setItem("token", token); // Armazena o token no localStorage
      navigate("/profile"); // Redireciona para a página de perfil
    } catch (err) {
      setError("Email ou senha inválidos!");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 border border-gray-300 rounded-lg">
      <h2 className="text-2xl text-center mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md mt-1"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md mt-1"
          />
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <div className="mt-4">
          <button type="submit" className="w-full bg-primary text-white p-2 rounded-md">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
