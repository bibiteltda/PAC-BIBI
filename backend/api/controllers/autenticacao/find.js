module.exports = {
  friendlyName: 'Listar autenticacao',
  description: 'Lista todos os autenticacao ou um específico.',
  inputs: { id: { type: 'number', required: false } },
  exits: { success: { description: 'Retornado com sucesso.' }, notFound: { description: 'Não encontrado.', responseType: 'notFound' } },
  fn: async function (inputs, exits) {
    try {
      if (inputs.id) {
        const item = await Autenticacao.findOne({ id: inputs.id }).populateAll();
        if (!item) return exits.notFound({ message: 'Autenticacao não encontrado.' });
        return exits.success(item);
      }
      const list = await Autenticacao.find().populateAll();
      return exits.success(list);
    } catch (err) {
      sails.log.error('Erro ao listar autenticacao:', err);
      throw 'serverError';
    }
  }
};
