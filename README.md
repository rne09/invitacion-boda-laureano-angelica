# Invitación web - Boda Mateo & Carol

Invitación estática basada en la estructura de la tarjeta de Julián, adaptada a una boda con estética editorial y papelería premium beige/dorada.

Incluye:

- Portada con foto grande de la pareja.
- Botón/sobre animado para abrir la invitación.
- Sello con iniciales `M & C`.
- Música al abrir.
- Textura de papel opalina beige.
- Cuenta regresiva.
- Ceremonia y recepción.
- Código de vestimenta.
- Minuto a minuto.
- Galería adaptable a cualquier cantidad de fotos.
- Lluvia de sobres.
- Confirmación por WhatsApp cuando se configure el número.

## Datos principales

La información editable está en:

```text
js/datos.js
```

Campos clave:

- `novio` y `novia`
- `fechaISO`, `diaSemana`, `diaNumero`, `mes`, `anio`
- `horaCeremonia`, `lugarCeremonia`, `direccionCeremonia`
- `horaRecepcion`, `lugarRecepcion`, `direccionRecepcion`
- `dressCodeTitulo` y `dressCodeNota`
- `timeline`
- `fraseRegalos`
- `whatsapp`
- `fotos`
- `musica`

## Fotos

Actualmente usa fotos provisionales:

```text
assets/portada-pareja-web.jpg
assets/foto-1-web.jpg
assets/foto-2-web.jpg
assets/foto-3-web.jpg
```

Cuando estén las fotos nuevas de la sesión, se puede reemplazar la portada y agregar todas las fotos deseadas al arreglo `fotos` de `js/datos.js`.

## Textura

La papelería usa:

```text
assets/papel-opalina.jpg
```

Está conectada directamente desde `css/estilos.css` en el fondo exterior, la hoja interior, el botón/sobre y el control de música.

## Música

La música actual sigue siendo provisional:

```text
assets/musica.mp3
```

La canción final indicada es:

```text
Como enamoraban antes - Fonseca
```

Cuando esté disponible el archivo final autorizado, reemplazar `assets/musica.mp3` conservando el mismo nombre.

## WhatsApp

Mientras `whatsapp` esté vacío en `js/datos.js`, la sección de confirmación permanece oculta. Al agregar el número con código de país, aparecerá automáticamente.
