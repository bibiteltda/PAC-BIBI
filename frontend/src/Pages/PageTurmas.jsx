/* Dependências */
import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* Components */
import CardRoteiro from "../Components/PageTurmas/CardRoteiro";
import FiltroTurmas from "../Components/PageTurmas/Filtro/FiltroTurmas";
import NavBar from "../Components/PagePainel/NavBar";
import SideBar from "../Components/PagePainel/SideBar";
import LinkConvite from "../Components/PageTurmas/LinkConvite";



export default function Turmas() {
  const [funcao, setFuncao] = useState("Turmas");
  const [escola, setEscola] = useState("todas");
  const [status, setStatus] = useState("todas");
  const [data, setData] = useState({ inicio: "2020-01-01", fim: "2020-12-31" });


  // 🔹 Agora inicia vazio (sem mock)
  const [turmas, setTurmas] = useState([]);
  const [turmasFiltradas, setTurmasFiltradas] = useState([]);
  const [turmaSelecionada, setTurmaSelecionada] = useState(null);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [novaTurma, setNovaTurma] = useState({ name: "", escola: "", turno: "" });

  const filtrar = () => {
    const inicio = new Date(data.inicio);
    const fim = new Date(data.fim);

    const filtradas = turmas.filter((t) => {
      const dataTurma = new Date(t.data);
      const matchEscola = escola === "todas" || t.escola === escola;
      const matchStatus = status === "todas" || t.status === status;
      const matchData = dataTurma >= inicio && dataTurma <= fim;
      return matchEscola && matchStatus && matchData;
    });

    setTurmasFiltradas(filtradas);
  };

  const adicionarTurma = () => {
    if (!novaTurma.name || !novaTurma.escola || !novaTurma.turno)
      return alert("Preencha todos os campos!");

    const nova = {
      id: turmas.length + 1,
      escola: novaTurma.escola,
      name: novaTurma.name,
      turno: novaTurma.turno,
      status: "ativo",
      data: new Date().toISOString().split("T")[0],
    };

    const novaLista = [...turmas, nova];
    setTurmas(novaLista);
    setTurmasFiltradas(novaLista);
    setNovaTurma({ name: "", escola: "", turno: "" });
    setMostrarPopup(false);
  };

  const escolasDisponiveis = useMemo(
    () => ["todas", ...new Set(turmas.map((t) => t.escola))],
    [turmas]
  );

  return (
    <>
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
              <h1 className="text-3xl font-bold text-center">Turmas</h1>

              {/* Botão de adicionar turma */}
              <div className="flex justify-end">
                <button
                  onClick={() => setMostrarPopup(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Adicionar Turma
                </button>
              </div>

              {/* Filtro */}
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
                        turno={turma.turno}
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm mt-4 text-center">
                    Nenhuma turma criada ainda. Clique em “Adicionar Turma” para começar.
                  </p>
                )}
              </div>
            </div>
            <LoadingSpinner/>
          </main>

          {/* Espaço lateral direito */}
          <div className="hidden lg:block w-[250px]" />
        </div>
      </div>

      {/* POP-UP lateral de adicionar turma */}
      <AnimatePresence>
        {mostrarPopup && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 w-full sm:w-[400px] h-full bg-white shadow-xl p-6 flex flex-col z-50"
          >
            <h2 className="text-2xl font-semibold mb-4">Nova Turma</h2>

            <input
              type="text"
              placeholder="Nome da turma"
              value={novaTurma.name}
              onChange={(e) => setNovaTurma({ ...novaTurma, name: e.target.value })}
              className="w-full border p-2 rounded mb-3"
            />
            <input
              type="text"
              placeholder="Escola"
              value={novaTurma.escola}
              onChange={(e) => setNovaTurma({ ...novaTurma, escola: e.target.value })}
              className="w-full border p-2 rounded mb-3"
            />
            <input
              type="text"
              placeholder="Turno (ex: Matutino)"
              value={novaTurma.turno}
              onChange={(e) => setNovaTurma({ ...novaTurma, turno: e.target.value })}
              className="w-full border p-2 rounded mb-3"
            />

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setMostrarPopup(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancelar
              </button>
              <button
                onClick={adicionarTurma}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Salvar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pop-up de convite existente */}
      <AnimatePresence>
        {turmaSelecionada && (
          <LinkConvite turma={turmaSelecionada} onClose={() => setTurmaSelecionada(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
