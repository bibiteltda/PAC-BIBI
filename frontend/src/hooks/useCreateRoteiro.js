import { useState } from 'react';
import { API_URL } from "../services/api";

export function useCreateRoteiro() {
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const [success, setSuccess] = useState(null);

   async function createRoteiro(data) {
      setLoading(true);
      setError(null);
      setSuccess(null);

      try {
         const response = await fetch(`${API_URL}/roteiro/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
         });

         const result = await response.json();
         if (!response.ok) throw new Error(result.message || 'Erro ao criar roteiro');

         setSuccess(result);
         return result;
      } catch (e) {
         const message = e instanceof Error ? e.message : String(e);
         setError(message);
         console.error(message);
         return null;
      } finally {
         setLoading(false);
      }
   }

   return { createRoteiro, loading, error, success };
};