module.exports = {
  friendlyName: 'Atualizar bairro',
  description: 'Atualiza um bairro existente.',
  inputs: {
    id: { type: 'number', required: true },
    nome: { type: 'string', required: false },
    cidade: { type: 'string', required: false }
  },
  exits: { success: { description: 'Atualizado com sucesso.' }, notFound: { description: 'Não encontrado.', responseType: 'notFound' } },
  fn: async function (inputs, exits) {
    try {
      const id = inputs.id;
      delete inputs.id;
      const atualizado = await Bairro.updateOne({ id: id }).set(inputs);
      if (!atualizado) return exits.notFound({ message: 'Bairro não encontrado.' });
      return exits.success({ message: 'Bairro atualizado com sucesso!', data: atualizado });
    } catch (err) {
      sails.log.error('Erro ao atualizar bairro:', err);
      throw 'serverError';
    }
  }
};
