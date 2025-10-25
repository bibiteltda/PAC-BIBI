export default function TopEscolas({ escolas = [] }) {
    if (!escolas.length)
        return (
            <div className="w-full p-4 bg-white shadow rounded-2xl text-center">
                Nenhuma escola encontrada.
            </div>
        );

    const top3 = [...escolas]
        .sort((a, b) => (b.totalReceita || 0) - (a.totalReceita || 0))
        .slice(0, 3);

    return (
        <div className="w-full p-4 bg-white shadow rounded-2xl">
            <h2 className="font-semibold mb-3">Top 3 Escolas por Rendimento</h2>

            <ol className="list-decimal pl-5 space-y-1">
                {top3.map((escola) => (
                    <li key={escola.id_escola} className="flex justify-between">
                        <span className="font-medium">{escola.nome}</span>
                        <span className="text-gray-700 font-semibold">
                            R$ {Number(escola.totalReceita).toLocaleString("pt-BR", {
                                minimumFractionDigits: 2,
                            })}
                        </span>
                    </li>
                ))}
            </ol>
        </div>
    );
}