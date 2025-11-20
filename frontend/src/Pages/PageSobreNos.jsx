import { useState } from "react";
import NavBar from "../Components/PagePainel/NavBar";
import SideBar from "../Components/PagePainel/SideBar";
import { motion } from "framer-motion";

export default function PageSobreNos() {
  const [funcao, setFuncao] = useState("Sobre");
  return (
    <div className="flex flex-col h-screen w-full bg-[#F9FAFB] relative">

      {/* NAVBAR */}
      <NavBar
        foto="https://i.pravatar.cc/300"
        nome="Daniela Luisa"
        email="daniela@gmail.com"
      />

      <div className="flex flex-1 flex-col lg:flex-row">

        {/* Sidebar esquerda */}
        <div className="w-full lg:w-[250px] bg-white">

          <SideBar funcao={funcao} setFuncao={setFuncao} role="condutor" />
        </div>

        {/* Conteúdo principal */}
        <main className="flex-1 flex justify-center items-start bg-[#F3F4F6] p-6 lg:p-10 overflow-y-auto">
          <div className="w-full max-w-[850px] flex flex-col space-y-10">

            {/* TÍTULO PRINCIPAL */}
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-gray-800 text-left"
            >
              Sobre Nós
            </motion.h1>

            {/* SEÇÃO SOBRE */}
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white shadow-md rounded-xl p-8 leading-relaxed text-gray-700"
            >
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua.
              </p>
            </motion.section>

            {/* MISSÃO */}
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white shadow-md rounded-xl p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Nossa Missão</h2>
              <p className="text-gray-700 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore.
              </p>
            </motion.section>

            {/* PRINCÍPIOS */}
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white shadow-md rounded-xl p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Princípios</h2>

              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 text-lg mr-2">•</span>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>

                <li className="flex items-start">
                  <span className="text-blue-600 text-lg mr-2">•</span>
                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </li>

                <li className="flex items-start">
                  <span className="text-blue-600 text-lg mr-2">•</span>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>

                <li className="flex items-start">
                  <span className="text-blue-600 text-lg mr-2">•</span>
                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </li>
              </ul>
            </motion.section>

          </div>
        </main>

        {/* Espaço lateral direito */}
        <div className="hidden lg:block w-[250px]" />
      </div>
    </div>
  );
}