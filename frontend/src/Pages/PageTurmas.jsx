/* Dependências */
import { useState, useEffect, useMemo } from "react";
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

  // Lista de turmas (roteiros)
  const [turmas, setTurmas] = useState([]);
  const [turmasFiltradas, setTurmasFiltradas] = useState([]);
  const [turmaSelecionada, setTurmaSelecionada] = useState(null);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [novaTurma, setNovaTurma] = useState({ name: "", escola: "", turno: "" });

  // Buscar roteiros do banco ao carregar a página
  useEffect(() => {
    const carregarRoteiros = async () => {
      try {
        const response = await fetch("https://pac-bibi.onrender.com/roteiro");
        if (!response.ok) throw new Error("Erro ao carregar roteiros");
        const data = await response.json();

        // Normaliza a estrutura recebida do backend
        const roteiros = data.map((r) => ({
          id: r.id,
          name: r.name || `Turma ${r.id}`,
          escola: r.escola || "Desconhecida",
          turno: r.turno || "Não informado",
          status: "ativo",
          data: new Date(r.createdAt).toISOString().split("T")[0],
        }));

        setTurmas(roteiros);
        setTurmasFiltradas(roteiros);
      } catch (err) {
        console.error("Erro ao carregar roteiros:", err);
      }
    };

    carregarRoteiros();
  }, []);

  // Função de filtro
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

  // Adicionar nova turma (criar roteiro no backend)
  const adicionarTurma = async () => {
    if (!novaTurma.name || !novaTurma.escola || !novaTurma.turno)
      return alert("Preencha todos os campos!");

    try {
      const response = await fetch("https://pac-bibi.onrender.com/roteiro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: novaTurma.name,
          escola: novaTurma.escola,
          turno: novaTurma.turno,
          motorista: 1,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Erro na resposta:", errorText);
        throw new Error("Erro ao criar roteiro");
      }

      const data = await response.json();
      const novoRoteiro = data.roteiro;

      // Atualiza a lista local com o retorno do backend
      const novaLista = [
        ...turmas,
        {
          id: novoRoteiro.id,
          name: novoRoteiro.name || novaTurma.name,
          escola: novoRoteiro.escola || novaTurma.escola,
          turno: novoRoteiro.turno || novaTurma.turno,
          status: "ativo",
          data: new Date().toISOString().split("T")[0],
        },
      ];

      setTurmas(novaLista);
      setTurmasFiltradas(novaLista);
      setNovaTurma({ name: "", escola: "", turno: "" });
      setMostrarPopup(false);
    } catch (err) {
      console.error("Erro ao criar roteiro:", err);
      alert("Erro ao criar roteiro. Verifique o console.");
    }
  };

  // Opções únicas de escola para o filtro
  const escolasDisponiveis = useMemo(
    () => ["todas", ...new Set(turmas.map((t) => t.escola))],
    [turmas]
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
          {/* Sidebar */}
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
                  Adicionar Roteiro
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
                        escola={turma.escola}
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

      {/* Pop-up de convite */}
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
