import readline from "readline";
import dotenv from "dotenv";
import transporter from "./config/mail.js";
import crypto from "crypto";

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Função para gerar token de alteração de senha
function gerarToken() {
  return crypto.randomBytes(16).toString("hex");
}

const token = gerarToken();

// Pergunta o e-mail do usuário
rl.question("Digite seu e-mail para alteração de senha: ", async (email) => {
  try {
    const resetLink = `http://localhost:3000/reset-password?token=${token}&email=${encodeURIComponent(email)}`;

    await transporter.sendMail({
      from: `"BiBi" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Alteração de senha",
      text: `Olá! Você solicitou a alteração de sua senha.\n\nClique no link abaixo para redefinir sua senha:\n${resetLink}\n\nSe você não solicitou, ignore este e-mail.\n\nAtt. Equipe BiBi.`,
    });

    console.log(`✅ E-mail de alteração de senha enviado para ${email}`);
  } catch (err) {
    console.error("Erro ao enviar e-mail:", err);
    process.exit(1);
  } finally {
    rl.close();
  }
});
