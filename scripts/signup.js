window.onload = () => {/* -- Chama variaveis do html  -- */ 
    let validaNomeCompleto  = document.getElementById("nomeCompleto");
    let validaApelido       = document.getElementById("apelido");
    let validaEmail         = document.getElementById("email");
    let validaSenha         = document.getElementById("senha");
    let validaSenhaValidacao = document.getElementById("senhaValidacao");
    let formulario         = document.querySelector("form");

    const limparCampo = (campo) => {
        if (campo.classList.contains("error")) {
            campo.classList.remove("error");
            campo.nextSibling.remove();
        }
    };

    validaNomeCompleto.addEventListener("keyup", function(evento) {
        limparCampo(validaNomeCompleto);
    })

    validaApelido.addEventListener("keyup", function(evento) {
        limparCampo(validaNomeCompleto);
    })

        /* -- Cria comando de escuta do botão submit  -- */ 
    formulario.addEventListener("submit", function(evento) {
    
        evento.preventDefault();
        
        limparCampo(validaApelido);
        limparCampo(validaEmail);
        limparCampo(validaEmail);
        limparCampo(validaSenha);
        limparCampo(validaSenhaValidacao);

        /* -- Verifica se o campo nome foi preenchido  -- */ 
        if(validaNomeCompleto.value === "") {
            validaNomeCompleto.classList.add("error");
            const erro = document.createElement('small');
            erro.innerText = "O campo de nome está vazio.";
            validaNomeCompleto.after(erro);
        }
        
        /* -- Verifica se o nome completo contêm ao menos duas palavras (nome e sobrenome) -- */
        let regExpValidaNomeCompleto = /\s/; 
        if (regExpValidaNomeCompleto.test(validaNomeCompleto) == 0) {
            validaNomeCompleto.classList.add("error");
            const erro = document.createElement('small');
            erro.innerText = "O campo nome precisa ser preenchido com nome e sobrenome.";
            validaNomeCompleto.after(erro);
        }

        /* -- Verificando se o apelido contém ao menos dois caracteres -- */
        let regExpApelido = /\w{2,}/gi;
        if (regExpApelido.test(validaApelido) < 2) {
            validaApelido.classList.add("error");
            const erro = document.createElement('small');
            erro.innerText = "O apelido deve conter no mínimo 2 caractares.";
            validaApelido.after(erro);
        }

        /* -- Verifica se o e-mail está correto, tentei criar um RegExp que verifica se o e-mail começa e termina com as seguintes características:
        - aceita qualquer caracter alfanumérico "\w" , ponto "\.", hifen "-", underline "_" e pode existir mais de uma vez "+"
        - precisa ter o arroba "@"
        - precisa ter o provedor sendo qualquer caracter alfanumérico "\w+"
        - precisa ter o ponto (do .com) "\."
        - precisa ter o com ou com.br "com(\.br)?" ou net "|net" -- */
        let regExpEmail = /^(\w|\.|-|_)@\w+\.(com(\.br)?|net)$/gi;
        if (regExpEmail.test(validaEmail)){
            //email válido
        } else {
            validaEmail.classList.add("error");
            const erro = document.createElement('small');
            erro.innerText = "O e-mail informado não é válido.";
            validaEmail.after(erro);
        }
        
        /* -- Verifica se a senha possui ao menos 6 dígitos -- */
        let regExpSenha = /\d{6}/;
        if (regExpSenha.test(validaSenha) != 6) {
            validaSenha.classList.add("error");
            const erro = document.createElement('small');
            erro.innerText = "Você deve informar uma senha de 6 números.";
            validaSenha.after(erro);
        }

        /* -- Verifica se a senhaValidacao é igual a senha -- */

    });
}