import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../database.js';
// const Sequelize = require('sequelize');
// const database = require('../database.js');
// const Usuario = database.define('usuario', {
//   usu_email: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   usu_senha: {
//     type: Sequelize.STRING,
//     allowNull: false
//   }
// })

// console.log("Usuarios: " + Usuario);

const Usuario = sequelize.define(
  'Usuario',
  {
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

// module.export = Usuario;
export { Usuario };