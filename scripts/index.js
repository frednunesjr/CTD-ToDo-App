const campos	= document.querySelectorAll("[required]");
const form		= document.querySelector("form");

//funcao que valida os campos e exibe mensagem de obrigatorio
const invalidListener = function(event){
	event.preventDefault();
	
	//objeto mensagem com os estados de validacao da mensagem
	let mensagem = {
		email: {
			typeMismatch: "Preencha um e-mail válido",
			patternMismatch: "Preencha um e-mail válido",
			valueMissing: "Este campo é obrigatório",
		},
		password: {
			patternMismatch: "Sua senha deve conter entre 6 e 10 caracteres",
			valueMissing: "Este campo é obrigatório",
		}
	}
	
	//verifica os erros nos campos (vazio)
	for(let erro in this.validity){
		
		if(this.validity[erro] && !this.validity.valid){
			// campo.setCustomValidity(mensagem[campo.type][erro]);
			//mensagem customizada da caixa
			let spanErro				= this.parentNode.querySelector(".inputError");
			spanErro.style.visibility	= "visible";
			spanErro.textContent		= mensagem[this.type][erro];
			this.style.borderColor 		= "red";
		}
	}
}

const limparValidacao = function(){
	let spanErro = this.parentNode.querySelector(".inputError");
	spanErro.style.visibility	= "hidden";
	this.removeAttribute("style");
}

for(let campo of campos) {
	["invalid", "blur"].forEach(event => {
		campo.addEventListener(event, invalidListener);
	});
	
	campo.addEventListener("keydown", limparValidacao);
} 

form.addEventListener("submit", event => {
	//console.log("enviar o formulario");
	
	//previne o envio do formulario
	event.preventDefault();
	
	let email = document.querySelector("#email");
	let senha = document.querySelector("#senha");
	
	let dadosUsuario = {
		email: 		email.value,
		password: 	senha.value
	}
	
	let api = "https://ctd-todo-api.herokuapp.com/v1/users/login";
	let promessa = fetch(api, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(dadosUsuario)
	});

	promessa
	.then((res) => {
		let status = res.status.toString()[0]
		switch(status){
			case "4":
				throw "Usuário ou Senha Incorretos";
			case "2":
				return res.json();
			default:
				throw "Ocorreu um erro inesperado, tente novamente em instantes";
		}
	})
	.then((data) => {
		if(data) {
			let token = data.jwt;
			localStorage.setItem('token', token);
			window.location.href = "./tarefas.html";
		} else {
			throw "Ocorreu um erro inesperado, tente novamente em instantes";
		}
	})
	.catch((err) => {
		let spanErro	= form.querySelector(".loginError");
		spanErro.textContent = err;
		spanErro.style.visibility = "visible";
	});

});