(function () {
  "use strict";

  function ordenarNombres(selector) {
    const bloque = document.querySelector(selector);
    if (!bloque || bloque.dataset.ordenNombres === "1") return;

    const caroll = bloque.querySelector('[data-campo="novia"]');
    const mateo = bloque.querySelector('[data-campo="novio"]');
    let amp = bloque.querySelector(".amp");

    if (!amp) {
      amp = Array.from(bloque.children).find((el) => !el.hasAttribute("data-campo"));
    }
    if (!caroll || !mateo || !amp) return;

    caroll.classList.add("nombre-caroll");
    mateo.classList.add("nombre-mateo");
    amp.classList.add("amp-ajustado");

    bloque.append(caroll, amp, mateo);
    bloque.classList.add("nombres-ordenados");
    bloque.dataset.ordenNombres = "1";
  }

  function actualizarTextosEstaticos() {
    document.title = "Boda Caroll & Mateo";

    const descripcion = document.querySelector('meta[name="description"]');
    if (descripcion) descripcion.content = "Invitación a la boda de Caroll y Mateo. 31 de octubre de 2026, Valledupar.";

    const ogTitulo = document.querySelector('meta[property="og:title"]');
    if (ogTitulo) ogTitulo.content = "Caroll & Mateo";

    const portada = document.querySelector(".portada");
    if (portada) portada.setAttribute("aria-label", "Portada de la invitación de Caroll y Mateo");

    const fotoPortada = document.querySelector(".portada__foto");
    if (fotoPortada) fotoPortada.alt = "Caroll y Mateo";

    const abrir = document.querySelector("#abrirSobre");
    if (abrir) abrir.setAttribute("aria-label", "Abrir invitación de Caroll y Mateo");

    const galeria = document.querySelector("#galeria");
    if (galeria) galeria.setAttribute("aria-label", "Galería de Caroll y Mateo");
  }

  function aplicarAjustes() {
    ordenarNombres(".portada__nombres");
    ordenarNombres(".nombres-interior");
    actualizarTextosEstaticos();

    const intro = document.querySelector(".bloque--intro");
    const primerSeparador = intro?.nextElementSibling;

    if (primerSeparador && primerSeparador.classList.contains("separador-floral--principal") && !document.querySelector(".foto-despues-separador")) {
      const marco = document.createElement("div");
      marco.className = "foto-despues-separador revelar";

      const img = document.createElement("img");
      img.src = "assets/foto-2-web.jpg";
      img.alt = "Caroll y Mateo";
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