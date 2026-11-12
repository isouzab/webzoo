document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-cadastro");
  if (!form) return;

  const inputNome = document.getElementById("nome");
  const inputEmail = document.getElementById("email");
  const inputTelefone = document.getElementById("telefone");
  const inputCep = document.getElementById("cep");
  const inputRua = document.getElementById("rua");
  const inputNumero = document.getElementById("numero");
  const inputBairro = document.getElementById("bairro");
  const inputCidade = document.getElementById("cidade");
  const inputEstado = document.getElementById("estado");
  const selectAssunto = document.getElementById("assunto");
  const textareaMensagem = document.getElementById("mensagem");
  const contadorMsg = document.getElementById("contador-msg");
  const checkAceite = document.getElementById("aceite");
  const boxSucesso = document.getElementById("form-sucesso");

  // Máscara de telefone
  inputTelefone.addEventListener("input", () => {
    let tel = inputTelefone.value.replace(/\D/g, "").slice(0, 11);
    if (tel.length > 6) {
      tel = tel.replace(/^(\d{2})(\d{4,5})(\d{4})/, "($1) $2-$3");
    } else if (tel.length > 2) {
      tel = tel.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
    }
    inputTelefone.value = tel;
  });

  // Contador de caracteres da mensagem
  textareaMensagem.addEventListener("input", () => {
    const tamanho = textareaMensagem.value.trim().length;
    contadorMsg.textContent = `${tamanho} caracteres (mínimo 10)`;
  });

  function definirErro(campo, idSpanErro, mensagem) {
    const span = document.getElementById(idSpanErro);
    if (mensagem) {
      campo.setAttribute("aria-invalid", "true");
      span.textContent = mensagem;
      return false;
    } else {
      campo.removeAttribute("aria-invalid");
      span.textContent = "";
      return true;
    }
  }

  form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    boxSucesso.hidden = true;
    boxSucesso.textContent = "";

    const erros = [];

    // 1. Nome
    const nomeVal = inputNome.value.trim();
    if (!nomeVal) {
      definirErro(inputNome, "erro-nome", "Preencha este campo.");
      erros.push(inputNome);
    } else if (nomeVal.split(" ").filter(Boolean).length < 2) {
      definirErro(inputNome, "erro-nome", "Informe o nome completo.");
      erros.push(inputNome);
    } else {
      definirErro(inputNome, "erro-nome", "");
    }

    // 2. E-mail
    const emailVal = inputEmail.value.trim();
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailVal) {
      definirErro(inputEmail, "erro-email", "Preencha este campo.");
      erros.push(inputEmail);
    } else if (!regexEmail.test(emailVal)) {
      definirErro(inputEmail, "erro-email", "Informe um e-mail válido, como nome@exemplo.com.");
      erros.push(inputEmail);
    } else {
      definirErro(inputEmail, "erro-email", "");
    }

    // 3. CEP
    const cepLimpo = inputCep.value.replace(/\D/g, "");
    if (!/^\d{8}$/.test(cepLimpo)) {
      definirErro(inputCep, "erro-cep", "Digite um CEP com 8 números.");
      erros.push(inputCep);
    } else {
      definirErro(inputCep, "erro-cep", "");
    }

    // 4. Endereço obrigatório
    const camposEndereco = [
      { campo: inputRua, erroId: "erro-rua" },
      { campo: inputNumero, erroId: "erro-numero" },
      { campo: inputBairro, erroId: "erro-bairro" },
      { campo: inputCidade, erroId: "erro-cidade" },
      { campo: inputEstado, erroId: "erro-estado" }
    ];

    camposEndereco.forEach(({ campo, erroId }) => {
      if (!campo.value.trim()) {
        definirErro(campo, erroId, "Preencha este campo.");
        erros.push(campo);
      } else {
        definirErro(campo, erroId, "");
      }
    });

    // 5. Assunto
    if (!selectAssunto.value) {
      definirErro(selectAssunto, "erro-assunto", "Selecione um assunto.");
      erros.push(selectAssunto);
    } else {
      definirErro(selectAssunto, "erro-assunto", "");
    }

    // 6. Mensagem
    const msgVal = textareaMensagem.value.trim();
    if (!msgVal) {
      definirErro(textareaMensagem, "erro-mensagem", "Preencha este campo.");
      erros.push(textareaMensagem);
    } else if (msgVal.length < 10) {
      definirErro(textareaMensagem, "erro-mensagem", "Escreva uma mensagem com pelo menos 10 caracteres.");
      erros.push(textareaMensagem);
    } else {
      definirErro(textareaMensagem, "erro-mensagem", "");
    }

    // 7. Aceite
    if (!checkAceite.checked) {
      definirErro(checkAceite, "erro-aceite", "Marque a caixa de aceite para continuar.");
      erros.push(checkAceite);
    } else {
      definirErro(checkAceite, "erro-aceite", "");
    }

    if (erros.length > 0) {
      erros[0].focus();
      return;
    }

    // Sucesso sem alert() e com textContent seguro
    boxSucesso.textContent = "";
    const p1 = document.createElement("p");
    const strong = document.createElement("strong");
    strong.textContent = `Cadastro recebido! Obrigado por participar do WebZoo, ${nomeVal}.`;
    p1.appendChild(strong);

    const p2 = document.createElement("p");
    p2.textContent = "Este formulário é demonstrativo: nenhum dado foi enviado ou armazenado.";

    boxSucesso.appendChild(p1);
    boxSucesso.appendChild(p2);
    boxSucesso.hidden = false;
    boxSucesso.focus();

    form.reset();
    contadorMsg.textContent = "0 caracteres (mínimo 10)";
  });
});