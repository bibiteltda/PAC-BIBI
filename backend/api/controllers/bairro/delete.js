module.exports = {
  friendlyName: 'Excluir bairro',
  description: 'Exclui um bairro pelo ID.',
  inputs: { id: { type: 'number', required: true } },
  exits: { success: { description: 'Removido com sucesso.' }, notFound: { description: 'Não encontrado.', responseType: 'notFound' } },
  fn: async function (inputs, exits) {
    try {
      const deletado = await Bairro.destroyOne({ id: inputs.id });
      if (!deletado) return exits.notFound({ message: 'Bairro não encontrado.' });
      return exits.success({ message: 'Bairro removido com sucesso!' });
    } catch (err) {
      sails.log.error('Erro ao deletar bairro:', err);
      throw 'serverError';
    }
  }
};
