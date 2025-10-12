import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../services/api";

export default function usePagamentos(filtros, delay = 500) {
    const [pagamentos, setPagamentos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const handler = setTimeout(async () => {
            setLoading(true);
            setError(null);

            try {
                const params = {
                    escolaId: filtros.escola !== "todas" ? filtros.escola : undefined,
                    status: filtros.status !== "todas" ? filtros.status : undefined,
                    dataInicio: filtros.data?.inicio,
                    dataFim: filtros.data?.fim,
                };

                const res = await axios.get(`${API_URL}/pagamentos`, { params });
                setPagamentos(res.data);
            } catch (err) {
                setError(err.message || "Erro ao buscar pagamentos");
            } finally {
                setLoading(false);
            }
        }, delay);

        return () => clearTimeout(handler);

    }, [filtros.escola, filtros.status, filtros.data.inicio, filtros.data.fim, delay]);

    const updateStatus = async (id, status) => {
        try {
            const res = await axios.put(`${API_URL}/pagamentos/${id}/status`, { status });
            setPagamentos(prev =>
                prev.map(p => (p.id === id ? { ...p, status: res.data.status } : p))
            );
        } catch (err) {
            setError(err.message || "Erro ao atualizar status");
        }
    };

    return { pagamentos, loading, error, updateStatus };
}
