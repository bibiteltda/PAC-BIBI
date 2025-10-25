module.exports = {
  friendlyName: 'Atualizar cidade',
  description: 'Atualiza um cidade existente.',
  inputs: {
    id: { type: 'number', required: true },
    nome: { type: 'string', required: false }
  },
  exits: { success: { description: 'Atualizado com sucesso.' }, notFound: { description: 'Não encontrado.', responseType: 'notFound' } },
  fn: async function (inputs, exits) {
    try {
      const id = inputs.id;
      delete inputs.id;
      const atualizado = await Cidade.updateOne({ id: id }).set(inputs);
      if (!atualizado) return exits.notFound({ message: 'Cidade não encontrado.' });
      return exits.success({ message: 'Cidade atualizado com sucesso!', data: atualizado });
    } catch (err) {
      sails.log.error('Erro ao atualizar cidade:', err);
      throw 'serverError';
    }
  }
};
