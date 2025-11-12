module.exports = {
  tableName: 'escola',
  attributes: {
    id: { type: 'number', autoIncrement: true },
    nome: { type: 'string', required: true, maxLength: 255 },
    telefone: { type: 'string', maxLength: 15 },
    logradouro: { type: 'string', maxLength: 100 },

    bairro: { model: 'bairro' },
    cidade: { model: 'cidade' },
    alunos: { collection: 'aluno', via: 'escola' },
    roteiros: { collection: 'roteiro', via: 'escolas' },

    createdAt: { type: 'ref', columnType: 'timestamp without time zone', autoCreatedAt: true },
    updatedAt: { type: 'ref', columnType: 'timestamp without time zone', autoUpdatedAt: true }
  }
};
