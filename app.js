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
  res.sendFile(__dirname + "/public/pages/cadastro/cadastroSetor.html");
});

app.get("/pagCadastroFuncao", function (req, res) {
  res.sendFile(__dirname + "/public/pages/cadastro/cadastroFuncao.html");
});


/* Posts */

app.post("/pagCadastroSetor", function(req, res) {
  var setor = req.body.setor;
  res.sendFile(__dirname + "/public/pages/cadastro/cadastroSetor.html");
})

app.post("/pagCadastroFuncao", function (req, res) {
  var funcao = req.body.funcao;
  var cbo = req.body.cbo;
  console.log(funcao);
  console.log(cbo);
  res.sendFile(__dirname + "/public/pages/cadastro/cadastroFuncao.html");
})

app.listen(3000);