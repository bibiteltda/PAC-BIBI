module.exports = {
  friendlyName: 'Verificar código',
  description: 'Verifica o código de verificação enviado por e-mail.',

  inputs: {
    email: { type: 'string', required: true },
    code: { type: 'string', required: true },
  },
  exits: {
    success: { description: 'Código verificado com sucesso.' },
    badRequest: { description: 'Código inválido ou expirado.' },
  },
  fn: async function (inputs, exits) {
    try {
      const { email, code } = inputs;

      const storedCode = await sails.helpers.cache.get(`verifyCode:${email}`);

      if (!storedCode || storedCode !== code) {
        return exits.invalid({ message: 'Código inválido ou expirado.' });
      }

      await sails.helpers.cache.del(`verifyCode:${email}`);

      return exits.success({ message: 'Código verificado com sucesso.' });
    } catch (error) {
      sails.log.error('Erro ao verificar código:', error);
      return exits.invalid({ message: 'Erro ao verificar código.' });
    }
  },
};
