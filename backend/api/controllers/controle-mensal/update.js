module.exports = {
  friendlyName: 'Atualizar controle mensal',
  description: 'Atualiza um registro de controle mensal.',

  inputs: {
    id: { type: 'string', required: true },
    status: { type: 'string', required: false, isIn: ['pendente', 'pago', 'cancelado'] },
    resumo: { type: 'json', required: false },
  },

  exits: {
    success: { description: 'Atualizado com sucesso.' },
    notFound: { description: 'Registro não encontrado.' },
    serverError: { description: 'Erro ao atualizar.' },
  },

  fn: async function (inputs, exits) {
    try {
      const atualizado = await Pagamento.updateOne({ id: inputs.id }).set({
        status: inputs.status,
        resumo: inputs.resumo,
      });

      if (!atualizado) return exits.notFound({ message: 'Controle não encontrado.' });
      return exits.success({ message: 'Controle atualizado com sucesso!', controle: atualizado });
    } catch (err) {
      sails.log.error(err);
      return exits.serverError({ message: 'Erro ao atualizar controle mensal.' });
    }
  },
};
