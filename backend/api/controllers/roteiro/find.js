module.exports = {
  friendlyName: 'Listar roteiro',
  description: 'Lista todos os roteiro ou um específico.',
  inputs: { id: { type: 'number', required: false } },
  exits: { success: { description: 'Retornado com sucesso.' }, notFound: { description: 'Não encontrado.', responseType: 'notFound' } },
  fn: async function (inputs, exits) {
    try {
      if (inputs.id) {
        const item = await Roteiro.findOne({ id: inputs.id }).populateAll();
        if (!item) return exits.notFound({ message: 'Roteiro não encontrado.' });
        return exits.success(item);
      }
      const list = await Roteiro.find().populateAll();
      return exits.success(list);
    } catch (err) {
      sails.log.error('Erro ao listar roteiro:', err);
      throw 'serverError';
    }
  }
};
