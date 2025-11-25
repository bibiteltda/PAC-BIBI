/* Dependências */
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
// 1. Importar os Hooks que criamos
import useEscolas from "../hooks/useEscolas"; 
import usePagamentos from "../hooks/usePagamentos"; 
// NOTA: Ajuste o caminho "../hooks/" se necessário

export default function FiltroTurmas() {
    // 2. Trazer a lista de escolas
    const { escolas, loadingEscolas } = useEscolas();
    
    // 3. Estados dos Filtros (Inicializados com "Todas" para consistência)
    const [escola, setEscola] = useState("Todas");
    const [status, setStatus] = useState("Todas"); 
    const [data, setData] = useState({ inicio: "2020-01-01", fim: "2020-12-31" });
    
    // 4. Estado que armazena os parâmetros para a chamada de API
    const [parametrosBusca, setParametrosBusca] = useState({});

    // 5. Lógica de Disparo do Filtro
    const handleFiltrar = () => {
        // Ao clicar, atualiza o estado que o hook "ouve"
        setParametrosBusca({
            // Mapeia o valor do estado local para o nome do parâmetro do backend
            escolaId: escola, 
            status: status,
            dataInicial: data.inicio, 
            dataFinal: data.fim,     
        });
    };

    // 6. Hook que executa a busca no backend quando 'parametrosBusca' muda
    const { pagamentos, loading, error } = usePagamentos(parametrosBusca);

    // LOG PARA VER SE ESTÁ FUNCIONANDO
    // console.log("Dados de Pagamento Recebidos:", pagamentos);
    
    return (
        // O restante do componente pode estar em um componente pai para mostrar a tabela
        // Mas esta div é a que contém a lógica de filtro
        <div className="flex flex-col gap-4 p-4 rounded-lg shadow">
            {/* Linha dos Filtros */}
            <div className="flex gap-4 items-end">
                {/* Filtro Escola */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">Escola</label>
                    <select
                        className="border rounded-md px-3 py-2 text-sm text-black"
                        value={escola}
                        onChange={(e) => setEscola(e.target.value)}
                    >
                        {loadingEscolas ? (
                            <option>Carregando...</option>
                        ) : (
                            // 7. Renderiza as opções do backend (incluindo 'Todas')
                            escolas.map(e => (
                                <option key={e.id} value={e.id}>
                                    {e.nome}
                                </option>
                            ))
                        )}
                    </select>
                </div>

                {/* Filtro Status */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">Status</label>
                    <select
                        className="border rounded-md px-3 py-2 text-sm text-black"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        {/* 8. Corrigido para "Todas" (capitalizado) */}
                        <option value="Todas">Todos</option>
                        <option value="PAGO">Pago</option>
                        <option value="PENDENTE">Pendente</option>
                        <option value="ATRASADO">Atrasado</option>
                    </select>
                </div>

                {/* Filtro Data */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">Data</label>
                    <div className="flex gap-2">
                        {/* Input Início */}
                        <input
                            type="date"
                            className="border rounded-md px-3 py-2 text-sm text-black"
                            value={data.inicio}
                            onChange={(e) => setData({ ...data, inicio: e.target.value })}
                        />
                        <span className="self-center">→</span>
                        {/* Input Fim */}
                        <input
                            type="date"
                            className="border rounded-md px-3 py-2 text-sm text-black"
                            value={data.fim}
                            onChange={(e) => setData({ ...data, fim: e.target.value })}
                        />
                    </div>
                </div>

                {/* 9. Botão Filtrar (Conectado ao handleFiltrar) */}
                <button 
                    onClick={handleFiltrar}
                    className="bg-[rgba(3,105,161,0.9)] border border-[#0369A1] text-white hover:bg-[#0369A1] hover:text-white font-medium px-6 py-2 rounded-md"
                >
                    Filtrar
                </button>
            </div>
            
            {/* Seção de Exibição de Erros e Carregamento (Opcional) */}
            <div className="mt-4">
                {loading && <p className="text-blue-500">Buscando transações...</p>}
                {error && <p className="text-red-500">Erro: {error}</p>}
                {/* Você pode renderizar a tabela aqui, usando a variável 'pagamentos' */}
            </div>
        </div>
    );
}