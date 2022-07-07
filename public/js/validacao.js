// validação para formulário de cadastro de setor;
$('#formSetor').submit(function() { // função submit do jQuery direto no form
  let setor = document.querySelector('#setor');
  let erro = document.querySelector('#erro');

  // inicia a função tornando o erro invisível
  erro.classList.add('d-none');  

  if (setor.value == '') { // mostra erro se o valor da função estiver vazio
    erro.classList.remove('d-none');
    setor.focus();
    return false
  }

  return true
});

// validação para formulário de cadastro de função;
$('#formFuncao').submit(function () { // função submit do jQuery direto no form
  let funcao = document.querySelector('#funcao');
  let cbo = document.querySelector('#cbo');
  let erroFuncao = document.querySelector('#erroFuncao');
  let erroCbo = document.querySelector('#erroCbo');

  // inicia a função tornando os erros invisíveis
  erroFuncao.classList.add('d-none');
  erroCbo.classList.add('d-none');

  if (funcao.value == '') { // mostra erro se o valor da funcao estiver vazio
    erroFuncao.classList.remove('d-none');
    funcao.focus();
    return false
  }

  if (cbo.value == '') { // mostra erro se o valor do CBO estiver vazio
    erroCbo.classList.remove('d-none');
    cbo.focus();
    return false
  }
 
  return true
});

// validação e formatação do campo cbo usando o Cleave.js
var cleave = new Cleave('#cbo', {
  delimiter: '-',
  blocks: [4, 2],
});

// consumindo API fetch() buscando dados SQL das funçoes
let funcoesData = "";
async function fetchFuncoesData() {
  await fetch('http://localhost:3000/pages/ordem-servico/cadastroOrdem/funcoesData')
    .then(response => response.json())
    .then((data) => funcoesData = data.dbFuncoes)
}

// consumindo API fetch() buscando dados SQL dos setores
let setoresData = "";
async function fetchSetoresData() {
  await fetch('http://localhost:3000/pages/ordem-servico/cadastroOrdem/setoresData')
    .then(response => response.json())
    .then((data) => setoresData = data.dbSetores)
}

// executa o fetch
fetchFuncoesData();
fetchSetoresData();

// adiciona eventlistener no campo de função, para que sempre que a funçao seja alterada, o CBO também altere
let campoFuncao = document.getElementById('funcao');
campoFuncao.addEventListener("change", () => { 
  let campoCbo = document.getElementById('cbo').value;
  let funcaoAgora = document.getElementById('funcao').value;  
  for (let i = 0; i < funcoesData.length; i++) {
    if (funcoesData[i].funcao === funcaoAgora) {
      campoCbo = funcoesData[i].cbo;
      document.getElementById('cbo').value = campoCbo;
    }
  };
});

// validação para formulário de cadastro de ordem de serviço;
$('#formCadOrdem').submit(function() { // função submit do jQuery direto no form
  // captura campos
  let inputSetor = document.getElementById('setor');
  let inputFuncao = document.getElementById('funcao');
  let inputDescFuncao = document.getElementById('descFuncao');
  let inputRiscosAss = document.getElementById('riscosAss');
  let inputEpisRec = document.getElementById('episRec');
  let inputMedidasPrev = document.getElementById('medidasPrev');
  let inputProcAcidente = document.getElementById('procAcidente');
  let inputObs = document.getElementById('obs');
  let inputTermoResp = document.getElementById('termoResp');
  let erro = document.getElementById('erro');
 
  // validação dos campos para mostrar ou não o erro

  // inicia a função tornando o erro invisível
  erro.classList.add('d-none');

  if (inputSetor.value !== '') {
    break
  } else if (inputFuncao.value !== '') {
    return true
  } else if (inputDescFuncao.value !== '') {
    return true
  } else if (inputRiscosAss.value !== '') {
    return true
  } else if (inputEpisRec.value !== '') {
    return true
  } else if (inputMedidasPrev.value !== '') {
    return true
  } else if (inputProcAcidente.value !== '') {
    return true
  } else if (inputObs.value !== '') {
    return true
  } else if (inputTermoResp.value !== '') {
    return true
  } else {
    erro.classList.remove('d-none');
    return false
  }

  return false

  // atribuir o id da função e cbo aos respectivos inputs
  for (let i = 0; i < funcoesData.length; i++) {
    if (funcoesData[i].funcao === inputFuncao.value) {
      // criar option com valor do id para possibilitar incluir ao inputFuncao.value
      let option = document.createElement('option');
      option.value = funcoesData[i].id;
      inputFuncao.add(option);
      inputFuncao.value = funcoesData[i].id;
      // atribuir o id ao cbo.value
      inputCbo.value = funcoesData[i].id;
    }
  };

  // atribuir o id do setor input
  for (let i = 0; i < setoresData.length; i++) {
    if (setoresData[i].setor === inputSetor.value) {
      // criar option com valor do id para possibilitar incluir ao inputSetor.value
      let option = document.createElement('option');
      option.value = setoresData[i].id;
      inputSetor.add(option);
      // atribuir o id ao setor.value
      inputSetor.value = setoresData[i].id;
    }
  };

  /* if (cbo.value == '') { // mostra erro se o valor do CBO estiver vazio
    erroCbo.classList.remove('d-none');
    cbo.focus();
    return false
  } */

  return false
});