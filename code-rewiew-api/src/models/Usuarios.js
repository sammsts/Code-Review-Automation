// import { sequelize } from '../database.js';
// import QueryTypes from 'sequelize';

const autenticar = async (email, senha) => {
  try {
    const sql = `
      SELECT * FROM Usuario
      WHERE usu_email = :email
      AND usu_senha = :senha
    `;

    // const resultado = await sequelize.query(sql, {
    //   replacements: { email, senha },
    //   type: QueryTypes.SELECT,
    // });
      const resultado = [];

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

export { autenticar };