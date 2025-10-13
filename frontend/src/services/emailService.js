// // src/services/emailService.js
// import { API_URL } from "./api";

// export async function enviarCodigo(email) {
//   const res = await fetch(`${API_URL}/verificacao/request-code`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email }),
//   });

//   if (!res.ok) throw new Error("Erro ao enviar o código");
//   return await res.json();
// }

// export async function validarCodigo(email, code) {
//   const res = await fetch(`${API_URL}/verificacao/verify-code`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, code }),
//   });

//   if (!res.ok) throw new Error("Código inválido ou expirado");
//   return await res.json(); // { success: true, message: ... }
// }

