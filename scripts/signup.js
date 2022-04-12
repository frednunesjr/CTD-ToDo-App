/*
* Criada uma função para selecionar os elementos
*/
const selectElement = (element) => {
	return document.querySelector(element);
}

const selectAllElements = (elements) => {
	return document.querySelectorAll(elements);
}

const form				= selectElement("form");
const campos			= selectAllElements("[required]");
const nomeCompleto 		= selectElement("#nome");
const apelido			= selectElement("#sobrenome");
const email				= selectElement("#email");
const senha 			= selectElement("#senha");
const senhaValidacao	= selectElement("#senhaValidacao");

//funcao que valida os campos e exibe mensagem de obrigatorio
const invalidListener = function(event){
	event.preventDefault();
	
	//objeto mensagem com os estados de validacao da mensagem
	let mensagem = {
		email: {
			typeMismatch: "Preencha um e-mail válido",
			patternMismatch: "Preencha um e-mail válido",
			valueMissing: "Este campo é obrigatório"
		},
		password: {
			patternMismatch: "Sua senha deve conter entre 6 e 10 caracteres",
			tooShort: "Sua senha deve conter entre 6 e 10 caracteres",
			tooLong: "Sua senha deve conter entre 6 e 10 caracteres",
			valueMissing: "Este campo é obrigatório"
		},
		text: {
			valueMissing: "Este campo é obrigatório"
		}
	}
	
	//verifica os erros nos campos (vazio)
	let spanErro				= this.parentNode.querySelector(".inputError");
	
	for(let erro in this.validity){
		
		if(this.validity[erro] && !this.validity.valid){
			// campo.setCustomValidity(mensagem[campo.type][erro]);
			//mensagem customizada da caixa
			spanErro.style.visibility	= "visible";
			spanErro.textContent		= mensagem[this.type][erro];
			this.style.borderColor 		= "red";
		}
	}

	if(this.id == "senhaValidacao" && this.value != senha.value) {
		spanErro.style.visibility	= "visible";
		spanErro.textContent 		= "A senha digitada está diferente da primeira";
		this.style.borderColor 		= "red";
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

// Precisamos salvar o token no Local Storage
form.addEventListener("submit", event => {

	event.preventDefault();
	
	let dadosUsuario = {
		firstName: 	nomeCompleto.value,
		lastName: 	apelido.value,
		email: 		email.value,
		password: 	senha.value
	}

	let api = "https://ctd-todo-api.herokuapp.com/v1/users";
	let promessa = fetch(api, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(dadosUsuario)
	});
	
	promessa
	.then(function(res){
		let status = res.status.toString()[0]
		switch(status){
			case "4":
				throw "Já existe uma conta de usuário com esse e-mail";
			case "2":
				return res.json();
			default:
				throw "Ocorreu um erro inesperado, tente novamente em instantes";
		}
	})
	.then(function(data){
		if(data){
			let token = data.jwt;
			localStorage.setItem('token', token);
			window.location.href = "./tarefas.html";
		} else {
			throw "Ocorreu um erro inesperado, tente novamente em instantes";
		}
	})
	.catch(function(err){
		let spanErro	= form.querySelector(".formError");
		spanErro.textContent = err;
		spanErro.style.visibility = "visible";
	})
})