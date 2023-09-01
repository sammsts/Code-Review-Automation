const express = require("express");
const routes = require('./routes');
const cors = require('cors');
const sequelize = require('./database');
const Usuario = require('./models/usuarios');

sequelize.sync().then(() => {
  console.log('Tabelas sincronizadas com sucesso.');
}).catch((err) => {
  console.error('Erro ao sincronizar a tabela:', err);
});

const app = express();
app.use(express.json());
app.use(cors());

app.use(routes);

app.listen(3333, () => {
  console.log("Backend Ligado!");
});
