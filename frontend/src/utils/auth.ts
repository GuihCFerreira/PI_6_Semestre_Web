// src/utils/auth.ts
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  id: string;
  exp: number;
  iat: number;
  // adicione outros campos se necessário
}

export function getUserIdFromToken(): string | null {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.id || null;
  } catch (error) {
    console.error("Erro ao decodificar token:", error);
    return null;
  }
}
