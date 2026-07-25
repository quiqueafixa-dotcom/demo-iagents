# Inventario de centralización — demo-iagents-centralizado

Generado en modo lectura/copia local únicamente. Ningún archivo original fue modificado o eliminado.
Directorio base del clon: `origin/main` commit `333720a` (confirmado sin cambios en el remoto en el momento de esta tarea).

## sites/

| Archivo | Dominio | Procedencia exacta | SHA-256 | ¿Coincide con lo publicado? | Estado | Formulario/webhook | Recursos asociados | Decisión pendiente |
|---|---|---|---|---|---|---|---|---|
| `sites/agencias/index.html` | agencias.iagentsdigital.com | `iagents-web-edits/agencias.html` | `1d05d857f0fb8679...` | ✅ Sí (idéntico a publicado) | Actual | 1 elemento detectado | Autocontenido, sin recursos externos locales | Ninguna — versión ya correcta |
| `sites/clinicas/index.html` | clinicas.iagentsdigital.com | `iagents-web-edits/clinicas.html` | `f7dbee83bc2678ae...` | ✅ Sí | Actual | 2 elementos detectados | Autocontenido | Ninguna |
| `sites/criptos/index.html` | criptos.iagentsdigital.com | `iagents-web-edits/agentes-criptos.html` | `c1efd6bd5f5faaac...` | ✅ Sí | Actual | 0 detectado | Autocontenido | Ninguna |
| `sites/funerarias/index.html` | funerarias.iagentsdigital.com | `iagents-web-edits/deploy-funerarias/index.html` (NO trackeado en git) | `e079a2f99750ac36...` | ✅ Sí (coincide con lo publicado) | Actual | 2 elementos detectados | Autocontenido | **Decidir si esta es la versión definitiva frente a la candidata FuneralFlow (ver qa/)** |
| `sites/valoracion/index.html` | valoracion.iagentsdigital.com | `iagents-web-edits/valoracion.html` (nunca trackeado en git) | `2104d9161579e4f0...` | ✅ Sí (idéntico salvo salto de línea final) | Actual | `WEBHOOK_URL` real hacia n8n producción detectado | Autocontenido | **Decidir si se sustituye por la candidata nueva con logotipo (ver qa/)** |
| `sites/costera/index.html` | costera.iagentsdigital.com | `iagents-web-edits/landing-captacion-costera.html` | `871829009e2e89f1...` | ✅ Sí (idéntico, verificado con diff de contenido, solo difiere BOM) | Actual | Sin formulario propio detectado (enlaza a valoracion) | Autocontenido | Ninguna |

## demos/ (demos.iagentsdigital.com — sin índice raíz, 4 subrutas)

| Archivo | Subruta | Procedencia | SHA-256 | ¿Coincide? | Estado |
|---|---|---|---|---|---|
| `demos/captacion-propiedades/index.html` | `/captacion-propiedades/` | `deploy-demos/captacion-propiedades/index.html` | `03d56f7565899ddb...` | ✅ Sí | Actual |
| `demos/captacion-propiedades/assets/logo-iagents.png` | (recurso) | ídem `/assets/` | `02c97d0860beddf6...` | — | Recurso necesario |
| `demos/crossing-world-group/index.html` | `/crossing-world-group/` | `deploy-demos/crossing-world-group/index.html` | `f4932ed63b3ac611...` | ✅ Sí | Actual |
| `demos/funeraria-la-dolorosa/index.html` | `/funeraria-la-dolorosa/` | `deploy-demos/funeraria-la-dolorosa/index.html` | `301a3bd62999db64...` | ✅ Sí | Actual |
| `demos/inmobiliaria/index.html` | `/inmobiliaria/` | `deploy-demos/inmobiliaria/index.html` | `ff07a741b59ec390...` | ✅ Sí | Actual |
| `demos/inmobiliaria/assets/logo-iagents.png` | (recurso) | ídem | `02c97d0860beddf6...` | — | Recurso necesario |
| `demos/robots.txt` | — | `deploy-demos/robots.txt` | `331ea9090db0c9f6...` | — | Recurso necesario |

Ninguno de los 4 archivos anteriores está trackeado en git (toda la carpeta `deploy-demos/` es "untracked" en `iagents-web-edits`).

## legal/

Idénticos byte a byte entre `iagents-web-edits` y `demo-iagents-work` (confirmado antes de copiar):

| Archivo | SHA-256 |
|---|---|
| `legal/privacidad.html` | `8eb603096c7cb76f...` |
| `legal/cookies.html` | `c12c0fef18d0cb27...` |
| `legal/aviso-legal.html` | `2ab9d1d1edc5b64c...` |
| `legal/condiciones.html` | `5064458e1e4cd187...` |

## apex/ (iagentsdigital.com) — recursos de soporte, sin versión definitiva de index.html todavía

| Archivo | Procedencia | SHA-256 |
|---|---|---|
| `apex/robots.txt` | `demo-iagents-work/robots.txt` (no existe en iagents-web-edits, repo más atrasado) | `07bff7599a605374...` |
| `apex/sitemap.xml` | `demo-iagents-work/sitemap.xml` | `fa17da0ebca74c9c...` |
| `apex/logo.png` | `demo-iagents-work/logo.png` | `02c97d0860beddf6...` |
| `apex/assets/quique.jpg` | `demo-iagents-work/assets/quique.jpg` | `412cb05bc00a52c7...` |
| `apex/assets/demo_app.png` | `demo-iagents-work/assets/demo_app.png` | `197cbe0d359cbefa...` |
| `apex/assets/demo_ghl.png` | `demo-iagents-work/assets/demo_ghl.png` | `02b6296758eec6a4...` |
| `apex/assets/demo_n8n.png` | `demo-iagents-work/assets/demo_n8n.png` | `c7a4aec11a0b0a4c...` |

**`apex/index.html` NO se ha creado todavía — decisión pendiente, ver más abajo.**

## archive/apex-versiones/ — las tres (más dos) versiones de la web principal, sin elegir ninguna

| Archivo | Procedencia | SHA-256 | Notas |
|---|---|---|---|
| `apex-publicado-http-2026-07-25.html` | Descarga HTTP directa de `https://iagentsdigital.com/` en el momento de esta tarea | `befc5c1afd45f7df...` | Lo que está realmente en línea ahora mismo |
| `apex-iagents-web-edits-a164ba3.html` | `iagents-web-edits/index.html` (commit `a164ba3`) | `3490b6b238b51f20...` | No coincide con lo publicado |
| `apex-demo-iagents-work-333720a.html` | `demo-iagents-work/index.html` (commit `333720a`, tip de origin/main) | `33364166c120830f...` | No coincide con lo publicado |
| `apex-backup-antes-home-comercial.html` | `demo-iagents-work/index_backup_antes_home_comercial.html` | `d3db8b8efe1ab6d6...` | Backup local, sin trackear en git |
| `apex-preview-home-comercial.html` | `demo-iagents-work/index_home_comercial_preview.html` | `33364166c120830f...` (idéntico a `apex-demo-iagents-work-333720a.html`) | Preview local — mismo contenido que el index.html actual del commit 333720a |

**Decisión pendiente**: ninguna de las tres versiones principales coincide con lo publicado. Antes de fijar `apex/index.html` hace falta una revisión de contenido (no solo de hash) para decidir cuál es la deseada.

## qa/ — candidatas no publicadas

| Archivo | Procedencia | SHA-256 | Motivo de no estar publicada |
|---|---|---|---|
| `qa/valoracion-candidata-nueva.html` | `iagents-web-edits/qa/valoracion-piloto-redisenado-qa.html` | `da76b1f9a82cbf3b...` | Rediseño completo con logotipo oficial embebido, dos casillas de consentimiento, campos nuevos — nunca desplegada, por instrucción explícita en todas las sesiones anteriores |
| `qa/funerarias-funeralflow-candidata.html` | `iagents-web-edits/funerarias.html` (commit `3fb1f1f`, SÍ trackeado en git) | `aec529c6a5f5278e...` | Contenido "FuneralFlow" commiteado en git pero nunca publicado en Netlify — la versión realmente publicada es la de `sites/funerarias/index.html`, que no está en git |

## Recursos que faltan o referencias rotas detectadas

Ninguna detectada. Los 5 archivos de `sites/` y los 4 de `demos/` son autocontenidos (CSS/JS inline, imágenes como `data:` URI o referencias `https://` externas) salvo los dos `logo-iagents.png` de `demos/`, ya copiados junto con su HTML. El `index.html` de apex sí depende de recursos externos (`logo.png`, `assets/quique.jpg`) — copiados en `apex/`, pero **no se ha creado el `apex/index.html` definitivo todavía**, así que esos recursos quedan preparados a la espera de la decisión.

## Estado de git de este directorio

Repositorio recién clonado en `333720a`, árbol de trabajo limpio en el momento del clonado. Tras las copias: 6 carpetas nuevas (`apex/`, `archive/`, `demos/`, `legal/`, `qa/`, `sites/`) aparecen como *untracked* (`git status --short`). **No se ha ejecutado `git add` ni `git commit`.**
