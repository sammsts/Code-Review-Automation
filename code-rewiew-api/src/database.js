import Sequelize from 'sequelize';

// Informações do banco de dados PostgreSQL
const sequelize = new Sequelize('Code-Review-Automation', 'postgres', '123456', {
  host: 'localhost', // Host do banco de dados
  dialect: 'postgres', // Tipo de banco de dados (no caso, PostgreSQL)
  port: 5432, // Porta do PostgreSQL
  define: {
    timestamps: false, // Define como false colunas de timestamp padrão (created_at, updated_at)
  },
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

export { sequelize };