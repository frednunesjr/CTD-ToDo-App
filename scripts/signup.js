window.onload = () => {

	/*
	* Criada uma função para selecionar os elementos
	*/
	const selectElement = (element) => {
		return document.querySelector(element);
	}
	
	/**
	 * Selecionado os elementos do formulário para validação
	 */
	let formulario		= selectElement("form");
	let nomeCompleto	= selectElement("#nomeCompleto");
	let apelido			= selectElement("#apelido");
	let email			= selectElement("#email");
	let senha 			= selectElement("#senha");
	let senhaValidacao	= selectElement("#senhaValidacao");

	const validaCampo = (input, erroMsg, test) => {
		input.classList.add("error");
		let erroAviso = document.createElement('small');
		erroAviso.innerText = erroMsg;
		input.after(erroAviso);
	}

	const limparCampo = (campo) => {
		if (campo.classList.contains("error")) {
			campo.classList.remove("error");
			campo.parentNode.removeChild(campo.nextSibling);
		}
	};

	nomeCompleto.addEventListener("keyup", function(evento) {
		limparCampo(this);
	});

	apelido.addEventListener("keyup", function(evento) {
		limparCampo(this);
	});

	email.addEventListener("keyup", function(evento) {
		limparCampo(this);
	});

	senha.addEventListener("keyup", function(evento) {
		limparCampo(this);
	});

	senhaValidacao.addEventListener("keyup", function(evento) {
		limparCampo(this);
	});

	/* -- Cria comando de escuta do botão submit  -- */ 
	formulario.addEventListener("submit", function(evento) {
	
		evento.preventDefault();
		
		limparCampo(nomeCompleto);
		limparCampo(apelido);
		limparCampo(email);
		limparCampo(email);
		limparCampo(senha);
		limparCampo(senhaValidacao);

		let regExpnomeCompleto = /\s/; 
		if(nomeCompleto.value === "") {
			/* -- Verifica se o campo nome foi preenchido  -- */
			validaCampo(nomeCompleto, "O campo e nome está vazio");
		} else if (!regExpnomeCompleto.test(nomeCompleto.value)) {
			/* -- Verifica se o nome completo contêm ao menos duas palavras (nome e sobrenome) -- */
			validaCampo(nomeCompleto, "O campo nome precisa ser preenchido com nome e sobrenome.");
		}

		/* -- Verificando se o apelido contém ao menos dois caracteres -- */
		let regExpApelido = /\w{2,}/gi;
		if (!regExpApelido.test(apelido.value)) {
			validaCampo(apelido, "O apelido deve conter no mínimo 2 caractares.");
		}

		/* -- Verifica se o e-mail está correto, tentei criar um RegExp que verifica se o e-mail começa e termina com as seguintes características:
		- aceita qualquer caracter alfanumérico "\w" , ponto "\.", hifen "-", underline "_" e pode existir mais de uma vez "+"
		- precisa ter o arroba "@"
		- precisa ter o provedor sendo qualquer caracter alfanumérico "\w+"
		- precisa ter o ponto (do .com) "\."
		- precisa ter o com ou com.br "com(\.br)?" ou net "|net" -- */
		let regExpEmail = /^(\w|\.|-|_)+@\w+\.(com(\.br)?|net)$/gi;
		if (!regExpEmail.test(email.value)){
			validaCampo(email, "O e-mail informado não é válido.");
		}

		/* -- Verifica se a senha possui ao menos 6 dígitos -- */
		let regExpSenha = /^\w{6,10}$/;
		if (!regExpSenha.test(senha.value)) {
			validaCampo(senha, "Você deve informar uma senha de 6 números.");
		}

		/* -- Verifica se a senhaValidacao é igual a senha -- */
		if (senha.value !== senhaValidacao.value) {
			validaCampo(senhaValidacao, "A senha é diferente da informada no campo anterior");
		}
	});
}