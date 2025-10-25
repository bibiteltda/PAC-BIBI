module.exports = {
  tableName: 'cidade',
  attributes: {
    id: { type: 'number', autoIncrement: true },
    nome: { type: 'string', required: true, maxLength: 255 },

    escolas: { collection: 'escola', via: 'cidade' },

    createdAt: { type: 'ref', columnType: 'timestamp without time zone', autoCreatedAt: true },
    updatedAt: { type: 'ref', columnType: 'timestamp without time zone', autoUpdatedAt: true }
  }
};
