const bcrypt = require('bcrypt');
const Autenticacao = require("../../models/Autenticacao");

module.exports = {
   friendlyName: 'Redefinir senha',
   description: 'Permite redefinir a senha após validação do código de recuperação.',
   inputs: {
      email: { type: 'string', required: true },
      code: { type: 'string', required: true },
      newPassword: { type: 'string', required: true },
   },
   exits: {
      success: { description: 'Senha redefinida com sucesso.' },
      invalid: { description: 'Código inválido ou expirado.' },
   },
   fn: async function (inputs, exits) {
      const { email, code, newPassword } = inputs;

      const usuario = await Autenticacao.findOne({ email });
      if (
         !usuario ||
         usuario.resetCode !== code ||
         !usuario.resetCodeExiresAt ||
         new Date(usuario.resetCodeExiresAt) < new Date()
      ) {
         return exits.invalid({ message: 'Código inválido ou expirado.' });
      }

      // Criptografa a nova senha
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Atualiza senha e limpa o código
      await Autenticacao.updateOne({ id: usuario.id }).set({
         senha: hashedPassword,
         resetCode: null,
         resetCodeExiresAt: null,
      });

      return exits.success({ message: 'Senha redefinida com sucesso!' });
   },
};