module.exports = {
  friendlyName: 'Listar escola',
  description: 'Lista todos os escola ou um específico.',
  inputs: { id: { type: 'number', required: false } },
  exits: { success: { description: 'Retornado com sucesso.' }, notFound: { description: 'Não encontrado.', responseType: 'notFound' } },
  fn: async function (inputs, exits) {
    try {
      if (inputs.id) {
        const item = await Escola.findOne({ id: inputs.id }).populateAll();
        if (!item) return exits.notFound({ message: 'Escola não encontrado.' });
        return exits.success(item);
      }
      const list = await Escola.find().populateAll();
      return exits.success(list);
    } catch (err) {
      sails.log.error('Erro ao listar escola:', err);
      throw 'serverError';
    }
  }
};
