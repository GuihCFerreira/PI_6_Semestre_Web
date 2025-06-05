import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const API_URL = 'https://iplay-dte2ffd6aghdd2cx.brazilsouth-01.azurewebsites.net';

interface DecodedToken {
  userId: string;
  email: string;
  exp: number;
  iat: number;
}

interface User {
  id: string;
  email: string;
}

interface AuthContextProps {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isTokenExpired: () => boolean;
  renewTokenIfNearExpiry: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
          logout();
        } else {
          setUser({ id: decoded.userId, email: decoded.email });
        }
      } catch (error) {
        console.error('Token inválido:', error);
        logout();
      }
    } else {
      setUser(null);
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      const token = response.data.token;

      if (!token) throw new Error('Token não encontrado na resposta da API');

      const decoded = jwtDecode<DecodedToken>(token);

      setToken(token);
      localStorage.setItem('token', token);
      //localStorage.setItem('user_id', response.data.user.id); // 👈 isso é essencial
      setUser({ id: decoded.userId, email: decoded.email });
    } catch (error: any) {
      console.error('Erro ao fazer login:', error?.response?.data || error.message);
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  const isTokenExpired = () => {
    if (!token) return true;
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp < currentTime;
    } catch {
      return true;
    }
  };

  const renewTokenIfNearExpiry = async () => {
    if (!token) return;

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      const currentTime = Date.now() / 1000;
      const timeLeft = decoded.exp - currentTime;

      if (timeLeft < 2 * 24 * 60 * 60 && timeLeft > 0) {
        // ⚠️ Esse endpoint precisa suportar renovação por token (não via email/senha)
        // Exemplo hipotético:
        // const response = await axios.post(`${API_URL}/token/refresh`, {}, {
        //   headers: { Authorization: `Bearer ${token}` }
        // });
        // const newToken = response.data.token;
        // setToken(newToken);
        // localStorage.setItem('token', newToken);
        // const newDecoded = jwtDecode<DecodedToken>(newToken);
        // setUser({ id: newDecoded.userId, email: newDecoded.email });
      }
    } catch (error) {
      console.error('Erro ao renovar token:', error);
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
