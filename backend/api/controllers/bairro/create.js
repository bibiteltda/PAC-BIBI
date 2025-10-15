module.exports = {
  friendlyName: 'Criar bairro',
  description: 'Cria um novo registro de bairro.',
  inputs: {
    nome: { type: 'string', required: false },
    cidade: { type: 'string', required: false }
  },
  exits: { success: { description: 'Criado com sucesso.' }, badRequest: { description: 'Erro ao criar.' } },
  fn: async function (inputs, exits) {
    try {
      const novo = await Bairro.create(inputs).fetch();
      return exits.success({ message: 'Bairro criado com sucesso!', bairro: novo });
    } catch (err) {
      sails.log.error('Erro ao criar bairro:', err);
      return exits.badRequest({ message: 'Erro ao criar bairro.' });
    }
  }
};
