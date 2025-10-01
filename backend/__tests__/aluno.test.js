const { cadastrarAluno } = require('../aluno.js');
const { sequelize, models } = require('../index.js');

describe('Testes do Cadastro de Alunos', () => {

  beforeAll(async () => {
    await sequelize.sync({ force: true });
    await models.Autenticacao.create({
      id_autenticacao: 1,
      login: 'responsavel@teste.com',
      senha: 'senha_mock', 
      role: 'responsavel'
    });
    await models.Autenticacao.create({
      id_autenticacao: 2,
      login: 'motorista@teste.com',
      senha: 'senha_mock',
      role: 'motorista'
    });

    await models.Cidade.create({ id_cidade: 1, nome: 'Joinville' });
    await models.Bairro.create({ id_bairro: 1, nome: 'Centro' });
    await models.Responsavel.create({
      id_responsavel: 1,
      nome: 'Maria Silva (Responsável)',
      id_autenticacao: 1 // Válido!
    });
    
    await models.Motorista.create({
      id_motorista: 1,
      nome: 'Carlos Souza (Motorista)',
      id_autenticacao: 2 // Válido!
    });

    await models.Escola.create({
      id_escola: 1,
      nome: 'Escola Modelo',
      cidade: 1,
      bairro: 1
    });

    await models.Turma.create({
      id_turma: 1,
      nome_turma: 'Infantil I',
      periodo: 'Matutino'
    });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('deve cadastrar um novo aluno com sucesso', async () => {
    const dadosAluno = {
      nome: 'Pedro Alvares',
      idade: 8,
      id_responsavel: 1,
      id_escola: 1,
      id_motorista: 1,
      id_turma: 1
    };
    
    const novoAluno = await cadastrarAluno(dadosAluno);

    expect(novoAluno).toBeDefined();
    expect(novoAluno.nome).toBe('Pedro Alvares');
    expect(novoAluno.id_turma).toBe(1);
  });

  it('deve lançar um erro ao tentar cadastrar um aluno com um responsável que não existe', async () => {
    const dadosAluno = {
      nome: 'Ana Julia',
      idade: 7,
      id_responsavel: 99, // ID inexistente
      id_escola: 1,
      id_motorista: 1,
      id_turma: 1
    };
    
    await expect(cadastrarAluno(dadosAluno))
      .rejects.toThrow('O responsável com ID 99 não foi encontrado.');
  });
  
  it('deve lançar um erro se algum campo obrigatório estiver faltando', async () => {
      const dadosAluno = {
        nome: 'Lucas Mendes',
        idade: 9,
        // id_responsavel faltando
        id_escola: 1,
        id_motorista: 1,
        id_turma: 1
      };

      await expect(cadastrarAluno(dadosAluno))
        .rejects.toThrow();
  });
});