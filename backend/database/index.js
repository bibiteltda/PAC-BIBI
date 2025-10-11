import { Sequelize, DataTypes } from 'sequelize';
import modelsDef from './models.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if (process.env.NODE_ENV !== 'ci') {
  dotenv.config({ path: join(__dirname, '/../.env') });
}

const sequelize = new Sequelize(process.env.DB_URL_INTERNAL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false,
  // Removido para teste local
  // dialectOptions: { 
  //   ssl: { require: true, rejectUnauthorized: false }
  // }
});

const models = modelsDef(sequelize, DataTypes);

async function syncModels() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('✅ Conectado e tabelas criadas/atualizadas');
  } catch (err) {
    console.error('❌ Erro ao conectar/sincronizar:', err);
  }
}

const all = { sequelize, syncModels, ...models };
export default all;
