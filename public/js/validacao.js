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