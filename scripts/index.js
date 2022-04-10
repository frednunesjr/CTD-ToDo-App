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
		
		let spanErro	= this.parentNode.querySelector(".inputError");
		if(this.validity[erro] && !this.validity.valid && !spanErro){
			// campo.setCustomValidity(mensagem[campo.type][erro]);
			let spanErro 	= document.createElement('span');
			
			//mensagem customizada da caixa
			let textoErro	= document.createTextNode(mensagem[this.type][erro]);
			spanErro.classList.add('inputError');
			spanErro.appendChild(textoErro);
			this.parentNode.appendChild(spanErro);
			this.style.borderColor = "red";
		}
	}
}

const limparValidacao = function(){
	let spanErro = this.parentNode.querySelector(".inputError");
	if(spanErro)
	this.parentNode.removeChild(spanErro);
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
	
	let email = document.querySelector("#inputEmail");
	let senha = document.querySelector("#inputPassword");
	
	let dadosUsuario = {
		email: email.value,
		password: senha.value
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
			const token = data.jwt;
			localStorage.setItem('token', token);
			window.location.href = "./tarefas.html";
		} else {
			throw "Ocorreu um erro inesperado, tente novamente em instantes";
		}
	})
	.catch((err) => {
		let spanErro	= form.querySelector(".inputError");
		
		if(!spanErro) {
			let spanErro 	= document.createElement('span');
			let textoErro	= document.createTextNode(err);
			spanErro.classList.add('inputError');
			spanErro.appendChild(textoErro); 
			form.appendChild(spanErro);
		} else {
			spanErro.textContent = err;
		}
	});
})