const sendEmail = require("../../helpers/send-code");

module.exports = {
  friendlyName: 'Enviar código',
  description: 'Enviar um código de verificação para um e-mail.',

  inputs: {
    email: { type: 'string', required: true }
  },
  exits: {
    success: { description: 'Código enviado com sucesso.' }
  },

  fn: async function (inputs, exits) {

    try {
      const { email } = inputs;

      const code = Math.floor(1000 + Math.random() * 9000);

      await sails.helpers.sendCode(inputs.email, code);

      return exits.success({
        message: 'Código enviado com sucesso!',
        code,
      });

    } catch (error) {
      console.error(error);
      return exits.error(error);
    }
  }
};
