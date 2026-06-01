/**
 * main.js — entry point
 * Handles HTML fragment injection (header/footer) and canvas DPR scaling.
 */

/* ─────────────────────────────────────────────────────────────
   Fragment injection — header & footer
   Finds every [data-include] placeholder in the document,
   fetches the matching HTML fragment, and replaces it with
   parsed DOM nodes.  Dispatches 'toloka:ready' after all
   fetches settle so transition.js can safely query injected
   elements.

   REQUIRES HTTP — fetch() does not work on file:// URLs.
   Serve with: npx serve · python -m http.server · VS Code Live Server.
   ───────────────────────────────────────────────────────────── */

/* ─────────────────────────────────────────────────────────────
   initNavDropdown — wires the burger toggle + nav dropdown for
   one injected header element.  Called once per header, right
   after the fragment is placed in the DOM.
   No IDs are used — all queries are scoped to headerEl so the
   function is safe to call multiple times (once per screen).
   ───────────────────────────────────────────────────────────── */
function initNavDropdown(headerEl) {
  var btn      = headerEl.querySelector('[data-nav-menu]');
  var dropdown = headerEl.querySelector('.header-nav-dropdown');
  if (!btn || !dropdown) { return; }

  var burger = btn.querySelector('.btn-menu__burger');
  var closeX = btn.querySelector('.btn-menu__close');
  var timer  = null;

  function showBurger() {
    if (burger) { burger.style.display = '';      }
    if (closeX) { closeX.style.display = 'none';  }
  }

  function showX() {
    if (burger) { burger.style.display = 'none';  }
    if (closeX) { closeX.style.display = 'block'; }
  }

  function openDropdown() {
    clearTimeout(timer);
    dropdown.classList.remove('header-nav-dropdown--closing');
    dropdown.classList.add('header-nav-dropdown--open');
    dropdown.setAttribute('aria-hidden', 'false');
    btn.setAttribute('aria-expanded', 'true');
    btn.setAttribute('aria-label', 'Закрити меню');
    showX();
  }

  function closeDropdown() {
    if (!dropdown.classList.contains('header-nav-dropdown--open')) { return; }
    dropdown.classList.remove('header-nav-dropdown--open');
    dropdown.classList.add('header-nav-dropdown--closing');
    dropdown.setAttribute('aria-hidden', 'true');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Відкрити меню');
    showBurger();
    timer = setTimeout(function () {
      dropdown.classList.remove('header-nav-dropdown--closing');
    }, 180);
  }

  /* Toggle on button click */
  btn.addEventListener('click', function () {
    if (btn.getAttribute('aria-expanded') === 'true') {
      closeDropdown();
    } else {
      openDropdown();
    }
  });

  /* Close when clicking outside this header */
  document.addEventListener('click', function (e) {
    if (btn.getAttribute('aria-expanded') !== 'true') { return; }
    if (!headerEl.contains(e.target)) { closeDropdown(); }
  });

  /* Close on Escape */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
      closeDropdown();
      btn.focus();
    }
  });

  /* Close when any nav link is clicked (transition.js handles the actual navigation) */
  dropdown.querySelectorAll('.header-nav-dropdown__link').forEach(function (link) {
    link.addEventListener('click', closeDropdown);
  });
}

(function () {
  'use strict';

  var FRAGMENTS = {
    'site-header': 'components/header.html',
    'site-footer': 'components/footer.html'
  };

  var READY = 'toloka:ready';

  function loadFragments() {
    var slots = Array.from(document.querySelectorAll('[data-include]'));

    if (!slots.length) {
      document.dispatchEvent(new CustomEvent(READY));
      return;
    }

    var remaining = slots.length;

    function settle() {
      remaining -= 1;
      if (remaining === 0) {
        document.dispatchEvent(new CustomEvent(READY));
      }
    }

    slots.forEach(function (slot) {
      var key  = slot.getAttribute('data-include');
      var path = FRAGMENTS[key];

      if (!path) { settle(); return; }

      fetch(path)
        .then(function (res) {
          if (!res.ok) { throw new Error('HTTP ' + res.status + ' fetching ' + path); }
          return res.text();
        })
        .then(function (html) {
          var tmp = document.createElement('div');
          tmp.innerHTML = html.trim();
          var injectedHeader = tmp.querySelector('.site-header');
          var children = Array.from(tmp.childNodes);
          slot.replaceWith.apply(slot, children);
          if (injectedHeader) {
            injectedHeader.setAttribute('data-nav-init', '1');
            initNavDropdown(injectedHeader);
          }
        })
        .catch(function (err) {
          console.warn('[toloka/includes]', err);
          /* Fallback: inject header from <template id="tpl-header"> when
             fetch() is unavailable (file:// protocol or network error).    */
          if (key === 'site-header') {
            var tpl = document.getElementById('tpl-header');
            if (tpl) {
              var clone   = tpl.content.cloneNode(true);
              var fbHeader = clone.querySelector('.site-header');
              slot.replaceWith.apply(slot, Array.from(clone.childNodes));
              if (fbHeader) {
                fbHeader.setAttribute('data-nav-init', '1');
                initNavDropdown(fbHeader);
              }
            }
          }
        })
        .then(settle, settle);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadFragments);
  } else {
    loadFragments();
  }
}());

/* ─────────────────────────────────────────────────────────────
   HiDPI / Retina canvas helper
   ─────────────────────────────────────────────────────────────
   Problem
   -------
   A <canvas> element has two separate "sizes":
     1. The CSS size  (layout, set via width/height attributes or CSS)
     2. The backing-store resolution (canvas.width / canvas.height in pixels)

   On a standard 1× screen both are the same.
   On a 2× Retina screen the browser has 2 physical pixels per CSS pixel,
   but canvas still defaults to a 1× backing store, so every logical pixel
   is stretched over 2×2 physical pixels → blurry edges, strokes look thin.

   Fix
   ---
   • Scale the backing store up by devicePixelRatio (DPR).
   • Keep the CSS size unchanged so layout is not affected.
   • Pre-scale the 2D context by DPR so all draw calls use logical
     (CSS-pixel) coordinates — ctx.lineWidth = 1.5 renders as
     1.5 CSS px regardless of DPR.

   Usage
   -----
   const ctx = setupCanvas(document.getElementById('myCanvas'));
   ctx.beginPath();
   ctx.lineWidth = 1.5;
   ctx.strokeStyle = '#0D0E0F';
   ctx.arc(50, 50, 40, 0, Math.PI * 2);
   ctx.stroke();

   window.addEventListener('resize', () => setupCanvas(canvas));
   ───────────────────────────────────────────────────────────── */

/**
 * Scale a canvas element for the current devicePixelRatio.
 * @param {HTMLCanvasElement} canvas
 * @returns {CanvasRenderingContext2D} A pre-scaled 2D context.
 */
function setupCanvas(canvas) {
  const dpr  = window.devicePixelRatio ?? 1;
  const rect = canvas.getBoundingClientRect();
  const cssW = rect.width  || canvas.width;
  const cssH = rect.height || canvas.height;

  canvas.width  = Math.round(cssW * dpr);
  canvas.height = Math.round(cssH * dpr);

  canvas.style.width  = `${cssW}px`;
  canvas.style.height = `${cssH}px`;

  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  return ctx;
}

/** Run setupCanvas on every <canvas> in the document. */
function applyDPRToAll() {
  document.querySelectorAll('canvas').forEach(setupCanvas);
}

document.addEventListener('DOMContentLoaded', applyDPRToAll);

function watchDPRChange() {
  const dpr = window.devicePixelRatio ?? 1;
  const mq  = window.matchMedia(`(resolution: ${dpr}dppx)`);

  function onDPRChange() {
    mq.removeEventListener('change', onDPRChange);
    applyDPRToAll();
    watchDPRChange();
  }

  mq.addEventListener('change', onDPRChange);
}

watchDPRChange();

console.log('Prototype ready. DPR:', window.devicePixelRatio ?? 1);

/* Safety net: initialise any .site-header that was not yet wired
   (covers edge cases where template was unavailable).             */
document.addEventListener('toloka:ready', function () {
  document.querySelectorAll('.site-header:not([data-nav-init])').forEach(function (h) {
    h.setAttribute('data-nav-init', '1');
    initNavDropdown(h);
  });
});
