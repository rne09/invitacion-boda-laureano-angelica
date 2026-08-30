# Invitacion web - Boda Laureano & Angelica

Invitacion estatica basada en la estructura de la tarjeta de Julian:
portada con foto grande, boton para abrir carta, musica, cuenta regresiva,
lugares, codigo de vestimenta, minuto a minuto, galeria, lluvia de sobres y
confirmacion por WhatsApp.

## Como verla

Abrir directamente:

```text
G:\invitacion-boda-laureano-angelica\index.html
```

O con servidor local:

```powershell
python -m http.server 5598 --bind 127.0.0.1 --directory G:\invitacion-boda-laureano-angelica
```

Luego abrir:

```text
http://127.0.0.1:5598
```

## Donde editar

La informacion principal esta en:

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
- `musica`

## Fotos

Por ahora usa fotos provisionales de la sesion anterior:

```text
assets/portada-pareja-web.jpg
assets/foto-1-web.jpg
assets/foto-2-web.jpg
assets/foto-3-web.jpg
```

Cuando tomes las fotos nuevas, reemplaza esos archivos manteniendo los mismos
nombres para que la tarjeta se actualice sin tocar codigo.

## Musica

Ahora esta puesta la misma musica provisional de la tarjeta baby shower:

```text
assets/musica.mp3
```

La cancion final indicada es:

```text
Como enamoraban antes - Fonseca
```

Cuando tengas el MP3 final, reemplaza `assets/musica.mp3` por ese archivo con el
mismo nombre.
