module.exports = {
  friendlyName: 'Atualizar responsavel',
  description: 'Atualiza um responsavel existente.',
  inputs: {
    id: { type: 'number', required: true },
    nome: { type: 'string', required: false },
    contato: { type: 'string', required: false },
    cpf: { type: 'string', required: false },
    id_autenticacao: { type: 'string', required: false }
  },
  exits: { success: { description: 'Atualizado com sucesso.' }, notFound: { description: 'Não encontrado.', responseType: 'notFound' } },
  fn: async function (inputs, exits) {
    try {
      const id = inputs.id;
      delete inputs.id;
      const atualizado = await Responsavel.updateOne({ id: id }).set(inputs);
      if (!atualizado) return exits.notFound({ message: 'Responsavel não encontrado.' });
      return exits.success({ message: 'Responsavel atualizado com sucesso!', data: atualizado });
    } catch (err) {
      sails.log.error('Erro ao atualizar responsavel:', err);
      throw 'serverError';
    }
  }
};
