import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import Responsavel from '../../models/Responsavel';

module.exports = {
   friendlyName: 'Reset password',
  description: 'Redefine a senha do usuário com base no token',
  inputs: {
    token: { type: 'string', required: true },
    newPassword: { type: 'string', required: true },
  },
  exits: {
    invalid: { description: 'Token inválido ou expirado.' },
    success: { description: 'Senha redefinida com sucesso.' },
  },
  fn: async function (inputs, exits) {
   const { token, newPassword } = inputs;

   const user = await Responsavel.findOne({ resetToken: token });
   if (!user || user.resetTokenExpires < Date.now()) {
      return exits.invalid({ error: 'Token inválido ou expirado.' });
   }

   const hashed = await bcrypt.hash(newPassword, 10);

   await Responsavel.updateOne({ id: user.id }).set({
      senha: hashed,
      resetToken: null,
      resetTokenExpires: null,
   });

   return exits.success({ message: 'Senha redefinida com sucesso!' });
  },
};