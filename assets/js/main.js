// Portfólio — Vinicius Arins. Interações sem dependências.
(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  // Ano do rodapé.
  var year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());

  // Header compacto e barra de progresso da rolagem.
  var header = document.querySelector("[data-header]");
  var progress = document.querySelector(".progress");
  var ticking = false;

  function onScroll() {
    var y = window.scrollY;
    header.classList.toggle("is-scrolled", y > 24);
    var max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.setProperty("--progress", max > 0 ? Math.min(y / max, 1).toFixed(4) : "0");
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });
  onScroll();

  // Menu do celular.
  var menu = document.querySelector("[data-menu]");
  var toggle = document.querySelector("[data-menu-toggle]");
  var toggleLabel = document.querySelector("[data-menu-label]");

  function setMenu(open, returnFocus) {
    toggle.setAttribute("aria-expanded", String(open));
    toggleLabel.textContent = open ? "Fechar menu" : "Abrir menu";
    menu.classList.toggle("is-open", open);
    header.classList.toggle("menu-open", open);
    if (open) {
      var first = menu.querySelector("a");
      if (first) first.focus();
    } else if (returnFocus) {
      toggle.focus();
    }
  }

  toggle.addEventListener("click", function () {
    setMenu(toggle.getAttribute("aria-expanded") !== "true", false);
  });
  menu.addEventListener("click", function (event) {
    if (event.target.closest("a") && toggle.getAttribute("aria-expanded") === "true") setMenu(false, false);
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") setMenu(false, true);
  });
  document.addEventListener("click", function (event) {
    if (toggle.getAttribute("aria-expanded") === "true" && !header.contains(event.target)) setMenu(false, false);
  });
  window.matchMedia("(min-width: 861px)").addEventListener("change", function (mq) {
    if (mq.matches) setMenu(false, false);
  });

  // Seção ativa na navegação. "Tecnologias" faz parte de "Sobre".
  var navLinks = Array.prototype.slice.call(document.querySelectorAll("[data-nav]"));
  var sectionToNav = { inicio: "inicio", projetos: "projetos", sobre: "sobre", tecnologias: "sobre", contato: "contato" };

  function setActive(id) {
    navLinks.forEach(function (link) {
      if (link.getAttribute("href") === "#" + id) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  }

  if ("IntersectionObserver" in window) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(sectionToNav[entry.target.id]);
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(sectionToNav).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    });
  }

  // Revelação progressiva. Sem IntersectionObserver ou com movimento reduzido, tudo aparece.
  var reveals = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || reducedMotion.matches) {
    Array.prototype.forEach.call(reveals, function (el) { el.classList.add("is-visible"); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    Array.prototype.forEach.call(reveals, function (el) { revealObserver.observe(el); });
  }

  // Alternância das telas de cada projeto.
  Array.prototype.forEach.call(document.querySelectorAll("[data-gallery]"), function (gallery) {
    var img = gallery.querySelector("[data-gallery-img]");
    var caption = gallery.querySelector("[data-gallery-caption]");
    var path = gallery.querySelector("[data-gallery-path]");
    var buttons = gallery.querySelectorAll("button[data-src]");

    // Pré-carrega as outras telas quando o projeto se aproxima da tela.
    function preload() {
      Array.prototype.forEach.call(buttons, function (b) { new Image().src = b.getAttribute("data-src"); });
    }
    if ("IntersectionObserver" in window) {
      var pre = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) { preload(); pre.disconnect(); }
      }, { rootMargin: "400px 0px" });
      pre.observe(gallery);
    }

    Array.prototype.forEach.call(buttons, function (button) {
      button.addEventListener("click", function () {
        if (button.getAttribute("aria-pressed") === "true") return;
        Array.prototype.forEach.call(buttons, function (b) { b.setAttribute("aria-pressed", String(b === button)); });

        var apply = function () {
          img.src = button.getAttribute("data-src");
          img.alt = button.getAttribute("data-alt");
          caption.textContent = button.getAttribute("data-caption");
          path.textContent = button.getAttribute("data-path");
        };

        if (reducedMotion.matches) { apply(); return; }
        img.classList.add("is-swapping");
        window.setTimeout(function () {
          apply();
          var show = function () { img.classList.remove("is-swapping"); };
          if (img.complete) show(); else img.addEventListener("load", show, { once: true });
        }, 180);
      });
    });
  });
})();
