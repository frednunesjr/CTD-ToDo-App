//funcao selecao por query
const selectElement = (element) => {
	return document.querySelector(element);
}

//funcao selecao por Id
const selectElementId = (elementId) => {
	return document.getElementById(elementId).value;
}

// Capturar o formulário de nova tarefa
const formTarefa = selectElement(".nova-tarefa");

//funcao de criacao dos elementos
function createNode(element){
	return document.createElement(element);
}


//funcao de apensar os filhos
function append(parent, el){
	return parent.appendChild(el);
}


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
formTarefa.addEventListener("submit", event => {
	event.preventDefault();
	
	// Pegar o valor do input
	const tarefa = selectElementId("novaTarefa");
	//mostrar os dados
	const showData = (result) => {
		for(const campo in result){
			if(selectElement('#'+campo)){
				selectElement('#'+campo).textContent = result[campo];
			}
			//console.log(campo);
		}
	}
	//dados da tarefa
	let descriptionTarefa = {
		description: tarefa,
		completed: false
	}

	


	// Fetch na API > enviando os dados do input
	let criarTarefa = fetchAPI('/tasks', 'POST', descriptionTarefa, token);
	criarTarefa
	.then(res => res.json())
	.then(data => showData(data));


});

	
	
	/*------ funcao para mostrar as tarefas no html -----*/
	
	//secao que acomoda todas as tarefas pendentes
	
	
	let listarTarefas = fetchAPI('/tasks', 'GET', '', token);
	listarTarefas
	.then(res => res.json())
	.then(data => console.log(data));
		//atribuirCampos(data);
	//});

//funcao para atribuir aos campos
// function atribuirCampos(data){
	
	
	
// 	let addTimeStamp = selectElement('.timestamp');
// 	console.log(data);
	//addNewTarefa.value = data.description;
	//addTimeStamp.value = data.completed;




	

	// <div id="skeleton">
  //     <li class="tarefa">
  //       <div class="not-done"></div>
  //       <div class="descricao">
  //         <p class="nome">Nova tarefa</p>
  //         <p class="timestamp">Criada em: 15/07/21</p>
  //       </div>
  //     </li>
	//<input id="novaTarefa" type="text" placeholder="Nova tarefa">

// Função para Listar Tarefas
// let listarTarefas = fetchAPI('/tasks', 'GET', '', token);

// listarTarefas
// .then(res => res.json())
// .then(data => console.log(data));



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
