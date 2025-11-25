/* Dependências*/
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Filtros

import FiltroTurmas from "../Components/PageTurmas/Filtro/FiltroTurmas";
import FiltroPagamentos from "../Components/PageControleMensal/Filtro/FiltroPagamento";
import FiltroRelatorio from "../Components/PageRelatorio/FiltroRelatorio";

// Forms

import FormCadastroAlunos from "../Components/PageTurmas/FormCadastroAlunos"
import FormMensalidade from "../Components/PageCondutor/FormMensalidade"
import FormNovaSenha from "../Components/PageEsqueceuSuaSenha/FormNovaSenha"
import LinkConvite from "../Components/PageTurmas/LinkConvite";

// Gráficos

import GraficoDistribuicaoPagamentos from "../Components/PageControleMensal/GraficoDistribuicaoPagamentos";
import TabelaTransacao from "../Components/PageControleMensal/TabelaTransacoes";
import TopEscolas from "../Components/PageControleMensal/TopEscolas";

// Recebem Informação

import Recibo from "../Components/PageRecibo/Recibo";
import CardRoteiro from "../Components/PageTurmas/CardRoteiro";
import CardRelatorio from "../Components/PageRelatorio/CardRelatorio";




export default function PageEsqueceuSenha() {
    return (
        <section className="flex flex-col items-center justify-center h-screen w-screen font-inter bg-gradient-to-br from-[#1267A0] to-[#082F49] text-white relative">
            {/* Logo canto superior esquerdo */}
            <div className="absolute top-0 left-0 flex items-center p-8">
                <p className="text-4xl font-bold italic">BIBI</p>
                <div className="text-4xl text-[#007DFA]">·</div>
            </div>

            {/* Filtros  */}

            {/* <FiltroTurmas /> */}
            {/* <FiltroPagamentos /> */}
            {/* <FiltroRelatorio /> */}

            {/* Forms */}

            {/* <FormCadastroAlunos /> */}
            {/* <FormMensalidade /> */}
            {/* <FormNovaSenha /> */}
            {/* <LinkConvite /> */}

            {/* Gráficos */}

            {/* <GraficoDistribuicaoPagamentos /> */}
            {/* <TabelaTransacao /> */}
            {/* <TopEscolas />  Provável que vou ter que fazer */}

            {/* Recebem Informação */}

            {/* <Recibo /> */}
            {/* <CardRoteiro name={"Roteiro 1"} quantAlunos={21} turno={"Matutino"} /> */}
            <CardRelatorio />


        </section>
    );
}