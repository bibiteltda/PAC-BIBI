const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: __dirname + "/../.env" });

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
const authMailRoutes = require("./routes/auth_mail_routes.js");

const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:5173"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// Rotas principais
app.use("/autenticacoes", autenticacaoRoutes);
app.use("/responsaveis", responsavelRoutes);
app.use("/motoristas", motoristaRoutes);
app.use("/alunos", alunoRoutes);
app.use("/bairros", bairroRoutes);
app.use("/cidades", cidadeRoutes);
app.use("/escolas", escolaRoutes);
app.use("/pagamentos", pagamentoRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/verificacao", authMailRoutes);

module.exports = app;
