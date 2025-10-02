const { Sequelize, DataTypes } = require('sequelize');

if (process.env.NODE_ENV !== 'ci') {
  require('dotenv').config({ path: __dirname + '/../.env' });
}

//
// GUIA DE UTILIZAÇÃO DOS MÉTODOS ABAIXO
// A DIFERENCIAÇÃO E DISTINÇÃO AQUI DEVE SER FEITA DA SEGUINTE FORMA:
// UTILIZAR O MÉTODO QUE CHAMA O URL_EXTERNAL PARA COMPILES LOCAIS EM TESTES SEPARADOS;
// UTILIZAR O MÉTODO QUE CHAMA O URL_INTERNAL PARA COMPILES NO REPOSITÓRIO ATUAL - MESMO QUE A FUNCIONALIDADE 
// NÃO ESTEJA NO RENDER, O BANCO JÁ ESTÁ;
// DÁ PRA COMENTAR VÁRIAS LINHAS COM CTRL + K + C E DESCOMENTAR COM CTRL + K + U
//

// const sequelize = new Sequelize(process.env.DB_URL_EXTERNAL, { 
//   dialect: 'postgres',
//   protocol: 'postgres',
//   logging: false,
//   dialectOptions: {
//     ssl: { require: true,
//            rejectUnauthorized: false
//     }
//   }
// });

const sequelize = new Sequelize(process.env.DB_URL_INTERNAL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: { require: true,
           rejectUnauthorized: false
    }
  }
});

const models = require('./models')(sequelize, DataTypes);

async function syncModels() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('✅ Conectado e tabelas criadas/atualizadas');
  } catch (err) {
    console.error('❌ Erro ao conectar/sincronizar:', err);
  }
}

module.exports = { sequelize, syncModels , ...models};