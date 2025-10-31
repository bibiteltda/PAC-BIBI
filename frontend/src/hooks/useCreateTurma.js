import { useState } from 'react';

export function useCreateRoteiro() {
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const [success, setSuccess] = useState(null);

   async function createRoteiro(data) {
      setLoading(true);
      setError(null);
      setSuccess(null);

      try {
         const response = await fetch(`${import.meta.env.VITE_API_URL}/api/roteiro/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
         });

         const result = await response.json();
         if (!response.ok) throw new Error(result.message || 'Erro ao criar roteiro');

         setSuccess(result);
         return result;
     } catch (err) {
         setError(err.message);
         console.error('Erro no useCreateRoteiro:', err);
     } finally {
         setLoading(false);
     }
   }

   return { createRoteiro, loading, error, success };
};