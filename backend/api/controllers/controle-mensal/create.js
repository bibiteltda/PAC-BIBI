module.exports = {
  friendlyName: 'Criar controle mensal',
  description: 'Cria um novo registro de controle mensal.',

  inputs: {
    mes: { type: 'string', required: true },
    ano: { type: 'string', required: true },
    resumo: { type: 'json', required: false },
  },

  exits: {
    success: { description: 'Criado com sucesso.' },
    badRequest: { description: 'Erro ao criar.' },
  },
};
