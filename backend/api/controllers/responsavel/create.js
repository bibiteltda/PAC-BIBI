module.exports = {
  friendlyName: 'Criar responsavel',
  description: 'Cria um novo registro de responsavel.',
  inputs: {
    nome: { type: 'string', required: false },
    contato: { type: 'string', required: false },
    cpf: { type: 'string', required: false },
    id_autenticacao: { type: 'string', required: false }
  },
  exits: { success: { description: 'Criado com sucesso.' }, badRequest: { description: 'Erro ao criar.' } },
  fn: async function (inputs, exits) {
    try {
      const novo = await Responsavel.create(inputs).fetch();
      return exits.success({ message: 'Responsavel criado com sucesso!', responsavel: novo });
    } catch (err) {
      sails.log.error('Erro ao criar responsavel:', err);
      return exits.badRequest({ message: 'Erro ao criar responsavel.' });
    }
  }
};
