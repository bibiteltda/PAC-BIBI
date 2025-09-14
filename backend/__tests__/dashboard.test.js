const request = require('supertest');
const app = require('../app.js');
const { sequelize } = require('../database'); // Caminho de importação corrigido

// Este bloco agrupa todos os testes para o dashboard
describe('Testes da Rota do Dashboard', () => {

  // Executado uma vez, antes de todos os testes
  beforeAll(async () => {
    // Garante que a conexão com o banco de dados está autenticada
    await sequelize.authenticate();
  });

  // Executado uma vez, após todos os testes
  afterAll(async () => {
    // Fecha a conexão com o banco de dados para evitar o aviso do Jest
    await sequelize.close();
  });

  // Teste 1: Valida o formato geral da resposta da API
  test('Deve retornar os dados do dashboard com as propriedades esperadas e status 200', async () => {
    const response = await request(app).get('/dashboard/controles');

    // Verifica se a requisição foi bem-sucedida
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toContain('application/json');

    // Verifica se a resposta contém as propriedades principais
    expect(response.body).toHaveProperty('ganhosMensais');
    expect(response.body).toHaveProperty('perdasMensais');
    expect(response.body).toHaveProperty('ganhosMesAnterior');
    expect(response.body).toHaveProperty('escolasComMaisAlunos');
  });

  // Teste 2: Valida os dados de rendimento por escola
  test('Deve retornar um array de escolas com dados válidos', async () => {
    const response = await request(app).get('/dashboard/controles');
    
    // Verifica se a propriedade existe e é um array
    expect(Array.isArray(response.body.escolasComMaisAlunos)).toBe(true);

    // Verifica se a quantidade de itens no array é menor ou igual a 3
    expect(response.body.escolasComMaisAlunos.length).toBeLessThanOrEqual(3);

    // Verifica a estrutura de cada objeto dentro do array
    if (response.body.escolasComMaisAlunos.length > 0) {
      const escola = response.body.escolasComMaisAlunos[0];
      expect(escola).toHaveProperty('totalAlunos');
      expect(escola).toHaveProperty('escolaObj');
      expect(escola.escolaObj).toHaveProperty('nome');
    }
  });

  // Teste 3: Verifica se uma rota inválida retorna 404
  test('Deve retornar status 404 para uma rota inexistente', async () => {
    const response = await request(app).get('/rota-inexistente');
    expect(response.statusCode).toBe(404);
  });
});