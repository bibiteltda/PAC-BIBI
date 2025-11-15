/* Dependências */
import { useState, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* Components */
import CardRoteiro from "../Components/PageTurmas/CardRoteiro";
import FiltroTurmas from "../Components/PageTurmas/Filtro/FiltroTurmas";
import NavBar from "../Components/PagePainel/NavBar";
import SideBar from "../Components/PagePainel/SideBar";
import LinkConvite from "../Components/PageTurmas/LinkConvite";
import { useTurma } from "../hooks/useTurma";
import useEscolas from "../hooks/useEscolas"; // default import correto

export default function Turmas() {
  const { findTurmas, turmas, loading } = useTurma();

  // 🔹 Estados do filtro
  const [escola, setEscola] = useState("todas");
  const [turno, setTurno] = useState("todas");

  // 🔹 Estados auxiliares da página
  const [turmasFiltradas, setTurmasFiltradas] = useState([]);
  const [turmaSelecionada, setTurmaSelecionada] = useState(null);
  const [mostrarPopup, setMostrarPopup] = useState(false);

  // 🔹 Estado da nova turma/roteiro
  const [novaTurma, setNovaTurma] = useState({
  turno: "",      
  motorista: "",   // ID do motorista
  escolas: []      // lista de escolas
});

  const [funcao, setFuncao] = useState(""); // usado na SideBar

  // 🔹 Escolas vindas do backend
  const { escolas, loading: loadingEscolas } = useEscolas();

  // 🔹 Motoristas vindos do backend
  const [motoristas, setMotoristas] = useState([]);
  const [loadingMotoristas, setLoadingMotoristas] = useState(false);

  // 🔹 Buscar motoristas uma vez ao montar a página
  useEffect(() => {
    async function fetchMotoristas() {
      try {
        setLoadingMotoristas(true);
        const res = await fetch(`${process.env.REACT_APP_API_URL}/motorista`);
        const data = await res.json();
        setMotoristas(data || []);
      } catch (err) {
        console.error("Erro ao carregar motoristas:", err);
        setMotoristas([]);
      } finally {
        setLoadingMotoristas(false);
      }
    }
    fetchMotoristas();
  }, []);

  // 🔹 Busca turmas (roteiros) do backend sempre que filtros mudam
  useEffect(() => {
  findTurmas({ escola, turno });
}, [escola, turno]);

  // 🔹 Atualiza a lista filtrada sempre que turmas mudar
  useEffect(() => {
    setTurmasFiltradas(turmas);
  }, [turmas]);

  useEffect(() => {
    console.log("Escolas carregadas:", escolas);
  }, [escolas]);

  // 🔹 Lista de escolas para o filtro (por nome, sem duplicação)
  const escolasDisponiveis = useMemo(() => {
    if (!escolas || escolas.length === 0) return ["todas"];
    const nomes = escolas.map((e) => e.nome);
    return ["todas", ...new Set(nomes)];
  }, [escolas]);

  // 🔹 Adiciona novo roteiro
  const adicionarTurma = async () => {
  if (!novaTurma.turno || !novaTurma.motorista || novaTurma.escolas.length === 0) {
    return alert("Preencha turno, motorista e pelo menos uma escola!");
  }

  try {
    // 1. Buscar motorista pelo nome digitado
    const motoristaRes = await fetch(
      `${process.env.REACT_APP_API_URL}/motorista?nome=${encodeURIComponent(novaTurma.motorista)}`
    );
    const motoristaData = await motoristaRes.json();

    if (!motoristaData || motoristaData.length === 0) {
      return alert("Motorista não encontrado!");
    }

    const motoristaId = motoristaData[0].id;

    // 2. Tratar escolas digitadas (ex: "Escola A, Escola B")
    const nomesEscolas = novaTurma.escolas.split(",").map((e) => e.trim());
    const escolaIds = [];

    for (const nome of nomesEscolas) {
      const escolaRes = await fetch(
        `${process.env.REACT_APP_API_URL}/escola?nome=${encodeURIComponent(nome)}`
      );
      const escolaData = await escolaRes.json();

      if (!escolaData || escolaData.length === 0) {
        return alert(`Escola "${nome}" não encontrada!`);
      }

      escolaIds.push(escolaData[0].id);
    }

    // 3. Criar o roteiro
    const response = await fetch(`${process.env.REACT_APP_API_URL}/roteiro`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        turno: Number(novaTurma.turno),
        motorista: motoristaId,
        escolas: escolaIds
      })
    });

    if (!response.ok) {
      console.error("Erro:", await response.text());
      return alert("Erro ao criar roteiro!");
    }

    await findTurmas({ escola, turno });

    // Resetar
    setNovaTurma({ turno: "", motorista: "", escolas: "" });
    setMostrarPopup(false);

  } catch (err) {
    console.error(err);
    alert("Erro ao criar roteiro.");
  }
};
  return (
    <>
      <div className="flex flex-col h-screen w-full bg-[#F9FAFB] relative">
        <NavBar
          foto="https://i.pravatar.cc/300"
          nome="Daniela Luisa"
          email="daniela@gmail.com"
        />

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
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Adicionar Roteiro
                </button>
              </div>

              {/* 🔹 Filtro */}
              <FiltroTurmas
                escola={escola}
                setEscola={setEscola}
                turno={turno}
                setTurno={setTurno}
                escolasDisponiveis={escolasDisponiveis}
              />

              {/* 🔹 Lista de Turmas / Roteiros */}
              <div className="flex flex-col space-y-4 w-full">
                {loading ? (
                  <p className="text-gray-500 text-sm text-center">Carregando...</p>
                ) : turmasFiltradas.length > 0 ? (
                  turmasFiltradas.map((turma) => (
                    <div
                      key={turma.id}
                      onClick={() => setTurmaSelecionada(turma)}
                      className="cursor-pointer hover:scale-[1.02] transition-transform duration-200"
                    >
                      {/* Aqui você pode ajustar o "name" para algo mais descritivo */}
                      <CardRoteiro
                        name={`Roteiro ${turma.id}`}
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

          <div className="hidden lg:block w-[250px]" />
        </div>
      </div>

      {/* 🔹 Popup lateral de adicionar turma/roteiro */}
      <AnimatePresence>
        {mostrarPopup && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 w-full sm:w-[400px] h-full bg-white shadow-xl p-6 flex flex-col z-50"
          >
            <h2 className="text-2xl font-semibold mb-4">Novo Roteiro</h2>

            {/* Turno */}
            <label className="text-sm font-medium mb-1">Turno</label>
            <select
              value={novaTurma.turno}
              onChange={(e) =>
                setNovaTurma({ ...novaTurma, turno: Number(e.target.value) })
              }
              className="w-full border p-2 rounded mb-3"
            >
              <option value={1}>Matutino</option>
              <option value={2}>Vespertino</option>
            </select>

            {/* Motorista */}
            <label>Motorista</label>
            <input
              type="text"
              placeholder="Digite o nome do motorista"
              value={novaTurma.motorista}
              onChange={(e) =>
                setNovaTurma({ ...novaTurma, motorista: e.target.value })
  }
/>
            <input
              type="text"
              placeholder="Digite a Escola"
              value={novaTurma.escolas}
              onChange={(e) =>
              setNovaTurma({ ...novaTurma, escolas: e.target.value })
  }
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

      {/* 🔹 Pop-up de convite existente */}
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
