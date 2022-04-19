//funcao selecao por query
const selectElement = element => {
  return document.querySelector(element)
}

//funcao selecao por Id
const selectElementId = elementId => {
  return document.getElementById(elementId).value
}

// Capturar o formulário de nova tarefa
const formTarefa = selectElement('.nova-tarefa')

// Função para fazer um Fetch na API
const fetchAPI = (path, method, body, token) => {
  let api = `https://ctd-todo-api.herokuapp.com/v1${path}` // Define o caminho da API
  let headers = {} // Cabeçalhos vazios

  // Se houver token, envia o token no cabeçalho
  // Do contrário, só envia o Content Type
  if (token) {
    headers = {
      'Content-Type': 'application/json',
      authorization: token
    }
  } else {
    headers = {
      'Content-Type': 'application/json'
    }
  }

  // Se houver um corpo, envia o corpo na requisição
  // Do contrário não envia corpo
  if (body) {
    return fetch(api, {
      method: method,
      headers: headers,
      body: JSON.stringify(body)
    })
  } else {
    return fetch(api, {
      method: method,
      headers: headers
    })
  }
}

// Criar nova tarefa
formTarefa.addEventListener('submit', event => {
  event.preventDefault()
  // Pegar o valor do input
  const tarefa = selectElementId('novaTarefa')
  //dados da tarefa
  let descriptionTarefa = {
    description: tarefa,
    completed: false
  }

  // Fetch na API > enviando os dados do input
  let criarTarefa = fetchAPI('/tasks', 'POST', descriptionTarefa, token)
  criarTarefa
    .then(res => res.json())
    .then(data => {
      //console.log('Descricao: ' + data.description);
      //console.log(data.createdAt);
      const taskSkeleton = selectElement('.test');

      const liTarefa = document.createElement('li');
      liTarefa.classList.add('tarefa');

      const divTarefa = document.createElement('div');
      divTarefa.classList.add('not-done');

      const divDescricaoTarefa = document.createElement('div');
      divDescricaoTarefa.classList.add('descricao');

      const pNomeTarefa = document.createElement('p');
      pNomeTarefa.classList.add('nome');
      pNomeTarefa.innerText = data.description;

      const pTimeStamp = document.createElement('p');
      pTimeStamp.classList.add('timestamp');
      pTimeStamp.innerText = data.createdAt;


      divDescricaoTarefa.appendChild(pNomeTarefa);
      divDescricaoTarefa.appendChild(pTimeStamp);
      liTarefa.appendChild(divTarefa);
      liTarefa.appendChild(divDescricaoTarefa);

      taskSkeleton.appendChild(liTarefa);



      console.log({ taskSkeleton });


    });
});


/* funcao para mudar o status da tarefa -- Walysson */
/* funcao para deslogar -- Caroline*/