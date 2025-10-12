// app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Rotas
import autenticacaoRoutes from "./routes/AutenticacaoRoutes.js";
import responsavelRoutes from "./routes/ResponsavelRoutes.js";
import motoristaRoutes from "./routes/MotoristaRoutes.js";
import alunoRoutes from "./routes/AlunoRoutes.js";
import bairroRoutes from "./routes/BairroRoutes.js";
import cidadeRoutes from "./routes/CidadeRoutes.js";
import escolaRoutes from "./routes/EscolaRoutes.js";
import pagamentoRoutes from "./routes/PagamentoRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import authMailRoutes from "./routes/auth_mail_routes.js";
import roteiroRoutes from "./routes/RoteiroRoutes.js";
import roteiroEscolaRoutes from "./routes/RoteiroEscolaRoutes.js";
import relatorioRoutes from "./routes/RelatorioRoutes.js";

dotenv.config({ path: new URL("../.env", import.meta.url).pathname });

const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:5173"
];

app.use(
  cors({
    origin: (origin, callback) => {
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
app.use("/roteiros", roteiroRoutes);
app.use("/roteiros-escolas", roteiroEscolaRoutes);
app.use("/relatorios", relatorioRoutes);

export default app;