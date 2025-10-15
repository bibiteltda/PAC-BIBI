module.exports = {
  friendlyName: 'Excluir pagamento',
  description: 'Exclui um pagamento pelo ID.',
  inputs: { id: { type: 'number', required: true } },
  exits: { success: { description: 'Removido com sucesso.' }, notFound: { description: 'Não encontrado.', responseType: 'notFound' } },
  fn: async function (inputs, exits) {
    try {
      const deletado = await Pagamento.destroyOne({ id: inputs.id });
      if (!deletado) return exits.notFound({ message: 'Pagamento não encontrado.' });
      return exits.success({ message: 'Pagamento removido com sucesso!' });
    } catch (err) {
      sails.log.error('Erro ao deletar pagamento:', err);
      throw 'serverError';
    }
  }
};
