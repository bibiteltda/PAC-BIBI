const { criarConta } = require('../auth/validacao.js');
const { sequelize, models } = require('../models.js');

describe('Testes de Autenticação', () => {

  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('deve criar uma nova conta de autenticação com sucesso', async () => {
    const email = 'teste@exemplo.com';
    const senha = 'SenhaForte@123';
    const novoUsuario = await criarConta(email, senha, senha);

    expect(novoUsuario).toBeDefined(); 
    expect(novoUsuario.login).toBe(email); 
    expect(novoUsuario.id_autenticacao).toBe(1); 
    expect(novoUsuario.senha).not.toBe(senha); 
  });

  it('deve lançar um erro se as senhas não coincidem', async () => {
    const email = 'erro@exemplo.com';
    const senha = 'SenhaForte@123';
    const confirmarSenha = 'SenhaErrada@123';

    await expect(criarConta(email, senha, confirmarSenha)).rejects.toThrow('As senhas não coincidem.');
  });
  
  it('deve lançar um erro ao tentar criar um usuário com email duplicado', async () => {
    const email = 'teste@exemplo.com'; 
    const senha = 'OutraSenha@123';

    await expect(criarConta(email, senha, senha)).rejects.toThrow('Este email já está cadastrado.');
  });

});