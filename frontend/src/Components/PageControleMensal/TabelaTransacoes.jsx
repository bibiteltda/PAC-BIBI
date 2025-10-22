// import React from "react";
// import usePagamentos from "../../hooks/usePagamentos";

// export default function TabelaTransacoes({ filtroEscola, filtroStatus, filtroData }) {
//     const filtros = { escola: filtroEscola, status: filtroStatus, data: filtroData };
//     const { pagamentos, loading, error, updateStatus } = usePagamentos(filtros);

//     if (loading) return <p>Carregando pagamentos...</p>;
//     if (error) return <p>Erro: {error}</p>;

//     return (
//         <table className="w-full border">
//             <thead>
//                 <tr>
//                     <th>Aluno</th>
//                     <th>Responsável</th>
//                     <th>Valor</th>
//                     <th>Status</th>
//                     <th>Ações</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {pagamentos.map(p => (
//                     <tr key={p.id}>
//                         <td>{p.aluno?.nome}</td>
//                         <td>{p.responsavelObj?.nome}</td>
//                         <td>{p.valor}</td>
//                         <td>{p.status}</td>
//                         <td>
//                             <button
//                                 onClick={() => updateStatus(p.id, p.status === "Pago" ? "Pendente" : "Pago")}
//                                 className="px-2 py-1 bg-blue-500 text-white rounded"
//                             >
//                                 Alternar
//                             </button>
//                         </td>
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//     );
// }


import React from "react";

export default function TabelaPagamentos({ pagamentos = [] }) {
    // Mock temporário caso não venha nada por props
    const dadosMock = [
        {
            id: 1,
            aluno: "Eric Gabriel C.",
            escola: "Escola Primavera",
            valor: "R$0,00",
            data: "",
            status: "",
        },
        {
            id: 2,
            aluno: "Daniela Luisa da C.",
            escola: "Escola Primavera",
            valor: "R$250,00",
            data: "03/05/2025",
            status: "PENDENTE",
        },
        {
            id: 3,
            aluno: "Daniela Luisa da C.",
            escola: "Escola Primavera",
            valor: "R$250,00",
            data: "03/05/2025",
            status: "ATRASADO",
        },
        {
            id: 4,
            aluno: "Daniela Luisa da C.",
            escola: "Escola Primavera",
            valor: "R$250,00",
            data: "03/05/2025",
            status: "PAGO",
        },
        {
            id: 5,
            aluno: "João Silva",
            escola: "Escola Primavera",
            valor: "R$180,00",
            data: "01/05/2025",
            status: "PENDENTE",
        },
    ];

    const lista = pagamentos.length > 0 ? pagamentos : dadosMock;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden w-full max-w-5xl mx-auto">
            <table className="w-full text-sm text-gray-700">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="py-3 px-4 text-left font-semibold">Aluno</th>
                        <th className="py-3 px-4 text-left font-semibold">Escola</th>
                        <th className="py-3 px-4 text-left font-semibold">Valor</th>
                        <th className="py-3 px-4 text-left font-semibold">Data</th>
                        <th className="py-3 px-4 text-left font-semibold">Status</th>
                        <th className="py-3 px-4 text-left font-semibold"></th>
                    </tr>
                </thead>
                <tbody>
                    {lista.map((p) => (
                        <tr
                            key={p.id}
                            className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                        >
                            <td className="py-3 px-4 font-semibold text-gray-800">{p.aluno}</td>
                            <td className="py-3 px-4">{p.escola}</td>
                            <td className="py-3 px-4">{p.valor}</td>
                            <td className="py-3 px-4">{p.data}</td>
                            <td className="py-3 px-4">
                                {p.status === "PENDENTE" && (
                                    <span className="bg-gray-500 text-white px-3 py-1 rounded-md text-xs font-semibold">
                                        PENDENTE
                                    </span>
                                )}
                                {p.status === "ATRASADO" && (
                                    <span className="bg-red-600 text-white px-3 py-1 rounded-md text-xs font-semibold">
                                        ATRASADO
                                    </span>
                                )}
                                {p.status === "PAGO" && (
                                    <span
                                        className="text-white px-3 py-1 rounded-md text-xs font-semibold inline-block"
                                        style={{ backgroundColor: "#006400" }}
                                    >
                                        PAGO
                                    </span>
                                )}
                            </td>
                            <td className="py-3 px-4">
                                <button className="border border-blue-400 text-blue-500 text-sm font-medium px-3 py-1 rounded-md hover:bg-blue-50 transition-colors">
                                    Mudar Status
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
