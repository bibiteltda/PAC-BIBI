module.exports = {
  tableName: 'Autenticacao',
  primaryKey: 'id_autenticacao',
  schema: true,
  autoCreatedAt: false,
  autoUpdatedAt: false,

  attributes: {
    id_autenticacao: {
      type: 'number',
      required: true,       // 👈 força o Waterline a tratar como PK real
      unique: true,         // 👈 confirma unicidade
      autoIncrement: true,
      columnName: 'id_autenticacao'
    },

    login: { type: 'string', required: true, maxLength: 150 },
    senha: { type: 'string', required: true, maxLength: 150 },
    role: { type: 'string', required: true, maxLength: 50 },

    responsaveis: { collection: 'responsavel', via: 'id_autenticacao' },
    motoristas: { collection: 'motorista', via: 'id_autenticacao' }
  }
};
