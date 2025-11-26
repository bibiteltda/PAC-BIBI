// Localização: api/controllers/pagamento/find.js

module.exports = {

    // 1. AÇÃO DE FILTRO CUSTOMIZADA (Nova Action)
    listFilter: async function (req, res) { // Usa req, res para ser um controlador tradicional para esta action
        const { escolaId, status, data_inicial, data_final } = req.query;
        // Sua lógica de filtro usará o req.query

        let alunoWhere = {};
        let pagamentoWhere = { aluno: { '!=': null } };

        // [Seu Código de Consulta Reversa com Filtros]
        if (escolaId && escolaId !== 'Todas') {
            alunoWhere.escola = Number(escolaId);
        }
        if (status && status !== 'Todas') { 
            pagamentoWhere.status = status;
        }
        if (data_inicial && data_final) {
            pagamentoWhere.dta_vcto = { '>=': data_inicial, '<=': data_final };
        }

        try {
            const alunos = await Aluno.find({ where: alunoWhere })
                .populate('pagamentos', { where: pagamentoWhere })
                .populate('escola'); 
            
            let pagamentosFinais = [];
            alunos.forEach(aluno => {
                if (aluno.pagamentos && aluno.pagamentos.length > 0) {
                    aluno.pagamentos.forEach(pagamento => {
                        pagamentosFinais.push({
                            ...pagamento,
                            aluno: { id: aluno.id, nome: aluno.nome, escola: aluno.escola }
                        });
                    });
                }
            });

            return res.json(pagamentosFinais);

        } catch (err) {
            sails.log.error('Erro na action pagamento/listFilter:', err);
            return res.status(500).json({ error: "Erro ao buscar pagamentos" });
        }
    },

    // 2. AÇÃO PADRÃO DE BUSCA (A que a sua rota GET /pagamento/:id usa)
    // Manter isso separado garante que a rota com ID funcione.
    async find(req, res) {
        // Se houver um ID na rota, busca um único item (padrão)
        if (req.params.id) {
            const item = await Pagamento.findOne({ id: req.params.id }).populateAll();
            if (!item) return res.notFound();
            return res.json(item);
        }
        // Se não houver ID e não for redirecionado, busca todos sem filtro customizado.
        const list = await Pagamento.find().populateAll();
        return res.json(list);
    }
};