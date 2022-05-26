// validação para formulário de cadastro de funções;

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

  funcao.value = setor.value.toUpperCase(); // transforma a função em uppercase
  return true
});

$('#formFuncao').submit(function () { // função submit do jQuery direto no form
  let funcao = document.querySelector('#funcao');
  let descricaoFuncao = document.querySelector('#descricaoFuncao');
  let erro = document.querySelector('#erro');

  // inicia a função tornando o erro invisível
  erro.classList.add('d-none');

  if (funcao.value == '') { // mostra erro se o valor do setor estiver vazio
    erro.classList.remove('d-none');
    setor.focus();
    return false
  }

  setor.value = setor.value.toUpperCase(); // transforma o setor em uppercase
  return true
});

// *CRIAR* validação para formulário de cadastro de funções