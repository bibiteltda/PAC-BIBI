module.exports = {
  friendlyName: 'Excluir responsavel',
  description: 'Exclui um responsavel pelo ID.',
  inputs: { id: { type: 'number', required: true } },
  exits: { success: { description: 'Removido com sucesso.' }, notFound: { description: 'Não encontrado.', responseType: 'notFound' } },
  fn: async function (inputs, exits) {
    try {
      const deletado = await Responsavel.destroyOne({ id: inputs.id });
      if (!deletado) return exits.notFound({ message: 'Responsavel não encontrado.' });
      return exits.success({ message: 'Responsavel removido com sucesso!' });
    } catch (err) {
      sails.log.error('Erro ao deletar responsavel:', err);
      throw 'serverError';
    }
  }
};
