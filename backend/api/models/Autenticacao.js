module.exports = {
  tableName: 'autenticacao',
  attributes: {
    id: { type: 'number', autoIncrement: true },
    login: { type: 'string', required: true, maxLength: 150 },
    senha: { type: 'string', required: true, maxLength: 150 },
    email: { type: 'string', required: true, unique: true },
    role: { type: 'string', maxLength: 50 },

    motorista: { collection: 'motorista', via: 'autenticacao' },
    responsavel: { collection: 'responsavel', via: 'autenticacao' },

    createdAt: { type: 'ref', columnType: 'timestamp without time zone', autoCreatedAt: true },
    updatedAt: { type: 'ref', columnType: 'timestamp without time zone', autoUpdatedAt: true },

    resetCode: { type: 'string', allowNull: true },
    resetCodeExpiresAt: { type: 'string', allowNull: true },
  }
};
