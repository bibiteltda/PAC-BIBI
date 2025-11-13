module.exports = {
  friendlyName: 'Verificar código',
  description: 'Verifica o código de verificação enviado por e-mail.',
  
  inputs: {
    email: { type: 'string', required: true, description: 'E-mail usado para receber o código.' },
    code: { type: 'string', required: true, description: 'Código de verificação enviado ao e-mail.' },
  },
  exits: {
    success: { description: 'Código verificado com sucesso.' },
    badRequest: { description: 'Código inválido ou expirado.' },
    serverError: { description: 'Erro interno ao verificar o código.' },
  },
  fn: async function (inputs, exits) {
    try {
      const { email, code } = inputs;

      const storedCode = await sails.helpers.cache.get(`verifyCode:${email}`);

      if (!storedCode || storedCode !== code) {
        return exits.badRequest({ message: 'Código inválido ou expirado.' });
      }

      await sails.helpers.cache.del(`verifyCode:${email}`);

      return exits.success({ message: 'Código verificado com sucesso.' });
    } catch (error) {
      sails.log.error('Erro ao verificar código:', error);
      return exits.serverError({ message: 'Erro ao verificar código.' });
    }
  },
};
