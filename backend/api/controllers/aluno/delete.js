module.exports = {
  friendlyName: 'Excluir aluno',
  description: 'Exclui um aluno pelo ID.',
  inputs: { id: { type: 'number', required: true } },
  exits: { success: { description: 'Removido com sucesso.' }, notFound: { description: 'Não encontrado.', responseType: 'notFound' } },
  fn: async function (inputs, exits) {
    try {
      const deletado = await Aluno.destroyOne({ id: inputs.id });
      if (!deletado) return exits.notFound({ message: 'Aluno não encontrado.' });
      return exits.success({ message: 'Aluno removido com sucesso!' });
    } catch (err) {
      sails.log.error('Erro ao deletar aluno:', err);
      throw 'serverError';
    }
  }
};
