function ajusteSalarial(){
	var input = document.getElementById("salario");
	var salario = parseInt(input.value);
	var resultado = document.querySelector("#p1");
	resultado.textContent = salario +(salario*reajuste);

	console.log(salario);
	//console.log(input.textContent);
	//console.log(salario);


}