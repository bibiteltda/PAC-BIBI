/* Dependências */
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* Components */
import NavBar from "../Components/PagePainel/NavBar";
import SideBar from "../Components/PagePainel/SideBar";
import DistribuicaoPagamentos from "../Components/PageControleMensal/GraficoDistribuicaoPagamentos";
import TabelaTransacoes from "../Components/PageControleMensal/TabelaTransacoes";
import TopEscolas from "../Components/PageControleMensal/TopEscolas";
import FiltroPagamento from "../Components/PageControleMensal/Filtro/FiltroPagamento";

import useControleMensal from "../hooks/useControleMensal";

export default function Turmas() {
    const [funcao, setFuncao] = useState("Financeiro");
    const { loading, error, data, create, find, update, remove } = useControleMensal();

    const [filtros, setFiltros] = useState({
        escola: "todas",
        status: "todas",
        data: { inicio: "", fim: "" },
    });

    useEffect(() => {
        find();
    }, []);

    return (
        <>
            <div className="flex flex-col h-screen w-full bg-[#F9FAFB] relative">
                {/* Navbar */}
                <NavBar />

                <div className="flex flex-1 flex-col lg:flex-row">
                    {/* Sidebar principal */}
                    <div className="w-full lg:w-[250px] bg-white">
                        <SideBar setFuncao={setFuncao} funcao={funcao} role="condutor" />
                    </div>

                    {/* Conteúdo central */}
                    <main className="flex-1 flex justify-center items-start bg-[#F3F4F6] p-6 lg:p-8 overflow-y-auto">
                        <div className="w-full max-w-[800px] flex flex-col space-y-6">
                            {/* Título */}
                            <h1 className="text-3xl font-bold text-center">Controle Mensal</h1>

                            <div className="flex justify-between w-full gap-5">
                                <DistribuicaoPagamentos
                                    ganhosMensais={data?.graficos?.ganhosMensais ?? 0}
                                    perdasMensais={data?.graficos?.perdasMensais ?? 0}
                                    ganhosMesPassado={data?.graficos?.comparativo?.mesPassado ?? 0}
                                />

                                <TopEscolas
                                    escolas={
                                        data?.melhorEscola
                                            ? [{
                                                nome: data.melhorEscola.escola,
                                                totalReceita: data.melhorEscola.rendimento
                                            }]
                                            : []
                                    }
                                />
                            </div>

                            {/* Filtro centralizado */}
                            <div className="flex justify-center ">
                                <div className="w-full">
                                    <FiltroPagamento
                                        filtros={filtros}
                                        setFiltros={setFiltros}
                                        escolasTop={
                                            data?.melhorEscola
                                                ? [{ nome: data.melhorEscola.escola, valor: data.melhorEscola.rendimento }]
                                                : []
                                        }
                                    />
                                </div>
                            </div>

                            <TabelaTransacoes
                                transacoes={data?.transacoes ?? []}
                                updateStatus={(id, status) => update(id, { status })}
                                onDelete={(id) => remove(id)}
                            />

                        </div>
                    </main>

                    {/* Espaço lateral direito (simetria visual em desktop) */}
                    <div className="hidden lg:block w-[250px]" />
                </div>
            </div>

        </>
    );
}