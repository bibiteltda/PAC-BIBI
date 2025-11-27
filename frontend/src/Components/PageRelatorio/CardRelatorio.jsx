import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function CardRelatorio() {
    const navigate = useNavigate();

    const data = Array.from({ length: 5 }).map(() => ({
        aluno: "Daniela Luisa da C.",
        escola: "Escola Primavera",
        valor: "R$250,00",
        data: "03/05/2025",
        status: ["PAGO", "PENDENTE", "ATRASADO"][Math.floor(Math.random() * 3)]
    }));

    const statusClasses = {
        PAGO: "bg-green-600 text-white px-2 py-0.5 text-xs font-semibold rounded-md",
        PENDENTE: "bg-gray-500 text-white px-2 py-0.5 text-xs font-semibold rounded-md",
        ATRASADO: "bg-red-600 text-white px-2 py-0.5 text-xs font-semibold rounded-md"
    };

    return (
        <div className="w-full flex flex-col items-center">

            {/* --- DESKTOP TABLE --- */}
            <table className="hidden md:table w-[770px] bg-white shadow-md p-4 text-sm border border-gray-300 rounded-md overflow-hidden">
                <thead>
                    <tr className="bg-gray-100 text-black border-b border-gray-300">
                        <th className="p-2">Aluno</th>
                        <th className="p-2">Escola</th>
                        <th className="p-2">Valor</th>
                        <th className="p-2">Data</th>
                        <th className="p-2">Status</th>
                        <th className="p-2">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, idx) => (
                        <tr key={idx} className="text-black border-b border-gray-200">
                            <td className="p-3">{item.aluno}</td>
                            <td className="p-3">{item.escola}</td>
                            <td className="p-3">{item.valor}</td>
                            <td className="p-3">{item.data}</td>
                            <td className="p-3">
                                <span className={statusClasses[item.status]}>{item.status}</span>
                            </td>
                            <td className="p-3">
                                <button
                                    onClick={() => navigate("/recibo")}
                                    className="px-3 py-1 rounded-lg border border-blue-300 text-blue-500 hover:bg-blue-50 transition"
                                >
                                    Emitir Recibo
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* --- MOBILE (cards) --- */}
            <div className="flex flex-col gap-3 md:hidden w-full max-w-[770px] px-2">
                {data.map((item, idx) => (
                    <section
                        key={idx}
                        className="w-full bg-gradient-to-br from-[#1267A0] to-[#082F49] rounded-xl text-white shadow-lg p-4"
                    >
                        <div className="flex justify-between items-start">

                            {/* Escola + Aluno */}
                            <div>
                                <p className="text-sm opacity-80">{item.escola}</p>
                                <p className="text-base font-semibold -mt-1">{item.aluno}</p>
                            </div>

                            {/* Opções (rota /recibo) */}
                            <button
                                onClick={() => navigate("/recibo")}
                                className="text-white/70 hover:text-white text-xl px-1"
                            >
                                ⋮
                            </button>
                        </div>

                        {/* Parte inferior */}
                        <div className="mt-3 flex justify-between items-end">

                            {/* Valor + Data */}
                            <div>
                                <p className="text-xs opacity-70">{item.data}</p>
                                <p className="text-sm font-semibold">{item.valor}</p>
                            </div>

                            {/* Status */}
                            <span
                                className={`${statusClasses[item.status]} text-[10px] px-2 py-0.5 rounded-md`}
                            >
                                {item.status}
                            </span>
                        </div>
                    </section>
                ))}
            </div>

            <div className="h-10"></div>
        </div>
    );
}


