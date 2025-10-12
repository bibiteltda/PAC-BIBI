// src/hooks/useDashboard.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../services/api';

export default function useDashboard() {
  const [data, setData] = useState({
    ganhosMensais: 0,
    perdasMensais: 0,
    ganhosMesAnterior: 0,
    escolasComMaisAlunos: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const res = await axios.get(`${API_URL}/dashboard`);
        setData(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  return { data, loading, error };
}
