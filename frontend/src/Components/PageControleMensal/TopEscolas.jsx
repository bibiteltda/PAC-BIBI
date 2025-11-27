import React from "react";

export default function TopEscolas({ escolas = [] }) {
  // 🔒 Garantir número seguro
  const safeNumber = (v) => {
    const n = Number(v);
    return Number.isFinite(n) && !Number.isNaN(n) && n >= 0 ? n : 0;
  };

  // Ordena já normalizando os valores
  const ordenadas = [...escolas].map((e) => ({
    ...e,
    totalReceita: safeNumber(e.totalReceita),
  }));

  const top3 = ordenadas
    .sort((a, b) => b.totalReceita - a.totalReceita)
    .slice(0, 3);

  const semDados =
    !escolas ||
    escolas.length === 0 ||
    top3.every((e) => e.totalReceita === 0);

  return (
    <div className="w-full max-w-[520px] p-4 bg-white shadow-md rounded-2xl">
      <h2 className="text-gray-800 text-lg font-semibold mb-3">
        Top 3 Escolas por Rendimento
      </h2>

      {semDados ? (
        <div className="flex items-center justify-center h-[160px] text-gray-400 text-sm">
          Nenhum dado disponível
        </div>
      ) : (
        <ol className="space-y-2">
          {top3.map((escola, index) => (
            <li
              key={escola.id_escola ?? index}
              className="flex items-center justify-between bg-slate-50 rounded-xl px-3 py-2"
            >
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-sky-600 text-white text-xs font-semibold">
                  {index + 1}
                </span>
                <span className="font-medium text-gray-900">
                  {escola.nome ?? "Escola sem nome"}
                </span>
              </div>

              <span className="text-sm font-semibold text-gray-900">
                R${" "}
                {escola.totalReceita.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
