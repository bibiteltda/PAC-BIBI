const { models } = require('../database');
const { Responsavel, Motorista } = models;

exports.atualizarInformacoes = async (idAutenticacao, role, dadosParaAtualizar) => {
    const { nome, celular } = dadosParaAtualizar;

    let perfil;
    if (role === 'responsavel') {
        perfil = await Responsavel.findOne({ where: { id_autenticacao: idAutenticacao }});
    } else {
        perfil = await Motorista.findOne({ where: { id_autenticacao: idAutenticacao }});
    }

    if (!perfil) {
        throw new Error("Perfil de usuário não encontrado.");
    }

    perfil.nome = nome || perfil.nome; // Atualiza se o campo foi enviado
    perfil.contato = celular || perfil.contato;

    await perfil.save();
    return perfil;
};