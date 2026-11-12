document.addEventListener("DOMContentLoaded", () => {
  const inputCep = document.getElementById("cep");
  const btnBuscarCep = document.getElementById("btn-buscar-cep");
  const statusCep = document.getElementById("status-cep");
  const erroCep = document.getElementById("erro-cep");

  const inputRua = document.getElementById("rua");
  const inputBairro = document.getElementById("bairro");
  const inputCidade = document.getElementById("cidade");
  const inputEstado = document.getElementById("estado");

  if (!inputCep || !btnBuscarCep) return;

  // Máscara automática para CEP (00000-000)
  inputCep.addEventListener("input", () => {
    let valor = inputCep.value.replace(/\D/g, "").slice(0, 8);
    if (valor.length > 5) {
      valor = valor.replace(/^(\d{5})(\d{1,3})/, "$1-$2");
    }
    inputCep.value = valor;
  });

  async function buscarCep() {
    const cepLimpo = inputCep.value.replace(/\D/g, "");
    erroCep.textContent = "";
    inputCep.removeAttribute("aria-invalid");

    // Validação antes da requisição
    if (!/^\d{8}$/.test(cepLimpo)) {
      erroCep.textContent = "Digite um CEP com 8 números.";
      inputCep.setAttribute("aria-invalid", "true");
      statusCep.textContent = "";
      inputCep.focus();
      return;
    }

    btnBuscarCep.disabled = true;
    statusCep.textContent = "Buscando endereço...";

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      if (!response.ok) {
        throw new Error("Falha na requisição");
      }

      const dados = await response.json();

      if (dados.erro) {
        statusCep.textContent = "";
        erroCep.textContent = "Não encontramos esse CEP. Confira os números e tente novamente.";
        inputCep.setAttribute("aria-invalid", "true");
        return;
      }

      inputRua.value = dados.logradouro || "";
      inputBairro.value = dados.bairro || "";
      inputCidade.value = dados.localidade || "";
      inputEstado.value = dados.uf || "";

      statusCep.textContent = `Endereço localizado: ${dados.logradouro || "Logradouro não informado"}, ${dados.bairro || "Bairro não informado"} - ${dados.localidade}/${dados.uf}.`;
    } catch (erro) {
      statusCep.textContent = "";
      erroCep.textContent = "Não foi possível consultar o CEP agora. Tente novamente em instantes.";
    } finally {
      btnBuscarCep.disabled = false;
    }
  }

  btnBuscarCep.addEventListener("click", buscarCep);
});