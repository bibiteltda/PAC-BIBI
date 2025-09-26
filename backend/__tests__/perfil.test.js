const { criarPerfil } = require('../informacoes-adicionais.js'); 
const { sequelize, models } = require('../index.js');
const { cpf: cpfValidator } = require('cpf-cnpj-validator');

describe('Testes de Criação de Perfil', () => {

  beforeEach(async () => {
    await sequelize.sync({ force: true });
    await models.Autenticacao.create({
      login: 'teste.perfil@email.com',
      senha: 'senha-hash-qualquer',
      role: 'pendente'
    });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('deve criar um perfil de Motorista com sucesso e atualizar a role', async () => {
    const dadosDoPerfil = {
      id_autenticacao: 1,
      tipoPerfil: 'motorista',
      nome: 'Carlos Motorista',
      cpf: cpfValidator.generate(),
      contato: '47999998888'
    };

    await criarPerfil(dadosDoPerfil);

    const motoristaCriado = await models.Motorista.findOne({ where: { cpf: dadosDoPerfil.cpf } });
    expect(motoristaCriado).toBeDefined();
    expect(motoristaCriado.nome).toBe('Carlos Motorista');

    const usuarioAuth = await models.Autenticacao.findByPk(1);
    expect(usuarioAuth.role).toBe('motorista');
  });

  it('deve criar um perfil de Responsável com sucesso e atualizar a role', async () => {
    const dadosDoPerfil = {
      id_autenticacao: 1,
      tipoPerfil: 'responsavel',
      nome: 'Ana Responsável',
      cpf: cpfValidator.generate(),
      contato: '47988887777'
    };

    await criarPerfil(dadosDoPerfil);

    const responsavelCriado = await models.Responsavel.findOne({ where: { cpf: dadosDoPerfil.cpf } });
    expect(responsavelCriado).toBeDefined();
    expect(responsavelCriado.nome).toBe('Ana Responsável');

    const usuarioAuth = await models.Autenticacao.findByPk(1);
    expect(usuarioAuth.role).toBe('responsavel');
  });

  it('deve lançar um erro se o CPF for inválido', async () => {
    const dadosInvalidos = {
      id_autenticacao: 1,
      tipoPerfil: 'responsavel',
      nome: 'Ana Responsável',
      cpf: '12345678900',
      contato: '47988887777'
    };

    await expect(criarPerfil(dadosInvalidos)).rejects.toThrow('O CPF digitado é inválido.');
  });
  
  it('deve lançar um erro se um campo obrigatório estiver faltando', async () => {
    const dadosIncompletos = {
      id_autenticacao: 1,
      tipoPerfil: 'motorista',
      // nome está faltando
      cpf: cpfValidator.generate(),
      contato: '47999998888'
    };

    await expect(criarPerfil(dadosIncompletos)).rejects.toThrow('Todos os campos para a criação do perfil são obrigatórios.');
  });
});