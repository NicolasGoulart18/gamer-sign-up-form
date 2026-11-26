const form = document.getElementById("signup-form");

const nome = document.getElementById("nome-devi");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const confirmarSenha = document.getElementById("confirmarSenha");
const termos = document.getElementById("termos");

const nomeError = document.getElementById("nome-error");
const emailError = document.getElementById("email-error");
const senhaError = document.getElementById("senha-error");
const confirmarError = document.getElementById("confirmar-error");
const termosError = document.getElementById("termos-error");

const strengthText = document.getElementById("strength-text");
const barras = document.querySelectorAll(".strength-bar");

const ruleLength = document.getElementById("rule-length");
const ruleUppercase = document.getElementById("rule-uppercase");
const ruleNumber = document.getElementById("rule-number");
const ruleSpecial = document.getElementById("rule-special");

const formStatus = document.getElementById("form-status");
const botao = form.querySelector('button[type="submit"]');
const botoesSenha = document.querySelectorAll(".toggle-password");


function verificarSenha(valor) {
  return {
    tamanho: valor.length >= 8,
    maiuscula: /[A-Z]/.test(valor),
    numero: /[0-9]/.test(valor),
    especial: /[^A-Za-z0-9]/.test(valor)
  };
}


function atualizarForcaSenha() {
  const valor = senha.value;
  const regrasSenha = verificarSenha(valor);

  const regras = [
    regrasSenha.tamanho,
    regrasSenha.maiuscula,
    regrasSenha.numero,
    regrasSenha.especial
  ];

  const pontos = regras.filter(function(regra) {
    return regra;
  }).length;

  barras.forEach(function(barra) {
    barra.className = "strength-bar";
  });

  let classe = "";
  let barrasAtivas = 0;

  if (valor === "") {
    strengthText.textContent = "---";
  } else if (pontos <= 1) {
    strengthText.textContent = "FRACA";
    classe = "fraca";
    barrasAtivas = 1;
  } else if (pontos === 2) {
    strengthText.textContent = "RAZOÁVEL";
    classe = "razoavel";
    barrasAtivas = 2;
  } else if (pontos === 3) {
    strengthText.textContent = "BOA";
    classe = "boa";
    barrasAtivas = 3;
  } else {
    strengthText.textContent = "FORTE";
    classe = "forte";
    barrasAtivas = 4;
  }

  for (let i = 0; i < barrasAtivas; i++) {
    barras[i].classList.add(classe);
  }

  ruleLength.classList.toggle("valid", regrasSenha.tamanho);
  ruleUppercase.classList.toggle("valid", regrasSenha.maiuscula);
  ruleNumber.classList.toggle("valid", regrasSenha.numero);
  ruleSpecial.classList.toggle("valid", regrasSenha.especial);
}


senha.addEventListener("input", atualizarForcaSenha);


botoesSenha.forEach(function(botaoSenha) {
  botaoSenha.addEventListener("click", function() {
    const idInput = botaoSenha.dataset.target;
    const input = document.getElementById(idInput);

    if (input.type === "password") {
      input.type = "text";
      botaoSenha.textContent = "OCULTAR";
    } else {
      input.type = "password";
      botaoSenha.textContent = "MOSTRAR";
    }
  });
});


form.addEventListener("submit", function(event) {
  event.preventDefault();

  let formValido = true;

  formStatus.textContent = "";

  const nomeValido = /^[A-Za-z0-9_-]{3,20}$/;
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  // Usuário
  if (!nomeValido.test(nome.value.trim())) {
    nomeError.textContent = "Usuário inválido";
    formValido = false;
  } else {
    nomeError.textContent = "";
  }


  // Email
  if (!emailValido.test(email.value.trim())) {
    emailError.textContent = "Digite um email válido";
    formValido = false;
  } else {
    emailError.textContent = "";
  }


  // Senha
  const regrasSenha = verificarSenha(senha.value);

  if (
    !regrasSenha.tamanho ||
    !regrasSenha.maiuscula ||
    !regrasSenha.numero ||
    !regrasSenha.especial
  ) {
    senhaError.textContent = "A senha não atende todos os requisitos";
    formValido = false;
  } else {
    senhaError.textContent = "";
  }


  // Confirmar senha
  if (confirmarSenha.value !== senha.value || confirmarSenha.value === "") {
    confirmarError.textContent = "As senhas não coincidem";
    formValido = false;
  } else {
    confirmarError.textContent = "";
  }


  // Termos
  if (!termos.checked) {
    termosError.textContent = "Você precisa aceitar os termos";
    formValido = false;
  } else {
    termosError.textContent = "";
  }


  // Se estiver tudo certo
  if (formValido) {
    formStatus.textContent = "Criando conta...";
    botao.textContent = "CRIANDO CONTA...";
    botao.disabled = true;

    setTimeout(function() {
      formStatus.textContent = "Conta criada com sucesso";
      botao.textContent = "CONTA CRIADA ✓";

      form.reset();
      atualizarForcaSenha();

      botoesSenha.forEach(function(botaoSenha) {
        const input = document.getElementById(botaoSenha.dataset.target);

        input.type = "password";
        botaoSenha.textContent = "MOSTRAR";
      });

      setTimeout(function() {
        botao.textContent = "CRIAR CONTA";
        botao.disabled = false;
      }, 1500);

    }, 1500);
  }
});
