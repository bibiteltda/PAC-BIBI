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
                O BiBi – Transporte Escolar é um projeto acadêmico desenvolvido no contexto do PAC – Projeto de Aprendizagem Colaborativa Extensionista, do curso de Engenharia de Software da Católica de Santa Catarina.
                Criamos uma solução digital para modernizar e facilitar a rotina de transportadores escolares, oferecendo ferramentas práticas para organização de rotas, controle de alunos, comunicação com responsáveis e gestão financeira.

                O projeto é desenvolvido pelos alunos:
                Eric Gabriel Caetano,
                Felipe da Silva Chawischi,
                Francisco Marcelo Caetano Costa,
                Gabriel Felipe Alves Bandoch,
                João Guilherme Tamanini Dalmarco,
                Lucas Grimes Ceola,

                Sob orientação dos professores:
                Luiz Carlos Camargo e Claudinei Dias.
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
                Nossa missão é tornar o transporte escolar mais seguro, eficiente e organizado, oferecendo uma plataforma que simplifica atividades essenciais do dia a dia do transportador.
                Buscamos reduzir falhas de comunicação, atrasos, perda de informações e dificuldades no controle de pagamentos — problemas comuns quando o processo é manual.

                O BiBi foi criado para ser simples e acessível, ajudando tanto o transportador quanto os responsáveis a acompanhar o deslocamento e a rotina escolar de forma mais clara e confiável.
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
                  O BiBi nasce com o propósito de beneficiar transportadores escolares autônomos, pais e responsáveis, e
                  principalmente os alunos que dependem de um serviço organizado e seguro.
                </li>

                <li className="flex items-start">
                  Nossos princípios se baseiam em:
                </li>

                <li className="flex items-start">
                  <span className="text-blue-600 text-lg mr-2">•</span>
                  Segurança: reduzir riscos e aumentar a confiabilidade do transporte escolar.
                </li>

                <li className="flex items-start">
                  <span className="text-blue-600 text-lg mr-2">•</span>
                  Transparência: melhorar a comunicação entre transportadores e responsáveis.
                </li>

                <li className="flex items-start">
                  <span className="text-blue-600 text-lg mr-2">•</span>
                  Organização: centralizar informações e pagamentos em um único lugar.
                </li>

                <li className="flex items-start">
                  <span className="text-blue-600 text-lg mr-2">•</span>
                  Acessibilidade: oferecer uma ferramenta prática para qualquer dispositivo.
                </li>

                <li className="flex items-start">
                  <span className="text-blue-600 text-lg mr-2">•</span>
                  Extensão social: contribuir com soluções reais para necessidades reais da comunidade.
                </li>

                <li className="flex items-start">
                  Acreditamos que tecnologia e educação caminham juntas — e nosso compromisso é facilitar o
                  trabalho dos profissionais que cuidam diariamente do transporte das crianças.
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