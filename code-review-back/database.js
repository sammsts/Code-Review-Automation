const Sequelize = require('sequelize');

// Informações do banco de dados PostgreSQL
const sequelize = new Sequelize('postgres', 'postgres', 'Sdr2F51nHs1PcnM6%r5^', {
  dialect: 'postgres', // Tipo de banco de dados (no caso, PostgreSQL)
  host: 'localhost', // Host do banco de dados
  port: 5432, // Porta do PostgreSQL
});


// Testa a conexão com o banco de dados
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  })
  .catch((err) => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });


module.exports = sequelize;