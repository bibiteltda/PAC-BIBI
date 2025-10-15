module.exports = {
  friendlyName: 'Criar escola',
  description: 'Cria um novo registro de escola.',
  inputs: {
    nome: { type: 'string', required: false },
    telefone: { type: 'string', required: false },
    logradouro: { type: 'string', required: false },
    bairro: { type: 'string', required: false },
    cidade: { type: 'string', required: false }
  },
  exits: { success: { description: 'Criado com sucesso.' }, badRequest: { description: 'Erro ao criar.' } },
  fn: async function (inputs, exits) {
    try {
      const novo = await Escola.create(inputs).fetch();
      return exits.success({ message: 'Escola criado com sucesso!', escola: novo });
    } catch (err) {
      sails.log.error('Erro ao criar escola:', err);
      return exits.badRequest({ message: 'Erro ao criar escola.' });
    }
  }
};
