const express = require('express');
const cors = require('cors');
const { sequelize } = require('../database');
require('dotenv').config({ path: __dirname + '/../.env' });

const app = express();
app.use(cors());
app.use(express.json());

// Teste conexão
app.get('/test-db', async (req, res) => {
  try {
    const [result] = await sequelize.query('SELECT NOW()'); 
    res.json({ serverTime: result[0].now });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
