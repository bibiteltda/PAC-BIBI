import { API_URL } from "../services/api";
import { useState } from "react";

export default function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  // 🟢 Cadastro
  const register = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Erro ao cadastrar usuário.");
        return null;
      }

      // Guarda token e dados do usuário
      localStorage.setItem("token", data.token);
      const usuario = {
        autenticacao: data.autenticacao,
        perfil: data.perfil,
      };

      setUser(usuario);
      return usuario;
    } catch (err) {
      console.error("Erro no register:", err);
      setError("Erro ao conectar com o servidor.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // 🟢 Login
  const login = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Erro no login.");
        return null;
      }

      // Guarda token e dados do usuário
      localStorage.setItem("token", data.token);
      const usuario = {
        autenticacao: data.autenticacao,
        perfil: data.perfil,
      };

      setUser(usuario);
      return usuario;
    } catch (err) {
      console.error("Erro no login:", err);
      setError("Erro ao conectar com o servidor.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // 🟡 Logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return { register, login, logout, loading, error, user };
}
