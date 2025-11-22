import { useState, useEffect } from "react";

export default function useEscolas() {
  const [escolas, setEscolas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function loadEscolas() {
    try {
      setLoading(true);

      const url = `${process.env.REACT_APP_API_URL}/escola`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao buscar escolas");
      }

      setEscolas(data);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEscolas();
  }, []);

  return { escolas, loading, error };
}
