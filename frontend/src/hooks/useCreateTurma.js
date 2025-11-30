import { useState } from 'react';
import { API_URL } from "../services/api";

export function useCreateRoteiro() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  async function createRoteiro(data) {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const payload = {
        ...data,
        escola: Number(data.escola),
      };

      const response = await fetch(`${API_URL}/roteiro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || 'Erro ao criar roteiro');
        return { error: result.message || 'Erro ao criar roteiro' };
      }

      setSuccess(result);
      return result;
    } catch (e) {
      setError(e.message);
      console.error('Erro no useCreateRoteiro:', e);
      return { error: e.message };
    } finally {
      setLoading(false);
    }
  }

  return { createRoteiro, loading, error, success };
}