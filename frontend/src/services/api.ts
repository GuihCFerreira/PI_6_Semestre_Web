// src/services/api.ts
import axios from "axios";

// Criação da instância do Axios com a URL base da sua API
const api = axios.create({
  baseURL: "https://pi-6-semestre-1edb53abee65.herokuapp.com",
});

// Interceptor para incluir o token JWT em todas as requisições privadas
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
