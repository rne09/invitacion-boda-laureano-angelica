/* ==========================================================================
   DATOS DE LA INVITACION
   Cambia aqui nombres, fecha, lugares, fotos, musica y textos.
   ========================================================================== */

const DATOS = {
  novio: "Mateo",
  novia: "Carol",
  evento: "Boda",
  selloInicial: "M & C",

  fechaISO: "2026-10-31T15:00",
  diaSemana: "Sábado",
  diaNumero: "31",
  mes: "Octubre",
  anio: "2026",

  horaCeremonia: "3:00 PM",
  lugarCeremonia: "Parroquia Inmaculada Concepción",
  direccionCeremonia: "Plaza Alfonso López, centro histórico de Valledupar, Cesar",
  mapaCeremonia: "https://www.google.com/maps/search/?api=1&query=Parroquia%20Inmaculada%20Concepcion%20Plaza%20Alfonso%20Lopez%20Valledupar%20Cesar",

  horaRecepcion: "6:00 PM",
  lugarRecepcion: "Casa Campo Victoria",
  direccionRecepcion: "Valledupar, Cesar",
  mapaRecepcion: "https://instagram.com/casacampovictoria",

  dressCodeTitulo: "Formal",
  dressCodeNota: "Mujeres: vestido largo, unicolor.\nHombres: camisa manga larga y pantalón.",

  /* Numero con codigo de pais. Colombia: 57 */
  whatsapp: "573157888301",
  whatsappMensaje: "Hola, soy {nombre} y confirmo mi asistencia a la boda de Mateo y Carol.",

  fraseIntro: "Tenemos el honor de invitarte a celebrar el inicio de nuestra vida juntos. Tu presencia hará parte de un día que guardaremos para siempre.",
  fraseConfirmar: "Agradecemos confirmar tu asistencia para preparar cada detalle con mucho cariño.",
  fraseRegalos: "Lluvia de sobres",
  fraseCierre: "¡Te esperamos!",

  timeline: [
    ["3:00 PM", "Eucaristía"],
    ["6:00 PM", "Recepción"],
    ["6:30 PM", "Entrada de novios"],
    ["7:00 PM", "Brindis y cena"],
    ["8:30 PM", "Primer baile"],
    ["9:00 PM", "Ramo"],
    ["9:30 PM", "Apertura de pista de baile"]
  ],

  /* Puedes agregar todas las fotos que quieras a este arreglo. */
  fotos: [
    "assets/foto-1-web.jpg",
    "assets/foto-2-web.jpg",
    "assets/foto-3-web.jpg"
  ],

  /* Provisional: misma cancion de la invitacion baby shower.
     Reemplazar luego por "Como enamoraban antes" de Fonseca. */
  musica: "assets/musica.mp3",
  volumenInicial: 0.5
};

/* Complementos visuales. app.js conserva la logica principal de la invitacion. */
(function cargarComplementosBoda() {
  const cssCarrusel = document.createElement("link");
  cssCarrusel.rel = "stylesheet";
  cssCarrusel.href = "css/carrusel-coverflow.css?v=5";
  document.head.appendChild(cssCarrusel);

  /* Se agrega despues del CSS del carrusel para que la limpieza visual tenga
     prioridad sobre bordes, tamaños e imagenes redundantes. */
  const cssLimpieza = document.createElement("link");
  cssLimpieza.rel = "stylesheet";
  cssLimpieza.href = "css/limpieza-visual.css?v=5";
  document.head.appendChild(cssLimpieza);

  const script = document.createElement("script");
  script.src = "js/carrusel-coverflow.js?v=5";
  script.async = false;
  document.head.appendChild(script);
})();