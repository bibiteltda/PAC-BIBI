module.exports = {
  tableName: 'roteiro',
  attributes: {
    id: { type: 'number', autoIncrement: true },
    turno: { type: 'string' },

    escolas: { collection: 'escola', via: 'roteiros' },
    alunos: { collection: 'aluno', via: 'roteiro' },
    motorista: { model: 'motorista' },

    createdAt: { type: 'ref', columnType: 'timestamp without time zone', autoCreatedAt: true },
    updatedAt: { type: 'ref', columnType: 'timestamp without time zone', autoUpdatedAt: true }
  }
};
