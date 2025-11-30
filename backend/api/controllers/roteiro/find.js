module.exports = {
  friendlyName: 'Listar Roteiros',
  description: 'Lista roteiros filtrando por escola e turno.',

  inputs: {
    escola: { type: 'string', required: false },
    turno: { type: 'string', required: false },
  },

  exits: {
    success: { description: 'Retornado com sucesso.' },
    serverError: { description: 'Erro no servidor.', responseType: 'serverError' },
  },

  fn: async function (inputs, exits) {
    try {
      let criteria = {};

      if (inputs.escola && inputs.escola !== 'todas') {
        criteria.escola = Number(inputs.escola);
      }

      if (inputs.turno && inputs.turno !== 'todas') {
        criteria.turno = Number(inputs.turno);
      }

      const list = await Roteiro.find(criteria).populate('escola').populate('motorista');

      return exits.success(list);

    } catch (err) {
      sails.log.error('Erro ao listar roteiro:', err);
      return exits.serverError(err);
    }
  },
};