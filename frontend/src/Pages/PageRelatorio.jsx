import React, { useState } from "react";
import NavBar from "../Components/PagePainel/NavBar";
import SideBar from "../Components/PagePainel/SideBar";
import FiltroRelatorio from "../Components/PageRelatorio/FiltroRelatorio";
import CardRelatorio from "../Components/PageRelatorio/CardRelatorio";

export default function PageRelatorio() {
    const [escola, setEscola] = useState("todas");
    const [status, setStatus] = useState("todas");
    const [data, setData] = useState({ inicio: "", fim: "" });
    const [funcao, setFuncao] = useState("Relatorios");

    const filtrar = () => {
        console.log("Filtro aplicado:", { escola, status, data });
    };

    return (
        <div className="flex flex-col h-screen w-full bg-[#F9FAFB] relative">
            {/* Navbar */}
            <NavBar />

            <div className="flex flex-1 flex-col lg:flex-row">
                {/* Sidebar esquerda */}
                <div className="w-full lg:w-[250px] bg-white">
                    <SideBar setFuncao={setFuncao} funcao={funcao} role="condutor" />
                </div>

                {/* Conteúdo principal */}
                <main className="flex-1 flex justify-center items-start bg-[#F3F4F6] p-6 lg:p-8 overflow-y-auto">
                    <div className="w-full max-w-[800px] flex flex-col space-y-6">
                        <h1 className="text-3xl font-bold text-center">Relatórios</h1>

                        {/* Filtros */}
                        <FiltroRelatorio
                            escola={escola}
                            setEscola={setEscola}
                            status={status}
                            setStatus={setStatus}
                            data={data}
                            setData={setData}
                            filtrar={filtrar}
                            escolasDisponiveis={["todas", "Escola Primavera", "Escola Horizonte"]}
                        />

                        {/* Título Transações */}
                        <p className="font-medium text-gray-700 text-lg text-center lg:text-left">Transações</p>

                        {/* Card de Relatório */}
                        <CardRelatorio filtros={{ status: "Todas" }}/>
                    </div>
                </main>

                {/* Espaço lateral direito */}
                <div className="hidden lg:block w-[250px]" />
            </div>
        </div>
    );
}