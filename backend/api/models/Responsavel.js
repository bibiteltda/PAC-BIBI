module.exports = {
  tableName: 'responsavel',
  attributes: {
    id: { type: 'number', columnName: 'id_responsavel', autoIncrement: true },
    nome: { type: 'string', required: true, maxLength: 80 },
    contato: { type: 'string', maxLength: 15 },
    cpf: { type: 'string', maxLength: 15 },

    autenticacao: { model: 'autenticacao' },
    alunos: { collection: 'aluno', via: 'responsavel' },
    pagamentos: { collection: 'pagamento', via: 'responsavel' },

    createdAt: { type: 'ref', columnType: 'timestamp without time zone', autoCreatedAt: true },
    updatedAt: { type: 'ref', columnType: 'timestamp without time zone', autoUpdatedAt: true }
  }
};
