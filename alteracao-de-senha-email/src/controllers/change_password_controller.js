import crypto from "crypto";
import transporter from "../config/mail.js";

const resetTokens = {};

export async function sendResetLink(req, res) {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "E-mail é obrigatório." });

  const token = crypto.randomBytes(32).toString("hex");

  resetTokens[email] = { token, expiresAt };

  try {
    const resetLink = `http://localhost:3000/reset-password?token=${token}&email=${email}`;

    await transporter.sendMail({
      from: '"Suporte BiBi" <no-reply@bibi.com>',
      to: email,
      subject: "Redefinição de senha",
      text: `Clique no link para redefinir sua senha: ${resetLink}`,
      html: `<p>Você solicitou a redefinição de senha.</p>
             <p><a href="${resetLink}">Clique aqui para redefinir</a></p>
             <p>Este link expira em ${process.env.LINK_EXPIRATION_MINUTES} minutos.</p>`,
    });

    return res.json({
      success: true,
      message: `Link de redefinição enviado para ${email}`,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Erro ao enviar e-mail." });
  }
}

export function resetPassword(req, res) {
  const { email, token, newPassword } = req.body;
  const record = resetTokens[email];

  if (!record) {
    return res.status(400).json({ error: "Token não encontrado." });
  }
  if (Date.now() > record.expiresAt) {
    delete resetTokens[email];
    return res.status(400).json({ error: "Token expirado." });
  }
  if (record.token !== token) {
    return res.status(400).json({ error: "Token inválido." });
  }

  delete resetTokens[email];
  return res.json({ success: true, message: "Senha redefinida com sucesso!" });
}
