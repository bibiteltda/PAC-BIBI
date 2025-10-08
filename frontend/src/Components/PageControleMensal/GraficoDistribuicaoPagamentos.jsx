import { useState } from "react";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Sector,
} from "recharts";

export default function DistribuicaoPagamentos() {
    // 🔹 Valores simulados (futuros dados do backend)
    const [dados] = useState({
        ganhosMensais: 30000,
        perdasMensais: 2120,
        ganhosMesPassado: 28374,
    });

    const diferenca = dados.ganhosMensais - dados.ganhosMesPassado;

    const data = [
        { name: "Ganhos", value: dados.ganhosMensais },
        { name: "Perdas", value: dados.perdasMensais },
        { name: "Diferença", value: Math.abs(diferenca) },
    ];

    const COLORS = ["#006400", "#8B0000", "#696969"]; // verde, vermelho, cinza

    const [activeIndex, setActiveIndex] = useState(null);

    // 🔹 Customização da fatia ativa
    const renderActiveShape = (props) => {
        const RADIAN = Math.PI / 180;
        const {
            cx, cy, midAngle, innerRadius, outerRadius,
            startAngle, endAngle, fill, percent,
        } = props;

        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 15) * cos;
        const sy = cy + (outerRadius + 15) * sin;

        return (
            <g>
                {/* Fatia destacada */}
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius + 10}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                    stroke="white"
                    strokeWidth={1}
                />
                {/* Label com porcentagem */}
                <foreignObject
                    x={sx - 25}
                    y={sy - 15}
                    width={50}
                    height={30}
                >
                    <div
                        style={{
                            backgroundColor: "#0369A1",
                            color: "white",
                            fontSize: "12px",
                            fontWeight: "bold",
                            borderRadius: "6px",
                            textAlign: "center",
                            padding: "2px",
                            boxShadow: "0px 2px 6px rgba(0,0,0,0.3)",
                        }}
                    >
                        {(percent * 100).toFixed(0)}%
                    </div>
                </foreignObject>
            </g>
        );
    };

    return (
        <div className="w-full max-w-[500px] h-[270px] p-4 rounded-2xl shadow-lg bg-white">
            <h2 className="text-black text-lg font-semibold mb-1">
                Distribuição de Pagamentos
            </h2>

            <div className="grid grid-cols-2 gap-3 items-center">
                {/* 🔹 Caixas de informações */}
                <div className="space-y-2">
                    <div className="bg-[#0369A1] text-white p-2 rounded-lg shadow-md">
                        <p className="text-sm font-semibold">GANHOS MENSAIS</p>
                        <p className="text-sm">R$ {dados.ganhosMensais.toLocaleString()}</p>
                    </div>
                    <div className="bg-[#0369A1] text-white p-2 rounded-lg shadow-md">
                        <p className="text-sm font-semibold">PERDAS MENSAIS</p>
                        <p className="text-sm">R$ {dados.perdasMensais.toLocaleString()}</p>
                    </div>
                    <div className="bg-[#0369A1] text-white p-2 rounded-lg shadow-md">
                        <p className="text-sm font-semibold">MÊS PASSADO VS ATUAL</p>
                        <p className="text-sm">
                            R$ {dados.ganhosMensais.toLocaleString()} x R$ {dados.ganhosMesPassado.toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* 🔹 Gráfico de Pizza sem caixa */}
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
                            onClick={(_, index) =>
                                setActiveIndex(index === activeIndex ? null : index)
                            }
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
        </div>
    );
}
