// Localização: frontend/src/hooks/useEscolas.js

import { useState, useEffect } from 'react';
import axios from 'axios';

// URL do seu endpoint do Sails.js para escolas
const ESCOLA_API_URL = 'http://localhost:1337/escola'; 

export default function useEscolas() {
    const [escolas, setEscolas] = useState([]);
    const [loadingEscolas, setLoadingEscolas] = useState(true);
    const [errorEscolas, setErrorEscolas] = useState(null);

    useEffect(() => {
        async function fetchEscolas() {
            setLoadingEscolas(true);
            setErrorEscolas(null);

            try {
                const response = await axios.get(ESCOLA_API_URL);
                
                // 1. Adiciona a opção "Todas" no início da lista (importante para o filtro)
                const opcoes = [{ id: 'Todas', nome: 'Todas' }, ...response.data];
                
                setEscolas(opcoes);
            } catch (err) {
                console.error("Erro ao carregar escolas:", err);
                setErrorEscolas("Falha ao carregar opções de escola.");
                // Retorna apenas a opção "Todas" em caso de erro
                setEscolas([{ id: 'Todas', nome: 'Todas' }]); 
            } finally {
                setLoadingEscolas(false);
            }
        }
        fetchEscolas();
    }, []);

    return { escolas, loadingEscolas, errorEscolas };
}