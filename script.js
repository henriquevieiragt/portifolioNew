// Aguarda o carregamento completo do DOM
document.addEventListener("DOMContentLoaded", function () {
  // Adiciona partículas tecnológicas
  criarParticulas();

  // Menu mobile
  const menuBtn = document.querySelector(".menu-mobile-btn");
  const navMenu = document.querySelector("nav ul");

  if (menuBtn) {
    menuBtn.addEventListener("click", function () {
      navMenu.classList.toggle("show");
      // Alterna o ícone do menu
      const icon = menuBtn.querySelector("i");
      if (icon.classList.contains("fa-bars")) {
        icon.classList.replace("fa-bars", "fa-times");
      } else {
        icon.classList.replace("fa-times", "fa-bars");
      }
    });

    // Fecha o menu ao clicar em um link
    document.querySelectorAll("nav a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("show");
        const icon = menuBtn.querySelector("i");
        if (icon.classList.contains("fa-times")) {
          icon.classList.replace("fa-times", "fa-bars");
        }
      });
    });

    // Fecha o menu ao clicar fora dele
    document.addEventListener("click", function (event) {
      const isClickInsideMenu = navMenu.contains(event.target);
      const isClickOnMenuBtn = menuBtn.contains(event.target);

      if (
        !isClickInsideMenu &&
        !isClickOnMenuBtn &&
        navMenu.classList.contains("show")
      ) {
        navMenu.classList.remove("show");
        const icon = menuBtn.querySelector("i");
        if (icon.classList.contains("fa-times")) {
          icon.classList.replace("fa-times", "fa-bars");
        }
      }
    });
  }

  // Menu fixo com efeito de transparência ao rolar
  const header = document.querySelector("header");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      header.classList.add("header-scrolled");
    } else {
      header.classList.remove("header-scrolled");
    }
  });

  // Animação de digitação no banner
  const textoDestaque = document.querySelector(".destaque");
  const textoOriginal = textoDestaque.textContent;
  textoDestaque.textContent = "";

  function digitarTexto(elemento, texto, i = 0) {
    if (i < texto.length) {
      elemento.textContent += texto.charAt(i);
      setTimeout(function () {
        digitarTexto(elemento, texto, i + 1);
      }, 100);
    }
  }

  setTimeout(function () {
    digitarTexto(textoDestaque, textoOriginal);
  }, 500);

  // Efeito de hover nos cards de projetos
  const projetoCards = document.querySelectorAll(".projeto-card");
  projetoCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-12px) scale(1.02)";
      card.style.boxShadow = "0 15px 30px rgba(0, 245, 255, 0.2)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)";
      card.style.boxShadow = "0 4px 20px rgba(0, 245, 255, 0.15)";
    });
  });

  // Rolagem suave para links de navegação
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    });
  });

  // Formulário de contato com validação
  const formulario = document.getElementById("contato-form");

  if (formulario) {
    formulario.addEventListener("submit", function (e) {
      e.preventDefault();

      const nome = document.getElementById("nome").value;
      const email = document.getElementById("email").value;
      const mensagem = document.getElementById("mensagem").value;

      if (!nome || !email || !mensagem) {
        mostrarNotificacao("Por favor, preencha todos os campos.", "erro");
        return;
      }

      // Validação básica de e-mail
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        mostrarNotificacao("Por favor, insira um e-mail válido.", "erro");
        return;
      }

      // Aqui você adicionaria o código para enviar o formulário
      // Como é apenas um exemplo, vamos mostrar uma mensagem de sucesso
      mostrarNotificacao("Mensagem enviada com sucesso!", "sucesso");
      formulario.reset();
    });

    // Efeito nos campos do formulário
    const formInputs = document.querySelectorAll(
      ".form-grupo input, .form-grupo textarea"
    );
    formInputs.forEach((input) => {
      input.addEventListener("focus", () => {
        input.parentNode.classList.add("input-focado");
      });

      input.addEventListener("blur", () => {
        if (!input.value) {
          input.parentNode.classList.remove("input-focado");
        }
      });
    });
  }

  // Função para mostrar notificações estilizadas
  function mostrarNotificacao(mensagem, tipo) {
    const notificacao = document.createElement("div");
    notificacao.className = `notificacao ${tipo}`;
    notificacao.innerHTML = `
      <div class="notificacao-conteudo">
        <i class="fas ${
          tipo === "sucesso" ? "fa-check-circle" : "fa-exclamation-circle"
        }"></i>
        <p>${mensagem}</p>
      </div>
      <button class="notificacao-fechar">
        <i class="fas fa-times"></i>
      </button>
    `;

    document.body.appendChild(notificacao);

    // Adiciona a classe para mostrar com animação
    setTimeout(() => {
      notificacao.classList.add("mostrar");
    }, 10);

    // Remove após 4 segundos
    setTimeout(() => {
      notificacao.classList.remove("mostrar");
      setTimeout(() => {
        notificacao.remove();
      }, 300);
    }, 4000);

    // Fecha ao clicar no X
    notificacao
      .querySelector(".notificacao-fechar")
      .addEventListener("click", () => {
        notificacao.classList.remove("mostrar");
        setTimeout(() => {
          notificacao.remove();
        }, 300);
      });
  }

  // Animação de elementos ao rolar a página com Intersection Observer
  const elementosAnimados = document.querySelectorAll(
    ".projeto-card, .habilidade, .sobre-imagem, .section-title, .sobre-texto p, .contato-item, .form-grupo"
  );

  const observador = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visivel");
          observador.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  elementosAnimados.forEach((elemento) => {
    elemento.classList.add("elemento-animado");
    observador.observe(elemento);
  });

  // Botão para voltar ao topo
  const btnTopo = document.createElement("button");
  btnTopo.innerHTML = '<i class="fas fa-arrow-up"></i>';
  btnTopo.className = "btn-topo";
  document.body.appendChild(btnTopo);

  const estilosBtnTopo = document.createElement("style");
  estilosBtnTopo.innerHTML = `
    .btn-topo {
      position: fixed;
      bottom: 30px;
      right: 30px;
      background-color: rgba(0, 245, 255, 0.1);
      color: var(--cor-primaria);
      border: 1px solid var(--cor-primaria);
      border-radius: 50%;
      width: 50px;
      height: 50px;
      font-size: 20px;
      cursor: pointer;
      display: none;
      z-index: 99;
      box-shadow: 0 0 15px rgba(0, 245, 255, 0.1);
      transition: all 0.3s ease;
      opacity: 0;
      transform: translateY(20px);
    }
    
    .btn-topo.visivel {
      opacity: 1;
      transform: translateY(0);
    }
    
    .btn-topo:hover {
      background-color: var(--cor-primaria);
      color: var(--cor-fundo-escuro);
      box-shadow: 0 0 20px rgba(0, 245, 255, 0.4);
    }
    
    .notificacao {
      position: fixed;
      bottom: 30px;
      left: 30px;
      background-color: var(--cor-fundo-card);
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
      border-radius: 8px;
      padding: 15px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      z-index: 1000;
      max-width: 400px;
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.3s ease;
      border: 1px solid rgba(0, 245, 255, 0.1);
    }
    
    .notificacao.mostrar {
      opacity: 1;
      transform: translateY(0);
    }
    
    .notificacao.sucesso {
      border-left: 4px solid #10b981;
    }
    
    .notificacao.erro {
      border-left: 4px solid #ef4444;
    }
    
    .notificacao-conteudo {
      display: flex;
      align-items: center;
    }
    
    .notificacao-conteudo i {
      margin-right: 15px;
      font-size: 1.2rem;
    }
    
    .notificacao.sucesso i {
      color: #10b981;
    }
    
    .notificacao.erro i {
      color: #ef4444;
    }
    
    .notificacao-conteudo p {
      color: var(--cor-texto);
      font-size: 0.95rem;
    }
    
    .notificacao-fechar {
      background: none;
      border: none;
      cursor: pointer;
      color: var(--cor-texto-secundario);
      margin-left: 15px;
    }
    
    .header-scrolled {
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      background-color: rgba(10, 10, 22, 0.95);
    }
    
    .elemento-animado {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .elemento-animado.visivel {
      opacity: 1;
      transform: translateY(0);
    }
    
    .cursor-piscante::after {
      content: '|';
      animation: cursor 1s infinite;
      margin-left: 2px;
      color: var(--cor-primaria);
      display: inline-block;
      position: absolute;
      line-height: inherit;
      vertical-align: baseline;
      margin-top: 0;
    }
    
    @keyframes cursor {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
    
    .input-focado label {
      color: var(--cor-primaria);
    }
    
    .particula {
      position: fixed;
      width: 3px;
      height: 3px;
      background-color: var(--cor-primaria);
      border-radius: 50%;
      opacity: 0.6;
      pointer-events: none;
      z-index: -1;
    }
    
    @media (max-width: 768px) {
      .btn-topo {
        width: 45px;
        height: 45px;
        font-size: 18px;
        bottom: 20px;
        right: 20px;
      }
      
      .notificacao {
        left: 20px;
        right: 20px;
        max-width: calc(100% - 40px);
      }
    }
  `;
  document.head.appendChild(estilosBtnTopo);

  window.addEventListener("scroll", function () {
    if (window.scrollY > 500) {
      btnTopo.style.display = "flex";
      btnTopo.style.alignItems = "center";
      btnTopo.style.justifyContent = "center";
      setTimeout(() => {
        btnTopo.classList.add("visivel");
      }, 10);
    } else {
      btnTopo.classList.remove("visivel");
      setTimeout(() => {
        if (!btnTopo.classList.contains("visivel")) {
          btnTopo.style.display = "none";
        }
      }, 300);
    }
  });

  btnTopo.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Função para criar partículas tecnológicas flutuantes
  function criarParticulas() {
    const numeroDeParticulas = window.innerWidth < 768 ? 15 : 30;
    const cores = [
      "rgba(0, 245, 255, 0.6)",
      "rgba(77, 84, 255, 0.6)",
      "rgba(138, 43, 226, 0.6)",
    ];

    for (let i = 0; i < numeroDeParticulas; i++) {
      const particula = document.createElement("div");
      particula.className = "particula";

      // Configura propriedades aleatórias
      const tamanho = Math.random() * 5 + 1;
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const cor = cores[Math.floor(Math.random() * cores.length)];
      const duracao = Math.random() * 60 + 30;
      const atraso = Math.random() * 10;

      particula.style.width = `${tamanho}px`;
      particula.style.height = `${tamanho}px`;
      particula.style.left = `${x}px`;
      particula.style.top = `${y}px`;
      particula.style.backgroundColor = cor;
      particula.style.boxShadow = `0 0 ${tamanho * 2}px ${cor}`;
      particula.style.animation = `float ${duracao}s ease-in-out ${atraso}s infinite`;

      document.body.appendChild(particula);
    }
  }

  // Efeito de brilho ao passar o mouse sobre os ícones de habilidades
  const icones = document.querySelectorAll(".habilidade i");
  icones.forEach((icone) => {
    icone.addEventListener("mouseenter", () => {
      icone.style.textShadow = "0 0 20px var(--cor-primaria)";
      icone.style.transform = "scale(1.1)";
      icone.style.transition = "all 0.3s ease";
    });

    icone.addEventListener("mouseleave", () => {
      icone.style.textShadow = "0 0 10px rgba(0, 245, 255, 0.5)";
      icone.style.transform = "scale(1)";
    });
  });

  // Função para garantir que links externos abram corretamente
  function configurarLinksExternos() {
    const linksExternos = document.querySelectorAll('a[target="_blank"]');
    linksExternos.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const url = this.getAttribute("href");
        window.open(url, "_blank");
        console.log("Abrindo link externo: " + url);
      });
    });
  }

  // Chamar a função após o carregamento da página
  configurarLinksExternos();

  // Tornar o card do Projeto Mario clicável diretamente
  const projetoMarioCard = document.querySelector(
    ".projeto-card:first-of-type"
  );
  const projetoMarioLink = projetoMarioCard.querySelector(".btn-small");

  if (projetoMarioLink) {
    // Torna o botão clicável
    projetoMarioLink.addEventListener("click", function (e) {
      e.preventDefault();
      window.open("https://projeto-mario-delta.vercel.app/", "_blank");
      console.log("Abrindo projeto do Mario pelo botão");
    });

    // Torna o card inteiro clicável
    projetoMarioCard.style.cursor = "pointer";
    projetoMarioCard.addEventListener("click", function (e) {
      // Verifica se o clique não foi no próprio botão
      if (!e.target.closest(".btn-small")) {
        window.open("https://projeto-mario-delta.vercel.app/", "_blank");
        console.log("Abrindo projeto do Mario pelo card");
      }
    });
  }
});
