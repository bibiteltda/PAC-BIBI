import readline from "readline";
import dotenv from "dotenv";
import transporter from "./config/mail.js";

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Função para gerar código de 4 dígitos
function gerarCodigo() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

const codigo = gerarCodigo();

// Pergunta o e-mail do usuário
rl.question("Digite seu e-mail: ", async (email) => {
  try {
    await transporter.sendMail({
      from: `"BiBi" <${email}>`,
      to: email,
      subject: "Código de verificação",
      text: `Este é um e-mail gerado automaticamente, por favor não responda. \nSeu código de verificação é: ${codigo} \n\nAtt. Equipe BiBi.`,
    });
    console.log(`Código enviado para ${email}`);
  } catch (err) {
    console.error("Erro ao enviar e-mail:", err);
    process.exit(1);
  }

  // Validação do código
  rl.question("Digite o código que recebeu por e-mail: ", (resposta) => {
    if (resposta.trim() === codigo) {
      console.log("✅ Código validado com sucesso!");
    } else {
      console.log("❌ Código incorreto.");
    }
    rl.close();
  });
});
