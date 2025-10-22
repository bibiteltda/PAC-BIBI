/* 
    É só para não dar erro no Front
    Não representa lógica nenhuma
*/

export default function useEscolas() {
    return {
        escolas: [
            { id: 1, nome: "Escola A" },
            { id: 2, nome: "Escola B" },
            { id: 3, nome: "Escola C" },
        ],
        loading: false,
        error: null,
    };
}