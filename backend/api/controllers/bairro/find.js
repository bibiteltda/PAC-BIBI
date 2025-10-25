module.exports = {
  friendlyName: 'Listar bairro',
  description: 'Lista todos os bairro ou um específico.',
  inputs: { id: { type: 'number', required: false } },
  exits: { success: { description: 'Retornado com sucesso.' }, notFound: { description: 'Não encontrado.', responseType: 'notFound' } },
  fn: async function (inputs, exits) {
    try {
      if (inputs.id) {
        const item = await Bairro.findOne({ id: inputs.id }).populateAll();
        if (!item) return exits.notFound({ message: 'Bairro não encontrado.' });
        return exits.success(item);
      }
      const list = await Bairro.find().populateAll();
      return exits.success(list);
    } catch (err) {
      sails.log.error('Erro ao listar bairro:', err);
      throw 'serverError';
    }
  }
};
