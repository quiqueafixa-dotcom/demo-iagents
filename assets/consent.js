/*
 * iAgents Digital — Consent Mode básico (Analítica / Marketing).
 * Fuente única cargada desde https://iagentsdigital.com/assets/consent.js
 * en los 6 sitios del ecosistema. No depende de librerías externas.
 *
 * Requiere que ANTES de este script se haya ejecutado, de forma inline,
 * el bloque de consentimiento por defecto (analytics_storage/ad_storage/
 * ad_user_data/ad_personalization = 'denied') y la carga de GTM. Si este
 * archivo no llega a cargar (red, bloqueador, CDN caído), ese bloque
 * inline ya deja todo denegado por defecto: el sistema falla cerrado.
 */
(function () {
  'use strict';

  var COOKIE_NAME = 'ia_consent';
  var ECOSYSTEM_DOMAIN = 'iagentsdigital.com';
  var COOKIE_DAYS = 365;

  // ---------- Cookie de consentimiento ----------
  // En *.iagentsdigital.com se comparte entre subdominios (Domain=.iagentsdigital.com).
  // En cualquier otro host (p.ej. previews de Netlify) se guarda solo para ese host,
  // para poder hacer QA sin que el navegador rechace la cookie.
  function isEcosystemHost(hostname) {
    return hostname === ECOSYSTEM_DOMAIN ||
      hostname.slice(-(ECOSYSTEM_DOMAIN.length + 1)) === '.' + ECOSYSTEM_DOMAIN;
  }

  function setCookie(name, value, days) {
    var expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    var attrs = 'expires=' + expires.toUTCString() + '; path=/; SameSite=Lax';
    if (location.protocol === 'https:') attrs += '; Secure';
    if (isEcosystemHost(location.hostname)) attrs += '; domain=.' + ECOSYSTEM_DOMAIN;
    document.cookie = name + '=' + encodeURIComponent(value) + '; ' + attrs;
  }

  function getCookie(name) {
    var m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
    return m ? decodeURIComponent(m[1]) : null;
  }

  function readSavedConsent() {
    var raw = getCookie(COOKIE_NAME);
    if (!raw) return null;
    try {
      var parsed = JSON.parse(raw);
      var validAnalytics = parsed.analytics === 'granted' || parsed.analytics === 'denied';
      var validMarketing = parsed.marketing === 'granted' || parsed.marketing === 'denied';
      if (validAnalytics && validMarketing) return parsed;
    } catch (e) {}
    return null; // cookie ausente o corrupta -> se trata como "sin decisión"
  }

  // ---------- Señales hacia GTM / GA4 ----------
  // gtag() ya existe en window (definido por el bloque inline previo a este script).
  function pushConsentUpdate(state) {
    if (typeof window.gtag !== 'function') return;
    window.gtag('consent', 'update', {
      analytics_storage: state.analytics,
      ad_storage: state.marketing,
      ad_user_data: state.marketing,
      ad_personalization: state.marketing
    });
    if (state.analytics === 'granted') {
      // Evento explícito que dispara la etiqueta GA4 en GTM.
      // La etiqueta NO debe usar "Initialization - All Pages": debe escuchar este evento.
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'ia_analytics_granted' });
    }
  }

  function applyChoice(analyticsGranted, marketingGranted) {
    var prev = readSavedConsent();
    var wasAnalyticsGranted = !!(prev && prev.analytics === 'granted');
    var state = {
      analytics: analyticsGranted ? 'granted' : 'denied',
      marketing: marketingGranted ? 'granted' : 'denied'
    };
    setCookie(COOKIE_NAME, JSON.stringify(state), COOKIE_DAYS);

    if (wasAnalyticsGranted && !analyticsGranted) {
      // Revocación tras haber aceptado: recargar para descargar la instancia
      // de GA4 que ya pudiera estar activa (Enhanced Measurement incluido).
      location.reload();
      return;
    }

    pushConsentUpdate(state);
    hideBanner();
    hidePreferences();
  }

  // ---------- UI ----------
  var els = {};

  function injectStyles() {
    var css = ''
      + '.ia-consent-overlay{position:fixed;left:0;right:0;bottom:0;z-index:2147483000;'
      + 'font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;font-size:14px;'
      + 'background:#12141c;color:#eef1fc;box-shadow:0 -8px 30px rgba(0,0,0,.35)}'
      + '.ia-consent-inner{max-width:960px;margin:0 auto;padding:16px 20px;display:flex;'
      + 'flex-wrap:wrap;align-items:center;gap:14px;justify-content:space-between}'
      + '.ia-consent-text{flex:1 1 320px;line-height:1.5;color:#c9cfe8}'
      + '.ia-consent-text a{color:#9db2ff;text-decoration:underline}'
      + '.ia-consent-actions{display:flex;flex-wrap:wrap;align-items:center;gap:10px}'
      + '.ia-consent-btn{appearance:none;border:1px solid rgba(255,255,255,.25);border-radius:10px;'
      + 'padding:10px 18px;font-size:14px;font-weight:600;cursor:pointer;background:transparent;color:#eef1fc}'
      + '.ia-consent-btn:hover{border-color:rgba(255,255,255,.5)}'
      + '.ia-consent-btn.ia-primary{background:#2f4bff;border-color:#2f4bff;color:#fff}'
      + '.ia-consent-btn.ia-primary:hover{filter:brightness(1.1)}'
      + '.ia-consent-link{background:none;border:none;color:#9db2ff;text-decoration:underline;'
      + 'font-size:13px;cursor:pointer;padding:6px 4px}'
      + '.ia-consent-panel{position:fixed;inset:0;z-index:2147483001;background:rgba(5,6,14,.6);'
      + 'display:flex;align-items:center;justify-content:center;padding:20px}'
      + '.ia-consent-panel-box{background:#12141c;color:#eef1fc;max-width:480px;width:100%;'
      + 'border-radius:16px;padding:24px;box-shadow:0 20px 60px rgba(0,0,0,.5)}'
      + '.ia-consent-panel-box h3{margin:0 0 14px;font-size:17px}'
      + '.ia-consent-row{display:flex;align-items:flex-start;justify-content:space-between;'
      + 'gap:14px;padding:12px 0;border-top:1px solid rgba(255,255,255,.1)}'
      + '.ia-consent-row:first-of-type{border-top:none}'
      + '.ia-consent-row-text b{display:block;margin-bottom:2px}'
      + '.ia-consent-row-text span{color:#98a2c9;font-size:12.5px;line-height:1.5}'
      + '.ia-consent-switch{position:relative;flex-shrink:0;width:42px;height:24px}'
      + '.ia-consent-switch input{opacity:0;width:0;height:0}'
      + '.ia-consent-slider{position:absolute;inset:0;background:#3a3f5c;border-radius:999px;'
      + 'cursor:pointer;transition:.15s}'
      + '.ia-consent-slider::before{content:"";position:absolute;width:18px;height:18px;left:3px;'
      + 'top:3px;background:#fff;border-radius:50%;transition:.15s}'
      + '.ia-consent-switch input:checked + .ia-consent-slider{background:#2f4bff}'
      + '.ia-consent-switch input:checked + .ia-consent-slider::before{transform:translateX(18px)}'
      + '.ia-consent-switch input:disabled + .ia-consent-slider{opacity:.5;cursor:not-allowed}'
      + '.ia-consent-panel-actions{display:flex;justify-content:flex-end;gap:10px;margin-top:18px}'
      + '@media(max-width:520px){.ia-consent-inner{flex-direction:column;align-items:stretch}'
      + '.ia-consent-actions{justify-content:stretch}.ia-consent-btn{flex:1}}';
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  }

  function buildBanner() {
    var overlay = document.createElement('div');
    overlay.className = 'ia-consent-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-label', 'Consentimiento de cookies');
    overlay.innerHTML =
      '<div class="ia-consent-inner">' +
        '<div class="ia-consent-text">Usamos cookies necesarias para el funcionamiento del sitio y, ' +
        'solo con tu permiso, cookies de analítica para entender cómo se usa. Puedes cambiar tu ' +
        'elección cuando quieras. Más información en nuestra ' +
        '<a href="https://iagentsdigital.com/cookies.html">Política de cookies</a>.</div>' +
        '<div class="ia-consent-actions">' +
          '<button type="button" class="ia-consent-btn" data-ia-action="reject">Rechazar</button>' +
          '<button type="button" class="ia-consent-btn ia-primary" data-ia-action="accept">Aceptar</button>' +
          '<button type="button" class="ia-consent-link" data-ia-action="configure">Configurar</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);
    els.banner = overlay;

    overlay.querySelector('[data-ia-action="reject"]').addEventListener('click', function () {
      applyChoice(false, false);
    });
    overlay.querySelector('[data-ia-action="accept"]').addEventListener('click', function () {
      applyChoice(true, true);
    });
    overlay.querySelector('[data-ia-action="configure"]').addEventListener('click', openPreferences);
  }

  function buildPanel() {
    var panel = document.createElement('div');
    panel.className = 'ia-consent-panel';
    panel.style.display = 'none';
    panel.innerHTML =
      '<div class="ia-consent-panel-box" role="dialog" aria-label="Preferencias de cookies">' +
        '<h3>Preferencias de cookies</h3>' +
        '<div class="ia-consent-row">' +
          '<div class="ia-consent-row-text"><b>Necesarias</b>' +
          '<span>Imprescindibles para que el sitio funcione. Siempre activas.</span></div>' +
          '<label class="ia-consent-switch"><input type="checkbox" checked disabled>' +
          '<span class="ia-consent-slider"></span></label>' +
        '</div>' +
        '<div class="ia-consent-row">' +
          '<div class="ia-consent-row-text"><b>Analítica</b>' +
          '<span>Google Analytics (GA4). Nos ayuda a entender el uso del sitio.</span></div>' +
          '<label class="ia-consent-switch"><input type="checkbox" id="ia-consent-analytics">' +
          '<span class="ia-consent-slider"></span></label>' +
        '</div>' +
        '<div class="ia-consent-row">' +
          '<div class="ia-consent-row-text"><b>Marketing</b>' +
          '<span>Reservado para futuras herramientas (aún no utilizamos ninguna).</span></div>' +
          '<label class="ia-consent-switch"><input type="checkbox" id="ia-consent-marketing">' +
          '<span class="ia-consent-slider"></span></label>' +
        '</div>' +
        '<div class="ia-consent-panel-actions">' +
          '<button type="button" class="ia-consent-btn" data-ia-action="panel-reject">Rechazar todo</button>' +
          '<button type="button" class="ia-consent-btn ia-primary" data-ia-action="panel-save">Guardar preferencias</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(panel);
    els.panel = panel;

    panel.querySelector('[data-ia-action="panel-save"]').addEventListener('click', function () {
      var analytics = document.getElementById('ia-consent-analytics').checked;
      var marketing = document.getElementById('ia-consent-marketing').checked;
      applyChoice(analytics, marketing);
    });
    panel.querySelector('[data-ia-action="panel-reject"]').addEventListener('click', function () {
      applyChoice(false, false);
    });
    // Cerrar el panel al hacer clic fuera de la caja.
    panel.addEventListener('click', function (e) {
      if (e.target === panel) hidePreferences();
    });
  }

  function openPreferences() {
    var saved = readSavedConsent();
    document.getElementById('ia-consent-analytics').checked = !!(saved && saved.analytics === 'granted');
    document.getElementById('ia-consent-marketing').checked = !!(saved && saved.marketing === 'granted');
    els.panel.style.display = 'flex';
  }

  function hidePreferences() {
    if (els.panel) els.panel.style.display = 'none';
  }

  function hideBanner() {
    if (els.banner) els.banner.style.display = 'none';
  }

  function showBanner() {
    if (els.banner) els.banner.style.display = 'block';
  }

  // Enlaces "Preferencias de cookies" del footer de cualquiera de los 6 sitios.
  document.addEventListener('click', function (e) {
    var el = e.target.closest && e.target.closest('.ia-consent-preferences');
    if (!el) return;
    e.preventDefault();
    openPreferences();
  });

  function init() {
    injectStyles();
    buildBanner();
    buildPanel();

    var saved = readSavedConsent();
    if (!saved) {
      // Visitante nuevo: sin decisión, sin señales adicionales. GA4 permanece
      // bloqueado por el 'denied' inline hasta que el usuario elija.
      showBanner();
      return;
    }

    hideBanner();
    if (saved.analytics === 'granted') {
      // Elección positiva previamente guardada: se restaura sin recargar.
      pushConsentUpdate(saved);
    } else {
      pushConsentUpdate(saved); // refuerza 'denied' explícitamente (incluye marketing)
    }
  }

  window.iaOpenConsentPreferences = openPreferences;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
