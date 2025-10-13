import { useEffect, useMemo } from "react";
import { debounce } from "lodash";
import useEscolas from "../../../hooks/useEscolas";

export default function FiltroTurmas({ escola, status, data, setFiltros }) {
    const { escolas, loading: loadingEscolas } = useEscolas();

    useEffect(() => {
        const hoje = new Date();
        const primeiroDia = new Date(hoje.getFullYear(), hoje.getMonth(), 1)
            .toISOString()
            .slice(0, 10);
        const ultimoDia = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0)
            .toISOString()
            .slice(0, 10);

        setFiltros(prev => ({
            ...prev,
            data: { inicio: primeiroDia, fim: ultimoDia },
        }));
    }, [setFiltros]);

    const setFiltrosDebounced = useMemo(
        () => debounce(setFiltros, 300),
        [setFiltros]
    );

    useEffect(() => {
        return () => setFiltrosDebounced.cancel();
    }, [setFiltrosDebounced]);

    const handleChange = (campo, valor) => {
        setFiltrosDebounced(prev => {
            if (campo === "inicio" || campo === "fim") {
                return { ...prev, data: { ...prev.data, [campo]: valor } };
            }
            return { ...prev, [campo]: valor };
        });
    };

    return (
        <div className="w-full max-w-[300px] p-4 bg-white shadow rounded-2xl space-y-3">
            <h2 className="font-semibold mb-2">Filtros</h2>

            <div>
                <label>Escola</label>
                <select
                    value={escola}
                    onChange={(e) => handleChange("escola", e.target.value)}
                    className="w-full p-1 border rounded"
                    disabled={loadingEscolas}
                >
                    <option value="todas">Todas</option>
                    {escolas.map(es => (
                        <option key={es.id} value={es.id}>
                            {es.nome}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label>Status</label>
                <select
                    value={status}
                    onChange={(e) => handleChange("status", e.target.value)}
                    className="w-full p-1 border rounded"
                >
                    <option value="todas">Todos</option>
                    <option value="PAGO">Pago</option>
                    <option value="ATRASADO">Atrasado</option>
                    <option value="CANCELADO">Cancelado</option>
                </select>
            </div>

            <div>
                <label>Data início</label>
                <input
                    type="date"
                    value={data.inicio}
                    onChange={(e) => handleChange("inicio", e.target.value)}
                    className="w-full p-1 border rounded"
                />
            </div>

            <div>
                <label>Data fim</label>
                <input
                    type="date"
                    value={data.fim}
                    onChange={(e) => handleChange("fim", e.target.value)}
                    className="w-full p-1 border rounded"
                />
            </div>
        </div>
    );
}
