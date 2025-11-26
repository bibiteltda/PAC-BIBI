/* Dependências */
import { useState, useMemo, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* API */
import { API_URL } from "../services/api";

/* Hooks */
import { useCreateRoteiro } from "../hooks/useCreateTurma";

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

  const [turmas, setTurmas] = useState([]);
  const [turmasFiltradas, setTurmasFiltradas] = useState([]);
  const [turmaSelecionada, setTurmaSelecionada] = useState(null);
  const [mostrarPopup, setMostrarPopup] = useState(false);

  const TURNO_MAP = {
    matutino: 1,
    vespertino: 2,
  };


  const [novaTurma, setNovaTurma] = useState({
    name: "",
    escola: "",
    turno: "",
  });

  // Hook para criar roteiro no backend
  const {
    createRoteiro,
    loading: loadingRoteiro,
    error: errorRoteiro,
  } = useCreateRoteiro();

  // ==========================
  // 🔹 Carrega ROTEIROS do back ao abrir a página
  // ==========================
  useEffect(() => {
    async function carregarTurmas() {
      try {
        const resp = await fetch(`${API_URL}/roteiro`);
        const data = await resp.json();

        if (!resp.ok) {
          console.error("Erro ao buscar roteiros:", data);
          return;
        }

        // Ajuste de mapeamento conforme o que o back retorna
        // Aqui eu assumo que o back retorna algo como:
        // [{ id, nome, turno, escola, status, data }]
        const mapeadas = data.map((item, index) => ({
          id: item.id ?? index + 1,
          name: item.nome ?? "Sem nome",
          escola: item.escola ?? "Não informado",
          turno: item.turno ?? "Não informado",
          status: item.status ?? "ativo",
          data: item.data ?? new Date().toISOString().split("T")[0],
        }));

        setTurmas(mapeadas);
        setTurmasFiltradas(mapeadas);
      } catch (err) {
        console.error("Erro de rede ao buscar roteiros:", err);
      }
    }

    carregarTurmas();
  }, []);

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

const adicionarTurma = async () => {
  if (!novaTurma.name || !novaTurma.escola || !novaTurma.turno) {
    alert("Preencha todos os campos!");
    return;
  }

  // normaliza o texto pra evitar problema com maiúsculas / espaços
  const turnoKey = novaTurma.turno.trim().toLowerCase();
  const turnoNumero = TURNO_MAP[turnoKey];

  if (!turnoNumero) {
    alert('Turno inválido. Use "Matutino" ou "Vespertino".');
    return;
  }

  const payload = {
    nome: novaTurma.name,
    escola: novaTurma.escola,
    turno: turnoNumero, // <<< aqui vai o número
  };

  const result = await createRoteiro(payload);
  if (!result || !result.roteiro) return;

  const r = result.roteiro;

  const turmaCriada = {
    id: r.id ?? turmas.length + 1,
    name: r.nome ?? novaTurma.name,
    escola: novaTurma.escola,
    // aqui você pode escolher o que mostrar na UI:
    // o texto original digitado, ou reverter o mapa
    turno: novaTurma.turno,
    status: "ativo",
    data: new Date().toISOString().split("T")[0],
  };

  const novaLista = [...turmas, turmaCriada];
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
        <NavBar />

        <div className="flex flex-1 flex-col lg:flex-row">
          <div className="w-full lg:w-[250px] bg-white">
            <SideBar setFuncao={setFuncao} funcao={funcao} role="condutor" />
          </div>

          <main className="flex-1 flex justify-center items-start bg-[#F3F4F6] p-6 lg:p-8 overflow-y-auto">
            <div className="w-full max-w-[800px] flex flex-col space-y-6">
              <h1 className="text-3xl font-bold text-center">Turmas</h1>

              <div className="flex justify-end">
                <button
                  onClick={() => setMostrarPopup(true)}
                  className="
                    w-full max-w-50
                    bg-[rgba(3,105,161,0.9)]
                    py-1
                    text-white text-normal font-semibold
                    rounded-lg
                    cursor-pointer
                    hover:bg-[rgba(3,105,161,1)] hover:scale-102
                    transition-all duration-300 ease-in-out
                    select-none
                  "
                >
                  Adicionar Turma
                </button>
              </div>

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

              <div className="flex flex-col space-y-4 w-full">
                {turmasFiltradas.length > 0 ? (
                  turmasFiltradas.map((turma) => (
                    <div
                      key={turma.id}
                      onClick={() => setTurmaSelecionada(turma)}
                      className="cursor-pointer hover:scale-[1.02] transition-transform duration-200"
                    >
                      <CardRoteiro name={turma.name} turno={turma.turno} />
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm mt-4 text-center">
                    Nenhuma turma criada ainda. Clique em “Adicionar Turma” para
                    começar.
                  </p>
                )}
              </div>
            </div>
          </main>

          <div className="hidden lg:block w-[250px]" />
        </div>
      </div>

      {/* Popup lateral de criar turma / roteiro */}
      <AnimatePresence>
        {mostrarPopup && (
          <motion.div
            className="fixed inset-0 z-40 flex justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Overlay de fundo */}
            <div
              className="absolute inset-0 bg-black/30"
              onClick={() => !loadingRoteiro && setMostrarPopup(false)}
            />

            {/* Painel lateral */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative z-50 h-full w-full max-w-[400px] bg-white shadow-2xl 
                         border-l border-gray-200 flex flex-col p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Nova Turma
                </h2>
              </div>

              {/* Erro da API */}
              {errorRoteiro && (
                <div className="mb-3 rounded-md bg-red-50 border border-red-200 px-3 py-2 text-xs text-red-700">
                  {errorRoteiro}
                </div>
              )}

              <div className="flex-1 space-y-3 overflow-y-auto">
                <div>
                  <label className="text-sm text-gray-700 mb-1 block">
                    Nome da turma
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: 301-A"
                    value={novaTurma.name}
                    onChange={(e) =>
                      setNovaTurma({ ...novaTurma, name: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm 
                               focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-sky-600"
                    disabled={loadingRoteiro}
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-700 mb-1 block">
                    Escola
                  </label>
                  <input
                    type="text"
                    placeholder="Nome da escola"
                    value={novaTurma.escola}
                    onChange={(e) =>
                      setNovaTurma({ ...novaTurma, escola: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm 
                               focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-sky-600"
                    disabled={loadingRoteiro}
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-700 mb-1 block">
                    Turno
                  </label>
                  <select
                    value={novaTurma.turno}
                    onChange={(e) =>
                      setNovaTurma({ ...novaTurma, turno: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm 
                              focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-sky-600"
                    disabled={loadingRoteiro}
                  >
                    <option value="">Selecione...</option>
                    <option value="Matutino">Matutino</option>
                    <option value="Vespertino">Vespertino</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-between gap-3">
                <button
                  onClick={() => setMostrarPopup(false)}
                  className="w-full py-2 rounded-lg border border-gray-300 text-gray-700 
                             text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50
                             cursor-pointer
                             "
                  disabled={loadingRoteiro}
                >
                  Cancelar
                </button>

                <button
                  onClick={adicionarTurma}
                  className="w-full py-2 rounded-lg bg-[rgba(3,105,161,0.95)] text-white 
                             text-sm font-semibold hover:bg-[rgba(3,105,161,1)] transition-colors disabled:opacity-70 disabled:cursor-not-allowed
                             cursor-pointer
                             "
                  disabled={loadingRoteiro}
                >
                  {loadingRoteiro ? "Salvando..." : "Salvar"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pop-up lateral do convite (já existente) */}
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
