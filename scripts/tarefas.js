import u from './utils.js'; // Utils importada como módulo

/**
 * --------------------------------------------
 * 					FUNÇÕES
 * --------------------------------------------
 */

// Função para alterar o status da tarefa -> Walysson
const tarefaPUT = (id, status) => u.fetchAPI(`/tasks/${id}`, "PUT", {completed: status});

// Função para apagar uma tarefa
const tarefaDELETE = (id, token) => u.fetchAPI(`/tasks/${id}`, "DELETE", null);

// Event Listener para Concluir a Tarefa
const concluirTarefa = function(){

	let parent 	= this.parentNode;
	let id 		= parent.id;

	tarefaPUT(id, true)
		.then(resposta => resposta.json())
		.then(dados => {
			parent.remove();
			blocoTarefa(dados, { destino: ".tarefas-terminadas" });
		})
		.catch(err => console.log(err));
}

// Event Listener para Excluit a Tarefa
const excluirTarefa = function(){

	let id = this.parentNode.parentNode.parentNode.id;
	tarefaDELETE(id)
		.then(resposta => {
			if(resposta.ok)
				this.parentNode.parentNode.parentNode.remove()
		})
		.catch(err => console.log(err));
}

// Função para desfazer conclusao da tarefa
const inconcluirTarefa = function(){
	let parent 	= this.parentNode.parentNode.parentNode;
	let id 		= parent.id;

	tarefaPUT(id, false)
		.then(resposta => resposta.json())
		.then(dados => {
			parent.remove();
			blocoTarefa(dados, { destino: ".tarefas-pendentes", divStatus: "not-done" });
		})
}

// Função para criar um bloco <li> com uma tarefa
const blocoTarefaOptions = {
	destino: ".tarefas-pendentes",
	divStatus: "not-done",
	append: true
}

const blocoTarefa = (data, options = blocoTarefaOptions) => {
	let ul = u.selectElement(options.destino);

	let li 					= u.createElement("li");
	li.className 			= "tarefa";
	li.id 					= data.id;

	let divStatus 			= u.createElement("div");
	divStatus.className 	= options.divStatus;

	let divDescricao 		= u.createElement("div");
	divDescricao.className 	= "descricao";

	let pDescricao 			= u.createElement("p");
	pDescricao.className 	= "nome"
	pDescricao.textContent	= data.description;

	let pTimestamp 			= u.createElement("p");
	pTimestamp.className 	= "timestamp";

	let timestampToDate		= new Date(data.createdAt).toLocaleDateString("pt-BR");
	pTimestamp.textContent	= `Criada em ${timestampToDate}`;

	let spanActions			= u.createElement('span');
	
	if(options.destino == ".tarefas-pendentes"){
		spanActions.innerHTML	= "<i class='fas fa-trash'></i>"
		divStatus.addEventListener("click", concluirTarefa);
	} else {
		spanActions.innerHTML	= "<i class='fas fa-trash'></i> <i class='fas fa-undo'></i>";
		let botaoInconcluir = spanActions.querySelector(".fa-undo");
		botaoInconcluir.addEventListener("click", inconcluirTarefa); 
	}
	
	let botaoExcluir = spanActions.querySelector(".fa-trash");
	botaoExcluir.addEventListener("click", excluirTarefa);

	
	divDescricao.appendChild(pDescricao);
	divDescricao.appendChild(pTimestamp);
	divDescricao.appendChild(spanActions);

	li.appendChild(divStatus);
	li.appendChild(divDescricao);

	options.append ? ul.appendChild(li) : ul.prepend(li);

}

/**
 * --------------------------------------------
 * 					AÇÕES
 * --------------------------------------------
 */

// Conferir se o usuário está logado
u.estaLogado();

// Exibir dados do usuário na tela
u.fetchAPI("/users/getMe", "GET", "")
	.then(res => res.json())
	.then( dados => {
		const divUsuario 		 = u.selectElement(".user-info");
		const pNomeUsuario		 = divUsuario.querySelector("p");
		pNomeUsuario.textContent = `${dados.firstName} ${dados.lastName}`
	});

// Obtém a lista de tarefas
let obterTarefas = await u.fetchAPI('/tasks', 'GET', '');
let listaTarefas = await obterTarefas.json();

// Selecionar o skeleton e remove ele
let skeleton = u.selectElementId("skeleton");
skeleton.remove();

// Para cada item da lista de tarefas, gerar um bloco <li>
if(listaTarefas.length) {

	listaTarefas.forEach(data => {
		data.completed
		? blocoTarefa(data, { destino: ".tarefas-terminadas" })
		: blocoTarefa(data);
	});
}

// Capturar o formulário de nova tarefa
const formTarefa = u.selectElement(".nova-tarefa");

// Criar nova tarefa
formTarefa.addEventListener("submit", event => {

	event.preventDefault();

	// Pegar o valor do input
	const tarefa = u.selectElementId("novaTarefa");

	if (tarefa.value.trim().length > 0) {
		//dados da tarefa
		let descriptionTarefa = {
			description: tarefa.value,
			completed: false
		}

		// Fetch na API > enviando os dados do input
		let criarTarefa = u.fetchAPI('/tasks', 'POST', descriptionTarefa);
		criarTarefa
			.then(res => res.json())
			.then(data => {
				blocoTarefa(data, { destino: ".tarefas-pendentes", divStatus: "not-done", append: false });
			});
		
		formTarefa.reset();
	} else {
		tarefa.style.borderColor = "red";
		tarefa.style.backgroundColor = "rgba(255,0,0,0.1)"
		alert("Informar uma tarefa no campo - Nova Tarefa");
	}
});

// Listener para deslogar o usuário
const closeApp = u.selectElementId("closeApp");
closeApp.addEventListener("click", _ => {
	localStorage.removeItem("token");
	window.location.href = "/";
});
