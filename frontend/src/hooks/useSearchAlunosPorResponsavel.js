import { useState } from "react";

export function useSearchAlunosPorResponsavel() {
  const [loading, setLoading] = useState(false);
  const [alunos, setAlunos] = useState([]);
  const [error, setError] = useState(null);

  async function searchAlunos(email) {
    if (!email || email.length < 5) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/aluno/find-by-responsavel-email?email=${email}`
      );
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Erro ao buscar alunos.");

      setAlunos(data);
    } catch (err) {
      setError(err.message);
      console.error("Erro ao buscar alunos:", err);
    } finally {
      setLoading(false);
    }
  }

  return { alunos, loading, error, searchAlunos };
}
