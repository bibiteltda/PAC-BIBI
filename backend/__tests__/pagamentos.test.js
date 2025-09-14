const request = require('supertest');
const app = require('../app.js');
const { sequelize, models } = require('../database/index.js');
const { Op } = require("sequelize");

describe('Testes da Rota de Pagamentos', () => {
  let escolaId;

  beforeAll(async () => {
    const [escola] = await models.Escola.findAll({ limit: 1 });
    if (escola) {
      escolaId = escola.id_escola;
    }
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('Deve retornar todos os pagamentos com status 200', async () => {
    const response = await request(app).get('/pagamentos');
    
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('Deve retornar apenas pagamentos com status "ATRASADO"', async () => {
    const response = await request(app).get('/pagamentos?status=ATRASADO');
    
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].status).toBe('ATRASADO');
  });

  test('Deve retornar pagamentos de uma escola específica quando o filtro escolaId for usado', async () => {
    if (!escolaId) {
      throw new Error('ID da escola de teste não encontrado.');
    }
    const response = await request(app).get(`/pagamentos?escolaId=${escolaId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    
    response.body.forEach(pagamento => {
      const aluno = pagamento.responsavelObj.alunos[0];
      expect(aluno.escolaObj.id_escola).toBe(escolaId);
    });
  });
  
  test('Deve retornar pagamentos dentro de um intervalo de datas', async () => {
      const hoje = new Date();
      const ontem = new Date();
      ontem.setDate(hoje.getDate() - 1);
      
      const dataInicio = ontem.toISOString().slice(0, 10);
      const dataFim = hoje.toISOString().slice(0, 10);
      
      const response = await request(app).get(`/pagamentos?dataInicio=${dataInicio}&dataFim=${dataFim}`);
      
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBeGreaterThanOrEqual(1);
  });
});