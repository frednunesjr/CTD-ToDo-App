# Projeto To Do - Checkpoint II

Integrantes: Fredson Junior, Micheli Pinheiro, Wallyson Silva, Camila Ferreira, Caroline Bertoldo

MVP Checklist:

- Login (index.html)

  - [x] Campos devem ser obrigatórios
  - [x] Obter os dados preenchidos e realizar a chamada (fetch) de login
  - [x] Em caso de sucesso: Salvar o JWT em local ou session storage
  - [x] Em caso de sucesso: Redirecionar para tarefas.html
  - [x] Em caso de erro: Informar (ex. com alert) o usuário que ocorreu um erro

- Signup (signup.html)

  - [x] Campos devem ser obrigatórios
  - [x] Necessário validar igualdade dos campos senha e confirmar senha
  - [x] Obter os dados preenchidos e realizar a chamada (fetch) de cadastro
  - [x] Em caso de sucesso: Salvar o JWT em local ou session storage
  - [x] Em caso de sucesso: Redirecionar para tarefas.html
  - [x] Em caso de erro: Informar (ex. com alert) o usuário que ocorreu um erro

- Tarefas (tarefas.html)

  - [ ] Header: Obter dados do usuário para apresentar seu nome completo
  - [ ] Header: Botão Finalizar Sessão remove o JWT do storage e redireciona para index.html (quando for clicado)
  - [ ] Ao carregar a página, buscar as tarefas (get para /tasks) e exibir na lista
  - [ ] Form Nova Tarefa: Ao enviar uma nova tarefa, deve realizar um post para API (/tasks)
  - [ ] Quando uma tarefa for adicionada, a lista de tarefas deve ser atualizada
  - [ ] Quando uma tarefa for completada, deve realizar um put para API (tasks/ID_DA_TASK) alterando a chave completed para true

Melhorias:

- [x] Identificar campos invalidos com CSS (ex. borda vermelha)

---

Estrutura do projeto

Nosso projeto é baseado em HTML, sem utilização de modulos ou bundlers.

Pastas:

- assets: Contem os arquivos do projeto como imagens, fontes e vetores.
- scripts: Contem os arquivos javascript do projeto. Separados por tela.
