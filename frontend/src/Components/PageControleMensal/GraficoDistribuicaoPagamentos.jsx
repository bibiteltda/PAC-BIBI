import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from "recharts";

export default function DistribuicaoPagamentos({
    ganhosMensais = 0,
    perdasMensais = 0,
    ganhosMesPassado = 0,
}) {
    const [activeIndex, setActiveIndex] = useState(null);

    const semDados = ganhosMensais === 0 && perdasMensais === 0 && ganhosMesPassado === 0;
    const diferenca = ganhosMensais - ganhosMesPassado;

    const data = [
        { name: "Ganhos", value: ganhosMensais },
        { name: "Perdas", value: perdasMensais },
        { name: "Diferença", value: Math.abs(diferenca) },
    ];

    const COLORS = ["#22c55e", "#ef4444", "#64748b"];

    const renderActiveShape = (props) => {
        const RADIAN = Math.PI / 180;
        const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, percent } =
            props;
        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 15) * cos;
        const sy = cy + (outerRadius + 15) * sin;

        return (
            <g>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius + 10}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                />
                <foreignObject x={sx - 25} y={sy - 15} width={50} height={30}>
                    <div className="bg-sky-700 text-white text-xs font-semibold rounded-lg text-center p-1 shadow">
                        {(percent * 100).toFixed(0)}%
                    </div>
                </foreignObject>
            </g>
        );
    };

    return (
        <div className="w-full max-w-[500px] h-[280px] p-4 rounded-2xl shadow-md bg-white">
            <h2 className="text-gray-800 text-lg font-semibold mb-3">
                Distribuição de Pagamentos
            </h2>

            {semDados ? (
                <div className="flex items-center justify-center h-[200px] text-gray-400">
                    Nenhum dado disponível
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-3 items-center">
                    <div className="space-y-2">
                        <div className="bg-emerald-600 text-white p-2 rounded-lg shadow">
                            <p className="text-sm font-semibold">Ganhos Mensais</p>
                            <p className="text-sm">R$ {ganhosMensais.toLocaleString()}</p>
                        </div>
                        <div className="bg-red-600 text-white p-2 rounded-lg shadow">
                            <p className="text-sm font-semibold">Perdas Mensais</p>
                            <p className="text-sm">R$ {perdasMensais.toLocaleString()}</p>
                        </div>
                        <div className="bg-sky-700 text-white p-2 rounded-lg shadow">
                            <p className="text-sm font-semibold">Mês Passado vs Atual</p>
                            <p className="text-sm">
                                R$ {ganhosMesPassado.toLocaleString()} → R$ {ganhosMensais.toLocaleString()}
                            </p>
                        </div>
                    </div>

                    <ResponsiveContainer width="100%" height={210}>
                        <PieChart>
                            <Pie
                                activeIndex={activeIndex}
                                activeShape={renderActiveShape}
                                data={data}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                onClick={(_, index) => setActiveIndex(index === activeIndex ? null : index)}
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={index}
                                        fill={COLORS[index % COLORS.length]}
                                        stroke="white"
                                        strokeWidth={1.5}
                                    />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}