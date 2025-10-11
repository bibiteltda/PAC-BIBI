import app from './app.js'; 
import db from './database/index.js';
const { sequelize, syncModels } = db;

const PORT = process.env.PORT || 3000;

(async () => {
    try {
        await sequelize.authenticate();
        await syncModels();
        app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
    } catch (err) {
        console.error('❌ Erro ao iniciar o servidor:', err);
    }
})();
