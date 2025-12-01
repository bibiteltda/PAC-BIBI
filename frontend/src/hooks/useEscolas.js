import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../services/api';

const ESCOLA_API_URL = `${API_URL}/escola`;

/**
 * Hook para buscar e gerenciar escolas.
 */
export default function useEscolas(filtros) {
  const [escolas, setEscolas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ========== LISTAR ESCOLAS ==========
  useEffect(() => {
    async function fetchEscolas() {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(ESCOLA_API_URL);
        const opcoes = [...response.data];
        setEscolas(opcoes);
      } catch (err) {
        console.error('Erro ao carregar escolas:', err);
        setError('Falha ao carregar opções de escola.');
        setEscolas([]);
      } finally {
        setLoading(false);
      }
    }

    fetchEscolas();
  }, [filtros]);

  // ========== CRIAR ESCOLA ==========
  const createEscola = async ({ nome, telefone, logradouro, bairro, cidade } = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(ESCOLA_API_URL, {
        nome,
        telefone,
        logradouro,
        bairro,
        cidade,
      });

      const novaEscola = response.data?.escola || response.data;

      setEscolas((prev) => [...prev, novaEscola]);

      return novaEscola;
    } catch (err) {
      console.error('Erro ao criar escola:', err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.erro ||
        'Erro ao criar escola.';
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // (deleteEscola você pode deixar pra depois)

  return {
    escolas,
    loading,
    error,
    createEscola,
  };
}
