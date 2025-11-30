import { useState } from "react";
import NavBar from "../Components/PagePainel/NavBar";
import SideBar from "../Components/PagePainel/SideBar";
import FuncaoCard from "../Components/PageFuncoes/FuncaoCard";
import { FaChartLine, FaFileAlt, FaDollarSign, FaUserFriends } from "react-icons/fa";

export default function PageFuncoes() {
    const [funcao, setFuncao] = useState("Funcoes");

    return (
        <div className="flex flex-col h-screen w-full bg-[#F9FAFB]">

            <NavBar
                foto="https://i.pravatar.cc/300"
                nome="Daniela Luisa"
                email="daniela@gmail.com"
            />

            <div className="flex flex-1 flex-col lg:flex-row">

                <div className="w-full lg:w-[250px] bg-white">
                    <SideBar funcao={funcao} setFuncao={setFuncao} role="condutor" />
                </div>

                <main className="flex-1 bg-[#F3F4F6] p-6 lg:p-12 overflow-y-auto">
                    <div className="w-full max-w-[1200px] space-y-10">

                        <h1 className="text-3xl font-bold text-gray-800">Funções</h1>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

                            <FuncaoCard
                                icon={FaChartLine}
                                titulo="Sobre nós"
                                descricao="Criado por alunos, pensado para transportadores, feito para melhorar vidas."
                            />

                            <FuncaoCard
                                icon={FaFileAlt}
                                titulo="Relatórios"
                                descricao="Gere relatórios completos sobre alunos, pagamentos, turmas e muito mais."
                            />

                            <FuncaoCard
                                icon={FaDollarSign}
                                titulo="Controle Mensal"
                                descricao="Veja pagamentos mensais, gráficos financeiros e situação dos alunos."
                            />

                            <FuncaoCard
                                icon={FaUserFriends}
                                titulo="Turmas"
                                descricao="Gerencie turmas, alunos, horários e disponibilidade."
                            />

                        </div>

                    </div>
                </main>

            </div>
        </div>
    );
}
