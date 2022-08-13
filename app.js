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

// some other Express settings
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

// setting ejs as view engine
app.set('view engine', 'ejs');

// ---------------------------------
// ---------- GET Routes -----------
// ---------------------------------

// ROTA DE TESTE PARA PDF
// ROTA DE TESTE PARA PDF
// ROTA DE TESTE PARA PDF

const fs = require("fs");
const path = "./tmp/OrdemDeServico.pdf";

app.get("/pdf", (req, res) => {

  const pdf = require("html-pdf");

  // pdf parameters
  const options = { format: 'a4' };
  var html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!-- <meta name="viewport" content="width=device-width, initial-scale=1.0"> -->
  <title>PDF Ordem de Serviço</title>
  <style>
    .documentBox {
      width: 21cm;
      height: 29.7cm;
      border: 1px solid black;
      padding: 1cm;
    }

    .headerBox {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      text-align: center;
      margin-bottom: 10mm;
    }

    .belowHeaderBox {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      text-align: center;
      margin-bottom: 10mm;
    }

    .documentBodyBox {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: start;
      margin-bottom: 10mm;
      flex: 1 0 auto;
    }

    .innerBoxProperties {
      margin-bottom: 10mm;
    }

    .contentBox {
      height: 23.7cm;
    }

    .footerBox {
      width: 21cm;
      height: 6cm;
      flex-shrink: 0;
      /* bottom: 0;
      margin-top: auto;
      margin-bottom: 10mm; */
    }

    .employeeInfo {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-align: center;
      margin-bottom: 10mm;
    }

    .signLine {
      margin-bottom: 20mm;
    }

    .companyInfo {
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="documentBox">
    <div class="contentBox">
      <div class="headerBox">
        <div id="logo">Dilly Logo</div>
        <div id="docTitle"><strong>ORDEM DE SERVIÇO <br>SEGURANÇA DO TRABALHO</strong></div>
        <div id="safetyLogo">Safety Logo</div>
      </div>

      <div class="belowHeaderBox">
        <div id="setor"><strong>Setor: </strong>{setor name}</div>
        <div id="funcao"><strong>Função: </strong>{funcao title}</div>
        <div id="cbo"><strong>CBO: </strong>{cbo number}</div>
      </div>

      <div class="documentBodyBox">
        <div class="innerBoxProperties">
          <div id="descFuncaoTitle"><strong>Descrição da função:</strong></div>
          <div id="descFuncaoContent">{descFuncao}</div>
        </div>

        <div class="innerBoxProperties">
          <div id="agentesAssTitle"><strong>Agentes associados às atividades:</strong></div>
          <div id="agentesAssContent">{agentesAss}</div>
        </div>

        <div class="innerBoxProperties">
          <div id="episRecTitle"><strong>EPI's recomendados:</strong></div>
          <div id="episRecContent">{episRec}</div>
        </div>

        <div class="innerBoxProperties">
          <div id="recomendacoesTitle"><strong>Recomendações gerais:</strong></div>
          <div id="recomendacoesContent">{recomendacoes}</div>
        </div>

        <div class="innerBoxProperties">
          <div id="procAcidenteTitle"><strong>Procedimento em caso de acidente:</strong></div>
          <div id="procAcidenteContent">{procAcidente}</div>
        </div>

        <div class="innerBoxProperties">
          <div id="obsTitle"><strong>Demais observações:</strong></div>
          <div id="obsContent">{obs}</div>
        </div>

        <div class="innerBoxProperties">
          <div id="declaracaoTitle"><strong>Declaração:</strong></div>
          <div id="declaracaoContent">{declaracao}</div>
        </div>      
      </div>
    </div> <!-- contentBox end -->

    <div class="footerBox">
      <div class="employeeInfo">
        <div id="codigo"><strong>CÓDIGO: </strong>{codigo do funcionario}</div>
        <div id="nome"><strong>NOME: </strong>{nome do funcionario}</div>
        <div id="data"><strong>DATA: </strong>{data}</div>
      </div>

      <div class="signLine">
        <div id="assinatura"><strong>ASSINATURA: </strong>____________________________________________</div>
      </div>

      <div class="companyInfo">
        <p><strong>DILLY NORDESTE INDÚSTRIA DE CALÇADOS LTDA.</strong><br>
        AV. BIICA BASÍLIO, 140, BAIRRO RAIMUNDO FERNANDES <br>
        BREJO SANTO/CE - CEP: 63260-000 <br>
        CNPJ: 15.836.348/0001-90</p>
      </div>
    </div> <!-- footerBox end -->
  </div> <!-- documentBox end -->
  
</body>
</html>`;

  // create and download pdf
  pdf.create(html, options).toFile("./tmp/OrdemDeServico.pdf", (err, response) => {
    if (err) throw err;
    console.log('PDF criado');
    res.download('./tmp/OrdemDeServico.pdf');
    console.log('PDF baixado');
  });

  ///// TENTANDO CRIAR O PDF ANTES DE EXECUTAR O DOWNLOAD //////////////////////
  // VERIFICAR LINK ABAIXO DO METODO WATCHFILE
  // https://www.geeksforgeeks.org/node-js-fs-watchfile-method/?ref=lbp

  // TENTANDO USANDO SÓ O fs.WATCHFILE

  /* const pdfFile = require("./pdf"); */

  /* fs.watchFile(path, { interval: 500 }, (curr, prev) => {
    if (curr.birthtime != prev.birthtime) {
      res.download('./tmp/OrdemDeServico.pdf');
      console.log(curr.birthtime);
      console.log(prev.birthtime);
      return false;
    };
  }); */

  /* let hasChanged = false

  fs.watch("./tmp", { persistent: false }, (changeType, file) => {
    hasChanged = true;
    console.log(file + ' has ' + changeType);
  });

  if (hasChanged) {
    res.download('./tmp/OrdemDeServico.pdf');
    hasChanged = false;
  } else {
    console.log('ih n deu parça');
  } */



  // TENTANDO USANDO PROMISE

  /* const downloadPdf = new Promise((res, rej) => {    
    var fileExists = fs.existsSync(path);

    if (fileExists === true) {      
      fs.unlinkSync(path);
      const pdfFile = require("./pdf");
      res("Requisição aceita");
    } 
    
    if (fileExists === false) {    
      const pdfFile = require("./pdf");
      res("Requisição aceita");
    }

    rej("Requisição rejeitada");
  });  

  downloadPdf
    .then(() => {
      fs.watchFile(path, { interval: 1000 }, (curr, prev) => {
        if (curr.birthtime != prev.birthtime) {
          res.download('./tmp/OrdemDeServico.pdf');
          console.log(curr.birthtime);
          console.log(prev.birthtime);
        };
      });     
    })
    .catch((err) => {
      if (err) throw err;
    }); */

});

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

// dados para inserir option no select de funcoes da página cadastroOrdem
app.get("/pages/ordem-servico/cadastroOrdem/funcoesData", (req, res) => {
  let sqlFuncao = "SELECT * FROM tb_funcoes ORDER BY `funcao` asc";
  db.query(sqlFuncao, (err, data) => {
    if (err) throw err;
    res.send({ dbFuncoes: data });
  });
});

// dados para inserir option no select de setores da página cadastroOrdem
app.get("/pages/ordem-servico/cadastroOrdem/setoresData", (req, res) => {
  let sqlSetor = "SELECT * FROM tb_setores ORDER BY `setor` asc";
  db.query(sqlSetor, (err, data) => {
    if (err) throw err;
    res.send({ dbSetores: data });
  });
});

app.get("/pages/ordem-servico/edit/editarOrdem", (req, res) => {
  let idOrdem = req.query.idOrdem;
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
  res.render("pages/ordem-servico/emitirOrdem");
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

app.listen(3000, "localhost", () => {
  console.log("Server connected on port: 3000");
});