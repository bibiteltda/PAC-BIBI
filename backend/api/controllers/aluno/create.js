module.exports = {
  friendlyName: 'Criar aluno',
  description: 'Cria um novo registro de aluno.',
  inputs: {
    nome: { type: 'string', required: false },
    idade: { type: 'string', required: false },
    responsavel: { type: 'string', required: false },
    escola: { type: 'string', required: false },
    motorista: { type: 'string', required: false },
    roteiro: { type: 'string', required: false }
  },
  exits: { success: { description: 'Criado com sucesso.' }, badRequest: { description: 'Erro ao criar.' } },
  fn: async function (inputs, exits) {
    try {
      const novo = await Aluno.create(inputs).fetch();
      return exits.success({ message: 'Aluno criado com sucesso!', aluno: novo });
    } catch (err) {
      sails.log.error('Erro ao criar aluno:', err);
      return exits.badRequest({ message: 'Erro ao criar aluno.' });
    }
  }
};
