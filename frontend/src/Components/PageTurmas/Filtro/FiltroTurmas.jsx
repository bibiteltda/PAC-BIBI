/* Dependências */
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function FiltroTurmas() {
    const [escola, setEscola] = useState("todas");
    const [status, setStatus] = useState("todas");
    const [data, setData] = useState({ inicio: "2020-01-01", fim: "2020-12-31" });

    return (
        <div className="flex gap-4 items-end p-4 rounded-lg shadow">
            {/* Filtro Escola */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">Escola</label>
                <select
                    className="border rounded-md px-3 py-2 text-sm text-black"
                    value={escola}
                    onChange={(e) => setEscola(e.target.value)}
                >
                    <option value="todas" className="hover:bg-[#0369A1]">
                        Todas
                    </option>
                    <option value="escola1" className="hover:bg-[#0369A1]">
                        Escola 1
                    </option>
                    <option value="escola2" className="hover:bg-[#0369A1]">
                        Escola 2
                    </option>
                </select>
            </div>

            {/* Filtro Status */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">Status</label>
                <select
                    className="border rounded-md px-3 py-2 text-sm text-black"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="todas" className="hover:bg-[#0369A1]">
                        Todas
                    </option>
                    <option value="ativo" className="hover:bg-[#0369A1]">
                        Ativo
                    </option>
                    <option value="inativo" className="hover:bg-[#0369A1]">
                        Inativo
                    </option>
                </select>
            </div>

            {/* Filtro Data */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">Data</label>
                <div className="flex gap-2">
                    <input
                        type="date"
                        className="border rounded-md px-3 py-2 text-sm text-black"
                        value={data.inicio}
                        onChange={(e) => setData({ ...data, inicio: e.target.value })}
                    />
                    <span className="self-center">→</span>
                    <input
                        type="date"
                        className="border rounded-md px-3 py-2 text-sm text-black"
                        value={data.fim}
                        onChange={(e) => setData({ ...data, fim: e.target.value })}
                    />
                </div>
            </div>

            {/* Botão Filtrar */}
            <button className="bg-[rgba(3,105,161,0.9)] border border-[#0369A1] text-white hover:bg-[#0369A1] hover:text-white font-medium px-6 py-2 rounded-md">
                Filtrar
            </button>
        </div>
    );
}
