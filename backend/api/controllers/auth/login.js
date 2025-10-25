const jwt = require('jsonwebtoken');

module.exports = {
  friendlyName: 'Login',
  description: 'Realiza o login de um usuário e retorna o token JWT.',
  inputs: { email: { type: 'string', required: true }, senha: { type: 'string', required: true } },
  exits: { success: { description: 'Login realizado com sucesso.' }, notFound: { description: 'Usuário não encontrado.', responseType: 'notFound' }, forbidden: { description: 'Senha incorreta.', responseType: 'forbidden' } },
  fn: async function (inputs, exits) {
    sails.log.info('===== Login START =====');
    sails.log.info('Inputs recebidos:', inputs);
    try {
      const usuario = await Autenticacao.findOne({ login: inputs.email });
      if (!usuario) return exits.notFound({ message: 'Usuário não encontrado.' });
      const senhaCorreta = await sails.helpers.comparePassword(inputs.senha, usuario.senha);
      if (!senhaCorreta) return exits.forbidden({ message: 'Senha incorreta.' });
      const token = jwt.sign({ id: usuario.id, role: usuario.role }, process.env.JWT_SECRET || 'chave_super_segura', { expiresIn: '7d' });
      return exits.success({ message: 'Login realizado com sucesso!', token, usuario: { id: usuario.id, email: usuario.login, role: usuario.role } });
    } catch (err) {
      sails.log.error('Erro no login:', err);
      throw 'serverError';
    }
  }
};