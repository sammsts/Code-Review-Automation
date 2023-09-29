const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database.js');

const Usuario = sequelize.define(
  'Usuario',
  {
    usu_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usu_nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    usu_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    usu_senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'usuarios',
    timestamps: false,
  }
);

module.exports = Usuario;