const incluir = document.querySelector('#incluir');

incluir.addEventListener("click", validarForm);

// VOU TER Q USAR JQUERY PRA FAZER O SUBMIT SEM RECARREGAR A PAGINA DAMN

function validarForm() {
  alert()
  let setor = document.querySelector('#setor');
  let erro = document.querySelector('#erro');

  if (setor.value == '') {
    erro.classList.remove('d-none');
    return false
  }
};

