const readline = require("readline");
const bcrypt = require('bcrypt');
const { sequelize, models } = require('./index.js'); 

function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return regex.test(email);
}

function validarSenha(senha) {
  const minLength = senha.length >= 6;
  const hasUpper = /[A-Z]/.test(senha);
  const hasLower = /[a-z]/.test(senha);
  const hasNumber = /\d/.test(senha);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(senha);

  return {
    ok: minLength && hasUpper && hasLower && hasNumber && hasSpecial,
    checks: { minLength, hasUpper, hasLower, hasNumber, hasSpecial }
  };
}

function validarConta(email, senha) {
  if (!validarEmail(email)) return "Email inválido.";

  const resultado = validarSenha(senha);

  if (!resultado.ok) {
    const erros = [];
    if (!resultado.checks.minLength) erros.push("mínimo 6 caracteres");
    if (!resultado.checks.hasUpper) erros.push("1 letra maiúscula");
    if (!resultado.checks.hasLower) erros.push("1 letra minúscula");
    if (!resultado.checks.hasNumber) erros.push("1 número");
    if (!resultado.checks.hasSpecial) erros.push("1 caractere especial obrigatório (@,#,$,...)");

    return "Senha inválida: " + erros.join(", ");
  }

  return "Conta válida!";
}

async function criarUsuario() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

    rl.question("Digite seu email: ", (email) => {
    rl.question("Digite sua senha: ", (senha) => {
    rl.question("Confirme sua senha: ", async (confirmarSenha) => {
        
        if (senha !== confirmarSenha) {
          console.log("Erro: As senhas não coincidem.");
          rl.close();
          return;
        }

        const validacao = validarConta(email, senha);
        console.log(validacao);

        if (validacao === "Conta válida!") {
          try {
            console.log("Iniciando processo de salvamento...");

            const senhaHash = await bcrypt.hash(senha, 10);
            console.log("Senha criptografada com sucesso!");

            const novoUsuario = await models.Autenticacao.create({
              login: email,
              senha: senhaHash,
              role: 'usuario' // Definindo uma role padrão
            });

            console.log(` Usuário cadastrado com sucesso! ID: ${novoUsuario.id_autenticacao}`);

          } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
              console.error('Erro: Este email já está cadastrado.');
            } else {
              console.error('Erro ao salvar no banco de dados:', error);
            }
          } finally {
            rl.close();
            await sequelize.close();
          }
        } else {
          rl.close();
        }
      });
    });
  });
}
criarUsuario();
