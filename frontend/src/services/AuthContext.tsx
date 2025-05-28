import React, { createContext, useContext, useState, useEffect } from "react";

import { jwtDecode } from 'jwt-decode'; 
import axios from "axios";

const API_URL = "https://iplay-dte2ffd6aghdd2cx.brazilsouth-01.azurewebsites.net";

interface AuthContextProps {
  user: any;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isTokenExpired: () => boolean;
  renewTokenIfNearExpiry: () => void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (token) {
      const decoded: any = jwtDecode(token);
      setUser(decoded);
    }
  }, [token]);

const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });

    const token = response.data.token;

    if (!token) {
      throw new Error("Token não encontrado na resposta da API.");
    }

    setToken(token);
    localStorage.setItem("token", token);

    const decoded: any = jwtDecode(token);
    setUser({
      id: response.data.id,
      name: response.data.name,
      email: response.data.email,
      ...decoded, // caso queira os campos do token
    });

  } catch (error: any) {
    console.error("Erro ao fazer login:", error?.response?.data || error.message);
    throw error;
  }
};


  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  const isTokenExpired = () => {
    if (!token) return true;
    const decoded: any = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  };

  const renewTokenIfNearExpiry = async () => {
    if (!token) return;
    const decoded: any = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    const timeLeft = decoded.exp - currentTime;
    if (timeLeft < 2 * 24 * 60 * 60 && timeLeft > 0) {
      const response = await axios.post(`${API_URL}/sign-in`, {
        email: decoded.email,
        password: decoded.password, // se estiver salvo temporariamente
      });
      const newToken = response.data.token;
      localStorage.setItem("token", newToken);
      setToken(newToken);
      setUser(jwtDecode(newToken));
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, isTokenExpired, renewTokenIfNearExpiry }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
