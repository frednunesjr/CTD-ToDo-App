//pega todos os campos com required
const campos = document.querySelectorAll("[required]");

//funcao que valida os campos e exibe mensagem de obrigatorio
function validaCampo(campo){
  //funcao que verifica os erros nos campos (vazio)
  function verificaErros(){
    let encontraErro = false;

    for(const erro in campo.validity){
      if(campo.validity[erro] && !campo.validity.valid){
        encontraErro = erro;
      }
    }

    return encontraErro;
  }

  //funcao de customizacao da mensagem
  function customizarMessagem(typeError){
    //objeto mensagem com os estados de validacao da mensagem
    const messagens = {
      password: {
        valueMissing: "Campo precisa ser preenchido"
      },
      email: {
        valueMissing: "Email é obrigatório",
        typeMismatch: "Preencha um email válido"
      }
    }
    //retornando o objeto messagens e a chave com type password ou email
    return messagens[campo.type][typeError]
  }

  //mensagem customizada da caixa
  function setMessagem(message = "Campo obrigatorio"){
    const spanErro = campo.parentNode.querySelector("span.error");
    //condicional que ativa a mensagem de texto e remove quando estiver preenchido
    if(message){
      spanErro.classList.add("active");
      spanErro.innerHTML = message;
    } else{
      spanErro.classList.remove("active");
      spanErro.innerHTML = "";
    }
    
  }
  //retorna a funcao para mensagem customizavel
  return function(){

    if(verificaErros()){
      const message = customizarMessagem(verificaErros());
      campo.style.borderColor = "red";
      setMessagem(message);
    } else {
      campo.style.borderColor = "green";
      setMessagem("");
    }
  }
}


//funcao que valida o campo email e senha
function valida(event){
  const campo = event.target;
  const validacao = validaCampo(campo);
  validacao();
}

for(let campo of campos){
  campo.addEventListener("invalid", event => {
    event.preventDefault();
    valida(event);
  });
  campo.addEventListener("blur", valida);
  
}
document.querySelector("form").addEventListener("submit", event => {
  //console.log("enviar o formulario");

  //previne o envio do formulario
  event.preventDefault();

  let email = document.querySelector("#inputEmail");
  let senha = document.querySelector("#inputPassword");

  let dadosUsuario = {
    email: email.value,
    password: senha.value
  }

  // let api = ;
  let promessa = fetch("https://ctd-todo-api.herokuapp.com/v1/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dadosUsuario)
  });

  promessa
  .then(function(res){
    return res.json();
  })
  .then(function(data){
    const token = data.jwt;
			localStorage.setItem('token', token);
			console.log(data)
  })
  .catch(function(err){
    console.log(err)
  })

})