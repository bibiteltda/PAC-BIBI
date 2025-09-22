require('dotenv').config({ path: __dirname + '/../.env' });
const { Sequelize, DataTypes } = require('sequelize');

const sequelizeForCreateDB = new Sequelize(
  process.env.DB_NAME_SUPER,
  process.env.DB_USER_SUPER,
  process.env.DB_PASSWORD_SUPER,
  {
    host: process.env.DB_HOST_SUPER,
    port: process.env.DB_PORT_SUPER,
    dialect: 'postgres',
    logging: false,
  }
);

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
  }
);
const models = require('./models')(sequelize, DataTypes);

async function createDatabase() {
  try {
    await sequelizeForCreateDB.query(`CREATE DATABASE ${process.env.DB_NAME}`);
    
    if (process.env.SHOW_DB_SETUP_LOGS === 'true') {
      console.log(` Banco ${process.env.DB_NAME} encontrado!`);
    }
  } catch (error) {
    if (error.original?.code === '42P04') {
      if (process.env.SHOW_DB_SETUP_LOGS === 'true') {
        console.log(`- Banco '${process.env.DB_NAME}' já existe. Status: OK.`);
      }
    } else {
      throw error;
    }
  } finally {
    await sequelizeForCreateDB.close();
  }
}

async function syncModels() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    //console.log(' Conectado e tabelas criadas/atualizadas');
  } catch (err) {
    console.error('Erro ao conectar/sincronizar:', err);
  }
}

(async () => {
  await createDatabase();
  await syncModels();
})();
module.exports = { sequelize, models };