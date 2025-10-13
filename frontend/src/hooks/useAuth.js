import { API_URL } from "../services/api";
import { useState } from "react";

export default function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const register = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Erro ao cadastrar usuário.");
        return null;
      }

      setUser(data.usuario);
      return data.usuario;
    } catch (err) {
      console.error(err);
      setError("Erro ao conectar com o servidor.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const login = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Erro no login.");
        return null;
      }

      setUser(data.usuario);
      localStorage.setItem("token", data.token);
      return data.usuario;
    } catch (err) {
      console.error(err);
      setError("Erro ao conectar com o servidor.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { register, login, loading, error, user };
}
