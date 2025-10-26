import { useEffect, useMemo, useCallback } from "react";
import { debounce } from "lodash";

export default function FiltroTurmas({ filtros = {}, setFiltros, escolasTop = [] }) {
    const { escola = "todas", status = "todas", data = { inicio: "", fim: "" } } = filtros;

    useEffect(() => {
        if (!data.inicio || !data.fim) {
            const hoje = new Date();
            const primeiroDia = new Date(hoje.getFullYear(), hoje.getMonth(), 1)
                .toISOString()
                .slice(0, 10);
            const ultimoDia = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0)
                .toISOString()
                .slice(0, 10);

            setFiltros((prev) => ({
                ...prev,
                data: { inicio: primeiroDia, fim: ultimoDia },
            }));
        }
    }, [data, setFiltros]);

    const setFiltrosDebounced = useMemo(() => debounce(setFiltros, 300), [setFiltros]);

    useEffect(() => () => setFiltrosDebounced.cancel(), [setFiltrosDebounced]);

    const handleChange = useCallback(
        (campo, valor) => {
            setFiltrosDebounced((prev) => {
                if (campo === "inicio" || campo === "fim") {
                    return { ...prev, data: { ...prev.data, [campo]: valor } };
                }
                return { ...prev, [campo]: valor };
            });
        },
        [setFiltrosDebounced]
    );

    return (
        <div className="w-full p-4 bg-white shadow-md rounded-2xl space-y-3 border border-gray-100">
            <h2 className="font-semibold text-gray-800 mb-2">Filtros</h2>

            <div className="flex w-full gap-2">
                <div className="w-1/2">
                    <label className="block text-sm text-gray-600">Escola</label>
                    <select
                        value={escola}
                        onChange={(e) => handleChange("escola", e.target.value)}
                        className="w-full p-2 border rounded-md text-sm"
                    >
                        <option value="todas">Todas</option>
                        {escolasTop.map((es) => (
                            <option key={es.id_escola} value={es.id_escola}>
                                {es.nome}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="w-1/2">
                    <label className="block text-sm text-gray-600">Status</label>
                    <select
                        value={status}
                        onChange={(e) => handleChange("status", e.target.value)}
                        className="w-full p-2 border rounded-md text-sm"
                    >
                        <option value="todas">Todos</option>
                        <option value="PAGO">Pago</option>
                        <option value="ATRASADO">Atrasado</option>
                        <option value="CANCELADO">Cancelado</option>
                    </select>
                </div>
            </div>


            <div className="grid grid-cols-2 gap-2">
                <div>
                    <label className="block text-sm text-gray-600">Início</label>
                    <input
                        type="date"
                        value={data.inicio || ""}
                        onChange={(e) => handleChange("inicio", e.target.value)}
                        className="w-full p-2 border rounded-md text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm text-gray-600">Fim</label>
                    <input
                        type="date"
                        value={data.fim || ""}
                        onChange={(e) => handleChange("fim", e.target.value)}
                        className="w-full p-2 border rounded-md text-sm"
                    />
                </div>
            </div>
        </div>
    );
}