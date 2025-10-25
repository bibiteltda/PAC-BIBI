/* Dependências */
import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* Components */
import CardRoteiro from "../Components/PageTurmas/CardRoteiro";
import FiltroTurmas from "../Components/PageTurmas/Filtro/FiltroTurmas";
import NavBar from "../Components/PagePainel/NavBar";
import SideBar from "../Components/PagePainel/SideBar";
import LinkConvite from "../Components/PageTurmas/LinkConvite"; 

/* Dados simulados */
const turmasMock = [
    { id: 1, escola: "escola1", name: "Amador Aguir - Turma 1A", quantAlunos: 25, turno: "Matutino", status: "ativo", data: "2020-03-10" },
    { id: 2, escola: "escola2", name: "Amador Aguir - Turma 2B", quantAlunos: 18, turno: "Vespertino", status: "inativo", data: "2020-07-12" },
    { id: 3, escola: "escola1", name: "Amador Aguir - Turma 3A", quantAlunos: 22, turno: "Noturno", status: "ativo", data: "2020-09-05" },
    { id: 4, escola: "escola2", name: "Amador Aguir - Turma 4A", quantAlunos: 28, turno: "Matutino", status: "ativo", data: "2020-11-20" },
];

export default function Turmas() {
    const [funcao, setFuncao] = useState("Turmas");

    const [escola, setEscola] = useState("todas");
    const [status, setStatus] = useState("todas");
    const [data, setData] = useState({ inicio: "2020-01-01", fim: "2020-12-31" });

    const [turmasFiltradas, setTurmasFiltradas] = useState(turmasMock);
    const [turmaSelecionada, setTurmaSelecionada] = useState(null);

    const filtrar = () => {
        const inicio = new Date(data.inicio);
        const fim = new Date(data.fim);

        const filtradas = turmasMock.filter((t) => {
            const dataTurma = new Date(t.data);
            const matchEscola = escola === "todas" || t.escola === escola;
            const matchStatus = status === "todas" || t.status === status;
            const matchData = dataTurma >= inicio && dataTurma <= fim;
            return matchEscola && matchStatus && matchData;
        });

        setTurmasFiltradas(filtradas);
    };

    const escolasDisponiveis = useMemo(
        () => ["todas", ...new Set(turmasMock.map((t) => t.escola))],
        []
    );

    return (
        <>
            <div className="flex flex-col h-screen w-full bg-[#F9FAFB] relative">
                {/* Navbar */}
                <NavBar
                    foto="https://i.pravatar.cc/300"
                    nome="Daniela Luisa"
                    email="daniela@gmail.com"
                />

                <div className="flex flex-1 flex-col lg:flex-row">
                    {/* Sidebar principal */}
                    <div className="w-full lg:w-[250px] bg-white">
                        <SideBar setFuncao={setFuncao} funcao={funcao} role="condutor" />
                    </div>

                    {/* Conteúdo central */}
                    <main className="flex-1 flex justify-center items-start bg-[#F3F4F6] p-6 lg:p-8 overflow-y-auto">
                        <div className="w-full max-w-[800px] flex flex-col space-y-6">
                            {/* Título */}
                            <h1 className="text-3xl font-bold text-center">Turmas</h1>

                            {/* Filtro centralizado */}
                            <div className="flex justify-center ">
                                <div className="w-full">
                                    <FiltroTurmas
                                        escola={escola}
                                        setEscola={setEscola}
                                        status={status}
                                        setStatus={setStatus}
                                        data={data}
                                        setData={setData}
                                        filtrar={filtrar}
                                        escolasDisponiveis={escolasDisponiveis}
                                    />
                                </div>
                            </div>

                            {/* Lista de Turmas */}
                            <div className="flex flex-col space-y-4 w-full">
                                {turmasFiltradas.length > 0 ? (
                                    turmasFiltradas.map((turma) => (
                                        <div
                                            key={turma.id}
                                            onClick={() => setTurmaSelecionada(turma)}
                                            className="cursor-pointer hover:scale-[1.02] transition-transform duration-200"
                                        >
                                            <CardRoteiro
                                                name={turma.name}
                                                quantAlunos={turma.quantAlunos}
                                                turno={turma.turno}
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-sm mt-4 text-center">
                                        Nenhuma turma encontrada com os filtros selecionados.
                                    </p>
                                )}
                            </div>
                        </div>
                    </main>

                    {/* Espaço lateral direito (simetria visual em desktop) */}
                    <div className="hidden lg:block w-[250px]" />
                </div>
            </div>

            {/* Overlay + Sidebar */}
            <AnimatePresence>
                {turmaSelecionada && (
                    <LinkConvite
                        turma={turmaSelecionada}
                        onClose={() => setTurmaSelecionada(null)}
                    />
                )}
            </AnimatePresence>

        </>
    );
}