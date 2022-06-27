// express app
const express = require("express");
const app = express();

// require ejs
const ejs = require('ejs');

// setting connection to mysql database
const mysql = require("mysql2");
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'db_ordem-de-servico'
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: " + err.stack);
    return;
  }

  console.log("DB connection success! ID: " + db.threadId);
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

app.get("/pages/ordem-servico/cadastroSetor", (req, res) => {
  let sql = "SELECT * FROM tb_setores ORDER BY `setor` asc";
  db.query(sql, (err, data) => {
    if (err) throw err;
    res.render("pages/ordem-servico/cadastroSetor", {sqlData: data});
  });  
});

app.get("/pages/ordem-servico/edit/editarSetor", (req, res) => {
  let idSetor = req.query.idSetor;
  let sql = (`SELECT setor FROM tb_setores WHERE id=${idSetor}`);
  db.query(sql, (err, data) => {
    if (err) throw err;
    res.render("pages/ordem-servico/edit/editarSetor", {
      sqlData: data,
      idSetor: idSetor
    });
  });
});

app.get("/pages/ordem-servico/cadastroFuncao", (req, res) => {
  res.render("pages/ordem-servico/cadastroFuncao");
});

app.get("/pages/cadastroOrdem", (req, res) => {
  res.render("pages/cadastroOrdem");
});

app.get("/pages/emitirOrdem", (req, res) => {
  res.render("pages/emitirOrdem");
});

// ###########################

// SQL create queries ###############

app.post("/pages/cadastroSetor", (req, res) => {
  let setor = req.body.setor;
  setor = setor.toUpperCase(); // nome do setor para uppercase
  db.query(`INSERT INTO tb_setores(setor) VALUES ("${setor}")`);
  res.redirect("cadastroSetor");
})

app.post("/pages/cadastro/cadastroFuncao.html", (req, res) => {
  let funcao = req.body.funcao;
  let cbo = req.body.cbo;
  console.log(funcao);
  console.log(cbo);
  res.sendFile(__dirname + "/public/pages/cadastro/cadastroFuncao.html");
})

// ##########################################

// SQL read queries

// ##########################################

// SQL update queries

app.post("/pages/ordem-servico/edit/editarSetor", (req, res) => { // update setor
  let setor = req.body.setor;
  let idSetor = req.query.idSetor;
  setor = setor.toUpperCase(); // nome do setor para uppercase
  db.query(`UPDATE tb_setores SET setor = ("${setor}") WHERE id=("${idSetor}")`);
  res.redirect("../../../pages/cadastroSetor");
})

// ##########################################

// SQL delete queries

app.get("/pages/ordem-servico/delete/deletarSetor", (req, res) => { // delete setor
  let idSetor = req.query.idSetor;
  db.query(`DELETE FROM tb_setores WHERE id=("${idSetor}")`);
  res.redirect("../../../pages/cadastroSetor");
})

// ##########################################

app.listen(3000, "localhost", () => {
  console.log("Server connected on port: 3000");
});