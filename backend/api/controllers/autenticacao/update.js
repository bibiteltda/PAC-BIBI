module.exports = {
  friendlyName: 'Atualizar autenticacao',
  description: 'Atualiza um autenticacao existente.',
  inputs: {
    id: { type: 'number', required: true },
    login: { type: 'string', required: false },
    senha: { type: 'string', required: false },
    role: { type: 'string', required: false }
  },
  exits: { success: { description: 'Atualizado com sucesso.' }, notFound: { description: 'Não encontrado.', responseType: 'notFound' } },
  fn: async function (inputs, exits) {
    try {
      const id = inputs.id;
      delete inputs.id;
      const atualizado = await Autenticacao.updateOne({ id: id }).set(inputs);
      if (!atualizado) return exits.notFound({ message: 'Autenticacao não encontrado.' });
      return exits.success({ message: 'Autenticacao atualizado com sucesso!', data: atualizado });
    } catch (err) {
      sails.log.error('Erro ao atualizar autenticacao:', err);
      throw 'serverError';
    }
  }
};
