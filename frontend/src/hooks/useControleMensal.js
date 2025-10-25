import { useState, useCallback } from "react";
import { API_URL } from "../services/api";

export default function useControleMensal() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    melhorEscola: null,
    graficos: null,
    transacoes: [],
  });

  const find = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/controle-mensal`);
      const result = await response.json();

      if (!response.ok) throw new Error(result.message || "Erro ao buscar dados.");

      setData({
        melhorEscola: result.melhorEscola || null,
        graficos: result.graficos || null,
        transacoes: result.transacoes || [],
      });

      return result;
    } catch (err) {
      console.error(err);
      setError(err.message || "Erro ao conectar com o servidor.");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(async (payload) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/controle-mensal`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Erro ao criar item.");

      // opcional: atualiza estado local
      setData((prev) => ({
        ...prev,
        transacoes: [...prev.transacoes, result],
      }));

      return result;
    } catch (err) {
      console.error(err);
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(async (id, updates) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/controle-mensal/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Erro ao atualizar.");

      setData((prev) => ({
        ...prev,
        transacoes: prev.transacoes.map((item) =>
          item.id_pagamento === id ? { ...item, ...updates } : item
        ),
      }));

      return result;
    } catch (err) {
      console.error(err);
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const remove = useCallback(async (id) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/controle-mensal/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Erro ao deletar.");

      setData((prev) => ({
        ...prev,
        transacoes: prev.transacoes.filter((item) => item.id_pagamento !== id),
      }));

      return result;
    } catch (err) {
      console.error(err);
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    data,
    find,
    create,
    update,
    remove,
  };
}
