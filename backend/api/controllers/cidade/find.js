module.exports = {
  friendlyName: 'Listar cidade',
  description: 'Lista todos os cidade ou um específico.',
  inputs: { id: { type: 'number', required: false } },
  exits: { success: { description: 'Retornado com sucesso.' }, notFound: { description: 'Não encontrado.', responseType: 'notFound' } },
  fn: async function (inputs, exits) {
    try {
      if (inputs.id) {
        const item = await Cidade.findOne({ id: inputs.id }).populateAll();
        if (!item) return exits.notFound({ message: 'Cidade não encontrado.' });
        return exits.success(item);
      }
      const list = await Cidade.find().populateAll();
      return exits.success(list);
    } catch (err) {
      sails.log.error('Erro ao listar cidade:', err);
      throw 'serverError';
    }
  }
};
