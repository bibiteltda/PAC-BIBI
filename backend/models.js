module.exports = (sequelize, DataTypes) => {
  const Autenticacao = sequelize.define('Autenticacao', {
    id_autenticacao: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    login: { type: DataTypes.STRING(150), allowNull: false, unique: true },
    senha: { type: DataTypes.STRING(100), allowNull: false },
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

  const Turma = sequelize.define('Turma', {
    id_turma: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome_turma: { type: DataTypes.STRING, allowNull: false },
    periodo: { type: DataTypes.STRING, allowNull: false },
  }, { tableName: 'Turma', timestamps: false });

  const Aluno = sequelize.define('Aluno', {
    id_aluno: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING(80), allowNull: false },
    idade: { type: DataTypes.INTEGER },
    responsavel: { type: DataTypes.INTEGER, allowNull: false },
    escola: { type: DataTypes.INTEGER, allowNull: false },
    motorista: { type: DataTypes.INTEGER, allowNull: false },
    id_turma: { type: DataTypes.INTEGER, allowNull: false },
  }, { tableName: 'Aluno', timestamps: false });

  const Pagamento = sequelize.define('Pagamento', {
    id_pagamento: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    valor: { type: DataTypes.FLOAT, allowNull: false },
    dta_vcto: { type: DataTypes.DATE },
    dta_pgmt: { type: DataTypes.DATE },
    status: { type: DataTypes.STRING(50) },
    responsavel: { type: DataTypes.INTEGER, allowNull: false },
    motorista: { type: DataTypes.INTEGER, allowNull: false },
  }, { tableName: 'Pagamento', timestamps: false });

  Escola.belongsTo(Bairro, { foreignKey: 'bairro', as: 'bairroObj' });
  Bairro.hasMany(Escola, { foreignKey: 'bairro', as: 'escolas' });

  Escola.belongsTo(Cidade, { foreignKey: 'cidade', as: 'cidadeObj' });
  Cidade.hasMany(Escola, { foreignKey: 'cidade', as: 'escolas' });

  Responsavel.belongsTo(Autenticacao, { foreignKey: 'id_autenticacao', as: 'autenticacao' });
  Autenticacao.hasOne(Responsavel, { foreignKey: 'id_autenticacao' });

  Motorista.belongsTo(Autenticacao, { foreignKey: 'id_autenticacao', as: 'autenticacao' });
  Autenticacao.hasOne(Motorista, { foreignKey: 'id_autenticacao' });

  Aluno.belongsTo(Responsavel, { foreignKey: 'responsavel', as: 'responsavelObj' });
  Responsavel.hasMany(Aluno, { foreignKey: 'responsavel', as: 'alunos' });

  Aluno.belongsTo(Escola, { foreignKey: 'escola', as: 'escolaObj' });
  Escola.hasMany(Aluno, { foreignKey: 'escola', as: 'alunos' });

  Aluno.belongsTo(Motorista, { foreignKey: 'motorista', as: 'motoristaObj' });
  Motorista.hasMany(Aluno, { foreignKey: 'motorista', as: 'alunos' });
  
  Aluno.belongsTo(Turma, { foreignKey: 'id_turma', as: 'turmaObj' });
  Turma.hasMany(Aluno, { foreignKey: 'id_turma', as: 'alunos' });

  Pagamento.belongsTo(Responsavel, { foreignKey: 'responsavel', as: 'responsavelObj' });
  Responsavel.hasMany(Pagamento, { foreignKey: 'responsavel', as: 'pagamentos' });

  Pagamento.belongsTo(Motorista, { foreignKey: 'motorista', as: 'motoristaObj' });
  Motorista.hasMany(Pagamento, { foreignKey: 'motorista', as: 'pagamentos' });
  
  return { Autenticacao, Bairro, Cidade, Escola, Responsavel, Motorista, Aluno, Pagamento, Turma };
};