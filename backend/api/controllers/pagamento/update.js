module.exports = {
  friendlyName: 'Atualizar pagamento',
  description: 'Atualiza um pagamento existente.',
  inputs: {
    id: { type: 'number', required: true },
    valor: { type: 'string', required: false },
    dta_vcto: { type: 'string', required: false },
    dta_pgmt: { type: 'string', required: false },
    status: { type: 'string', required: false },
    responsavel: { type: 'string', required: false },
    motorista: { type: 'string', required: false }
  },
  exits: { success: { description: 'Atualizado com sucesso.' }, notFound: { description: 'Não encontrado.', responseType: 'notFound' } },
  fn: async function (inputs, exits) {
    try {
      const id = inputs.id;
      delete inputs.id;
      const atualizado = await Pagamento.updateOne({ id: id }).set(inputs);
      if (!atualizado) return exits.notFound({ message: 'Pagamento não encontrado.' });
      return exits.success({ message: 'Pagamento atualizado com sucesso!', data: atualizado });
    } catch (err) {
      sails.log.error('Erro ao atualizar pagamento:', err);
      throw 'serverError';
    }
  }
};
