const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('kinkznez', 'kinkznez', 'WjNTUuURc8E6ZKhSpxfY6JxAaYgAEniA', {
  host: 'motty.db.elephantsql.com',
  dialect: 'postgres',
});

module.exports = sequelize;