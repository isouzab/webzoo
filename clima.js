document.addEventListener("DOMContentLoaded", () => {
  const containerClima = document.getElementById("clima-resultado");
  const btnAtualizar = document.getElementById("btn-atualizar-clima");

  if (!containerClima) return;

  // Coordenadas do Zoológico de São Paulo (textos_de_apoio.txt)
  const LATITUDE = -23.65;
  const LONGITUDE = -46.62;
  const URL_API = `https://api.open-meteo.com/v1/forecast?latitude=${LATITUDE}&longitude=${LONGITUDE}&current=temperature_2m,precipitation&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=America%2FSao_Paulo&forecast_days=1`;

  function obterDicaClima(tempAtual, chanceChuva) {
    if (chanceChuva >= 50) {
      return "Dia chuvoso: leve capa de chuva. Alguns animais ficam mais ativos depois da chuva.";
    }
    if (tempAtual >= 27) {
      return "Dia quente: use protetor solar e boné e leve uma garrafa de água.";
    }
    if (tempAtual <= 17) {
      return "Dia frio: leve um agasalho. Vários animais gostam de tomar sol nas manhãs frias.";
    }
    return "Tempo firme: ótimo dia para percorrer todas as trilhas com calma.";
  }

  function renderizarEstado(texto) {
    containerClima.textContent = "";
    const p = document.createElement("p");
    p.textContent = texto;
    containerClima.appendChild(p);
  }

  async function consultarClima() {
    if (btnAtualizar) btnAtualizar.disabled = true;
    renderizarEstado("Consultando a previsão do tempo...");

    try {
      const response = await fetch(URL_API);
      if (!response.ok) {
        throw new Error("Erro HTTP ao consultar clima");
      }

      const dados = await response.json();
      if (!dados.current || !dados.daily) {
        throw new Error("Dados incompletos");
      }

      const tempAtual = Math.round(dados.current.temperature_2m);
      const tempMax = Math.round(dados.daily.temperature_2m_max[0]);
      const tempMin = Math.round(dados.daily.temperature_2m_min[0]);
      const chanceChuva = dados.daily.precipitation_probability_max[0] ?? 0;

      containerClima.textContent = "";

      const pResumo = document.createElement("p");
      pResumo.textContent = `Agora: ${tempAtual} °C. Máxima de ${tempMax} °C e mínima de ${tempMin} °C. Chance de chuva: ${chanceChuva}%.`;

      const pDica = document.createElement("p");
      const strong = document.createElement("strong");
      strong.textContent = "Dica para o passeio: ";
      pDica.appendChild(strong);
      pDica.appendChild(document.createTextNode(obterDicaClima(tempAtual, chanceChuva)));

      containerClima.appendChild(pResumo);
      containerClima.appendChild(pDica);
    } catch (erro) {
      renderizarEstado("A previsão do tempo não está disponível no momento.");
    } finally {
      if (btnAtualizar) btnAtualizar.disabled = false;
    }
  }

  if (btnAtualizar) {
    btnAtualizar.addEventListener("click", consultarClima);
  }

  consultarClima();
});