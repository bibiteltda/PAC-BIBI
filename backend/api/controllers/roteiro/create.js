module.exports = {
  friendlyName: "Criar roteiro",
  description: "Cria um novo registro de roteiro.",

  inputs: {
    nome: { type: "string", required: true },
    turno: { type: "number", required: true },
    motorista: { type: "number", required: true },
  },

  exits: {
    success: { description: "Criado com sucesso." },
    badRequest: { description: "Erro ao criar." },
  },

  fn: async function (inputs, exits) {
    try {
      const novo = await Roteiro.create({
        nome: inputs.nome,
        turno: inputs.turno,
        motorista: inputs.motorista,
      }).fetch();

      return exits.success({
        message: "Roteiro criado com sucesso!",
        roteiro: novo,
      });
    } catch (err) {
      sails.log.error("Erro ao criar roteiro:", err);
      return exits.badRequest({ message: "Erro ao criar roteiro." });
    }
  },
};
