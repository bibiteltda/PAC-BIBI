/**
 * Responsavel.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'Responsavel',
  primaryKey: 'id_responsavel',
  attributes: {
    id_responsavel: { type: 'number', autoIncrement: true },
    nome: { type: 'string', required: true, maxLength: 80 },
    contato: { type: 'string', maxLength: 15 },
    cpf: { type: 'string', maxLength: 15 },
    id_autenticacao: { model: 'autenticacao', required: true },
    alunos: { collection: 'aluno', via: 'responsavel' },
    pagamentos: { collection: 'pagamento', via: 'responsavel' }
  }
};