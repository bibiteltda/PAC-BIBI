import React, { useEffect, useState } from "react";
import useControleMensal from "../../hooks/useControleMensal";

import TabelaTransacoesLoading from "./TabelaTransacoesLoading";

export default function TabelaTransacoes({ filtros }) {
    const { data, loading, error, find, update, remove } = useControleMensal();

    useEffect(() => {
        find(filtros);
    }, [filtros]);

    const transacoes = data?.transacoes ?? [];

    if (loading) return <p><TabelaTransacoesLoading /></p>;
    if (error) return <p className="text-gray-500 text-center py-4">Houve um erro inesperado ao se conectar com o servidor. ({error}) </p>;
    if (!transacoes.length)
        return (
            <p className="text-gray-500 text-center py-4">
                Nenhuma transação encontrada.
            </p>
        );

        return (
        <div className="bg-white rounded-2xl shadow-md p-4">
            <h2 className="text-gray-800 text-lg font-semibold mb-3">Transações</h2>

            {/* Wrapper com scroll interno */}
            <div className="mt-1 overflow-x-auto max-h-[300px] overflow-y-auto">
            <table className="w-full border-collapse text-sm">
                <thead>
                <tr className="bg-gray-100 text-gray-700 text-left">
                    <th className="p-2">Aluno</th>
                    <th className="p-2">Responsável</th>
                    <th className="p-2">Valor</th>
                    <th className="p-2">Status</th>
                    <th className="p-2 text-center">Ações</th>
                </tr>
                </thead>
                <tbody>
                {transacoes.map((p) => (
                    <tr
                    key={p.id_pagamento}
                    className="border-t hover:bg-gray-50 transition"
                    >
                    <td className="p-2">{p.aluno}</td>
                    <td className="p-2">{p.responsavel}</td>
                    <td className="p-2 font-medium">
                        R$ {p.valor.toLocaleString()}
                    </td>
                    <td className="p-2">
                        <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            p.status === "Pago"
                            ? "bg-green-100 text-green-700"
                            : p.status === "Atrasado"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                        >
                        {p.status}
                        </span>
                    </td>
                    <td className="p-2 text-center space-x-2">
                        <button
                        className="text-blue-600 hover:underline"
                        onClick={() =>
                            update(p.id_pagamento, {
                            status: p.status === "Pago" ? "Pendente" : "Pago",
                            })
                        }
                        >
                        Alternar
                        </button>

                        <button
                        className="text-red-600 hover:underline"
                        onClick={() => remove(p.id_pagamento)}
                        >
                        Excluir
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
        );
}