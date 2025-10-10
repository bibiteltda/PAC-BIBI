// import sgMail from "../config/mail.js";
// import { generateCode } from "../utils/generate_code.js";

// const codes = {};

// // Envia um código para o e-mail
// export async function sendCode(req, res) {
//    const { email } = req.body;
//    if (!email) return res.status(400).json({ error: "E-mail é obrigatório" });

//    const code = generateCode();
//    const expiresAt = Date.now() + process.env.CODE_EXPIRATION_MINUTES * 60 * 1000;
//    codes[email] = { code, expiresAt };

//    try {   
//       const  msg = {
//          to: email,
//          from: {
//             name: "BiBi Verificação",
//             email: "bibiteltda@gmail.com",
//          },
//          subject: "Código de Verificação - BiBi",
//          text: `Seu código de verificação é: ${code}`,
//          html: `<p>Olá! 👋</p><p>Seu código de verificação é: <b>${code}</b></p>`,
//       };

//       console.log("Usando SendGrid, chave começa com:", process.env.SENDGRID_API_KEY.slice(0, 10));

//       await sgMail.send(msg)
      
//       return res.json({ 
//          success: true, 
//          message: `Código enviado para ${email}` 
//       });
//    } catch (err) {
//       console.error("Erro ao enviar e-mail:", err.response?.body || err.message);
//       return res.status(500).json({ error: "Erro ao enviar e-mail" });
//    }
// }

// // Validação do código recebido
// export function verifyCode(req, res) {
//    const { email, code } = req.body;
//    const record = codes[email];

//    if (!record) {
//       return res.status(400).json({ error: "Código não encontrado" });
//    }
//    if (Date.now() > record.expiresAt) {
//       delete codes[email];
//       return res.status(400).json({ error: "Código expirado" });
//    }
//    if (record.code !== code) {
//       return res.status(400).json({ error: "Código inválido" });
//    }

//    delete codes[email];
//    return res.json({ success: true, message: "Verificação concluída!" });
// }

import sgMail from "../config/mail.js";

export async function sendEmail(req, res) {
  const msg = {
    to: "lucasgceola@gmail.com",
    from: "bibiteltda@gmail.com",
    subject: "Teste de envio",
    text: "Este é um teste usando a SendGrid Web API!",
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ message: "E-mail enviado com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Falha ao enviar e-mail" });
  }
}
