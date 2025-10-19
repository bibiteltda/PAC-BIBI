module.exports = {
  friendlyName: 'Excluir controle mensal',
  description: 'Remove um controle mensal existente.',

  inputs: {
    id: { type: 'string', required: true },
  },

  exits: {
    success: { description: 'Removido com sucesso.' },
    notFound: { description: 'Registro não encontrado.' },
    serverError: { description: 'Erro ao excluir controle mensal.' },
  },
};
