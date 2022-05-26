const express = require("express");
const app = express();

/* Rotas */

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

app.get("/home", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/pagCadastroSetor", function(req, res) {
  res.sendFile(__dirname + "/public/pages/cadastro-geral/cadastroSetor.html");
});

app.post("/pagCadastroSetor", function(req, res) {
  var setor = req.body.setor;
  res.sendFile(__dirname + "/public/pages/cadastro-geral/cadastroSetor.html");
})

app.listen(3000);