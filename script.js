const form = document.getElementById("signup-form");

const nome = document.getElementById("nome-devi");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const confirmarSenha = document.getElementById("confirmarSenha");
const termos = document.getElementById("termos");

form.addEventListener("submit", function(event) {
  event.preventDefault();
});