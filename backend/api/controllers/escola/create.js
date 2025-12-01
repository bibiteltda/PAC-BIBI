module.exports = {
  friendlyName: 'Criar escola',
  description: 'Cria um novo registro de escola.',

  inputs: {
    nome:       { type: 'string', required: true },
    telefone:   { type: 'string', required: false },
    logradouro: { type: 'string', required: false },
    bairroId:   { type: 'number', required: true },
    cidadeId:   { type: 'number', required: true },
  },

  exits: {
    success:    { description: 'Criado com sucesso.' },
    badRequest: { description: 'Erro ao criar.' },
  },

  fn: async function (inputs, exits) {
    try {
      const novo = await Escola.create({
        nome:       inputs.nome,
        telefone:   inputs.telefone,
        logradouro: inputs.logradouro,
        bairro:     inputs.bairroId,   // FK
        cidade:     inputs.cidadeId,   // FK
      }).fetch();

      return exits.success({ message: 'Escola criado com sucesso!', escola: novo });
    } catch (err) {
      sails.log.error('Erro ao criar escola:', err);
      return exits.badRequest({ message: 'Erro ao criar escola.' });
    }
  }
};
