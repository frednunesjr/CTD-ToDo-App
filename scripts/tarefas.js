import u from './utils.js';

// Conferir se o usuário está logado
u.estaLogado();

// Exibir dados do usuário na tela
const dadosUsuario = u.fetchAPI("/users/getMe", "GET", "", u.token)
.then(res => res.json())
.then( dados => {
	const divUsuario 	= u.selectElement(".user-info");
	const pNomeUsuario	= divUsuario.querySelector("p");
	pNomeUsuario.textContent = `${dados.firstName} ${dados.lastName}`
})


// Listar as tarefas do usuário na tela e remover o skelleton
const blocoTarefaOptions = {
	destino: ".tarefas-pendentes",
	divStatus: "not-done",
	append: true
}

const blocoTarefa = (data, options = blocoTarefaOptions) => {
	let ul = u.selectElement(options.destino);

	let li = u.createElement("li");
	li.className = "tarefa";
	li.id = data.id;

	let divStatus = u.createElement("div");
	divStatus.className = options.divStatus;

	let divDescricao = u.createElement("div");
	divDescricao.className = "descricao";

	let pDescricao = u.createElement("p");
	pDescricao.className = "nome"
	pDescricao.textContent = data.description;

	let pTimestamp = u.createElement("p");
	pTimestamp.className = "timestamp";

	let timestampToDate = new Date(data.createdAt).toLocaleDateString("pt-BR");
	pTimestamp.textContent = `Criado em ${timestampToDate}`;

	divDescricao.appendChild(pDescricao);
	divDescricao.appendChild(pTimestamp);
	li.appendChild(divStatus);
	li.appendChild(divDescricao);
	if (options.append) {
		ul.appendChild(li);
	} else {
		ul.prepend(li);
	}
}

let obterTarefas = await u.fetchAPI('/tasks', 'GET', '', u.token);
let listaTarefas = await obterTarefas.json();

let skeleton = u.selectElementId("skeleton");
skeleton.removeAttribute("id");

let tarefasPendentes = u.selectElement(".tarefas-pendentes");
let tarefasSkeleton = u.selectAllElements(".tarefa");

tarefasSkeleton.forEach(item => tarefasPendentes.removeChild(item));

listaTarefas.reverse().forEach(data => {
	if (!data.completed)
		blocoTarefa(data)
	else
		blocoTarefa(data, { destino: ".tarefas-terminadas" })
});


// Função para alterar o status da tarefa -> Walysson
const tarefaStatus = (id, status) => {
	let body = {
		completed: status
	}

	return u.fetchAPI(`/tasks/${id}`, "PUT", body, u.token);
};

/* funcao para mudar o status da tarefa -- Walysson */
const botoesConcluir = u.selectAllElements('.not-done');
// Ao clicar, remover da lista de pendentes e mover para lista de concluidas (clone, remove, append)
botoesConcluir.forEach((botao, index) => {

	let listener = () => {
		let id = botao.parentNode.id;
		tarefaStatus(id, true)
			.then(resposta => resposta.json())
			.then(dados => {
				botao.parentNode.remove();
				blocoTarefa(dados, { destino: ".tarefas-terminadas" });
			})
			.catch(err => console.log(err));
	}

	if (index > 0) {
		botao.addEventListener('click', listener);
	}

});

// Capturar o formulário de nova tarefa
const formTarefa = u.selectElement(".nova-tarefa");

// Criar nova tarefa
formTarefa.addEventListener("submit", event => {

	event.preventDefault();

	// Pegar o valor do input
	const tarefa = u.selectElementId("novaTarefa").value;

	if (tarefa.trim().length > 0) {
		//dados da tarefa
		let descriptionTarefa = {
			description: tarefa,
			completed: false
		}

		// Fetch na API > enviando os dados do input
		let criarTarefa = u.fetchAPI('/tasks', 'POST', descriptionTarefa, u.token);
		criarTarefa
			.then(res => res.json())
			.then(data => {
				blocoTarefa(data, { destino: ".tarefas-pendentes", divStatus: "not-done", append: false });
			});
	} else {
		alert("Informar uma tarefa no campo - Nova Tarefa");
	}
});

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

// Função para deslogar -- Caroline
const deslogar = () => {
	localStorage.removeItem("token");
	window.location.href = "/";
}

const closeApp = u.selectElementId("closeApp");
closeApp.addEventListener("click", deslogar);
