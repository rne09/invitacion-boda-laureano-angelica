(function () {
  "use strict";

  function ordenarNombres(selector) {
    const bloque = document.querySelector(selector);
    if (!bloque || bloque.dataset.ordenNombres === "1") return;

    const carol = bloque.querySelector('[data-campo="novia"]');
    const mateo = bloque.querySelector('[data-campo="novio"]');
    let amp = bloque.querySelector(".amp");

    if (!amp) {
      amp = Array.from(bloque.children).find((el) => !el.hasAttribute("data-campo"));
    }
    if (!carol || !mateo || !amp) return;

    carol.classList.add("nombre-carol");
    mateo.classList.add("nombre-mateo");
    amp.classList.add("amp-ajustado");

    bloque.append(carol, amp, mateo);
    bloque.classList.add("nombres-ordenados");
    bloque.dataset.ordenNombres = "1";
  }

  function aplicarAjustes() {
    ordenarNombres(".portada__nombres");
    ordenarNombres(".nombres-interior");

    const intro = document.querySelector(".bloque--intro");
    const primerSeparador = intro?.nextElementSibling;

    if (primerSeparador && primerSeparador.classList.contains("separador-floral--principal") && !document.querySelector(".foto-despues-separador")) {
      const marco = document.createElement("div");
      marco.className = "foto-despues-separador revelar";

      const img = document.createElement("img");
      img.src = "assets/foto-2-web.jpg";
      img.alt = "Carol y Mateo";
      img.loading = "eager";
      img.decoding = "async";

      marco.appendChild(img);
      primerSeparador.insertAdjacentElement("afterend", marco);

      requestAnimationFrame(() => marco.classList.add("dentro"));
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", aplicarAjustes, { once:true });
  } else {
    aplicarAjustes();
  }
})();
