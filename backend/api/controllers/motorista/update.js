module.exports = {

  friendlyName: 'Atualizar motorista',

  description: 'Atualiza os dados de um motorista existente.',

  inputs: {
    id: { type: 'number', required: true },
    nome: { type: 'string' },
    contato: { type: 'string' },
    cpf: { type: 'string' },
    autenticacao: { type: 'number' },
  },

  exits: {
    success: { description: 'Motorista atualizado com sucesso.' },
    notFound: { description: 'Motorista não encontrado.', responseType: 'notFound' },
  },

  fn: async function (inputs, exits) {
    try {
      const id = inputs.id;
      delete inputs.id;
      const atualizado = await Motorista.updateOne({ id: id }).set(inputs);
      if (!atualizado) return exits.notFound({ message: 'Motorista não encontrado.' });
      return exits.success({ message: 'Motorista atualizado com sucesso.', motorista: atualizado });
    } catch (err) {
      sails.log.error('Erro ao atualizar motorista:', err);
      throw 'serverError';
    }
  }

};
