process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const express = require("express");
const https = require('https');
const fs = require('fs');
const routes = require('./debug-node.js/routes/index.js');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: 'http://localhost:3001',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
  exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
};

app.use((req, res, next) => {
  console.log('Before CORS middleware');
  next();
});
app.use(cors(corsOptions));
app.use((req, res, next) => {
  console.log('After CORS middleware');
  next();
});

app.use(routes);

const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`Servidor iniciado na porta ${port}`);
// });
const credentials = {
  key: fs.readFileSync("key.pem", "utf8"),
  cert: fs.readFileSync("cert.pem", "utf8")
};

https.createServer(credentials, app).listen(3000, () => {
  console.log("Servidor iniciado na porta 3000 com HTTPS");
});