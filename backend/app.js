const express = require('express');
const cors = require('cors');
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
const dashboardRoutes = require("./routes/dashboardRoutes.js");
const roteiroRoutes = require("./routes/RoteiroRoutes.js");
const roteiroEscolaRoutes = require("./routes/RoteiroEscolaRoutes.js");

const app = express();
app.use(cors());
app.use(express.json());

// Instanciando as rotas
app.use("/autenticacoes", autenticacaoRoutes);
app.use("/responsaveis", responsavelRoutes);
app.use("/motoristas", motoristaRoutes);
app.use("/alunos", alunoRoutes);
app.use("/bairros", bairroRoutes);
app.use("/cidades", cidadeRoutes);
app.use("/escolas", escolaRoutes);
app.use("/pagamentos", pagamentoRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/roteiros", roteiroRoutes);
app.use("/roteiros-escolas", roteiroEscolaRoutes);

const PORT = process.env.PORT || 3000;

module.exports = app;