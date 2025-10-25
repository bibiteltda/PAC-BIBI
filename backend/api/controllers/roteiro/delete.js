module.exports = {
  friendlyName: 'Excluir roteiro',
  description: 'Exclui um roteiro pelo ID.',
  inputs: { id: { type: 'number', required: true } },
  exits: { success: { description: 'Removido com sucesso.' }, notFound: { description: 'Não encontrado.', responseType: 'notFound' } },
  fn: async function (inputs, exits) {
    try {
      const deletado = await Roteiro.destroyOne({ id: inputs.id });
      if (!deletado) return exits.notFound({ message: 'Roteiro não encontrado.' });
      return exits.success({ message: 'Roteiro removido com sucesso!' });
    } catch (err) {
      sails.log.error('Erro ao deletar roteiro:', err);
      throw 'serverError';
    }
  }
};
