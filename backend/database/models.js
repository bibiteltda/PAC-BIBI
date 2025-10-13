export default (sequelize, DataTypes) => {
  const Autenticacao = sequelize.define('Autenticacao', {
    id_autenticacao: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    login: { type: DataTypes.STRING(150), allowNull: false },
    senha: { type: DataTypes.STRING(150), allowNull: false },
    role: { type: DataTypes.STRING(50), allowNull: false },
  }, { tableName: 'Autenticacao', timestamps: false });

  const Bairro = sequelize.define('Bairro', {
    id_bairro: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING(255), allowNull: false },
  }, { tableName: 'Bairro', timestamps: false });

  const Cidade = sequelize.define('Cidade', {
    id_cidade: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING(255), allowNull: false },
  }, { tableName: 'Cidade', timestamps: false });

  const Escola = sequelize.define('Escola', {
    id_escola: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING(255), allowNull: false },
    telefone: { type: DataTypes.STRING(15) },
    logradouro: { type: DataTypes.STRING(100) },
    bairro: { type: DataTypes.INTEGER, allowNull: false },
    cidade: { type: DataTypes.INTEGER, allowNull: false },
  }, { tableName: 'Escola', timestamps: false });

  const Responsavel = sequelize.define('Responsavel', {
    id_responsavel: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING(80), allowNull: false },
    contato: { type: DataTypes.STRING(15) },
    cpf: { type: DataTypes.STRING(15) },
    id_autenticacao: { type: DataTypes.INTEGER, allowNull: false },
  }, { tableName: 'Responsavel', timestamps: false });

  const Motorista = sequelize.define('Motorista', {
    id_motorista: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING(80), allowNull: false },
    contato: { type: DataTypes.STRING(15) },
    cpf: { type: DataTypes.STRING(15) },
    id_autenticacao: { type: DataTypes.INTEGER, allowNull: false },
  }, { tableName: 'Motorista', timestamps: false });

  const Roteiro = sequelize.define('Roteiro', {
    id_roteiro: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    turno: { type: DataTypes.INTEGER, allowNull: false },
  }, { tableName: 'Roteiro', timestamps: false });

  const RoteiroEscola = sequelize.define('RoteiroEscola', {
    roteiroEscola: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    roteiro: { type: DataTypes.INTEGER, allowNull: false },
    escola: { type: DataTypes.INTEGER, allowNull: false },
  }, { tableName: 'RoteiroEscola', timestamps: false });

  const Aluno = sequelize.define('Aluno', {
    id_aluno: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING(80), allowNull: false },
    idade: { type: DataTypes.INTEGER },
    responsavel: { type: DataTypes.INTEGER, allowNull: false },
    escola: { type: DataTypes.INTEGER, allowNull: false },
    motorista: { type: DataTypes.INTEGER, allowNull: false },
    roteiro: { type: DataTypes.INTEGER, allowNull: false }, // 🔹 adicionado conforme DER
  }, { tableName: 'Aluno', timestamps: false });

  const Pagamento = sequelize.define('Pagamento', {
    id_pagamento: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    valor: { type: DataTypes.FLOAT, allowNull: false },
    dta_vcto: { type: DataTypes.DATE },
    dta_pgmt: { type: DataTypes.DATE },
    status: { type: DataTypes.STRING }, // 🔹 sem limite fixo
    responsavel: { type: DataTypes.INTEGER, allowNull: false },
    motorista: { type: DataTypes.INTEGER, allowNull: false },
  }, { tableName: 'Pagamento', timestamps: false });

  // 🔹 Relacionamentos
  Escola.belongsTo(Bairro, { foreignKey: 'bairro', as: 'bairroObj' });
  Escola.belongsTo(Cidade, { foreignKey: 'cidade', as: 'cidadeObj' });

  Responsavel.belongsTo(Autenticacao, { foreignKey: 'id_autenticacao', as: 'autenticacao' });
  Motorista.belongsTo(Autenticacao, { foreignKey: 'id_autenticacao', as: 'autenticacao' });

  Aluno.belongsTo(Responsavel, { foreignKey: 'responsavel', as: 'responsavelObj' });
  Aluno.belongsTo(Escola, { foreignKey: 'escola', as: 'escolaObj' });
  Aluno.belongsTo(Motorista, { foreignKey: 'motorista', as: 'motoristaObj' });
  Aluno.belongsTo(Roteiro, { foreignKey: 'roteiro', as: 'roteiroObj' }); // 🔹 adicionado

  Pagamento.belongsTo(Responsavel, { foreignKey: 'responsavel', as: 'responsavelObj' });
  Pagamento.belongsTo(Motorista, { foreignKey: 'motorista', as: 'motoristaObj' });

  Roteiro.belongsToMany(Escola, { through: RoteiroEscola, foreignKey: 'roteiro', otherKey: 'escola', as: 'escolas' });
  Escola.belongsToMany(Roteiro, { through: RoteiroEscola, foreignKey: 'escola', otherKey: 'roteiro', as: 'roteiros' });

  Responsavel.hasMany(Aluno, { foreignKey: 'responsavel', as: 'alunos' });

  return {
    Autenticacao,
    Bairro,
    Cidade,
    Escola,
    Responsavel,
    Motorista,
    Roteiro,
    RoteiroEscola,
    Aluno,
    Pagamento
  };
};
