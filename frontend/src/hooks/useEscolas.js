import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../services/api';

const ESCOLA_API_URL = `${API_URL}/escola`;

export default function useEscolas(filtros) {
  const [escolas, setEscolas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEscolas() {
      setLoading(true);
      setError(null);
      setEscolas([]);

      try {
        const response = await axios.get(ESCOLA_API_URL);
        setEscolas(response.data);
      } catch (err) {
        console.error("Erro ao carregar escolas:", err);
        setError("Falha ao carregar opções de escola.");
        setEscolas([]);
      } finally {
        setLoading(false);
      }
    }

    fetchEscolas();
  }, [filtros]);

  return { escolas, loading, error };
}
