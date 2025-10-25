module.exports = {

  friendlyName: 'Criar motorista',

  description: 'Cria um novo registro de motorista.',

  inputs: {
    nome: { type: 'string', required: true },
    contato: { type: 'string', required: true },
    cpf: { type: 'string', required: true },
    autenticacao: { type: 'number', required: true },
  },

  exits: {
    success: { description: 'Motorista criado com sucesso.' },
    badRequest: { description: 'Erro ao criar motorista.' },
  },

  fn: async function (inputs, exits) {
    try {
      const novo = await Motorista.create({
        nome: inputs.nome,
        contato: inputs.contato,
        cpf: inputs.cpf,
        id_autenticacao: inputs.autenticacao,
      }).fetch();

      return exits.success({ message: 'Motorista criado com sucesso!', motorista: novo });
    } catch (err) {
      sails.log.error('Erro ao criar motorista:', err);
      return exits.badRequest({ message: 'Erro ao criar motorista.' });
    }
  }

};
