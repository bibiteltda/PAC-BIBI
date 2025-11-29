module.exports = {
  friendlyName: 'Listar escolas',
  description: 'Lista todas as escolas ou uma específica.',

  inputs: {
    id: { type: 'number' }
  },

  exits: {
    success: { description: 'Retornado com sucesso.' },
    notFound: { description: 'Escola não encontrada.', responseType: 'notFound' }
  },

  fn: async function (inputs, exits) {
    try {
      if (inputs.id) {
        const escola = await Escola.findOne({ id: inputs.id });
        if (!escola) {
          return exits.notFound({ message: 'Escola não encontrada.' });
        }
        return exits.success(escola);
      }

      const escolas = await Escola.find().select(['id', 'nome']);
      return exits.success(escolas);

    } catch (err) {
      sails.log.error('Erro ao listar escola:', err);
      throw 'serverError';
    }
  }
};