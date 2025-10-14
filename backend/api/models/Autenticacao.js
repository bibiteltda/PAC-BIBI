module.exports = {
  tableName: 'Autenticacao',
  primaryKey: 'id_autenticacao',
  attributes: {
    id_autenticacao: { type: 'number', autoIncrement: true },
    login: { type: 'string', required: true, maxLength: 150 },
    senha: { type: 'string', required: true, maxLength: 150 },
    role: { type: 'string', required: true, maxLength: 50 },
    responsaveis: { collection: 'responsavel', via: 'id_autenticacao' }, 
    motoristas: { collection: 'motorista', via: 'id_autenticacao' },
    
    schema: true
  }
};
