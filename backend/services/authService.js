const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sequelize, models } = require('../database');
const { Autenticacao, Responsavel, Motorista } = models;
const emailService = require('./emailService'); // Serviço do lucas

/**
 * Registra um novo usuário, mas não o ativa.
 * Gera e envia um código de verificação por e-mail.
 */
exports.registrarUsuario = async (dadosUsuario) => {
  const { nome, email, senha, cpf, celular, role } = dadosUsuario;
  const t = await sequelize.transaction();

  try {
    const usuarioExistente = await Autenticacao.findOne({ where: { login: email } }, { transaction: t });
    if (usuarioExistente) {
      throw new Error('Este e-mail já está em uso.');
    }

    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);
    
    // Gera código de 4 dígitos
    const codigo = Math.floor(1000 + Math.random() * 9000).toString();
    // Código expira em 15 minutos
    const expiracao = new Date(new Date().getTime() + 15 * 60000);

    const novaAutenticacao = await Autenticacao.create({
      login: email,
      senha: senhaHash,
      role,
      emailVerificado: false, // Importante!
      codigoVerificacao: codigo, // Salva o código
      codigoExpiracao: expiracao, // Salva a expiração
    }, { transaction: t });

    const perfilData = {
      nome,
      cpf,
      contato: celular,
      id_autenticacao: novaAutenticacao.id_autenticacao
    };

    if (role === 'responsavel') {
      await Responsavel.create(perfilData, { transaction: t });
    } else if (role === 'condutor') {
      await Motorista.create(perfilData, { transaction: t });
    }

    // TODO: Aqui é a integração com lucas 
    await emailService.enviarCodigoVerificacao(email, codigo);

    await t.commit();
    // NÃO RETORNA TOKEN
    return { message: "Usuário registrado. Verifique seu e-mail para ativar sua conta." };

  } catch (error) {
    await t.rollback();
    throw error;
  }
};

/**
 * Autentica um usuário que já verificou o e-mail.
 */
exports.loginUsuario = async (dadosLogin) => {
    const { email, senha } = dadosLogin;

    const usuario = await Autenticacao.findOne({ where: { login: email } });
    if (!usuario) {
        throw new Error('Usuário incorreto.'); // Usuário não encontrado
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
        throw new Error('Senha inválida.'); // Senha incorreta
    }

    if (!usuario.emailVerificado) {
        throw new Error('Por favor, verifique seu e-mail antes de fazer login.');
    }

    // Busca o nome do perfil para retornar ao frontend
    let perfil;
    if (usuario.role === 'responsavel') {
        perfil = await Responsavel.findOne({ where: { id_autenticacao: usuario.id_autenticacao }});
    } else {
        perfil = await Motorista.findOne({ where: { id_autenticacao: usuario.id_autenticacao }});
    }

    const payload = {
        user: {
            id: usuario.id_autenticacao,
            role: usuario.role,
        },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' });

    return { 
        token,
        usuario: {
            nome: perfil.nome,
            email: usuario.login,
            role: usuario.role
        }
    };
};