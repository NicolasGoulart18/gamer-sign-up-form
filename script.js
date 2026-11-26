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

const botao = form.querySelector('button[type="submit"]');


form.addEventListener("submit", function(event) {
  event.preventDefault();

  let formValido = true;

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
  if (senha.value.length < 8) {
    senhaError.textContent = "A senha precisa ter pelo menos 8 caracteres";
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
    botao.textContent = "CRIANDO CONTA...";
    botao.disabled = true;

    setTimeout(function() {
      botao.textContent = "CONTA CRIADA ✓";

      form.reset();

      setTimeout(function() {
        botao.textContent = "CRIAR CONTA";
        botao.disabled = false;
      }, 1500);

    }, 1500);
  }
});