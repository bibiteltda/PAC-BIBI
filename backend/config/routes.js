/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  //Auth
  'POST /api/login': 'AuthController.login',
  'POST /api/register': 'AuthController.register',
  // Aluno
  'GET /aluno': { action: 'aluno/find' },
  'GET /aluno/:id': { action: 'aluno/find' },
  'POST /aluno': { action: 'aluno/create' },
  'PUT /aluno/:id': { action: 'aluno/update' },
  'DELETE /aluno/:id': { action: 'aluno/delete' },
  // Motorista
  'GET /motorista': { action: 'motorista/find' },
  'GET /motorista/:id': { action: 'motorista/find' },
  'POST /motorista': { action: 'motorista/create' },
  'PUT /motorista/:id': { action: 'motorista/update' },
  'DELETE /motorista/:id': { action: 'motorista/delete' },
  // Responsavel
  'GET /responsavel': { action: 'responsavel/find' },
  'GET /responsavel/:id': { action: 'responsavel/find' },
  'POST /responsavel': { action: 'responsavel/create' },
  'PUT /responsavel/:id': { action: 'responsavel/update' },
  'DELETE /responsavel/:id': { action: 'responsavel/delete' },
  // Autenticacao
  'POST /register': { action: 'autenticacao/register' },
  'POST /login': { action: 'autenticacao/login' },
  'GET /autenticacao': { action: 'autenticacao/find' },
  'GET /autenticacao/:id': { action: 'autenticacao/find' },
  'POST /autenticacao': { action: 'autenticacao/create' },
  'PUT /autenticacao/:id': { action: 'autenticacao/update' },
  'DELETE /autenticacao/:id': { action: 'autenticacao/delete' },
  // Pagamento
  'GET /pagamento': { action: 'pagamento/find' },
  'GET /pagamento/:id': { action: 'pagamento/find' },
  'POST /pagamento': { action: 'pagamento/create' },
  'PUT /pagamento/:id': { action: 'pagamento/update' },
  'DELETE /pagamento/:id': { action: 'pagamento/delete' },
  // Roteiro
  'GET /roteiro': { action: 'roteiro/find' },
  'GET /roteiro/:id': { action: 'roteiro/find' },
  'POST /roteiro': { action: 'roteiro/create' },
  'PUT /roteiro/:id': { action: 'roteiro/update' },
  'DELETE /roteiro/:id': { action: 'roteiro/delete' },
  // Escola
  'GET /escola': { action: 'escola/find' },
  'GET /escola/:id': { action: 'escola/find' },
  'POST /escola': { action: 'escola/create' },
  'PUT /escola/:id': { action: 'escola/update' },
  'DELETE /escola/:id': { action: 'escola/delete' },
  // Bairro
  'GET /bairro': { action: 'bairro/find' },
  'GET /bairro/:id': { action: 'bairro/find' },
  'POST /bairro': { action: 'bairro/create' },
  'PUT /bairro/:id': { action: 'bairro/update' },
  'DELETE /bairro/:id': { action: 'bairro/delete' },
  // Cidade
  'GET /cidade': { action: 'cidade/find' },
  'GET /cidade/:id': { action: 'cidade/find' },
  'POST /cidade': { action: 'cidade/create' },
  'PUT /cidade/:id': { action: 'cidade/update' },
  'DELETE /cidade/:id': { action: 'cidade/delete' },
  // Controle Mensal
  'GET /controle-mensal': { action: 'controle-mensal/find' },
  'GET /controle-mensal/:tipo': { action: 'controle-mensal/find' },
  'POST /controle-mensal': { action: 'controle-mensal/create' },
  'PUT /controle-mensal/:id': { action: 'controle-mensal/update' },
  'DELETE /controle-mensal/:id': { action: 'controle-mensal/delete' },

};