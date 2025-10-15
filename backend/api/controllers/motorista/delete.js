module.exports = {

  friendlyName: 'Excluir motorista',

  description: 'Exclui um motorista pelo ID.',

  inputs: {
    id: { type: 'number', required: true },
  },

  exits: {
    success: { description: 'Motorista removido com sucesso.' },
    notFound: { description: 'Motorista não encontrado.', responseType: 'notFound' },
  },

  fn: async function (inputs, exits) {
    try {
      const deletado = await Motorista.destroyOne({ id : inputs.id });
      if (!deletado) return exits.notFound({ message: 'Motorista não encontrado.' });
      return exits.success({ message: 'Motorista removido com sucesso.' });
    } catch (err) {
      sails.log.error('Erro ao excluir motorista:', err);
      throw 'serverError';
    }
  }

};
