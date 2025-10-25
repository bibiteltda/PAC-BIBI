module.exports = {

  friendlyName: 'Listar motoristas',

  description: 'Lista todos os motoristas ou um específico.',

  inputs: {
    id: { type: 'number', required: false },
  },

  exits: {
    success: { description: 'Motoristas retornados com sucesso.' },
    notFound: { description: 'Motorista não encontrado.', responseType: 'notFound' },
  },

  fn: async function (inputs, exits) {
    try {
      if (inputs.id) {
        const motorista = await Motorista.findOne({ id: inputs.id }).populateAll();
        if (!motorista) return exits.notFound({ message: 'Motorista não encontrado.' });
        return exits.success(motorista);
      }
      const lista = await Motorista.find().populateAll();
      return exits.success(lista);
    } catch (err) {
      sails.log.error('Erro ao listar motoristas:', err);
      throw 'serverError';
    }
  }

};
