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