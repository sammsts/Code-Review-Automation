const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Usuario = sequelize.define('Usuario', {
  usu_codigo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  usu_nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  usu_senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  usu_permissao: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Usuario;