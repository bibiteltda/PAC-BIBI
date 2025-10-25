const Autenticacao = require("../../models/Autenticacao");

module.exports = {
   friendlyName: 'Enviar código de recuperação',
   description: 'Envia um código de verificação de 6 dígitos para o e-mail informado',

   inputs: {
      email: { type: 'string', required: true },
   },
   exits: {
      success: { description: 'Código enviado com sucesso.' },
      notFound: { description: 'Usuário não encontrado.' },
   },
   fn: async function (inputs, exits) {
      const { email } = inputs;

      const usuario = await Autenticacao.findOne({ email });
      if (!usuario) {
         return exits.notFound({ message: 'Usuário não encontrado.' });
      }

      const codigo = Math.floor(100000 + Math.random() * 900000).toString();

      const expiracao = new Date(Date.now() + 10 * 60 * 1000);    // 10 minutos

      await Autenticacao.updateOne({ id: usuario.id }).set({
         resetCode: codigo,
         resetCodeExpiresAt: expiracao,
      });

      await sails.helpers.sendEmail.with({
         to: email,
         subject: 'Código de recupperação de senha - PAC BiBi',
         html: `
            <p>Olá, seu código de recuperação de senha é:</p>
            <h2>${codigo}</h2>
            <p>Seu código expira em 10 minutos.</p>
            <br>
            <p>Cordialmente, <br>Equipe BiBi</p>
         `,
      });

      return exits.success({ message: 'Código enviado com sucesso!' });
   }
}