import { useState } from "react";

export function useTurma() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [turmas, setTurmas] = useState([]); 

  async function findTurmas(filtros = { escola: "todas", turno: "todas" }) {
    setLoading(true);
    setError(null);
    setTurmas([]);

    try {
      const params = new URLSearchParams();

      if (filtros.escola && filtros.escola !== "todas") {
        params.append("escola", filtros.escola);
      }

      if (filtros.turno && filtros.turno !== "todas") {
        params.append("turno", filtros.turno);
      }

      const url = `${process.env.REACT_APP_API_URL}/roteiro?${params.toString()}`;

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
}
