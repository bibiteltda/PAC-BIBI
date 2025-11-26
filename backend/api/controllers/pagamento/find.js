// Localização: api/controllers/pagamento/find.js

module.exports = {

    // 1. AÇÃO DE FILTRO CUSTOMIZADA (Mapeada para GET /pagamento)
    // Usando req, res para um controller tradicional que contém múltiplas ações.
    listFilter: async function (req, res) { 
        // Parâmetros de filtro vêm de req.query (GET /pagamento?escolaId=X)
        const { escolaId, status, data_inicial, data_final } = req.query; 

        let alunoWhere = {};
        // Garante que a Foreign Key não é NULL, excluindo dados órfãos.
        let pagamentoWhere = { aluno: { '!=': null } }; 

        // ============================
        // 1. FILTRO POR ESCOLA
        // ============================
        if (escolaId && escolaId !== 'Todas') {
            // Filtra o Modelo Aluno pelo ID da Escola
            alunoWhere.escola = Number(escolaId);
        }

        // ============================
        // 2. FILTROS DE PAGAMENTO (STATUS/DATA)
        // ============================
        if (status && status !== 'Todas') { 
            pagamentoWhere.status = status;
        }

        if (data_inicial && data_final) {
            // Filtra o campo dta_vcto (coluna real) pelo intervalo
            pagamentoWhere.dta_vcto = { '>=': data_inicial, '<=': data_final };
        }

        // ============================
        // 3. EXECUÇÃO DA CONSULTA REVERSA
        // ============================
        try {
            // Passo A: Encontra Alunos que atendem ao filtro de Escola
            const alunos = await Aluno.find({ where: alunoWhere })
                // Passo B: Popula os Pagamentos, aplicando os filtros de Status/Data
                .populate('pagamentos', { 
                    where: pagamentoWhere 
                })
                .populate('escola'); 
            
            
            let pagamentosFinais = [];

            // Passo C: Mapear e Extrair os Pagamentos da coleção
            alunos.forEach(aluno => {
                if (aluno.pagamentos && aluno.pagamentos.length > 0) {
                    aluno.pagamentos.forEach(pagamento => {
                        // Inclui dados do Aluno e Escola no objeto final para o frontend
                        pagamentosFinais.push({
                            ...pagamento,
                            aluno: { 
                                id: aluno.id, 
                                nome: aluno.nome, 
                                escola: aluno.escola // Objeto da Escola populado
                            }
                        });
                    });
                }
            });

            return res.json(pagamentosFinais);

        } catch (err) {
            // Caso o ORM gere um erro de consulta/conexão
            sails.log.error('Erro na action pagamento/listFilter:', err);
            return res.status(500).json({ error: "Erro ao buscar pagamentos" });
        }
    },

    // 2. AÇÃO PADRÃO DE BUSCA (Mapeada para GET /pagamento/:id)
    // Mantida para garantir a funcionalidade de busca por ID.
    async find(req, res) {
        // Se houver um ID na rota, busca um único item
        if (req.params.id) {
            const item = await Pagamento.findOne({ id: req.params.id }).populateAll();
            if (!item) return res.notFound();
            return res.json(item);
        }
        
        // Se a rota customizada falhar, esta será a rota de fallback (sem filtros)
        const list = await Pagamento.find().populateAll();
        return res.json(list);
    }
};