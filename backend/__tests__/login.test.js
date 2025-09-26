const bcrypt = require('bcrypt');
const { fazerLogin } = require('../login.js');
const { sequelize, models } = require('../index.js');

describe('Testes de Login', () => {
  const emailTeste = 'login.teste@exemplo.com';
  const senhaTeste = 'SenhaForte@123';

  beforeAll(async () => {
    await sequelize.sync({ force: true });
    const senhaHash = await bcrypt.hash(senhaTeste, 10);
    await models.Autenticacao.create({
      login: emailTeste,
      senha: senhaHash,
      role: 'motorista'
    });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('deve autenticar um usuário com credenciais válidas', async () => {
    const usuarioLogado = await fazerLogin(emailTeste, senhaTeste);

    expect(usuarioLogado).toBeDefined();
    expect(usuarioLogado.login).toBe(emailTeste);
    expect(usuarioLogado.role).toBe('motorista');
    // Garante que a senha nunca é retornada
    expect(usuarioLogado.senha).toBeUndefined();
  });

  // Testes de erro
  it('deve rejeitar o login com uma senha incorreta', async () => {
    const senhaErrada = 'senhaerrada';
    
    await expect(fazerLogin(emailTeste, senhaErrada))
      .rejects.toThrow('Email ou senha inválidos.');
  });

  it('deve rejeitar o login com um email que não existe', async () => {
    const emailInexistente = 'naoexiste@email.com';
    
    await expect(fazerLogin(emailInexistente, senhaTeste))
      .rejects.toThrow('Email ou senha inválidos.');
  });
  
  it('deve rejeitar o login se a senha não for fornecida', async () => {
    await expect(fazerLogin(emailTeste, ''))
      .rejects.toThrow('Email e senha são obrigatórios.');
  });
});