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

// ######################################

// validação para formulário de cadastro de função;

$('#formFuncao').submit(function () { // função submit do jQuery direto no form
  let funcao = document.querySelector('#funcao');
  let cbo = document.querySelector('#cbo');
  let erro = document.querySelector('#erro');

  // inicia a função tornando o erro invisível
  erro.classList.add('d-none');

  if (funcao.value == '') { // mostra erro se o valor do setor estiver vazio
    erro.classList.remove('d-none');
    setor.focus();
    return false
  }
 
  return false
});

// ######################################

// validação e formatação do campo cbo

// FAZER USANDO MASK
/* var cbo = document.querySelector("#cbo");
cbo.addEventListener('keyup', function (event) {
  var n = this.value;
  cbo.value = n.mask("0000-00").toLocaleString();
}, false); */