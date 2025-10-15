module.exports = {
  friendlyName: 'Excluir autenticacao',
  description: 'Exclui um autenticacao pelo ID.',
  inputs: { id: { type: 'number', required: true } },
  exits: { success: { description: 'Removido com sucesso.' }, notFound: { description: 'Não encontrado.', responseType: 'notFound' } },
  fn: async function (inputs, exits) {
    try {
      const deletado = await Autenticacao.destroyOne({ id: inputs.id });
      if (!deletado) return exits.notFound({ message: 'Autenticacao não encontrado.' });
      return exits.success({ message: 'Autenticacao removido com sucesso!' });
    } catch (err) {
      sails.log.error('Erro ao deletar autenticacao:', err);
      throw 'serverError';
    }
  }
};
