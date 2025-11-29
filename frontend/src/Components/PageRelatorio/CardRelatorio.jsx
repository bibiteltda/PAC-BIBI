import React from "react";
import { useNavigate } from "react-router-dom";
import usePagamentos from "../../hooks/usePagamentos";

// classes de status
const statusClasses = {
  PAGO: "bg-green-600 text-white px-2 py-0.5 text-xs font-semibold rounded-md",
  PENDENTE: "bg-gray-500 text-white px-2 py-0.5 text-xs font-semibold rounded-md",
  ATRASADO: "bg-red-600 text-white px-2 py-0.5 text-xs font-semibold rounded-md",
};

export default function CardRelatorio({ filtros }) {
  const navigate = useNavigate();
  const { pagamentos, loading, error } = usePagamentos(filtros);

  // normaliza status
  const normalizarStatus = (status) => {
    if (!status) return "PENDENTE";
    const s = String(status).toUpperCase();
    if (["PAGO", "PENDENTE", "ATRASADO"].includes(s)) return s;
    return "PENDENTE";
  };

  // trata dados vindos do backend
  const data = (pagamentos || []).map((p) => {
    const alunoObj = p.aluno || {};
    const escolaObj = alunoObj.escola || p.escola || {};

    // CAMPOS REAIS DO BANCO (corrigido)
    const rawDate =
      p.dta_pgmt ||       // pagamento
      p.dta_vcto ||       // vencimento
      p.data_pagamento || // fallback
      p.data_vencimento ||
      p.data ||
      p.vencimento ||
      p.createdAt;

    let dataFormatada = "--/--/----";

    if (rawDate) {
      const d = new Date(rawDate);
      if (!isNaN(d.getTime())) {
        dataFormatada = d.toLocaleDateString("pt-BR");
      }
    }

    return {
      id: p.id_pagamento ?? p.id ?? Math.random(),
      aluno: alunoObj.nome || p.nome_aluno || "Aluno não informado",
      escola: escolaObj.nome || p.nome_escola || "Escola não informada",
      valorNumero: Number(p.valor ?? 0),
      data: dataFormatada,
      status: normalizarStatus(p.status),
    };
  });

  const semDados = !loading && !error && data.length === 0;
  const linhas = data;

  // ==========================
  // RENDER
  // ==========================

  if (loading)
    return (
      <div className="w-full flex justify-center items-center py-10">
        <p className="text-gray-500 text-sm">Carregando pagamentos...</p>
      </div>
    );

  if (error)
    return (
      <div className="w-full flex justify-center items-center py-10">
        <p className="text-red-500 text-sm">
          Erro ao carregar pagamentos: {error}
        </p>
      </div>
    );

  if (semDados)
    return (
      <div className="w-full flex justify-center items-center py-10">
        <p className="text-gray-400 text-sm">
          Nenhum pagamento encontrado para os filtros selecionados.
        </p>
      </div>
    );

  return (
    <div className="w-full flex flex-col items-center">

      {/* --- DESKTOP TABLE --- */}
      <div className="hidden md:block w-full max-w-[770px] bg-white shadow-md text-sm border border-gray-300 rounded-md">

        {/* área rolável (limite ~5 linhas) */}
        <div className="max-h-[260px] overflow-y-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 text-black border-b border-gray-300 sticky top-0">
              <tr>
                <th className="p-2 text-left">Aluno</th>
                <th className="p-2 text-left">Escola</th>
                <th className="p-2 text-left">Valor</th>
                <th className="p-2 text-left">Data</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Ações</th>
              </tr>
            </thead>

            <tbody>
              {linhas.map((item) => (
                <tr key={item.id} className="text-black border-b border-gray-200 last:border-none">
                  <td className="p-3">{item.aluno}</td>
                  <td className="p-3">{item.escola}</td>
                  <td className="p-3">
                    R{"$ "}
                    {item.valorNumero.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </td>
                  <td className="p-3">{item.data}</td>
                  <td className="p-3">
                    <span className={statusClasses[item.status]}>{item.status}</span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => navigate("/recibo/${item.id}")}
                      className="px-3 py-1 rounded-lg border border-blue-300 text-blue-500 hover:bg-blue-50 transition"
                    >
                      Emitir Recibo
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      {/* --- MOBILE (cards) --- */}
      <div className="flex flex-col gap-3 md:hidden w-full max-w-[770px] px-2 mt-2">
        {linhas.map((item) => (
          <section
            key={item.id}
            className="w-full bg-gradient-to-br from-[#1267A0] to-[#082F49] rounded-xl text-white shadow-lg p-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm opacity-80">{item.escola}</p>
                <p className="text-base font-semibold -mt-1">{item.aluno}</p>
              </div>

              <button
                onClick={() => navigate(`/recibo/${item.id}`)}
                className="text-white/70 hover:text-white text-xl px-1"
              >
                ⋮
              </button>
            </div>

            <div className="mt-3 flex justify-between items-end">
              <div>
                <p className="text-xs opacity-70">{item.data}</p>
                <p className="text-sm font-semibold">
                  R{"$ "}
                  {item.valorNumero.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>

              <span
                className={`${statusClasses[item.status]} text-[10px] px-2 py-0.5 rounded-md`}
              >
                {item.status}
              </span>
            </div>
          </section>
        ))}
      </div>

      <div className="h-10" />
    </div>
  );
}
