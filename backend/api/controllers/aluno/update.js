module.exports = {
  friendlyName: 'Atualizar aluno',
  description: 'Atualiza um aluno existente.',
  inputs: {
    id: { type: 'number', required: true },
    nome: { type: 'string', required: false },
    idade: { type: 'string', required: false },
    responsavel: { type: 'string', required: false },
    escola: { type: 'string', required: false },
    motorista: { type: 'string', required: false },
    roteiro: { type: 'string', required: false }
  },
  exits: { success: { description: 'Atualizado com sucesso.' }, notFound: { description: 'Não encontrado.', responseType: 'notFound' } },
  fn: async function (inputs, exits) {
    try {
      const id = inputs.id;
      delete inputs.id;
      const atualizado = await Aluno.updateOne({ id: id }).set(inputs);
      if (!atualizado) return exits.notFound({ message: 'Aluno não encontrado.' });
      return exits.success({ message: 'Aluno atualizado com sucesso!', data: atualizado });
    } catch (err) {
      sails.log.error('Erro ao atualizar aluno:', err);
      throw 'serverError';
    }
  }
};
