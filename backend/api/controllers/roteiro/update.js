module.exports = {
  friendlyName: 'Atualizar roteiro',
  description: 'Atualiza um roteiro existente.',
  inputs: {
    id: { type: 'number', required: true },
    turno: { type: 'string', required: false },
    motorista: { type: 'string', required: false }
  },
  exits: { success: { description: 'Atualizado com sucesso.' }, notFound: { description: 'Não encontrado.', responseType: 'notFound' } },
  fn: async function (inputs, exits) {
    try {
      const id = inputs.id;
      delete inputs.id;
      const atualizado = await Roteiro.updateOne({ id: id }).set(inputs);
      if (!atualizado) return exits.notFound({ message: 'Roteiro não encontrado.' });
      return exits.success({ message: 'Roteiro atualizado com sucesso!', data: atualizado });
    } catch (err) {
      sails.log.error('Erro ao atualizar roteiro:', err);
      throw 'serverError';
    }
  }
};
