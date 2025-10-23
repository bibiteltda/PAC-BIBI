/* Dependências*/
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

/* Imports */
import FormEsqueceuSenha from "../Components/PageEsqueceuSuaSenha/FormEsqueceuSuaSenha.jsx";

export default function PageEsqueceuSenha() {
  return (
    <section className="flex flex-col items-center justify-center h-screen w-screen font-inter bg-gradient-to-br from-[#1267A0] to-[#082F49] text-white relative">
      {/* Logo canto superior esquerdo */}
      <div className="absolute top-0 left-0 flex items-center p-8">
        <p className="text-4xl font-bold italic">BIBI</p>
        <div className="text-4xl text-[#007DFA]">·</div>
      </div>

      {/* Form centralizado */}
      <FormEsqueceuSenha />
    </section>
  );
}


// Esse hook é usado quando digita o e-mail na tela "Esqueci minha senha"
//
// const { sendRecoveryCode, loading, message, error } = useRecoveryPassword();

// function handleSubmit(e) {
//   e.preventDefault();
//   sendRecoveryCode(email);
// }


// Esse hook é usaod na tela onde o usuário digita o código recebido por e-mail e define a nova senha
//
// const { resetPassword, loading, message, error } = useResetPassword();

// function handleSubmit(e) {
//   e.preventDefault();
//   resetPassword(email, code, newPassword);
// }