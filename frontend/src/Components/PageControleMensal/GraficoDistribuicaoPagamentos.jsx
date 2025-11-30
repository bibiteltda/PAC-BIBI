import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from "recharts";

export default function DistribuicaoPagamentos({
  ganhosMensais = 0,
  perdasMensais = 0,
  ganhosMesPassado = 0,
}) {
  const [activeIndex, setActiveIndex] = useState(null);

  // 👮‍♂️ Garantir que nunca cai valor maluco no gráfico
  const safeNumber = (v) => {
    const n = Number(v);
    return Number.isFinite(n) && !Number.isNaN(n) && n >= 0 ? n : 0;
  };

  const ganhos = safeNumber(ganhosMensais);
  const perdas = safeNumber(perdasMensais);
  const ganhosPassado = safeNumber(ganhosMesPassado);

  const diferenca = ganhos - ganhosPassado;

  const data = [
    { name: "Ganhos", value: ganhos },
    { name: "Perdas", value: perdas },
    { name: "Diferença", value: Math.abs(diferenca) },
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);

  const semDados = total === 0;

  const COLORS = ["#16a34a", "#ef4444", "#0f7490"];

  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      percent,
    } = props;

    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 8) * cos;
    const sy = cy + (outerRadius + 8) * sin;

    const pct = Number.isFinite(percent) ? (percent * 100).toFixed(0) : "0";

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 6}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <foreignObject x={sx - 24} y={sy - 14} width={48} height={28}>
          <div className="bg-sky-700 text-white text-[10px] font-semibold rounded-md text-center px-1 py-[2px] shadow">
            {pct}%
          </div>
        </foreignObject>
      </g>
    );
  };

  return (
    <div className="w-full max-w-[520px] p-4 rounded-2xl shadow-md bg-white">
      <h2 className="text-gray-800 text-lg font-semibold mb-3">
        Distribuição de Pagamentos
      </h2>

      {semDados ? (
        <div className="flex items-center justify-center h-[180px] text-gray-400 text-sm">
          Nenhum dado disponível
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 items-center">
          {/* Cards de resumo */}
          <div className="space-y-2">
            <div className="bg-emerald-600 text-white p-2.5 rounded-xl shadow-sm">
              <p className="text-xs font-semibold opacity-90">
                Ganhos Mensais
              </p>
              <p className="text-sm font-semibold">
                R$ {ganhos.toLocaleString("pt-BR")}
              </p>
            </div>

            <div className="bg-red-600 text-white p-2.5 rounded-xl shadow-sm">
              <p className="text-xs font-semibold opacity-90">
                Perdas Mensais
              </p>
              <p className="text-sm font-semibold">
                R$ {perdas.toLocaleString("pt-BR")}
              </p>
            </div>

            <div className="bg-sky-700 text-white p-2.5 rounded-xl shadow-sm">
              <p className="text-xs font-semibold opacity-90">
                Mês Passado vs Atual
              </p>
              <p className="text-sm font-semibold">
                R$ {ganhosPassado.toLocaleString("pt-BR")} → R{" "}
                {`$ ${ganhos.toLocaleString("pt-BR")}`}
              </p>
            </div>
          </div>

          {/* Gráfico */}
          <div className="h-[190px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart
                margin={{ top: 6, right: 6, bottom: 6, left: 6 }}
              >
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70} // menor pra não cortar
                  dataKey="value"
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  onClick={(_, index) =>
                    setActiveIndex(index === activeIndex ? null : index)
                  }
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                      stroke="#ffffff"
                      strokeWidth={1.5}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}