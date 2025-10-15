module.exports = {
  tableName: 'bairro',
  attributes: {
    id: { type: 'number', columnName: 'id_bairro', autoIncrement: true },
    nome: { type: 'string', required: true, maxLength: 255 },

    escolas: { collection: 'escola', via: 'bairro' },

    createdAt: { type: 'ref', columnType: 'timestamp without time zone', autoCreatedAt: true },
    updatedAt: { type: 'ref', columnType: 'timestamp without time zone', autoUpdatedAt: true }
  }
};
