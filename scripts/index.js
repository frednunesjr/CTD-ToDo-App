/* CRIACAO DAS FUNCOES */

//seleciona os elementos por ID
function selectId(id){
    return document.getElementById(id)
}

function vazia(entrada){
    return entrada.value.trim() === "";
}

function errorMessage(message){
    errorListUl.innerHTML += "<li>" + message + "</li>";
}
/* ---------------------------------------------*/


//variaveis e seletores por ID
let form = selectId('login');
let email = selectId('inputEmail');
let senha = selectId('inputPassword');
let errorListUl = document.querySelector('#error-list ul');



/*----------------------------------------------*/


//evento de submissão do formulario
form.addEventListener("submit", function (ev){
    
    ev.preventDefault();

    errorListUl.innerHTML = '';

    if(vazia(email)){
        errorMessage("Campo <b>email</b> não preenchido");
      
    }

    if(vazia(senha)){
        errorMessage("Campo <b>senha</b> não preenchido");
    
    }

});
