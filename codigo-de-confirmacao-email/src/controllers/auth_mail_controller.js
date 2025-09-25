import transporter from "../config/mail.js";
import { generateCode } from "../utils/generate_code.js";

const codes = {};

// Envia um código para o e-mail
export async function sendCode(req, res) {
   const { email } = req.body;
   if (!email) return res.status(400).json({ error: "E-mail é obrigatório" });


   const code = generateCode();
   const expiresAt = Date.now() + process.env.CODE_EXPIRATION_MINUTES * 60 * 1000;
   codes[email] = { code, expiresAt };

   try {
      console.log("Enviamos um código para:", email)
      await transporter.sendMail({
         from: '"Verificação" <no-reply@bibi.com>',
         to: email,
         subject: "BiBi",
         text: `Seu código de verificação é ${code}`,
      });
      
      return res.json({ success: true, message: `Código enviado para ${email}` });
   } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao enviar e-mail" });
   }
}

// Validação do código recebido
export function verifyCode(req, res) {
   const { email, code } = req.body;
   const record = codes[email];

   if (!record) {
      return res.status(400).json({ error: "Código não encontrado" });
   }
   if (Date.now() > record.expiresAt) {
      delete codes[email];
      return res.status(400).json({ error: "Código expirado" });
   }
   if (record.code !== code) {
      return res.status(400).json({ error: "Código inválido" });
   }

   delete codes[email];
   return res.json({ success: true, message: "Verificação concluída!" });
}
