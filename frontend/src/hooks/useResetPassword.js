import { useState } from "react";

export function useResetPassword() {
   const [loading, setLoading] = useState(false);
   const [message, setMessage] = useState("");
   const [error, setError] = useState("");

   async function resetPassword(email, code, newPassword) {
      setLoading(true);
      setMessage("");
      setError("");

      try {
         const response = await fetch(`${process.env.REACT_APP_API_URL}/api/recuperacao-senha/reset-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, code, newPassword }),
         });

         const data = await response.json();

         if (!response.ok) throw new Error(data.message || "Erro ao redefinir senha");

         setMessage("Senha redefinida com sucesso! Você já pode fazer login.");
      } catch (err) {
         setError(err.message);
      } finally {
         setLoading(false);
      }
   }

   return { resetPassword, loading, message, error };
}
