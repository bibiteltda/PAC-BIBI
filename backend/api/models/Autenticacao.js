module.exports = {
  tableName: 'Autenticacao',
  primaryKey: 'id_autenticacao',
  schema: true,

  attributes: {
    id_autenticacao: {
      type: 'number',
      required: true,
      unique: true,
      autoIncrement: true,
      columnName: 'id_autenticacao'
    },

    login: { type: 'string', required: true, maxLength: 150 },
    senha: { type: 'string', required: true, maxLength: 150 },
    role: { type: 'string', required: true, maxLength: 50 },

    createdAt: { type: 'ref', columnType: 'timestamp', defaultsTo: () => new Date() },
    updatedAt: { type: 'ref', columnType: 'timestamp', defaultsTo: () => new Date() },

    responsaveis: { collection: 'responsavel', via: 'id_autenticacao' },
    motoristas: { collection: 'motorista', via: 'id_autenticacao' }
  }
};
