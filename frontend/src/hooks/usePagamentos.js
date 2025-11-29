import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../services/api';

const PAGAMENTO_API_URL = `${API_URL}/pagamento`; 


/**
 * Hook para buscar pagamentos com base em filtros.
 * @param {object} filtros - Objeto contendo os filtros.
 * @param {string} [filtros.escolaId] - ID da escola ('Todas' ou ID numérico).
 * @param {string} [filtros.status] - Status do pagamento ('Todas' ou status real).
 * @param {string} [filtros.dataInicial] - Data de início do vencimento (YYYY-MM-DD).
 * @param {string} [filtros.dataFinal] - Data final do vencimento (YYYY-MM-DD).
 */
export default function usePagamentos(filtros) {
    const [pagamentos, setPagamentos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // O useEffect será re-executado sempre que o objeto 'filtros' mudar
    useEffect(() => {
        // Se o objeto filtros for null ou vazio, não faz a busca inicial
        if (!filtros || Object.keys(filtros).length === 0) {
            setPagamentos([]);
            return;
        }

        async function fetchPagamentos() {
            setLoading(true);
            setError(null);
            
            // 1. Construir a URL com Query Parameters
            const params = new URLSearchParams();
            
            // Adicionar filtros válidos (apenas se não for 'Todas' e o valor existir)
            if (filtros.escolaId && filtros.escolaId !== 'Todas') {
                params.append('escolaId', filtros.escolaId);
            }
            if (filtros.status && filtros.status !== 'Todas') {
                params.append('status', filtros.status);
            }
            if (filtros.dataInicial) {
                params.append('data_inicial', filtros.dataInicial);
            }
            if (filtros.dataFinal) {
                params.append('data_final', filtros.dataFinal);
            }

            // 2. Montar a URL final (Ex: /pagamento?escolaId=X&status=Y)
            const urlCompleta = `${PAGAMENTO_API_URL}?${params.toString()}`;

            try {
                const response = await axios.get(urlCompleta);
                setPagamentos(response.data);
            } catch (err) {
                console.error("Erro ao buscar pagamentos:", err);
                // Exibe a mensagem de erro da API se possível, senão uma genérica
                const errMsg = err.response?.data?.error || "Erro ao carregar transações.";
                setError(errMsg);
                setPagamentos([]);
            } finally {
                setLoading(false);
            }
        }

        fetchPagamentos();
        
    }, [filtros]); 

    return { pagamentos, loading, error };
}