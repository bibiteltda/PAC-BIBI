module.exports = (sequelize, DataTypes) => {
  const Autenticacao = sequelize.define('Autenticacao', {
    id_autenticacao: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    login: { type: DataTypes.STRING(150), allowNull: false, unique: true },
    senha: { type: DataTypes.STRING(100), allowNull: false },
    role: { type: DataTypes.STRING(50), allowNull: false },
  }, { tableName: 'Autenticacao', timestamps: false });

  const Responsavel = sequelize.define('Responsavel', {
    id_responsavel: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING(80), allowNull: false },
    contato: { type: DataTypes.STRING(15) },
    cpf: { type: DataTypes.STRING(15) },
    id_autenticacao: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Autenticacao', key: 'id_autenticacao' } },
  }, { tableName: 'Responsavel', timestamps: false });

  const Motorista = sequelize.define('Motorista', {
    id_motorista: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING(80), allowNull: false },
    contato: { type: DataTypes.STRING(15) },
    cpf: { type: DataTypes.STRING(15) },
    id_autenticacao: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Autenticacao', key: 'id_autenticacao' } },
  }, { tableName: 'Motorista', timestamps: false });

  const Cidade = sequelize.define('Cidade', {
    id_cidade: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING(255), allowNull: false },
  }, { tableName: 'Cidade', timestamps: false });

  const Bairro = sequelize.define('Bairro', {
    id_bairro: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING(255), allowNull: false },
  }, { tableName: 'Bairro', timestamps: false });

  const Escola = sequelize.define('Escola', {
    id_escola: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING(255), allowNull: false },
    telefone: { type: DataTypes.STRING(15) },
    logradouro: { type: DataTypes.STRING(100) },
    bairro: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Bairro', key: 'id_bairro' } },
    cidade: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Cidade', key: 'id_cidade' } },
  }, { tableName: 'Escola', timestamps: false });

  const Turma = sequelize.define('Turma', {
    id_turma: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome_turma: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    periodo: { 
      type: DataTypes.STRING,
      allowNull: false
    },
  }, { tableName: 'Turma', timestamps: false });

  const Aluno = sequelize.define('Aluno', {
    id_aluno: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING(80), allowNull: false },
    idade: { type: DataTypes.INTEGER },
    responsavel: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Responsavel', key: 'id_responsavel' } },
    escola: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Escola', key: 'id_escola' } },
    motorista: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Motorista', key: 'id_motorista' } },
    id_turma: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Turma', key: 'id_turma' } },
  }, { tableName: 'Aluno', timestamps: false });

  const Pagamento = sequelize.define('Pagamento', {
    id_pagamento: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    valor: { type: DataTypes.FLOAT, allowNull: false },
    dta_vcto: { type: DataTypes.DATE },
    dta_pgmt: { type: DataTypes.DATE },
    status: { type: DataTypes.STRING(50) },
    responsavel: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Responsavel', key: 'id_responsavel' } },
    motorista: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Motorista', key: 'id_motorista' } },
  }, { tableName: 'Pagamento', timestamps: false });
  
  Responsavel.belongsTo(Autenticacao, { foreignKey: 'id_autenticacao' });
  Motorista.belongsTo(Autenticacao, { foreignKey: 'id_autenticacao' });
  
  Escola.belongsTo(Bairro, { foreignKey: 'bairro' });
  Escola.belongsTo(Cidade, { foreignKey: 'cidade' });

  Aluno.belongsTo(Responsavel, { foreignKey: 'responsavel' });
  Aluno.belongsTo(Escola, { foreignKey: 'escola' });
  Aluno.belongsTo(Motorista, { foreignKey: 'motorista' });
  Aluno.belongsTo(Turma, { foreignKey: 'id_turma' }); 
  
  Turma.hasMany(Aluno, { foreignKey: 'id_turma' }); 

  Pagamento.belongsTo(Responsavel, { foreignKey: 'responsavel' });
  Pagamento.belongsTo(Motorista, { foreignKey: 'motorista' });

  return {
    Autenticacao,
    Bairro,
    Cidade,
    Escola,
    Responsavel,
    Motorista,
    Turma,     
    Aluno,
    Pagamento
  };
};