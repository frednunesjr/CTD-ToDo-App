const token = localStorage.getItem("token");
const pagina = window.location.pathname;

function estaLogado() {

    if (!token && pagina == '/tarefas.html'){
        window.location.href = "./index.html";
    } else if(token && pagina != '/tarefas.html') {
        window.location.href = "./tarefas.html";
    }
}

// Selecionar um Elemento via Tag, Id ou Classe
function selectElement(element) {
	return document.querySelector(element);
}

// Selecionar vários Elementos via Tag ou Classe
const selectAllElements = (elements) => {
	return document.querySelectorAll(elements);
}

// Selecionar Elemento por Id
function selectElementId(elementId) {
	return document.getElementById(elementId);
}

// Função para criar Elemento
function createElement(element) {
	return document.createElement(element);
}

//funcao de apensar os filhos
function append(parent, el) {
	return parent.appendChild(el);
}

// Função para fazer um Fetch na API
function fetchAPI(path, method, body, token) {
	let api = `https://ctd-todo-api.herokuapp.com/v1${path}`;  // Define o caminho da API
	let headers = {}; // Cabeçalhos vazios
	
	// Se houver token, envia o token no cabeçalho
	// Do contrário, só envia o Content Type
	if(token) {
		headers = {
			"Content-Type": "application/json",
			"authorization": token
		}
	} else {
		headers = {
			"Content-Type": "application/json",
		}
	}

	// Se houver um corpo, envia o corpo na requisição
	// Do contrário não envia corpo
	if(body) {
		return fetch(api, {
			method: method,
			headers: headers,
			body: JSON.stringify(body)
		});
	} else {
		return fetch(api, {
			method: method,
			headers: headers
		})
	}
}

export default {
	token, pagina, estaLogado, selectElement, selectAllElements, selectElementId, createElement, append, fetchAPI
}