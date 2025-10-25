module.exports = {
  tableName: 'motorista',
  attributes: {
    id: { type: 'number', autoIncrement: true },
    nome: { type: 'string', required: true, maxLength: 80 },
    contato: { type: 'string', maxLength: 15 },
    cpf: { type: 'string', maxLength: 15 },

    autenticacao: { model: 'autenticacao' },
    pagamentos: { collection: 'pagamento', via: 'motorista' },
    alunos: { collection: 'aluno', via: 'motorista' },
    roteiros: { collection: 'roteiro', via: 'motorista' },

    createdAt: { type: 'ref', columnType: 'timestamp without time zone', autoCreatedAt: true },
    updatedAt: { type: 'ref', columnType: 'timestamp without time zone', autoUpdatedAt: true }
  }
};
