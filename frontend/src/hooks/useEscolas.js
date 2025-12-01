import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../services/api";

const ESCOLA_API_URL = `${API_URL}/escola`;
const BAIRRO_API_URL = `${API_URL}/bairro`;
const CIDADE_API_URL = `${API_URL}/cidade`;

/**
 * Hook para buscar e gerenciar escolas + dados relacionados (bairros, cidades).
 */
export default function useEscolas(filtros) {
  const [escolas, setEscolas] = useState([]);
  const [bairros, setBairros] = useState([]);
  const [cidades, setCidades] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ========== CARREGA ESCOLAS, BAIRROS E CIDADES ==========
  useEffect(() => {
    async function fetchDados() {
      setLoading(true);
      setError(null);

      try {
        const [escolasResp, bairrosResp, cidadesResp] = await Promise.all([
          axios.get(ESCOLA_API_URL),
          axios.get(BAIRRO_API_URL),
          axios.get(CIDADE_API_URL),
        ]);

        setEscolas([...escolasResp.data]);
        setBairros([...bairrosResp.data]);
        setCidades([...cidadesResp.data]);
      } catch (err) {
        console.error("Erro ao carregar escolas/bairros/cidades:", err);
        setError("Falha ao carregar dados de escola.");
        setEscolas([]);
        setBairros([]);
        setCidades([]);
      } finally {
        setLoading(false);
      }
    }

    fetchDados();
  }, [filtros]);

  // ========== CRIAR ESCOLA ==========
  /**
   * Cria uma escola.
   * @param {object} params
   * @param {string} params.nome
   * @param {string} [params.telefone]
   * @param {string} [params.logradouro]
   * @param {number} params.bairroId - id do bairro (FK)
   * @param {number} params.cidadeId - id da cidade (FK)
   */
  const createEscola = async ({
    nome,
    telefone = "",
    logradouro = "",
    bairroId,
    cidadeId,
  }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(ESCOLA_API_URL, {
        nome,
        telefone,
        logradouro,
        bairroId,   // 👈 agora bate com o controller
        cidadeId,   // 👈 idem
      });

      const novaEscola = response.data?.escola || response.data;

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

  return {
    escolas,
    bairros,
    cidades,
    loading,
    error,
    createEscola,
  };
}
