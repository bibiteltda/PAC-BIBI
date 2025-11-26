module.exports = {
  tableName: 'roteiro',
  attributes: {
    id: { type: 'number', autoIncrement: true },
    turno: { type: 'number' },
    nome: { type: 'string', required: true, maxLength: 50 },

    motorista: { model: 'motorista' },
    escolas: { collection: 'escola', via: 'roteiros' },
    alunos: { collection: 'aluno', via: 'roteiro' },

    createdAt: { type: 'ref', columnType: 'timestamp without time zone', autoCreatedAt: true },
    updatedAt: { type: 'ref', columnType: 'timestamp without time zone', autoUpdatedAt: true }
  }
};
