module.exports = {
  listar: async function (req, res) {
    try {
      const pagamentos = await Pagamento.find()
        .populate('aluno')
        .populate('responsavel')
        .populate('escola');

        const tabela = await Promise.all(
          pagamentos.map(async (pg) => {
            const escola = pg.aluno ? await Escola.findOne({ id: pg.aluno.escola }) : null;

            return {
              aluno: pg.aluno ? pg.aluno.nome : 'Aluno não encontrado',
              escola: escola ? escola.nome : 'Escola não encontrada',
              valor: pg.valor,
              data: pg.dta_pgmt || pg.dta_vcto,
              status: pg.status
            };
          })
        );

        return res.json(tabela);
    } catch (error) {
      return res.serverError(error);
    }
  }
};