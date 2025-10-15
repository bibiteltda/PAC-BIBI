module.exports = {
  friendlyName: 'Criar pagamento',
  description: 'Cria um novo registro de pagamento.',
  inputs: {
    valor: { type: 'string', required: false },
    dta_vcto: { type: 'string', required: false },
    dta_pgmt: { type: 'string', required: false },
    status: { type: 'string', required: false },
    responsavel: { type: 'string', required: false },
    motorista: { type: 'string', required: false }
  },
  exits: { success: { description: 'Criado com sucesso.' }, badRequest: { description: 'Erro ao criar.' } },
  fn: async function (inputs, exits) {
    try {
      const novo = await Pagamento.create(inputs).fetch();
      return exits.success({ message: 'Pagamento criado com sucesso!', pagamento: novo });
    } catch (err) {
      sails.log.error('Erro ao criar pagamento:', err);
      return exits.badRequest({ message: 'Erro ao criar pagamento.' });
    }
  }
};
