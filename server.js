process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const express = require("express");
const routes = require('./debug-node.js/routes/index.js');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: 'https://code-review-tecnouri.netlify.app', //PRODUÇÃO
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
  exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
};

app.use(cors(corsOptions));

app.use(routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});