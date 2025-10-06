// server.js
const app = require('./app.js');
const { sequelize } = require('./database/index.js');
const { syncModels } = require('./database/index.js');

const PORT = process.env.PORT || 3000;

(async () => {
    try {
        await syncModels();
        app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
    } catch (err) {
        console.error('❌ Erro ao iniciar o servidor:', err);
    }
})();