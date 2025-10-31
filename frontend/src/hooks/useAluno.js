import { useState } from "react";
import { API_URL } from "../services/api"; 

export default function useAluno() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Envia os dados de um novo aluno para a API para cadastro.
   * @param {object} alunoData - Objeto contendo os dados do aluno 
   * @returns {Promise<object|null>} O objeto do aluno criado em caso de sucesso, ou null em caso de erro.
   */
  const cadastrarAluno = async (alunoData) => {
    setLoading(true);
    setError(null);

    // Recupera o token de autenticação do localStorage
    const token = localStorage.getItem("token");

    // Validação básica: o usuário precisa estar logado (ter um token)
    if (!token) {
      setError("Usuário não autenticado. Faça o login novamente.");
      setLoading(false);
      return null;
    }

    try {
      // Faz a requisição POST para o endpoint /alunos
      const response = await fetch(`${API_URL}/aluno`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Envia o token no cabeçalho Authorization
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(alunoData),
      });

      const data = await response.json();

      // Verifica se a resposta da API indica erro
      if (!response.ok) {
        // Usa a mensagem de erro da API (se existir) ou uma mensagem padrão
        setError(data.erro || "Erro ao cadastrar aluno.");
        return null; // Retorna null para indicar falha
      }

      // Se chegou aqui, o aluno foi criado com sucesso
      // 'data' contém o objeto do aluno retornado pelo backend
      return data;

    } catch (err) {
      console.error("Erro ao cadastrar aluno:", err);
      setError("Erro ao conectar com o servidor durante o cadastro do aluno.");
      return null; // Retorna null para indicar falha
    } finally {
      // Garante que o loading seja desativado ao final, mesmo com erro
      setLoading(false);
    }
  };

  // Retorna a função de cadastro e os estados de loading e erro
  return { cadastrarAluno, loading, error };
}