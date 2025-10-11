const request = require('supertest');
const app = require('../app.js');
const { sequelize, models } = require('../database/index.js'); // Usado para criar os dados de teste

describe('Testes da Rota de Relatórios (/relatorios)', () => {

  beforeAll(async () => {
    await sequelize.sync({ force: true });
    
    // Criação de todo o cenário necessário
    await models.Cidade.create({ id_cidade: 1, nome: 'Cidade Teste' });
    await models.Bairro.create({ id_bairro: 1, nome: 'Bairro Teste' });
    await models.Escola.create({ id_escola: 1, nome: 'Escola Primavera', cidade: 1, bairro: 1 });
    await models.Escola.create({ id_escola: 2, nome: 'Escola Girassol', cidade: 1, bairro: 1 });
    await models.Turma.create({ id_turma: 1, nome_turma: 'Maternal II', periodo: 'Vespertino' });
    await models.Roteiro.create({ id_roteiro: 1, turno: 1 });
    await models.Autenticacao.create({ id_autenticacao: 1, login: 'ana@email.com', senha: '123', role: 'responsavel' });
    await models.Autenticacao.create({ id_autenticacao: 2, login: 'bruno@email.com', senha: '123', role: 'responsavel' });
    await models.Autenticacao.create({ id_autenticacao: 3, login: 'carlos@email.com', senha: '123', role: 'motorista' });
    await models.Responsavel.create({ id_responsavel: 1, nome: 'Ana', id_autenticacao: 1 });
    await models.Responsavel.create({ id_responsavel: 2, nome: 'Bruno', id_autenticacao: 2 });
    await models.Motorista.create({ id_motorista: 1, nome: 'Carlos Motorista', id_autenticacao: 3 });
    await models.Aluno.create({ id_aluno: 1, nome: 'Daniela', responsavel: 1, escola: 1, motorista: 1, id_turma: 1, roteiro: 1 });
    await models.Aluno.create({ id_aluno: 2, nome: 'Eduardo', responsavel: 2, escola: 2, motorista: 1, id_turma: 1, roteiro: 1 });
    await models.Pagamento.create({ responsavel: 1, motorista: 1, valor: 250, dta_vcto: '2025-05-03', status: 'PAGO' });
    await models.Pagamento.create({ responsavel: 1, motorista: 1, valor: 250, dta_vcto: '2025-06-03', status: 'PENDENTE' });
    await models.Pagamento.create({ responsavel: 2, motorista: 1, valor: 300, dta_vcto: '2025-05-10', status: 'PENDENTE' });
    await models.Pagamento.create({ responsavel: 2, motorista: 1, valor: 300, dta_vcto: '2025-04-10', status: 'ATRASADO' });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('deve retornar todos os 4 pagamentos se nenhum filtro for aplicado', async () => {
    const response = await request(app).get('/relatorios');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(4);
  });

  test('deve retornar apenas 1 pagamento ao filtrar pelo status "PAGO"', async () => {
    const response = await request(app).get('/relatorios?status=PAGO');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].status).toBe('PAGO');
  });

  test('deve retornar os 2 pagamentos da "Escola Primavera" (id 1)', async () => {
    const response = await request(app).get('/relatorios?escolaId=1');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(2);
  });

  test('deve retornar os 2 pagamentos de Maio ao filtrar pelo intervalo de datas', async () => {
    const response = await request(app).get('/relatorios?dataInicio=2025-05-01&dataFim=2025-05-31');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(2);
  });

  test('deve retornar 1 pagamento ao combinar filtros: status PENDENTE e escolaId 2', async () => {
    const response = await request(app).get('/relatorios?status=PENDENTE&escolaId=2');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].status).toBe('PENDENTE');
  });
});