import { useState } from "react";

export function useRecoveryPassword() {
   const [loading, setLoading] = useState(false);
   const [message, setMessage] = useState("");
   const [error, setError] = useState("");

   async function sendRecoveryCode(email) {
      setLoading(true);
      setMessage("");
      setError("");

      try {
         const response = await fetch(`${process.env.REACT_APP_API_URL}/api/recuperacao-senha/send-code`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
         });

         const data = await response.json();

         if (!response.ok) throw new Error(data.message || "Erro ao enviar código");

         setMessage("Código enviado com sucesso! Verifique seu e-mail.");
      } catch (err) {
         setError(err.message);
      } finally {
         setLoading(false);
      }
   }

   return { sendRecoveryCode, loading, message, error };
}
