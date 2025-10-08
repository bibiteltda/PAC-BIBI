require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DB_URL_EXTERNAL,
    dialect: 'postgres',
    dialectOptions: {
      ssl: { require: true, rejectUnauthorized: false }
    }
  },
  production: {
    url: process.env.DB_URL_INTERNAL,
    dialect: 'postgres',
    dialectOptions: {
      ssl: { require: true, rejectUnauthorized: false }
    }
  }
};