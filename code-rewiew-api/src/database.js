const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Code-Review-Automation', 'postgres', '123456', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;