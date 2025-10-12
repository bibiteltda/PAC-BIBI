import useEscolas from "../../hooks/useEscolas";

export default function TopEscolas() {
  const { escolas, loading, error } = useEscolas();

  if (loading) return <p>Carregando escolas...</p>;
  if (error) return <p>Erro: {error}</p>;
  if (!escolas.length) return <p>Nenhuma escola encontrada.</p>;

  const top3 = [...escolas]
    .sort((a, b) => (b.totalReceita || 0) - (a.totalReceita || 0))
    .slice(0, 3);

  return (
    <div className="w-full p-4 bg-white shadow rounded-2xl">
      <h2 className="font-semibold mb-3">Top 3 Escolas por Rendimento</h2>
      <ol className="list-decimal pl-5 space-y-1">
        {top3.map((escola, index) => (
          <li key={escola.id} className="flex justify-between">
            <span>{escola.nome}</span>
            <span>R$ {escola.totalReceita?.toLocaleString("pt-BR") || 0}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
