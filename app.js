const isLocal = false;

// express app
const express = require("express");
const app = express();

// require ejs
const ejs = require('ejs');

// setting connection to mysql database
const mysql = require("mysql2");
const db = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  database: 'db_ordem-de-servico',
  password: 'admin'
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: " + err.stack);
    return;
  }

  console.log("DB connection success! ID: " + db.threadId);
});

// some other Express settings
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

// setting ejs as view engine
app.set('view engine', 'ejs');

// ---------------------------------
// ---------- GET Routes -----------
// ---------------------------------

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

app.get("/pages/ordem-servico/edit/editarFuncao", (req, res) => {
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
  let sqlOrdem = "SELECT tb_ordens.id, setor, funcao, cbo FROM tb_ordens INNER JOIN tb_setores ON tb_ordens.setor_id = tb_setores.id INNER JOIN tb_funcoes ON tb_ordens.funcao_id = tb_funcoes.id ORDER BY `setor` asc";
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

// dados para inserir option no select de funcoes da página cadastroOrdem utilizando fetch() no front
app.get("/pages/ordem-servico/cadastroOrdem/funcoesData", (req, res) => {
  let sqlFuncao = "SELECT * FROM tb_funcoes ORDER BY `funcao` asc";
  db.query(sqlFuncao, (err, data) => {
    if (err) throw err;
    res.send({ dbFuncoes: data });
  });
});

// dados para inserir option no select de setores da página cadastroOrdem utilizando fetch() no front
app.get("/pages/ordem-servico/cadastroOrdem/setoresData", (req, res) => {
  let sqlSetor = "SELECT * FROM tb_setores ORDER BY `setor` asc";
  db.query(sqlSetor, (err, data) => {
    if (err) throw err;
    res.send({ dbSetores: data });
  });
});

app.get("/pages/ordem-servico/edit/editarOrdem", (req, res) => {
  let idOrdem = req.query.idOrdem; // pega o valor que está sendo passado na URL
  let sql = (`SELECT * FROM tb_ordens INNER JOIN tb_setores ON tb_ordens.setor_id = tb_setores.id INNER JOIN tb_funcoes ON tb_ordens.funcao_id = tb_funcoes.id WHERE tb_ordens.id=${idOrdem}`);
  db.query(sql, (err, data) => {
    if (err) throw err;
    res.render("pages/ordem-servico/edit/editarOrdem", {
      sqlData: data,
      idOrdem: idOrdem
    });
  });
});

app.get("/pages/ordem-servico/emitirOrdem", (req, res) => {  
  let sqlSetor = "SELECT * FROM tb_setores ORDER BY `setor` asc";
  let sqlFuncao = "SELECT * FROM tb_funcoes ORDER BY `funcao` asc";
  db.query(sqlSetor, (err, dataSetor) => {
    if (err) throw err;
    db.query(sqlFuncao, (err, dataFuncao) => {
      if (err) throw err;
      res.render("pages/ordem-servico/emitirOrdem", {
        dbSetor: dataSetor,
        dbFuncao: dataFuncao
      });
    });
  });
});

////////////////////////
///////// PDF //////////
////////////////////////

app.get("/pdf", (req, res) => {

  const fs = require("fs");
  const path = "./tmp/OrdemDeServico.pdf";
  const pdf = require("html-pdf");

  // pdf parameters
  const options = { format: 'a4' };
  var html = `bore po`;

  // create and download pdf
  pdf.create(html, options).toFile("./tmp/OrdemDeServico.pdf", (err, response) => {
    if (err) throw err;
    console.log('PDF criado');
    res.download('./tmp/OrdemDeServico.pdf');
    console.log('PDF baixado');
  });
});

app.get("/pages/ordem-servico/printOrdem", (req, res) => {
  res.render("pages/ordem-servico/printOrdem");
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
  });

  // ENVIAR QUERY STRING SUCCSESS PARA FRONT END https://www.sitepoint.com/get-url-parameters-with-javascript/

});

// ##########################################

// SQL read queries ###############

app.post("/pages/ordem-servico/printOrdem", (req, res) => {
  let setor = req.body.setor;
  let funcao = req.body.funcao;
  let cbo = req.body.cbo;
  let codigo = req.body.codigo;
  let nome = req.body.nome;
  nome = nome.toUpperCase(); // tratamento do nome para uppercase
  let dataEmissao = req.body.data;
  dataEmissao = dataEmissao.split('-').reverse().join('/'); // tratamento da data para o formato dd/mm/yyyy

  // objeto para ser enviado para a página printOrdem
  let infoObj = {
      codigo,
      nome,
      dataEmissao
    }

  console.log(`
  setor: ${setor},
  funcao: ${funcao},
  cbo: ${cbo},
  codigo: ${codigo},
  nome: ${nome},
  data: ${dataEmissao}`);

  let sql = (`SELECT * FROM tb_ordens INNER JOIN tb_setores ON tb_ordens.setor_id = tb_setores.id INNER JOIN tb_funcoes ON tb_ordens.funcao_id = tb_funcoes.id`);

  db.query(sql, (err, data) => {
    if (err) throw err;
    res.render("pages/ordem-servico/printOrdem", {
      dbData: data,
      infoColaborador: infoObj
    });
    console.log(data);
  });  
})

// ##########################################

// SQL update queries ###############

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

app.post("/pages/ordem-servico/edit/editarOrdem", (req, res) => { // update ordem
  // let setor = req.body.setor;
  // let funcao = req.body.funcao;
  // let cbo = req.body.funcao;
  let descFuncao = req.body.descFuncao;
  let riscosAss = req.body.riscosAss;
  let episRec = req.body.episRec;
  let medidasPrev = req.body.medidasPrev;
  let procAcidente = req.body.procAcidente;
  let obs = req.body.obs;
  let termoResp = req.body.termoResp;
  let idOrdem = req.query.idOrdem;
  db.query(`UPDATE tb_ordens SET desc_funcao = ("${descFuncao}"), riscos_atividade = ("${riscosAss}"), epis = ("${episRec}"), medidas_prev = ("${medidasPrev}"), procedimento = ("${procAcidente}"), obs = ("${obs}"), termo_resp = ("${termoResp}") WHERE id=("${idOrdem}")`);
  res.redirect("../../../pages/ordem-servico/cadastroOrdem");
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

app.get("/pages/ordem-servico/delete/deletarOrdem", (req, res) => { // delete ordem
  let idOrdem = req.query.idOrdem;
  db.query(`DELETE FROM tb_ordens WHERE id=("${idOrdem}")`);
  res.redirect("../../../pages/ordem-servico/cadastroOrdem");
})

// ##########################################

if (isLocal) {
  app.listen(3000, "localhost", () => {
    console.log("LOCAL Server connected on port: 3000");
  });
} else {
  app.listen(3000, "177.153.59.145", () => {
    console.log("WEB Server connected on port: 3000");
  });
}
