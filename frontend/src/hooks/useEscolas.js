import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../services/api";

export default function useEscolas() {
    const [escolas, setEscolas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchEscolas() {
            setLoading(true);
            setError(null);
            try {
                const res = await axios.get(`${API_URL}/escolas`);
                setEscolas(res.data);
            } catch (err) {
                setError(err.message || "Erro ao buscar escolas");
            } finally {
                setLoading(false);
            }
        }
        fetchEscolas();
    }, []);

    return { escolas, loading, error };
}
