const jwt = require('jsonwebtoken');

module.exports = {
  friendlyName: 'Registrar usuário',
  description: 'Cria um novo usuário de autenticação e retorna o token JWT.',
  inputs: {
    nome: { type: 'string', required: true },
    email: { type: 'string', required: true },
    senha: { type: 'string', required: true },
    cpf: { type: 'string', required: true },
    celular: { type: 'string', required: true },
    role: { type: 'string', required: true }
  },
  exits: { success: { description: 'Usuário criado com sucesso.' }, conflict: { description: 'Email já cadastrado.', responseType: 'conflict' } },
  fn: async function (inputs, exits) {
    sails.log.info('===== Register START =====');
    sails.log.info('Inputs recebidos:', inputs);
    try {
      const senhaCriptografada = await sails.helpers.hashPassword(inputs.senha);
      const novoUsuario = await Autenticacao.create({ login: inputs.email, senha: senhaCriptografada, role: inputs.role }).fetch();
      const token = jwt.sign({ id: novoUsuario.id, role: novoUsuario.role }, process.env.JWT_SECRET || 'chave_super_segura', { expiresIn: '7d' });
      return exits.success({ message: 'Usuário criado com sucesso!', usuario: { id: novoUsuario.id, nome: inputs.nome, email: novoUsuario.login, role: novoUsuario.role }, token });
    } catch (err) {
      if (err && err.code === 'E_UNIQUE') {
        return exits.conflict({ message: 'Email já cadastrado.' });
      }
      sails.log.error('Erro ao registrar usuário:', err);
      throw 'serverError';
    }
  }
};