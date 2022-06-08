var numero = 9.9;
var formatado = numero.toFixed(2);
formatado = "R$ " + formatado;
formatado = formatado.replace(".", ",");
console.log(formatado);
var texto = "R$ 120,35";
var soNumero = texto.replace("R$ ", "");
soNumero = soNumero.replace(",", ".");
var valor = parseFloat(soNumero);
console.log(valor);

numero = 9.9;
formatado = "R$ " + numero.toFixed(2).replace(".", ",");
console.log(formatado);

texto = "R$ 120,35";
valor = parseFloat(texto.replace("R$ ", "").replace(",", "."));
console.log(valor);