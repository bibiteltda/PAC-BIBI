import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../services/api';

const ESCOLA_API_URL = `${API_URL}/escola`;

/**
 * Hook para buscar e gerenciar escolas.
 * @param {object} filtros - (atualmente não usados, mas mantidos para compatibilidade)
 */
export default function useEscolas(filtros) {
  const [escolas, setEscolas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ===== LISTAR ESCOLAS (GET) =====
  useEffect(() => {
    async function fetchEscolas() {
      setLoading(true);
      setError(null);
      setEscolas([]);

      try {
        const response = await axios.get(ESCOLA_API_URL);

        const opcoes = [...response.data];
        setEscolas(opcoes);
      } catch (err) {
        console.error("Erro ao carregar escolas:", err);
        setError("Falha ao carregar opções de escola.");
        setEscolas([{ id: 'Todas', nome: 'Todas' }]);
      } finally {
        setLoading(false);
      }
    }

    fetchEscolas();
  }, [filtros]);

  // ===== CRIAR ESCOLA (POST /escola) =====
  const createEscola = async (dadosEscola) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Usuário não autenticado. Faça o login novamente.");
        setLoading(false);
        return null;
      }

      const response = await axios.post(
        ESCOLA_API_URL,
        dadosEscola,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // O controller de create retorna: { message, escola: { ... } }
      const novaEscola = response.data?.escola || response.data;

      // Atualiza o estado local adicionando a nova escola
      setEscolas((prev) => [...prev, novaEscola]);

      return novaEscola;
    } catch (err) {
      console.error("Erro ao criar escola:", err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.erro ||
        "Erro ao criar escola.";
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // ===== DELETAR ESCOLA (DELETE /escola/:id) =====
  const deleteEscola = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Usuário não autenticado. Faça o login novamente.");
        setLoading(false);
        return false;
      }

      await axios.delete(`${ESCOLA_API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove do estado local
      setEscolas((prev) => prev.filter((escola) => escola.id !== id));

      return true;
    } catch (err) {
      console.error("Erro ao deletar escola:", err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.erro ||
        "Erro ao deletar escola.";
      setError(msg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    escolas,
    loading,
    error,
    createEscola,
    deleteEscola,
  };
}
