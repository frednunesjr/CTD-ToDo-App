//recuperar o token do usuario logado salvo no navegador
let token = localStorage.getItem('token');

/* funcao para apagar uma tarefa */
// Precisa receber o token e o id da tarefa a ser deletada
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

//funcao para obter as lista de tarefas
/* listar tarefas no front*/
let api = "https://ctd-todo-api.herokuapp.com/v1/tasks";
let obterTarefa = fetch(api, {
	method: "GET",
	headers: {
		"Content-Type": "application/json",
		"authorization": token
	},
	//body: JSON.stringify(dadosUsuario)
});

//funcao para criar a lista de tarefas
