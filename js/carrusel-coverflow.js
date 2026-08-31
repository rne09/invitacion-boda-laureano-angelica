(function () {
  "use strict";

  function iniciarCoverflow() {
    const galeria = document.querySelector("#galeria");
    if (!galeria || galeria.dataset.coverflowActivo === "1") return;

    const items = galeria.querySelectorAll(".carrusel__item");
    if (!items.length) {
      requestAnimationFrame(iniciarCoverflow);
      return;
    }

    galeria.dataset.coverflowActivo = "1";

    const scrollToNativo = galeria.scrollTo.bind(galeria);
    let animacion = 0;

    const cancelarAnimacion = () => {
      if (!animacion) return;
      cancelAnimationFrame(animacion);
      animacion = 0;
    };

    function easeInOutQuint(t) {
      return t < 0.5
        ? 16 * t * t * t * t * t
        : 1 - Math.pow(-2 * t + 2, 5) / 2;
    }

    function desplazarSuave(destino, duracion = 1150) {
      cancelarAnimacion();

      const inicio = galeria.scrollLeft;
      const distancia = destino - inicio;
      if (Math.abs(distancia) < 1) {
        galeria.scrollLeft = destino;
        return;
      }

      const comienzo = performance.now();

      function cuadro(ahora) {
        const progreso = Math.min(1, (ahora - comienzo) / duracion);
        galeria.scrollLeft = inicio + distancia * easeInOutQuint(progreso);

        if (progreso < 1) {
          animacion = requestAnimationFrame(cuadro);
        } else {
          galeria.scrollLeft = destino;
          animacion = 0;
        }
      }

      animacion = requestAnimationFrame(cuadro);
    }

    /* app.js ya llama a galeria.scrollTo(...). Solo sustituimos la animacion
       de esa instancia, sin tocar el resto de scrolls de la pagina. */
    galeria.scrollTo = function (opciones, y) {
      if (typeof opciones === "object" && opciones !== null && Number.isFinite(opciones.left)) {
        if (opciones.behavior === "smooth") {
          desplazarSuave(opciones.left);
          return;
        }
      }

      if (typeof opciones === "number" && Number.isFinite(opciones)) {
        scrollToNativo(opciones, Number.isFinite(y) ? y : 0);
        return;
      }

      scrollToNativo(opciones);
    };

    ["pointerdown", "touchstart", "wheel"].forEach((evento) => {
      galeria.addEventListener(evento, cancelarAnimacion, { passive: true });
    });
  }

  if (document.readyState === "complete") iniciarCoverflow();
  else window.addEventListener("load", iniciarCoverflow, { once: true });
})();
