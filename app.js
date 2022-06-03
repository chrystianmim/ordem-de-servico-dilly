// express app
const express = require("express");
const app = express();

// require ejs
const ejs = require('ejs');

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

// some settings
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

// setting ejs as view engine
app.set('view engine', 'ejs');

// Routes ####################

app.get("/", (req, res) => {
  res.render("pages/index");
});

app.get("/pages/cadastroSetor", (req, res) => {
  res.render("pages/cadastroSetor");
});

app.get("/pages/cadastroFuncao", (req, res) => {
  res.render("pages/cadastroFuncao");
});

app.get("/pages/cadastroOrdem", (req, res) => {
  res.render("pages/cadastroOrdem");
});

app.get("/pages/emitirOrdem", (req, res) => {
  res.render("pages/emitirOrdem");
});

// ###########################

// Posts & SQL create queries ###############

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

// ##########################################

// SQL read queries


// SQL update queires


// SQL delete queries

app.listen(3000, "localhost", () => {
  console.log("Server connected on port: 3000");
});