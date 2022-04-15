// Função para fazer um Fetch na API
const fetchAPI = (path, method, body, token) => {
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

// Criar nova tarefa
// Capturar o formulário de nova tarefa
const formTarefa = document.querySelector(".nova-tarefa");

formTarefa.addEventListener("submit", event => {
	event.preventDefault();
	
	// Pegar o valor do input
	const tarefa = document.getElementById("novaTarefa").value;

	let body = {
		description: tarefa,
		completed: false
	}

	// Fetch na API > enviando os dados do input
	let criarTarefa = fetchAPI('/tasks', 'POST', body, token);
	criarTarefa
	.then(res => res.json())
	.then(data => console.log(data));


		
	console.log(criarTarefa);

	// listarTarefas
	// .then(res => res.json())
	// .then(data => console.log(data));
});

// Função para Listar Tarefas
let listarTarefas = fetchAPI('/tasks', 'GET', '', token);

listarTarefas
.then(res => res.json())
.then(data => console.log(data));

// Função para Apagar uma Tarefa
// Refatorar usando a fetchAPI() mantendo o id da tarefa
let apagarTarefa = (token, id) => {
	let api = `https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`;
	return fetch(api, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
      		"authorization": token
	  	}
  	});
};

/* funcao para mudar o status da tarefa -- Walysson */
/* funcao para deslogar -- Caroline */
