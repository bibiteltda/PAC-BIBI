import { useState } from "react";

export function useTurma() { 
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [turmas, setTurmas] = useState([]); 

  async function findTurmas(filtros) { 
    setLoading(true);
    setError(null);
    setTurmas([]); 

try {
      const params = new URLSearchParams();

      if (filtros.escola && filtros.escola !== 'todas') {
        params.append('escola', filtros.escola);
      }
      if (filtros.status && filtros.status !== 'todas') {
        params.append('status', filtros.status);
      }
      if (filtros.dataInicio) {
        params.append('dataInicio', filtros.dataInicio);
      }
      if (filtros.dataFim) {
        params.append('dataFim', filtros.dataFim);
      }

      const url = `${process.env.REACT_APP_API_URL}/turma?${params.toString()}`; 

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao buscar turmas");
      }

      setTurmas(data);

    } catch (err) { 
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  
  return { findTurmas, turmas, loading, error };