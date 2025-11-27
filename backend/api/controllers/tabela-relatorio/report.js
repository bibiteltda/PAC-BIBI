module.exports = {
  friendlyName: 'Listar relatório',
  description: 'Retorna a tabela do relatório de pagamentos com aluno, escola, valor, data e status.',
  inputs: {},
  exits: {
    success: {
      description: 'Relatório retornado com sucesso.'
    },
    serverError: {
      description: 'Erro ao gerar relatório.',
      responseType: 'serverError'
    }
  },

  fn: async function (inputs, exits) {
    try {
      const pagamentos = await Pagamento.find()
        .populate('aluno')
        .populate('responsavel')
        .populate('escola');

      const tabela = await Promise.all(
        pagamentos.map(async (pg) => {
          const escola = pg.aluno
            ? await Escola.findOne({ id: pg.aluno.escola })
            : null;

          return {
            aluno: pg.aluno ? pg.aluno.nome : 'Aluno não encontrado.',
            escola: escola ? escola.nome : 'Escola não encontrada.',
            valor: pg.valor,
            data: pg.dta_pgmt,
            status: pg.status
          };
        })
      );

      return exits.success(tabela);

    } catch (err) {
      sails.log.error('Erro no relatório:', err);
      return exits.serverError(err);
    }
  }
};
