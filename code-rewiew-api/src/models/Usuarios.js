import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

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

export { Usuario };