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
        pagamentoWhere.dta_vcto = { '>=': data_inicial, '<=': data_final };
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
