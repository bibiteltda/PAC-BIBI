import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../services/api";

import FiltroPagamento from "../Components/PageControleMensal/Filtro/FiltroPagamento";
import DistribuicaoPagamentos from "../Components/PageControleMensal/GraficoDistribuicaoPagamentos";
import TabelaTransacoes from "../Components/PageControleMensal/TabelaTransacoes";
import TopEscolas from "../Components/PageControleMensal/TopEscolas";

export default function ControleMensal() {
  const [filtros, setFiltros] = useState({
    escola: "todas",
    status: "todas",
    data: { inicio: "", fim: "" },
  });

  const { loading, error, data, create, find, update, remove } = useControleMensal();

  useEffect(() => {
    find(); 
  }, []);

  if (loading) return <p>Carregando dashboard...</p>;
  if (error) return <p className="text-red-500">Erro: {error}</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Controle Mensal</h1>

      <div className="flex flex-col md:flex-row gap-4">
        <DistribuicaoPagamentos
          ganhosMensais={data?.graficos?.ganhosMensais ?? 0}
          perdasMensais={data?.graficos?.perdasMensais ?? 0}
          ganhosMesPassado={data?.graficos?.comparativo?.mesPassado ?? 0}
        />

        <FiltroTurmas
          filtros={filtros}
          setFiltros={setFiltros}
          escolasTop={
            data?.melhorEscola
              ? [{ nome: data.melhorEscola.escola, valor: data.melhorEscola.rendimento }]
              : []
          }
        />
      </div>

      <TopEscolas
        escolas={
          data?.melhorEscola
            ? [{ nome: data.melhorEscola.escola, valor: data.melhorEscola.rendimento }]
            : []
        }
      />

      <TabelaTransacoes
        transacoes={data?.transacoes ?? []}
        updateStatus={(id, status) => update(id, { status })}
        onDelete={(id) => remove(id)}
      />
    </div>
  );
}
