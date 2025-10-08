const { models, sequelize, createDatabase, syncModels } = require('./database');

async function setupDatabaseForTests() {
  try {
    await syncModels();
    console.log("✅ Conexão com o banco de dados para testes estabelecida.");

    await Promise.all([
      models.Pagamento.destroy({ where: {}, truncate: true, cascade: true }),
      models.Aluno.destroy({ where: {}, truncate: true, cascade: true }),
      models.Responsavel.destroy({ where: {}, truncate: true, cascade: true }),
      models.Motorista.destroy({ where: {}, truncate: true, cascade: true }),
      models.Autenticacao.destroy({ where: {}, truncate: true, cascade: true }),
      models.Escola.destroy({ where: {}, truncate: true, cascade: true }),
      models.Bairro.destroy({ where: {}, truncate: true, cascade: true }),
      models.Cidade.destroy({ where: {}, truncate: true, cascade: true }),
    ]);

    const [bairro1, bairro2] = await models.Bairro.bulkCreate([
      { nome: "Centro" },
      { nome: "Vila Nova" }
    ], { returning: true });

    const [cidade1] = await models.Cidade.bulkCreate([
      { nome: "Joinville" }
    ], { returning: true });

    const [escola1] = await models.Escola.bulkCreate([
      { nome: "Escola Amador Aguiar", telefone: "47988888888", logradouro: "Rua Principal, 123", bairro: bairro1.id_bairro, cidade: cidade1.id_cidade }
    ], { returning: true });

    const [authResp, authMot] = await models.Autenticacao.bulkCreate([
      { login: "responsavel1", senha: "senha123", role: "responsavel" },
      { login: "motorista1", senha: "senha456", role: "motorista" }
    ], { returning: true });

    const responsavel = await models.Responsavel.create({
      nome: "Daniela Luisa da C.",
      contato: "47987654321",
      cpf: "12345678901",
      id_autenticacao: authResp.id_autenticacao
    });

    const motorista = await models.Motorista.create({
      nome: "Eric Gabriel C.",
      contato: "47912345678",
      cpf: "98765432109",
      id_autenticacao: authMot.id_autenticacao
    });

    await models.Aluno.bulkCreate([
      {
        nome: "Aluno da Escola A",
        idade: 10,
        responsavel: responsavel.id_responsavel,
        escola: escola1.id_escola,
        motorista: motorista.id_motorista
      }
    ], { returning: true });

    const today = new Date('2025-09-14T12:00:00'); 
    const lastMonth = new Date('2025-08-15T12:00:00');

    await models.Pagamento.bulkCreate([
      {
        valor: 250.00,
        dta_vcto: today,
        dta_pgmt: today,
        status: "PAGO",
        responsavel: responsavel.id_responsavel,
        motorista: motorista.id_motorista
      },
      {
        valor: 250.00,
        dta_vcto: today,
        dta_pgmt: null,
        status: "ATRASADO",
        responsavel: responsavel.id_responsavel,
        motorista: motorista.id_motorista
      },
      {
        valor: 220.00,
        dta_vcto: lastMonth,
        dta_pgmt: lastMonth,
        status: "PAGO",
        responsavel: responsavel.id_responsavel,
        motorista: motorista.id_motorista
      }
    ]);

    console.log('✅ Dados de teste inseridos com sucesso para CI/CD!');
  } catch (error) {
    console.error('❌ Erro durante o setup do banco de dados para CI/CD:', error);
    process.exit(1);
  } finally {
    await sequelize.close();
    process.exit(0);
  }
}

setupDatabaseForTests();
