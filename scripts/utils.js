let token = localStorage.getItem("token");
let pagina = window.location.pathname;

if (!token && pagina == '/tarefas.html'){
    window.location.href = "./index.html";
} else if(token && pagina != '/tarefas.html') {
    window.location.href = "./tarefas.html";
}