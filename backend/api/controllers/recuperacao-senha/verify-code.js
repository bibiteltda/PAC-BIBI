const Autenticacao = require("../../models/Autenticacao");

module.exports = {
   friendlyName: 'Verificar código de recuperação',
   description: 'Valida se o código de recuperação é válido e ainda não expirou.',
   inputs: {
      email: { type: 'string', require: true },
      code: { type: 'string', required: true },
   },
   exits: {
      success: { description: 'Código válido.' },
      invalid: { description: 'Código inválido ou expirado.' },
   },
   fn: async function (inputs, exits) {
      const { email, code } = inputs;

      const usuario = await Autenticacao.findOne({ email });
      if (
         !usuario || 
         usuario.resetCode !== code || 
         !usuario.resetCodeExpiresAt || 
         new Date(usuario.resetCodeExpiresAt < new Date())
      ) {
         return exits.invalid({ message: 'Código inválido ou expirado.' });
      }

      return exits.success({ message: 'Código verificado com sucesso.' });
   },
};