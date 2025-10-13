import request from 'supertest';
import app from '../app.js';
import { sequelize } from '../index.js';

describe('Testes da Rota de Autenticação (/autenticacoes)', () => {

  beforeAll(async () => {
    
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('deve criar uma nova conta com sucesso com dados válidos', async () => {
    const dadosUsuario = {
      email: 'teste@valido.com',
      senha: 'SenhaForte@123',
      confirmarSenha: 'SenhaForte@123'
    };

    const response = await request(app)
      .post('/autenticacoes')
      .send(dadosUsuario);

    expect(response.statusCode).toBe(201); 
    expect(response.body.login).toBe('teste@valido.com');
    expect(response.body.role).toBe('pendente');
    expect(response.body).not.toHaveProperty('senha');
  });

  test('deve retornar erro 400 se as senhas não coincidirem', async () => {
    const dados = {
      email: 'teste2@valido.com',
      senha: 'SenhaForte@123',
      confirmarSenha: 'senhaErrada'
    };

    const response = await request(app)
      .post('/autenticacoes')
      .send(dados);

    expect(response.statusCode).toBe(400); 
    expect(response.body.erro).toBe('As senhas não coincidem.');
  });

  test('deve retornar erro 400 para um email inválido', async () => {
    const dados = {
      email: 'emailinvalido',
      senha: 'SenhaForte@123',
      confirmarSenha: 'SenhaForte@123'
    };

    const response = await request(app)
      .post('/autenticacoes')
      .send(dados);

    expect(response.statusCode).toBe(400);
    expect(response.body.erro).toBe('O formato do email é inválido.');
  });

  test('deve retornar erro 400 para uma senha fraca', async () => {
    const dados = {
      email: 'teste3@valido.com',
      senha: '123',
      confirmarSenha: '123'
    };

    const response = await request(app)
      .post('/autenticacoes')
      .send(dados);

    expect(response.statusCode).toBe(400);
    expect(response.body.erro).toContain('A senha é fraca');
  });

  test('deve retornar erro 409 ao tentar criar uma conta com email duplicado', async () => {
    const dadosUsuario = {
      email: 'duplicado@teste.com',
      senha: 'SenhaForte@123',
      confirmarSenha: 'SenhaForte@123'
    };

    await request(app).post('/autenticacoes').send(dadosUsuario);

    const response = await request(app)
      .post('/autenticacoes')
      .send(dadosUsuario);

    expect(response.statusCode).toBe(409); 
    expect(response.body.erro).toBe('Este email já está cadastrado.');
  });
});