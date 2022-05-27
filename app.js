const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql");

/* Rotas */

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.get("/home", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/pagCadastroSetor", function(req, res) {
  res.sendFile(__dirname + "/public/pages/cadastro-geral/cadastroSetor.html");
});

app.get("/pagCadastroFuncao", function (req, res) {
  res.sendFile(__dirname + "/public/pages/cadastro-geral/cadastroFuncao.html");
});


/* Posts */

app.post("/pagCadastroSetor", function(req, res) {
  var setor = req.body.setor;
  res.sendFile(__dirname + "/public/pages/cadastro-geral/cadastroSetor.html");
})

app.post("/pagCadastroFuncao", function (req, res) {
  var funcao = req.body.funcao;
  // INCLUIR VAR CBO
  var descricaoFuncao = req.body.descricaoFuncao;
  res.sendFile(__dirname + "/public/pages/cadastro-geral/cadastroFuncao.html");
})

app.listen(3000);