# Design System — iAgents Digital

Documento de referencia del sistema de diseño realmente en uso en el código (no aspiracional). Cubre `index.html`, `caso-costera.html`, `caso-agencias.html`, `blog.html` y los artículos, y el rediseño de `landing-captacion-costera.html`.

**Regla general: misma estructura y componentes en todas las páginas; el color de acento puede variar por sector, pero la base (tipografía, espaciados, comportamiento) no cambia.**

---

## 1. Tipografía

| Uso | Fuente | Detalles |
|---|---|---|
| Titulares (`h1`, `h2`, `h3`) | `'Bricolage Grotesque', sans-serif` | `font-weight: 600`, `letter-spacing: -.04em` |
| Cuerpo de texto | `Manrope, system-ui, sans-serif` | Peso normal, `line-height` generoso (1.6–1.8 en párrafos largos) |
| Etiquetas, números, datos técnicos | `'IBM Plex Mono', monospace` | Uso en `.eyebrow`, badges, números de paso, metadatos de artículo |

Cargadas vía `assets/fonts/fonts.css` (self-hosted, no Google Fonts en las páginas nuevas — la excepción es `landing-captacion-costera.html`, que históricamente usaba Playfair Display + DM Sans vía Google Fonts y **no se ha migrado** a esta tipografía; ver sección 6).

---

## 2. Paleta de color

### 2.1 Tema oscuro (dominante — la mayoría de secciones y páginas nuevas)

| Token | Valor | Uso |
|---|---|---|
| Fondo base | `#05060e` | `body`, secciones principales |
| Fondos oscuros alternos | `#06070f`, `#070819`, `#080a1c`, `#04050c` (footer) | Variación sutil entre secciones apiladas |
| Texto principal | `#e9ecf8` / `#f8f9ff` (titulares) | — |
| Texto secundario | `#a2acd0`, `#9ba5cc`, `#8a95bd` | Subtítulos, metadatos |
| Enlaces | `#a3b7ff` → `#fff` en hover | — |
| Bordes sutiles | `rgba(150,170,255,.1)` a `rgba(150,170,255,.22)` | Separadores, tarjetas |

### 2.2 Acento de marca (gradiente azul-violeta)

| Token | Valor | Uso |
|---|---|---|
| Gradiente de marca | `linear-gradient(120deg, #2f4bff, #8a3dff)` | Botones primarios (`.btn-primary`), badges activos |
| Texto degradado destacado | `linear-gradient(100deg, #6f9cff 0%, #a97bff 52%, #d474ff 100%)` | Palabras clave dentro de titulares (`.grad`) |
| Sólido equivalente (cuando no se puede usar gradiente) | `#5d44ff` (punto medio del gradiente) | Iconos, texto de acento sobre fondo claro |
| Sombra de botón primario | `rgba(74,62,255, .14–.45)` según elevación | — |

### 2.3 Tema claro (secciones específicas: `#captacion` en index.html, todo el body de costera)

| Token | Valor |
|---|---|
| Fondo | `linear-gradient(180deg, #f4f2ee 0%, #eceaf4 100%)` |
| Texto principal | `#14162b` |
| Texto secundario | `#4b4f6b` / `#565a78` |
| Bordes | `#dcdcf0` |
| Fondo de acento suave (badges, chips) | `#ecebfa` |

### 2.4 Variantes por sector

La regla del checklist ("permitir variantes de color por sector, misma estructura") se aplica así hasta ahora:

| Sector | Estado del rediseño | Acento |
|---|---|---|
| Inmobiliario / Captación (caso principal, costera) | ✅ Unificado con la marca | Gradiente azul-violeta (`#2f4bff → #8a3dff`) — decisión tomada en el rediseño de costera: se descartó mantener un acento verde diferenciado para maximizar coherencia de marca |
| Clínicas | ⏳ Pendiente (Día 24 del plan) | Previsto: indigo |
| Funerarias | ⏳ Pendiente (Día 25 / decisión FuneralFlow) | Sin definir |
| Agencias (landing propia `agencias.iagentsdigital.com`) | ⏳ Pendiente (Día 23) | Sin definir — la página en sí no se ha tocado, solo el caso de estudio sobre ella en el sitio principal |

**Colores que NO deben tocarse aunque parezcan "fuera de paleta":** el verde `#25d366` del botón/icono de WhatsApp (marca oficial de WhatsApp, no de iAgents) y el rojo `#ff6b6b` usado como indicador semántico de "problema" en tarjetas — ninguno de los dos es un acento de marca.

---

## 3. Componentes reutilizables

Nombres de clase reales tal como aparecen en el código, para copiar/pegar entre páginas:

| Componente | Clase | Dónde se usa |
|---|---|---|
| Header + nav + menú móvil | `.site-header`, `.nav`, `.mobile-menu` | Idéntico (HTML y CSS) en `index.html`, `caso-*.html`, `blog*.html` |
| Footer completo | `.site-footer`, `.footer-grid`, `.fcol` | Idéntico en todas las páginas del dominio principal |
| Botón primario | `.btn.btn-primary` | CTAs principales ("Solicitar una demo") |
| Botón secundario | `.btn.btn-ghost` | CTAs secundarios |
| Etiqueta superior en mono | `.eyebrow` | Encabezado de sección |
| Píldora/chip con borde translúcido | `.chip` / `.hero-badge` / `.case-status` | Estados ("En fase de lanzamiento"), ubicación |
| Fila de item (número + nombre + descripción + miniatura) | `.sector` (dentro de `.sector-list`) | Sección "Sectores" y sección "Casos" de index.html |
| Plantilla de página de caso de estudio | `.case-hero`, `.case-block`, `.case-block.alt` (alterna fondo) | `caso-costera.html`, `caso-agencias.html` |
| Paso numerado de un flujo/proceso | `.flow-step` | Dentro de páginas de caso, para diagramas técnicos |
| Embudo de fases (con barra degradada) | `.phase` (dentro de `.phase-grid`) | Sección "Fases" de index.html y artículo del embudo de 5 fases |
| Tarjeta de artículo del blog | `.post-card` | `blog.html` |
| Cifra destacada con degradado | `.stat-block` | Artículos del blog (ej. "78%") |
| Tabla comparativa | `.compare-table` | Artículo "Agentes de IA vs. chatbots" |
| CTA final de página completa | `.final`, `.final-inner` | Cierre de todas las páginas nuevas |

**Patrón de layout:** `max-width` del contenedor central (`.wrap`) es `1400px` en index.html (páginas con secciones anchas) y `760px`–`1000px` en páginas de artículo/caso (mejor legibilidad en texto largo).

**Responsive:** dos puntos de corte consistentes en todo el sitio: `1080px` (tablet — activa menú hamburguesa) y `760px` (móvil).

---

## 4. Tono de copy

- **Directo y sin relleno.** Frases cortas, sin adjetivos vacíos ("solución innovadora", "revolucionario").
- **Honestidad radical sobre el estado real.** Cuando algo está en fase de lanzamiento sin datos todavía, se dice explícitamente ("En fase de lanzamiento", "todavía no ha recibido ningún envío real") en vez de inventar métricas o testimonios. Ver los casos de estudio de costera y agencias como referencia.
- **Captación de propietarios: ángulo de dolor, no pregunta de oferta genérica.** Titulares como "¿Tu inmobiliaria captó tu piso y desde entonces... silencio?" en vez de "¿Quieres vender tu propiedad?". (Ver memoria `copywriting-captacion-propietarios`.)
- **CTAs siempre verbales y concretos:** "Solicitar una demo", "Ver el caso completo →", "Enviar mi solicitud →" — nunca CTAs genéricos tipo "Más información".
- **Datos reales o ninguno.** Cuando se cita una cifra (ej. "78% de los leads se enfrían en 5 minutos"), se atribuye de forma genérica a estudios del sector, sin inventar una fuente específica falsa.

---

## 5. Assets fotográficos disponibles

Reutilizables entre páginas para no encargar fotografía nueva cada vez:

| Archivo | Contenido | Ya usado en |
|---|---|---|
| `assets/hero-equipo.jpg` | Equipo de iAgents Digital en oficina | Hero de `index.html` |
| `assets/vivienda-mediterranea.jpg` | Vivienda mediterránea, exterior | `#captacion` de index.html, tarjeta de Costera en "Casos", `caso-costera.html` |
| `assets/foto-agencia.jpg` | Agente inmobiliario + propietaria revisando documentos | Sector "Inmobiliarias" en index.html, hero de la landing de costera rediseñada, tarjeta de Agencias en "Casos" |
| `assets/fundador-quique-iborra-web.jpg` | Retrato del fundador | Sección "Fundador" |
| `assets/foto-clinica.jpg`, `foto-funeraria.jpg`, `foto-gimnasio.jpg`, `foto-servicios.jpg` | Fotos por sector, sin usar todavía fuera de sus tarjetas de "Sectores" | Pendiente de reutilizar cuando se rediseñen esos subdominios (Días 23–25) |

---

## 6. Deuda de diseño conocida (no resuelta en este documento)

- `landing-captacion-costera.html` mantiene su tipografía original (Playfair Display + DM Sans) — solo se unificó el color, no la tipografía (decisión explícita: el usuario pidió coherencia de color, no de fuente).
- El CSS sigue estando inline en cada página (no externalizado) — tarea prevista para el Día 26 del plan.
- `agencias.iagentsdigital.com`, `clinicas.iagentsdigital.com` y `funerarias.iagentsdigital.com` no han sido rediseñadas todavía con este sistema — solo se ha documentado su color previsto donde el checklist ya lo especifica.
