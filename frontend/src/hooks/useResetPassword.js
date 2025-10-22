import { useState } from "react";

export function useResetPassword() {
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const [success, setSuccess] = useState(null);

   async function resetPassword(token, newPassword) {
      setLoading(true);
      setError(null);
      setSuccess(null);

      try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/recuperacao-senha/reset-password`, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Erro ao redefinir senha");

      setSuccess(data.message || "Senha redefinida com sucesso!");
      } catch (err) {
      setError(err.message);
      } finally {
      setLoading(false);
      }
   }

   return { 
      resetPassword, 
      loading, 
      error, 
      success 
   };
}
