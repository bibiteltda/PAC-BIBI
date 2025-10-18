/* Dependências*/
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import FiltroTurmas from "../Components/PageTurmas/Filtro/FiltroTurmas";
import FormCadastroAlunos from "../Components/PageTurmas/FormCadastroAlunos"
import FormMensalidade from "../Components/PageCondutor/FormMensalidade"
import CardRoteiro from "../Components/PageTurmas/CardRoteiro";
// import FiltroPagamentos from "../Components/PageControleMensal/Filtro/FiltroPagamento"
// import GraficoDistribuicaoPagamentos from "../Components/PageControleMensal/GraficoDistribuicaoPagamentos"
import FormNovaSenha from "../Components/PageEsqueceuSuaSenha/FormNovaSenha"
import FiltroRelatorio from "../Components/PageRelatorio/FiltroRelatorio";
import Recibo from "../Components/PageRecibo/Recibo";
import LinkConvite from "../Components/PageTurmas/LinkConvite";



export default function PageEsqueceuSenha() {
    return (
        <section className="flex flex-col items-center justify-center h-screen w-screen font-inter bg-gradient-to-br from-[#1267A0] to-[#082F49] text-white relative">
            {/* Logo canto superior esquerdo */}
            <div className="absolute top-0 left-0 flex items-center p-8">
                <p className="text-4xl font-bold italic">BIBI</p>
                <div className="text-4xl text-[#007DFA]">·</div>
            </div>

            {/* <FiltroTurmas /> */}
            {/* <FormCadastroAlunos /> */}
            {/* <FormMensalidade /> */}
            {/* <CardRoteiro name={"Roteiro 1"} quantAlunos={21} turno={"Matutino"} /> */}
            {/* <FiltroPagamentos /> */}
            {/* <GraficoDistribuicaoPagamentos /> */}
            {/* <FormNovaSenha /> */}
            {/* <FiltroRelatorio /> */}
            {/* <Recibo /> */}
            <LinkConvite />

        </section>
    );
}