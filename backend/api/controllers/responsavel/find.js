module.exports = {
  friendlyName: 'Listar responsavel',
  description: 'Lista todos os responsavel ou um específico.',
  inputs: { id: { type: 'number', required: false } },
  exits: { success: { description: 'Retornado com sucesso.' }, notFound: { description: 'Não encontrado.', responseType: 'notFound' } },
  fn: async function (inputs, exits) {
    try {
      if (inputs.id) {
        const item = await Responsavel.findOne({ id: inputs.id }).populateAll();
        if (!item) return exits.notFound({ message: 'Responsavel não encontrado.' });
        return exits.success(item);
      }
      const list = await Responsavel.find().populateAll();
      return exits.success(list);
    } catch (err) {
      sails.log.error('Erro ao listar responsavel:', err);
      throw 'serverError';
    }
  }
};
