const express = require("express");
const app = express();

// setting connection to mysql database
const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'db_ordem-de-servico'
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: " + err.stack);
    return;
  }

  console.log("DB connection success! ID: " + connection.threadId);
});

// Rotas

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.get("/home", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/pagCadastroSetor", (req, res) => {
  res.sendFile(__dirname + "/public/pages/cadastro/cadastroSetor.html");
});

app.get("/pagCadastroFuncao", (req, res) => {
  res.sendFile(__dirname + "/public/pages/cadastro/cadastroFuncao.html");
});


// Posts & SQL create queries

app.post("/pages/cadastro/cadastroSetor.html", (req, res) => {
  var setor = req.body.setor;
  setor = setor.toUpperCase(); // nome do setor para uppercase
  connection.query(`INSERT INTO tb_setores(setor) VALUES ("${setor}")`);
  res.sendFile(__dirname + "/public/pages/cadastro/cadastroSetor.html");
})

app.post("/pages/cadastro/cadastroFuncao.html", (req, res) => {
  var funcao = req.body.funcao;
  var cbo = req.body.cbo;
  console.log(funcao);
  console.log(cbo);
  res.sendFile(__dirname + "/public/pages/cadastro/cadastroFuncao.html");
})

// SQL read queries


// SQL update queires


// SQL delete queries

app.listen(3000, "localhost", () => {
  console.log("Server connected on port: 3000");
});