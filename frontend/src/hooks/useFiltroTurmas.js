import { useState } from "react";
export function useFiltroTurmas() {
  
  // 1. Estados que o hook gerencia
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [turmas, setTurmas] = useState([]); // (Em vez de 'message', guardamos 'turmas')

  /**
   * * @param {object} filtros 
   */

  async function fetchTurmas(filtros) {
    setLoading(true);
    setError(null);
    setTurmas([]); // Limpa os resultados antigos

    try {
      // 2. Constrói a URL com "Query Parameters
      const params = new URLSearchParams();

      // 3. Adiciona os filtros na URL, mas SÓ SE eles tiverem um valor.

      if (filtros.escola) params.append('escola', filtros.escola);
      if (filtros.status) params.append('status', filtros.status);
      if (filtros.dataInicio) params.append('dataInicio', filtros.dataInicio);
      if (filtros.dataFim) params.append('dataFim', filtros.dataFim);

      // 4. Monta a URL final 
      const url = `${process.env.REACT_APP_API_URL}/turmas/filtro?${params.toString()}`;
      
      // 5. Faz a chamada GET para o seu controller 
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao filtrar turmas");
      }

      // 6. Sucesso: guarda os dados no estado
      setTurmas(data);

    } catch (err) {
      // 7. Erro: guarda a mensagem de erro no estado
      setError(err.message);
    } finally {
      // 8. Sempre para o loading no final
      setLoading(false);
    }
  }

  // 9. Retorna a função e os estados
  return { fetchTurmas, turmas, loading, error };
}