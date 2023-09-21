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

module.exports = Validar;