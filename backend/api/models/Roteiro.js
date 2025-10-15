module.exports = {
  tableName: 'roteiro',
  attributes: {
    id: { type: 'number', columnName: 'id_roteiro', autoIncrement: true },
    turno: { type: 'number' },

    escolas: { collection: 'escola', via: 'roteiros' },
    alunos: { collection: 'aluno', via: 'roteiro' },
    motorista: { model: 'motorista' },

    createdAt: { type: 'ref', columnType: 'timestamp without time zone', autoCreatedAt: true },
    updatedAt: { type: 'ref', columnType: 'timestamp without time zone', autoUpdatedAt: true }
  }
};
