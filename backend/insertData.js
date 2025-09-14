// scripts/insertData.js

const { models, sequelize } = require("../database/index.js");

async function insertData() {
  try {
    await sequelize.sync({ alter: true });
    console.log("Conectado ao banco de dados e modelos sincronizados.");

    const [bairro1, bairro2] = await models.Bairro.bulkCreate([
      { nome: "Centro" },
      { nome: "Vila Nova" }
    ], { returning: true });

    const [cidade1, cidade2] = await models.Cidade.bulkCreate([
      { nome: "Joinville" },
      { nome: "Curitiba" }
    ], { returning: true });

    const [escola1, escola2] = await models.Escola.bulkCreate([
      { nome: "Escola Amador Aguiar", telefone: "47988888888", logradouro: "Rua Principal, 123", bairro: bairro1.id_bairro, cidade: cidade1.id_cidade },
      { nome: "Escola Prefeito Luiz Gomes", telefone: "47999999999", logradouro: "Avenida Central, 456", bairro: bairro2.id_bairro, cidade: cidade1.id_cidade },
      { nome: "Escola João de Oliveira", telefone: "47977777777", logradouro: "Rua da Paz, 789", bairro: bairro1.id_bairro, cidade: cidade2.id_cidade }
    ], { returning: true });

    const [authResp, authMot] = await models.Autenticacao.bulkCreate([
      { login: "responsavel1", senha: "senha123", role: "responsavel" },
      { login: "motorista1", senha: "senha456", role: "motorista" }
    ], { returning: true });
    
    const responsavel = await models.Responsavel.create({
      nome: "Daniela Luisa da C.", contato: "47987654321", cpf: "12345678901", id_autenticacao: authResp.id_autenticacao
    });
    
    const motorista = await models.Motorista.create({
      nome: "Eric Gabriel C.", contato: "47912345678", cpf: "98765432109", id_autenticacao: authMot.id_autenticacao
    });

    const [aluno1, aluno2, aluno3, aluno4] = await models.Aluno.bulkCreate([
      { nome: "Aluno da Escola A", idade: 10, responsavel: responsavel.id_responsavel, escola: escola1.id_escola, motorista: motorista.id_motorista },
      { nome: "Aluno da Escola B", idade: 12, responsavel: responsavel.id_responsavel, escola: escola2.id_escola, motorista: motorista.id_motorista },
      { nome: "Aluno da Escola C", idade: 9, responsavel: responsavel.id_responsavel, escola: escola2.id_escola, motorista: motorista.id_motorista },
      { nome: "Aluno da Escola D", idade: 8, responsavel: responsavel.id_responsavel, escola: escola1.id_escola, motorista: motorista.id_motorista }
    ], { returning: true });

    const today = new Date();
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 15);
    
    await models.Pagamento.bulkCreate([
      { valor: 250.00, dta_vcto: today, dta_pgmt: today, status: "PAGO", responsavel: responsavel.id_responsavel, motorista: motorista.id_motorista },
      { valor: 250.00, dta_vcto: today, dta_pgmt: today, status: "PENDENTE", responsavel: responsavel.id_responsavel, motorista: motorista.id_motorista },
      { valor: 250.00, dta_vcto: today, dta_pgmt: null, status: "ATRASADO", responsavel: responsavel.id_responsavel, motorista: motorista.id_motorista },
      { valor: 220.00, dta_vcto: lastMonth, dta_pgmt: lastMonth, status: "PAGO", responsavel: responsavel.id_responsavel, motorista: motorista.id_motorista }
    ]);
    
    console.log("✅ Dados de teste inseridos com sucesso!");
    
  } catch (error) {
    console.error("❌ Erro ao inserir dados:", error.message);
  } finally {
    await sequelize.close();
  }
}

insertData();