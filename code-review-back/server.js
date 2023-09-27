const express = require("express");
const routes = require('./debug-nodejs/routes/index.js');
const cors = require('cors');
// const sequelize = require('./database');
const app = express();

app.use(cors());
app.use(routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});