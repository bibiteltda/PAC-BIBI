import React, { useState } from "react";

export default function EscolasRendimento({ dadosEscolas = [] }) {
    const mock = [
        { escola: "E.M Amador Aguiar", alunos: 11 },
        { escola: "E.M Prefeito Luiz Gomes", alunos: 9 },
        { escola: "E.M João de Oliveira", alunos: 3 },
    ];

    const data = dadosEscolas.length > 0 ? dadosEscolas : mock;
    const totalAlunos = data.reduce((acc, item) => acc + item.alunos, 0);
    const dataComPercentual = data.map((item) => ({
        ...item,
        percentual: ((item.alunos / totalAlunos) * 100).toFixed(0),
    }));

    const COLORS = ["#003B5C", "#004F7C", "#006699"];
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <div className="w-full max-w-[450px] bg-white rounded-2xl shadow-md p-4">
            <h2 className="text-gray-800 font-semibold mb-3">
                Escolas com maior Rendimento
            </h2>

            {/* Barra contínua com divisões e tooltip */}
            <div className="relative w-full h-[30px] mb-4 flex overflow-visible">
                {dataComPercentual.map((item, index) => {
                    // Radius apenas no primeiro e último
                    let radiusStyle = {};
                    if (index === 0) radiusStyle = { borderTopLeftRadius: "8px", borderBottomLeftRadius: "8px" };
                    if (index === dataComPercentual.length - 1)
                        radiusStyle = { ...radiusStyle, borderTopRightRadius: "8px", borderBottomRightRadius: "8px" };

                    return (
                        <div
                            key={index}
                            className="h-full relative cursor-pointer border-r border-white last:border-none"
                            style={{
                                width: `${item.percentual}%`,
                                backgroundColor: COLORS[index % COLORS.length],
                                ...radiusStyle,
                            }}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            {/* Tooltip de porcentagem */}
                            {hoveredIndex === index && (
                                <div
                                    className="absolute -top-10 left-1/2 -translate-x-1/2 
                                    bg-[#0369A1] text-white text-xs font-bold 
                                    rounded-md shadow-md px-2 py-1 flex items-center justify-center gap-1"
                                >
                                    {item.percentual}%
                                    <div
                                        className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 bg-[#0369A1] rotate-45"
                                    ></div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Lista abaixo */}
            <div className="space-y-2">
                {dataComPercentual.map((item, index) => (
                    <div
                        key={index}
                        className="flex justify-between items-center border-t border-gray-200 pt-2 first:border-t-0 first:pt-0"
                    >
                        <div className="flex items-center gap-2">
                            <div
                                className="w-3 h-3 rounded-sm"
                                style={{
                                    backgroundColor: COLORS[index % COLORS.length],
                                }}
                            ></div>
                            <span className="text-gray-700 text-sm">{item.escola}</span>
                        </div>
                        <span className="text-gray-800 font-semibold text-sm">
                            {item.alunos} Alunos
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
