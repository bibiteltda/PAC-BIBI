const { Sequelize, DataTypes } = require('sequelize');

const sequelizeForCreateDB = new Sequelize('postgres://useraq:senhaaq@localhost:5432/postgres', {  // user e senha do postgress
  logging: false
});

async function createDatabase() {
  try {
    await sequelizeForCreateDB.query(`CREATE DATABASE escola_transportes`);
    console.log('Banco criado com sucesso!');
  } catch (error) {
    if (error.original?.code === '42P04') { 
      console.log('Banco já existe, seguindo...');
    } else {
      throw error;
    }
  }
}

const sequelize = new Sequelize('escola_transportes', 'useraq', 'senhaaq', { // user e senha do postgress
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});


const models = require('./models')(sequelize, DataTypes);

async function syncModels() {
  await sequelize.sync({ alter: true });
  console.log('Tabelas criadas ou atualizadas');
}

async function main() {
  try {
    await createDatabase();
    await sequelize.authenticate();
    console.log('Conectado ao banco escola_transportes');
    await syncModels();
  } catch (err) {
    console.error('Erro:', err);
  } finally {
    await sequelize.close();
  }
}

main();
