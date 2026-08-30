(function () {
  "use strict";

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  function pintarTextos() {
    $$("[data-campo]").forEach((el) => {
      const valor = DATOS[el.dataset.campo];
      if (valor === undefined || valor === null || valor === "") {
        el.textContent = "";
        el.hidden = true;
        return;
      }
      el.hidden = false;
      el.textContent = valor;
    });

    document.title = `${DATOS.evento || "Invitación"} - ${DATOS.novio || ""} & ${DATOS.novia || ""}`;
  }

  function pintarEnlaces() {
    const ceremonia = $("#btnMapaCeremonia");
    const recepcion = $("#btnMapaRecepcion");
    if (ceremonia) ceremonia.href = DATOS.mapaCeremonia || "#";
    if (recepcion) recepcion.href = DATOS.mapaRecepcion || "#";

    const wa = $("#btnWhatsapp");
    const nombreInvitado = $("#nombreInvitado");
    const num = (DATOS.whatsapp || "").replace(/\D/g, "");
    if (!wa || !num) {
      if (wa) wa.hidden = true;
      return;
    }

    const actualizar = () => {
      const nombre = nombreInvitado ? nombreInvitado.value.trim() : "";
      const base = DATOS.whatsappMensaje || "";
      const mensaje = nombre
        ? base.replace("{nombre}", nombre)
        : base.replace("soy {nombre} y ", "").replace("Soy {nombre} y ", "");
      wa.href = `https://wa.me/${num}?text=${encodeURIComponent(mensaje)}`;
    };

    if (nombreInvitado) {
      try {
        const guardado = localStorage.getItem("bodaNombreInvitado");
        if (guardado) nombreInvitado.value = guardado;
      } catch (e) {}
      nombreInvitado.addEventListener("input", () => {
        try { localStorage.setItem("bodaNombreInvitado", nombreInvitado.value.trim()); } catch (e) {}
        actualizar();
      });
    }
    actualizar();
  }

  function pintarTimeline() {
    const cont = $("#timeline");
    if (!cont) return;
    cont.innerHTML = "";
    (DATOS.timeline || []).forEach(([hora, texto]) => {
      const item = document.createElement("div");
      item.className = "timeline__item";
      item.innerHTML = `<time>${hora}</time><span>${texto}</span>`;
      cont.appendChild(item);
    });
  }

  function pintarGaleria() {
    const cont = $("#galeria");
    if (!cont) return;
    cont.innerHTML = "";
    (DATOS.fotos || []).forEach((src, i) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = "";
      img.loading = "lazy";
      img.className = `galeria__foto galeria__foto--${i + 1}`;
      cont.appendChild(img);
    });
    if (!cont.children.length) cont.closest(".bloque").hidden = true;
  }

  const audio = $("#audio");
  const btnMus = $("#btnMusica");
  const controlMus = $("#controlMusica");

  function prepararMusica() {
    if (!DATOS.musica || !audio || !btnMus) {
      if (controlMus) controlMus.hidden = true;
      return;
    }
    audio.src = DATOS.musica;
    audio.volume = Math.max(0, Math.min(1, Number(DATOS.volumenInicial ?? 0.5)));
    audio.addEventListener("error", () => { if (controlMus) controlMus.hidden = true; });
    btnMus.addEventListener("click", () => audio.paused ? reproducir() : audio.pause());
    audio.addEventListener("play", () => marcarMusica(true));
    audio.addEventListener("pause", () => marcarMusica(false));
  }

  function marcarMusica(sonando) {
    btnMus.classList.toggle("sonando", sonando);
    btnMus.querySelector(".btn-musica__txt").textContent = sonando ? "Pause" : "Play";
    btnMus.setAttribute("aria-label", sonando ? "Pausar música" : "Reproducir música");
  }

  function reproducir() {
    if (!audio || !DATOS.musica) return;
    const intento = audio.play();
    if (intento && intento.catch) intento.catch(() => {});
  }

  function arrancarCuenta() {
    const destino = new Date(DATOS.fechaISO).getTime();
    const bloque = $(".bloque--cuenta");
    if (Number.isNaN(destino)) {
      if (bloque) bloque.hidden = true;
      return;
    }

    const dd = $("#cDias"), hh = $("#cHoras"), mm = $("#cMin"), ss = $("#cSeg");
    const dos = (n) => String(n).padStart(2, "0");
    let reloj = null;

    function tick() {
      const falta = destino - Date.now();
      if (falta <= 0) {
        dd.textContent = hh.textContent = mm.textContent = ss.textContent = "00";
        if (reloj) clearInterval(reloj);
        return;
      }
      const seg = Math.floor(falta / 1000);
      dd.textContent = dos(Math.floor(seg / 86400));
      hh.textContent = dos(Math.floor(seg % 86400 / 3600));
      mm.textContent = dos(Math.floor(seg % 3600 / 60));
      ss.textContent = dos(seg % 60);
    }

    tick();
    reloj = setInterval(tick, 1000);
  }

  function prepararApertura() {
    const portada = $("#portada");
    const invitacion = $("#invitacion");
    const abrir = $("#abrirSobre");
    const volver = $("#btnVolverPortada");
    if (!portada || !invitacion) return;
    let abierta = false;

    document.body.classList.add("bloqueado");

    function mostrar() {
      if (abierta) return;
      abierta = true;
      abrir?.classList.add("abierto");
      reproducir();
      setTimeout(() => portada.classList.add("se-va"), 650);
      setTimeout(() => {
        portada.hidden = true;
        invitacion.classList.add("visible");
        invitacion.setAttribute("aria-hidden", "false");
        document.body.classList.remove("bloqueado");
        window.scrollTo(0, 0);
        observarBloques();
      }, 1200);
    }

    function regresar() {
      abierta = false;
      portada.hidden = false;
      portada.classList.remove("se-va");
      invitacion.classList.remove("visible");
      invitacion.setAttribute("aria-hidden", "true");
      abrir?.classList.remove("abierto");
      document.body.classList.add("bloqueado");
      window.scrollTo(0, 0);
    }

    portada.addEventListener("click", mostrar);
    portada.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        mostrar();
      }
    });
    volver?.addEventListener("click", regresar);
  }

  function observarBloques() {
    const bloques = $$(".revelar");
    if (!("IntersectionObserver" in window)) {
      bloques.forEach((b) => b.classList.add("dentro"));
      return;
    }
    const obs = new IntersectionObserver((entradas) => {
      entradas.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("dentro");
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.01, rootMargin: "0px 0px 18% 0px" });
    bloques.forEach((b) => obs.observe(b));
  }

  function paso(nombre, fn) {
    try { fn(); }
    catch (e) { console.error("[boda] fallo en " + nombre, e); }
  }

  paso("textos", pintarTextos);
  paso("enlaces", pintarEnlaces);
  paso("timeline", pintarTimeline);
  paso("galeria", pintarGaleria);
  paso("cuenta", arrancarCuenta);
  paso("musica", prepararMusica);
  paso("apertura", prepararApertura);
})();
