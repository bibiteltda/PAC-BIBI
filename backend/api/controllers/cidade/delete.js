module.exports = {
  friendlyName: 'Excluir cidade',
  description: 'Exclui um cidade pelo ID.',
  inputs: { id: { type: 'number', required: true } },
  exits: { success: { description: 'Removido com sucesso.' }, notFound: { description: 'Não encontrado.', responseType: 'notFound' } },
  fn: async function (inputs, exits) {
    try {
      const deletado = await Cidade.destroyOne({ id: inputs.id });
      if (!deletado) return exits.notFound({ message: 'Cidade não encontrado.' });
      return exits.success({ message: 'Cidade removido com sucesso!' });
    } catch (err) {
      sails.log.error('Erro ao deletar cidade:', err);
      throw 'serverError';
    }
  }
};
