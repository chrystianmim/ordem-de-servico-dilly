const express = require("express");
const app = express();

/* Rotas */

app.use(express.static(__dirname + "/public"));

app.get("/index.html", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/pages/cadastro-geral/cadastroSetor.html", function(req, res) {
  res.sendFile(__dirname + "/pages/cadastro-geral/cadastroSetor.html");
});

app.listen(3000);