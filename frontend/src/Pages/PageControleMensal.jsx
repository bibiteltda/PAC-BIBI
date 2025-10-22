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
        data: { inicio: "2020-01-01", fim: "2020-12-31" },
    });

    const [dadosDashboard, setDadosDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchDashboard() {
            setLoading(true);
            try {
                const res = await axios.get(`${API_URL}/dashboard/controles`);
                setDadosDashboard(res.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchDashboard();
    }, []);

    if (loading) return <p>Carregando dashboard...</p>;
    if (error) return <p>Erro: {error}</p>;

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-xl font-bold">Controle Mensal</h1>

            {/* Gráfico e Filtro */}
            <div className="flex flex-col md:flex-row gap-4">
                {dadosDashboard && (
                    <DistribuicaoPagamentos
                        ganhosMensais={dadosDashboard.ganhosMensais}
                        perdasMensais={dadosDashboard.perdasMensais}
                        ganhosMesPassado={dadosDashboard.ganhosMesAnterior}
                    />
                )}

                <FiltroPagamento
                    escola={filtros.escola}
                    status={filtros.status}
                    data={filtros.data}
                    setFiltros={setFiltros}
                />
            </div>

            {/* Top 3 Escolas */}
            <TopEscolas />

            {/* Tabela de transações */}
            <TabelaTransacoes
                filtroEscola={filtros.escola}
                filtroStatus={filtros.status}
                filtroData={filtros.data}
            />
        </div>
    );
}


