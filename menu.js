document.addEventListener("DOMContentLoaded", () => {
  const btnMenu = document.getElementById("menu-toggle");
  const navPrincipal = document.getElementById("nav-principal");
  const linksMenu = navPrincipal ? navPrincipal.querySelectorAll("a") : [];
  const mediaDesktop = window.matchMedia("(min-width: 768px)");

  function atualizarTabIndexMenu() {
    const aberto = btnMenu?.getAttribute("aria-expanded") === "true";
    const esconderNoTeclado = !mediaDesktop.matches && !aberto;

    linksMenu.forEach((link) => {
      if (esconderNoTeclado) {
        link.setAttribute("tabindex", "-1");
      } else {
        link.removeAttribute("tabindex");
      }
    });
  }

  function abrirMenu() {
    btnMenu.setAttribute("aria-expanded", "true");
    btnMenu.setAttribute("aria-label", "Fechar menu");
    navPrincipal.classList.add("aberto");
    atualizarTabIndexMenu();
  }

  function fecharMenu(devolverFoco = false) {
    btnMenu.setAttribute("aria-expanded", "false");
    btnMenu.setAttribute("aria-label", "Abrir menu");
    navPrincipal.classList.remove("aberto");
    atualizarTabIndexMenu();
    if (devolverFoco) {
      btnMenu.focus();
    }
  }

  if (btnMenu && navPrincipal) {
    atualizarTabIndexMenu();

    btnMenu.addEventListener("click", () => {
      const estaAberto = btnMenu.getAttribute("aria-expanded") === "true";
      if (estaAberto) {
        fecharMenu();
      } else {
        abrirMenu();
      }
    });

    document.addEventListener("keydown", (evento) => {
      if (evento.key === "Escape" && btnMenu.getAttribute("aria-expanded") === "true") {
        fecharMenu(true);
      }
    });

    mediaDesktop.addEventListener("change", () => {
      if (mediaDesktop.matches) {
        navPrincipal.classList.remove("aberto");
        btnMenu.setAttribute("aria-expanded", "false");
        btnMenu.setAttribute("aria-label", "Abrir menu");
      }
      atualizarTabIndexMenu();
    });
  }

  // Botão Voltar ao Topo
  const btnTopo = document.getElementById("btn-topo");
  if (btnTopo) {
    window.addEventListener("scroll", () => {
      btnTopo.hidden = window.scrollY < 300;
    });

    btnTopo.addEventListener("click", () => {
      window.scrollTo({ top: 0 });
    });
  }
});