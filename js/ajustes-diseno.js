(function () {
  "use strict";

  function aplicarAjustes() {
    const intro = document.querySelector(".bloque--intro");
    const primerSeparador = intro?.nextElementSibling;

    if (primerSeparador && primerSeparador.classList.contains("separador-floral--principal") && !document.querySelector(".foto-despues-separador")) {
      const marco = document.createElement("div");
      marco.className = "foto-despues-separador revelar";

      const img = document.createElement("img");
      img.src = "assets/foto-2-web.jpg";
      img.alt = "Mateo y Carol";
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
