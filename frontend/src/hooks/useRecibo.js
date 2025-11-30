import { useState, useCallback } from "react";
import { API_URL } from "../services/api";

export default function useRecibo() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recibo, setRecibo] = useState(null);

  const find = useCallback(async (pagamentoId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/recibo/${pagamentoId}`);

        if (!response.ok) {
          const text = await response.text();
          throw new Error(text || "Erro ao carregar recibo.");
        }

        const result = await response.json();
        setRecibo(result.recibo || result || null);
        return result.recibo || result;

    } catch (err) {
        console.error(err);
        setError(err.message || "Erro ao conectar com o servidor.");
        return null;
    } finally {
        setLoading(false);
      }
  }, []);

  return { loading, error, recibo, find, };
}
