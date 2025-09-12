const express = require('express');
const cors = require('cors');
const { sequelize } = require('../database');
require('dotenv').config({ path: __dirname + '/../.env' });

// Rotas
const autenticacaoRoutes = require("./routes/AutenticacaoRoutes.js");
const responsavelRoutes = require("./routes/ResponsavelRoutes.js");
const motoristaRoutes = require("./routes/MotoristaRoutes.js");
const alunoRoutes = require("./routes/AlunoRoutes.js");
const bairroRoutes = require("./routes/BairroRoutes.js");
const cidadeRoutes = require("./routes/CidadeRoutes.js");
const escolaRoutes = require("./routes/EscolaRoutes.js");
const pagamentoRoutes = require("./routes/PagamentoRoutes.js");

const app = express();
app.use(cors());
app.use(express.json());

// Teste conexão
app.get('/test-db', async (res) => {
  try {
    const [result] = await sequelize.query('SELECT NOW()'); 
    res.json({ serverTime: result[0].now });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Instanciando as rotas
app.use("/autenticacoes", autenticacaoRoutes);
app.use("/responsaveis", responsavelRoutes);
app.use("/motoristas", motoristaRoutes);
app.use("/alunos", alunoRoutes);
app.use("/bairros", bairroRoutes);
app.use("/cidades", cidadeRoutes);
app.use("/escolas", escolaRoutes);
app.use("/pagamentos", pagamentoRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));