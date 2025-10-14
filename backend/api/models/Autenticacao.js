module.exports = {
  tableName: 'Autenticacao',
  primaryKey: 'id',
  attributes: {
    id: { type: 'number', autoIncrement: true },
    login: { type: 'string', required: true, maxLength: 150 },
    senha: { type: 'string', required: true, maxLength: 150 },
    role: { type: 'string', required: true, maxLength: 50 },
    responsaveis: { collection: 'responsavel', via: 'id' }, 
    motoristas: { collection: 'motorista', via: 'id' }      
  }
};
