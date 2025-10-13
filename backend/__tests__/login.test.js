const request = require('supertest');
const app = require('../app.js');
const { sequelize, models } = require('../database/index.js');
const bcrypt = require('bcrypt'); 

describe('Testes da Rota de Login (/login)', () => {

  const emailDeTeste = 'teste.login@exemplo.com';
  const senhaDeTeste = 'SenhaForte@123';

  beforeAll(async () => {
    await sequelize.sync({ force: true });

    const senhaHash = await bcrypt.hash(senhaDeTeste, 10);
    await models.Autenticacao.create({
      login: emailDeTeste,
      senha: senhaHash,
      role: 'motorista'
    });
  });

  afterAll(async () => {
    await sequelize.close();
  });
  test('deve autenticar com sucesso um usuário com credenciais válidas', async () => {
    const response = await request(app)
      .post('/login')
      .send({ email: emailDeTeste, senha: senhaDeTeste }); 

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Login bem-sucedido!");
    expect(response.body.usuario.login).toBe(emailDeTeste);
    expect(response.body.usuario).not.toHaveProperty('senha');
  });

  test('deve retornar erro 401 para uma senha incorreta', async () => {
    const response = await request(app)
      .post('/login')
      .send({ email: emailDeTeste, senha: 'senhaErrada123' });
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Email ou senha inválidos.');
  });
  test('deve retornar erro 401 para um email que não existe', async () => {
    const response = await request(app)
      .post('/login')
      .send({ email: 'naoexiste@email.com', senha: senhaDeTeste });
      
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Email ou senha inválidos.');
  });

  test('deve retornar erro 400 se o email não for fornecido', async () => {
    const response = await request(app)
      .post('/login')
      .send({ senha: senhaDeTeste });
      
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Email e senha são obrigatórios.');
  });
});