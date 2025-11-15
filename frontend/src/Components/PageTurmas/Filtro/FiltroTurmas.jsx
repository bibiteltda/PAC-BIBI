import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FiltroTurmas({
    escola,
    setEscola,
    turno,
    setTurno,
    escolasDisponiveis = ["todas"],
    filtrar,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const handleFiltrar = () => {
        filtrar();
        setIsOpen(false);
    };

    const inputClass =
        "border rounded-md px-3 py-2 text-sm text-black focus:outline-none focus:ring-1 focus:ring-[#0369A1] focus:border-[#0369A1]";

    return (
        <div className="w-full max-w-[800px] mx-auto">
            {/* Botão mobile */}
            <div
                className="lg:hidden flex justify-center items-center bg-white p-3 rounded-md shadow cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="font-medium text-gray-700 flex items-center gap-2">
                    Filtros {isOpen ? "▲" : "▼"}
                </span>
            </div>

            {/* Dropdown mobile */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="lg:hidden bg-white p-4 mt-2 rounded-md shadow flex flex-col gap-4"
                    >
                        {/* Filtro Escola */}
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700">Escola</label>
                            <select
                                className={inputClass}
                                value={escola}
                                onChange={(e) => setEscola(e.target.value)}
                            >
                                {escolasDisponiveis.map((nome) => (
                                    <option key={nome} value={nome}>
                                        {nome === "todas" ? "Todas" : nome.charAt(0).toUpperCase() + nome.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Filtro Turno */}
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700">Turno</label>
                            <select
                                className={inputClass}
                                value={turno}
                                onChange={(e) => setTurno(e.target.value)}
                            >
                                <option value="todas">Todos</option>
                                <option value="1">Matutino</option>
                                <option value="2">Vespertino</option>
                            </select>
                        </div>

                        <motion.button
                            onClick={handleFiltrar}
                            whileTap={{ scale: 0.95 }}
                            className="bg-[#0369A1] border border-[#0369A1] text-white hover:bg-[#075985] font-medium px-6 py-2 rounded-md self-center"
                        >
                            Aplicar
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Desktop */}
            <div className="hidden lg:flex flex-wrap justify-center gap-4 items-end p-4 rounded-lg shadow bg-white mt-2">
                {/* Filtro Escola */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">Escola</label>
                    <select
                        className={inputClass}
                        value={escola}
                        onChange={(e) => setEscola(e.target.value)}
                    >
                        {escolasDisponiveis.map((nome) => (
                            <option key={nome} value={nome}>
                                {nome === "todas" ? "Todas" : nome.charAt(0).toUpperCase() + nome.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Filtro Turno */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">Turno</label>
                    <select
                        className={inputClass}
                        value={turno}
                        onChange={(e) => setTurno(e.target.value)}
                    >
                        <option value="todas">Todos</option>
                        <option value="1">Matutino</option>
                        <option value="2">Vespertino</option>
                    </select>
                </div>

                <motion.button
                    onClick={filtrar}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#0369A1] border border-[#0369A1] text-white hover:bg-[#075985] font-medium px-6 py-2 rounded-md"
                >
                    Filtrar
                </motion.button>
            </div>
        </div>
    );
}
