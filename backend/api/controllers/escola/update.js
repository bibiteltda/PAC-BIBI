module.exports = {
  friendlyName: 'Atualizar escola',
  description: 'Atualiza um escola existente.',
  inputs: {
    id: { type: 'number', required: true },
    nome: { type: 'string', required: false },
    telefone: { type: 'string', required: false },
    logradouro: { type: 'string', required: false },
    bairro: { type: 'string', required: false },
    cidade: { type: 'string', required: false }
  },
  exits: { success: { description: 'Atualizado com sucesso.' }, notFound: { description: 'Não encontrado.', responseType: 'notFound' } },
  fn: async function (inputs, exits) {
    try {
      const id = inputs.id;
      delete inputs.id;
      const atualizado = await Escola.updateOne({ id: id }).set(inputs);
      if (!atualizado) return exits.notFound({ message: 'Escola não encontrado.' });
      return exits.success({ message: 'Escola atualizado com sucesso!', data: atualizado });
    } catch (err) {
      sails.log.error('Erro ao atualizar escola:', err);
      throw 'serverError';
    }
  }
};
