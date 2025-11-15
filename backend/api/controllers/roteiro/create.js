module.exports = {
  friendlyName: 'Criar Roteiro',

  inputs: {
    turno: { type: 'number', required: true },
    motorista: { type: 'number', required: true },
    escolas: { type: 'ref', required: true }
  },

  exits: {
    success: { description: 'Roteiro criado com sucesso.' },
    serverError: { description: 'Erro no servidor.', responseType: 'serverError' }
  },

  fn: async function (inputs, exits) {
    try {
      // Criar roteiro
      const novoRoteiro = await Roteiro.create({
        turno: inputs.turno,
        motorista: inputs.motorista
      }).fetch();

      // Associar escolas (N:N)
      await Roteiro.addToCollection(novoRoteiro.id, 'escolas').members(inputs.escolas);

      return exits.success(novoRoteiro);

    } catch (err) {
      sails.log.error('Erro ao criar roteiro:', err);
      return exits.serverError({ message: 'Erro ao criar roteiro.', error: err });
    }
  }
};
