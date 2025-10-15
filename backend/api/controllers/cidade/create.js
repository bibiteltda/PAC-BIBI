module.exports = {
  friendlyName: 'Criar cidade',
  description: 'Cria um novo registro de cidade.',
  inputs: {
    nome: { type: 'string', required: false }
  },
  exits: { success: { description: 'Criado com sucesso.' }, badRequest: { description: 'Erro ao criar.' } },
  fn: async function (inputs, exits) {
    try {
      const novo = await Cidade.create(inputs).fetch();
      return exits.success({ message: 'Cidade criado com sucesso!', cidade: novo });
    } catch (err) {
      sails.log.error('Erro ao criar cidade:', err);
      return exits.badRequest({ message: 'Erro ao criar cidade.' });
    }
  }
};
