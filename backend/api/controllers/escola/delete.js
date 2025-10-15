module.exports = {
  friendlyName: 'Excluir escola',
  description: 'Exclui um escola pelo ID.',
  inputs: { id: { type: 'number', required: true } },
  exits: { success: { description: 'Removido com sucesso.' }, notFound: { description: 'Não encontrado.', responseType: 'notFound' } },
  fn: async function (inputs, exits) {
    try {
      const deletado = await Escola.destroyOne({ id: inputs.id });
      if (!deletado) return exits.notFound({ message: 'Escola não encontrado.' });
      return exits.success({ message: 'Escola removido com sucesso!' });
    } catch (err) {
      sails.log.error('Erro ao deletar escola:', err);
      throw 'serverError';
    }
  }
};
