const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const { QueryTypes } = require('sequelize');

const Validar = async (email, senha) => {
  try {
    const sql = `
      SELECT * FROM Usuario
      WHERE usu_email = :email
      AND usu_senha = :senha
    `;

    const resultado = await sequelize.query(sql, {
      replacements: { email, senha },
      type: QueryTypes.SELECT,
    });

    if (resultado.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Erro ao verificar credenciais:', error);
    throw error;
  }
};

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