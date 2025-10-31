module.exports = {
  friendlyName: 'Buscar alunos por e-mail do responsável',
  description: 'Retorna os alunos vinculados a um responsável cujo e-mail está vinculado à autenticação informada.',

  inputs: {
    email: { type: 'string', required: true },
  },

  exits: {
    success: { description: 'Lista de alunos retornada com sucesso.' },
    notFound: { description: 'Responsável não encontrado.' },
  },

  fn: async function (inputs, exits) {
    try {
      // Buscar autenticação pelo e-mail informado
      const autenticacao = await Autenticacao.findOne({ email: inputs.email });
      if (!autenticacao) {
        sails.log.warn(`Autenticação não encontrada para o e-mail: ${inputs.email}`);
        return exits.notFound({ message: 'Responsável não encontrado para este e-mail.' });
      }

      // Buscar o responsável vinculado à autenticação
      const responsavel = await Responsavel.findOne({ autenticacao: autenticacao.id });
      if (!responsavel) {
        sails.log.warn(`Responsável não encontrado para autenticação ID ${autenticacao.id}`);
        return exits.notFound({ message: 'Responsável não encontrado.' });
      }

      // Buscar os alunos vinculados a este responsável
      const alunos = await Aluno.find({ responsavel: responsavel.id });

      sails.log.info(`Foram encontrados ${alunos.length} alunos para o responsável ${responsavel.nome}`);
      return exits.success(alunos);

    } catch (err) {
      sails.log.error('Erro ao buscar alunos por e-mail do responsável:', err);
      return exits.error({ message: 'Erro interno ao buscar alunos.' });
    }
  },
};
