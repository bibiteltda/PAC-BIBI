module.exports = {
  friendlyName: 'Criar autenticacao',
  description: 'Cria um novo registro de autenticacao.',
  inputs: {
    login: { type: 'string', required: false },
    senha: { type: 'string', required: false },
    role: { type: 'string', required: false }
  },
  exits: { success: { description: 'Criado com sucesso.' }, badRequest: { description: 'Erro ao criar.' } },
  fn: async function (inputs, exits) {
    try {
      const novo = await Autenticacao.create(inputs).fetch();
      return exits.success({ message: 'Autenticacao criado com sucesso!', autenticacao: novo });
    } catch (err) {
      sails.log.error('Erro ao criar autenticacao:', err);
      return exits.badRequest({ message: 'Erro ao criar autenticacao.' });
    }
  }
};
