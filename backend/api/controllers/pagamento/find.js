module.exports = {
  friendlyName: 'Listar pagamento',
  description: 'Lista todos os pagamento ou um específico.',
  inputs: { id: { type: 'number', required: false } },
  exits: { success: { description: 'Retornado com sucesso.' }, notFound: { description: 'Não encontrado.', responseType: 'notFound' } },
  fn: async function (inputs, exits) {
    try {
      if (inputs.id) {
        const item = await Pagamento.findOne({ id: inputs.id }).populateAll();
        if (!item) return exits.notFound({ message: 'Pagamento não encontrado.' });
        return exits.success(item);
      }
      const list = await Pagamento.find().populateAll();
      return exits.success(list);
    } catch (err) {
      sails.log.error('Erro ao listar pagamento:', err);
      throw 'serverError';
    }
  }
};
