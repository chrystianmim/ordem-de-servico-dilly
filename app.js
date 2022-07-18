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

app.get("/pages/ordem-servico/edit/editarSetor", (req, res) => { // update query
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
  let sql = "SELECT * FROM tb_funcoes ORDER BY `funcao` asc";
  db.query(sql, (err, data) => {
    if (err) throw err;
    res.render("pages/ordem-servico/cadastroFuncao", { sqlData: data });
  });
});

app.get("/pages/ordem-servico/edit/editarFuncao", (req, res) => { // update query
  let idFuncao = req.query.idFuncao;
  let sql = (`SELECT funcao, cbo FROM tb_funcoes WHERE id=${idFuncao}`);
  db.query(sql, (err, data) => {
    if (err) throw err;
    res.render("pages/ordem-servico/edit/editarFuncao", {
      sqlData: data,
      idFuncao: idFuncao
    });
  });
});

app.get("/pages/ordem-servico/cadastroOrdem", (req, res) => {
  let sqlSetor = "SELECT * FROM tb_setores ORDER BY `setor` asc";
  let sqlFuncao = "SELECT * FROM tb_funcoes ORDER BY `funcao` asc";
  let sqlOrdem = "SELECT * FROM tb_ordens ORDER BY `setor_id` asc";
  db.query(sqlSetor, (err, data1) => {
    if (err) throw err;
    db.query(sqlFuncao, (err, data2) => {
      if (err) throw err;
      db.query(sqlOrdem, (err, data3) => {
        if (err) throw err;
        res.render("pages/ordem-servico/cadastroOrdem", {
          dbSetores: data1,
          dbFuncoes: data2,
          dbOrdens: data3
        });
      });
    });
  });  
});

app.get("/pages/ordem-servico/cadastroOrdem/funcoesData", (req, res) => {  
  let sqlFuncao = "SELECT * FROM tb_funcoes ORDER BY `funcao` asc";
  db.query(sqlFuncao, (err, data) => {
    if (err) throw err;
    res.send({ dbFuncoes: data });
  });
});

app.get("/pages/ordem-servico/cadastroOrdem/setoresData", (req, res) => {
  let sqlSetor = "SELECT * FROM tb_setores ORDER BY `setor` asc";
  db.query(sqlSetor, (err, data) => {
    if (err) throw err;
    res.send({ dbSetores: data });
  });
});

app.get("/pages/emitirOrdem", (req, res) => {
  res.render("pages/emitirOrdem");
});

// ###########################

// SQL create queries ###############

app.post("/pages/ordem-servico/cadastroSetor", (req, res) => {
  let setor = req.body.setor;
  setor = setor.toUpperCase(); // nome do setor para uppercase
  db.query(`INSERT INTO tb_setores(setor) VALUES ("${setor}")`);
  res.redirect("cadastroSetor");
});

app.post("/pages/ordem-servico/cadastroFuncao", (req, res) => {
  let funcao = req.body.funcao;
  funcao = funcao.toUpperCase(); // nome da funcao para uppercase
  let cbo = req.body.cbo;
  db.query(`INSERT INTO tb_funcoes (funcao, cbo) VALUES ("${funcao}", "${cbo}")`);
  res.redirect("cadastroFuncao");
});

app.post("/pages/ordem-servico/cadastroOrdem", (req, res) => {
  // captura dados do formulario
  let setor = req.body.setor;
  let funcao = req.body.funcao;
  let cbo = req.body.funcao;
  let descFuncao = req.body.descFuncao;
  let riscosAss = req.body.riscosAss;
  let episRec = req.body.episRec;
  let medidasPrev = req.body.medidasPrev;
  let procAcidente = req.body.procAcidente;
  let obs = req.body.obs;
  let termoResp = req.body.termoResp;

  query = `INSERT INTO tb_ordens (setor_id, funcao_id, cbo_id, desc_funcao, riscos_atividade, epis, medidas_prev, procedimento, obs, termo_resp) VALUES ("${setor}", "${funcao}", "${cbo}", "${descFuncao}", "${riscosAss}", "${episRec}", "${medidasPrev}", "${procAcidente}", "${obs}", "${termoResp}")`;
  
  db.query(query, (err) => {
    if (err) throw err;
    res.redirect("cadastroOrdem?success=1");
  }) ;

  // ENVIAR QUERY STRING SUCCSESS PARA FRONT END https://www.sitepoint.com/get-url-parameters-with-javascript/

});

// ##########################################

// SQL read queries

// ##########################################

// SQL update queries

app.post("/pages/ordem-servico/edit/editarSetor", (req, res) => { // update setor
  let setor = req.body.setor;
  let idSetor = req.query.idSetor;
  setor = setor.toUpperCase(); // nome do setor para uppercase
  db.query(`UPDATE tb_setores SET setor = ("${setor}") WHERE id=("${idSetor}")`);
  res.redirect("../../../pages/ordem-servico/cadastroSetor");
})

app.post("/pages/ordem-servico/edit/editarFuncao", (req, res) => { // update funcao
  let funcao = req.body.funcao;
  let cbo = req.body.cbo;
  let idFuncao = req.query.idFuncao;
  funcao = funcao.toUpperCase(); // nome da funcao para uppercase
  db.query(`UPDATE tb_funcoes SET funcao = ("${funcao}"), cbo = ("${cbo}") WHERE id=("${idFuncao}")`);
  res.redirect("../../../pages/ordem-servico/cadastroFuncao");
})

// ##########################################

// SQL delete queries

app.get("/pages/ordem-servico/delete/deletarSetor", (req, res) => { // delete setor
  let idSetor = req.query.idSetor;
  db.query(`DELETE FROM tb_setores WHERE id=("${idSetor}")`);
  res.redirect("../../../pages/ordem-servico/cadastroSetor");
})

app.get("/pages/ordem-servico/delete/deletarFuncao", (req, res) => { // delete funcao
  let idFuncao = req.query.idFuncao;
  db.query(`DELETE FROM tb_funcoes WHERE id=("${idFuncao}")`);
  res.redirect("../../../pages/ordem-servico/cadastroFuncao");
})

// ##########################################

app.listen(3000, "localhost", () => {
  console.log("Server connected on port: 3000");
});