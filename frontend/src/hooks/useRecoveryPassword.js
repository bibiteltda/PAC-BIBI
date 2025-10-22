import { useState } from "react";

export function useRecoverPassword() {
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const [success, setSuccess] = useState(null);

   async function sendRecoveryEmail(email) {
      setLoading(true);
      setError(null);
      setSuccess(null);

      try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/recuperacao-senha/recover-password`, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Erro ao enviar e-mail");

      setSuccess(data.message || "Link enviado com sucesso!");
      } catch (err) {
      setError(err.message);
      } finally {
      setLoading(false);
      }
   }

   return { 
      sendRecoveryEmail, 
      loading, 
      error, 
      success 
   };
}