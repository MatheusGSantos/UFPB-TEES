var entrada = prompt("informa um  número");
var numero1 = parseInt(entrada);
entrada = prompt("informa outro  número");
var numero2 = parseInt(entrada);

var operacao = document.querySelector("#operacaoSum");
operacao.textContent = numero1 + " + " + numero2;
var resultado = document.querySelector("#resultadoSum");
resultado.textContent = numero1 + numero2;
