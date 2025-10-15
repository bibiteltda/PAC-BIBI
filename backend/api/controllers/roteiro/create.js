module.exports = {
  friendlyName: 'Criar roteiro',
  description: 'Cria um novo registro de roteiro.',
  inputs: {
    turno: { type: 'string', required: false },
    motorista: { type: 'string', required: false }
  },
  exits: { success: { description: 'Criado com sucesso.' }, badRequest: { description: 'Erro ao criar.' } },
  fn: async function (inputs, exits) {
    try {
      const novo = await Roteiro.create(inputs).fetch();
      return exits.success({ message: 'Roteiro criado com sucesso!', roteiro: novo });
    } catch (err) {
      sails.log.error('Erro ao criar roteiro:', err);
      return exits.badRequest({ message: 'Erro ao criar roteiro.' });
    }
  }
};
