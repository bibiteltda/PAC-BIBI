import React from "react";
import usePagamentos from "../../hooks/usePagamentos";

export default function TabelaTransacoes({ filtroEscola, filtroStatus, filtroData }) {
  const filtros = { escola: filtroEscola, status: filtroStatus, data: filtroData };
  const { pagamentos, loading, error, updateStatus } = usePagamentos(filtros);

  if (loading) return <p>Carregando pagamentos...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <table className="w-full border">
      <thead>
        <tr>
          <th>Aluno</th>
          <th>Responsável</th>
          <th>Valor</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {pagamentos.map(p => (
          <tr key={p.id}>
            <td>{p.aluno?.nome}</td>
            <td>{p.responsavelObj?.nome}</td>
            <td>{p.valor}</td>
            <td>{p.status}</td>
            <td>
              <button
                onClick={() => updateStatus(p.id, p.status === "Pago" ? "Pendente" : "Pago")}
                className="px-2 py-1 bg-blue-500 text-white rounded"
              >
                Alternar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
