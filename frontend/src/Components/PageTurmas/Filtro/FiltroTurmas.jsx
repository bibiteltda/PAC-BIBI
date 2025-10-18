// /* Dependências */
// import { motion } from "framer-motion";

// export default function FiltroTurmas({
//     escola,
//     setEscola,
//     status,
//     setStatus,
//     data,
//     setData,
//     filtrar,
//     escolasDisponiveis = ["todas", "escola1", "escola2"],
// }) {
//     return (
//         // <div className="flex gap-4 items-end p-4 rounded-lg shadow">
//         <div className="w-full max-w-[800px] mx-auto flex flex-wrap justify-center gap-4 items-end p-4 rounded-lg shadow bg-white">


//             {/* Filtro Escola */}
//             <div className="flex flex-col">
//                 <label className="text-sm font-medium text-gray-700">Escola</label>
//                 <select
//                     className="border rounded-md px-3 py-2 text-sm text-black"
//                     value={escola}
//                     onChange={(e) => setEscola(e.target.value)}
//                 >
//                     {escolasDisponiveis.map((nome) => (
//                         <option key={nome} value={nome} className="hover:bg-[#0369A1]">
//                             {nome === "todas"
//                                 ? "Todas"
//                                 : nome.charAt(0).toUpperCase() + nome.slice(1)}
//                         </option>
//                     ))}
//                 </select>
//             </div>

//             {/* Filtro Status */}
//             <div className="flex flex-col">
//                 <label className="text-sm font-medium text-gray-700">Status</label>
//                 <select
//                     className="border rounded-md px-3 py-2 text-sm text-black"
//                     value={status}
//                     onChange={(e) => setStatus(e.target.value)}
//                 >
//                     <option value="todas" className="hover:bg-[#0369A1]">
//                         Todas
//                     </option>
//                     <option value="ativo" className="hover:bg-[#0369A1]">
//                         Ativo
//                     </option>
//                     <option value="inativo" className="hover:bg-[#0369A1]">
//                         Inativo
//                     </option>
//                 </select>
//             </div>

//             {/* Filtro Data */}
//             <div className="flex flex-col">
//                 <label className="text-sm font-medium text-gray-700">Data</label>
//                 <div className="flex gap-2">
//                     <input
//                         type="date"
//                         className="border rounded-md px-3 py-2 text-sm text-black"
//                         value={data.inicio}
//                         onChange={(e) => setData({ ...data, inicio: e.target.value })}
//                     />
//                     <span className="self-center">→</span>
//                     <input
//                         type="date"
//                         className="border rounded-md px-3 py-2 text-sm text-black"
//                         value={data.fim}
//                         onChange={(e) => setData({ ...data, fim: e.target.value })}
//                     />
//                 </div>
//             </div>

//             {/* Botão Filtrar */}
//             <motion.button
//                 onClick={filtrar}
//                 whileTap={{ scale: 0.95 }}
//                 className="bg-[rgba(3,105,161,0.9)] border border-[#0369A1] text-white hover:bg-[#0369A1] hover:text-white font-medium px-6 py-2 rounded-md"
//             >
//                 Filtrar
//             </motion.button>
//         </div>
//     );
// }


import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FiltroTurmas({
    escola,
    setEscola,
    status,
    setStatus,
    data,
    setData,
    filtrar,
    escolasDisponiveis = ["todas", "escola1", "escola2"],
}) {
    const [isOpen, setIsOpen] = useState(false);

    const handleFiltrar = () => {
        filtrar();
        setIsOpen(false); // Fecha o dropdown ao filtrar
    };

    // Classe padrão para selects/inputs com foco azul do botão
    const inputClass =
        "border rounded-md px-3 py-2 text-sm text-black focus:outline-none focus:ring-0.5 focus:ring-[#0369A1] focus:border-[#0369A1]";

    // Classe específica para inputs de data menores
    const dateClass =
        "border rounded-md px-3 py-2 text-sm text-black w-[145px] focus:outline-none focus:ring-0.5 focus:ring-[#0369A1] focus:border-[#0369A1]";

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
                        {/* Linha 1: Escola + Status */}
                        <div className="flex gap-2">
                            <div className="flex-1 flex flex-col">
                                <label className="text-sm font-medium text-gray-700">Escola</label>
                                <select
                                    className={inputClass}
                                    value={escola}
                                    onChange={(e) => setEscola(e.target.value)}
                                >
                                    {escolasDisponiveis.map((nome) => (
                                        <option key={nome} value={nome}>
                                            {nome === "todas"
                                                ? "Todas"
                                                : nome.charAt(0).toUpperCase() + nome.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex-1 flex flex-col">
                                <label className="text-sm font-medium text-gray-700">Status</label>
                                <select
                                    className={inputClass}
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value="todas">Todas</option>
                                    <option value="ativo">Ativo</option>
                                    <option value="inativo">Inativo</option>
                                </select>
                            </div>
                        </div>

                        {/* Linha 2: Data */}
                        <div className="flex gap-2">
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700">Data Início</label>
                                <input
                                    type="date"
                                    className={dateClass}
                                    value={data.inicio}
                                    onChange={(e) => setData({ ...data, inicio: e.target.value })}
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700">Data Fim</label>
                                <input
                                    type="date"
                                    className={dateClass}
                                    value={data.fim}
                                    onChange={(e) => setData({ ...data, fim: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Botão Filtrar centralizado */}
                        <motion.button
                            onClick={handleFiltrar}
                            whileTap={{ scale: 0.95 }}
                            className="bg-[#0369A1] border border-[#0369A1] text-white hover:bg-[#075985] hover:text-white font-medium px-6 py-2 rounded-md self-center"
                        >
                            Filtrar
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

                {/* Filtro Status */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">Status</label>
                    <select
                        className={inputClass}
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="todas">Todas</option>
                        <option value="ativo">Ativo</option>
                        <option value="inativo">Inativo</option>
                    </select>
                </div>

                {/* Filtro Data */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">Data</label>
                    <div className="flex gap-2">
                        <input
                            type="date"
                            className={dateClass}
                            value={data.inicio}
                            onChange={(e) => setData({ ...data, inicio: e.target.value })}
                        />
                        <span className="self-center">→</span>
                        <input
                            type="date"
                            className={dateClass}
                            value={data.fim}
                            onChange={(e) => setData({ ...data, fim: e.target.value })}
                        />
                    </div>
                </div>

                {/* Botão Filtrar */}
                <motion.button
                    onClick={filtrar}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#0369A1] border border-[#0369A1] text-white hover:bg-[#075985] hover:text-white font-medium px-6 py-2 rounded-md"
                >
                    Filtrar
                </motion.button>
            </div>
        </div>
    );
}
