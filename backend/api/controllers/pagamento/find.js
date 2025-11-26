module.exports = async function find(req, res) {
    const { escolaId, status, data_inicial, data_final } = req.query;

    let alunoWhere = {};
    let pagamentoWhere = { aluno: { '!=': null } };

    if (escolaId && escolaId !== 'Todas') {
        alunoWhere.escola = Number(escolaId);
    }

    if (status && status !== 'Todas') {
        pagamentoWhere.status = status;
    }

    if (data_inicial && data_final) {
        const inicio = new Date(data_inicial);
        const fim = new Date(data_final);

        // Adiciona 23:59:59 no final para incluir o dia inteiro
        fim.setHours(23, 59, 59, 999);

        pagamentoWhere.dta_vcto = {
            '>=': inicio,
            '<=': fim
        };
    }

    try {
        const alunos = await Aluno.find({ where: alunoWhere })
            .populate('pagamentos', { where: pagamentoWhere })
            .populate('escola');

        let pagamentosFinais = [];

        alunos.forEach(aluno => {
            if (aluno.pagamentos?.length > 0) {
                aluno.pagamentos.forEach(pagamento => {
                    pagamentosFinais.push({
                        ...pagamento,
                        aluno: {
                            id: aluno.id,
                            nome: aluno.nome,
                            escola: aluno.escola
                        }
                    });
                });
            }
        });

        return res.json(pagamentosFinais);

    } catch (err) {
        sails.log.error('Erro em pagamento/find:', err);
        return res.status(500).json({ error: 'Erro ao buscar pagamentos' });
    }
};
