/* ============================================================
   Screen transitions — EcoToloka
   All overlay screens (#screen-map, #screen-about) live inside
   #screen-container (position:fixed;inset:0;display:none).
   Opening a screen: show container → set screen display:block.
   Closing a screen: set screen display:none → hide container
   when no other screen is still active.
   No sliding animation — switch is instant, no layout shift.
   ============================================================ */

(function () {
  'use strict';

  document.addEventListener('toloka:ready', function () {

    /* ── Shared screen-container helpers ─────────────────────
       showContainer     — reveals the fixed host, locks body scroll
       hideContainerIfEmpty(el) — hides host + restores scroll when
         no child screen is active; moves focus to el (the trigger) */

    var screenContainer  = document.getElementById('screen-container');
    var screenAbout      = document.getElementById('screen-about');
    var screenToloka     = document.getElementById('screen-toloka');
    var screenMapFull    = document.getElementById('screen-map-full');
    var screenMaps       = document.getElementById('screen-maps');
    var screenProfile    = document.getElementById('screen-profile');
    var screenTolokaWeek = document.getElementById('screen-toloka-week');
    var btnTolokaMap     = document.getElementById('btn-toloka-map');
    var btnMapCalendar   = document.getElementById('btn-map-calendar');
    var btnMapFullClose  = screenMapFull && screenMapFull.querySelector('[data-close-screen]');
    /* Tracks which screen opened map-full so close returns to the right place */
    var mapFullOpenedFrom = null; /* 'toloka' | 'map' | 'profile' | 'toloka-week' */
    var mapsOpenedFrom    = null; /* 'toloka-week' */
    /* All elements with .js-open-about open the about screen   *
     * (heading button 1593:16725 + CTA button). First one is   *
     * used as the return-focus target when closing.            */
    var aboutTriggers    = document.querySelectorAll('.js-open-about');
    var ctaIconBtn       = aboutTriggers[0] || null;   /* focus target on close */
    var btnAboutClose    = screenAbout && screenAbout.querySelector('[data-close-screen]');

    function showContainer() {
      if (screenContainer) { screenContainer.classList.add('screen-container--active'); }
      document.body.style.overflow = 'hidden';
    }

    /* Called after a screen's --open class is already removed  */
    function hideContainerIfEmpty(returnFocusEl) {
      /* screen (map) declared below but var-hoisted — value set by call time */
      var mapOpen          = screen             && screen.classList.contains('map-screen--open');
      var aboutOpen        = screenAbout        && screenAbout.classList.contains('about-screen--open');
      var tolokaOpen       = screenToloka       && screenToloka.classList.contains('toloka-screen--open');
      var mapFullOpen      = screenMapFull      && screenMapFull.classList.contains('map-full-screen--open');
      var mapsOpen         = screenMaps         && screenMaps.classList.contains('maps-screen--open');
      var profileOpen      = screenProfile      && screenProfile.classList.contains('profile-screen--open');
      var tolokaWeekOpen   = screenTolokaWeek   && screenTolokaWeek.classList.contains('toloka-week-screen--open');
      if (!mapOpen && !aboutOpen && !tolokaOpen && !mapFullOpen && !mapsOpen && !profileOpen && !tolokaWeekOpen) {
        if (screenContainer) { screenContainer.classList.remove('screen-container--active'); }
        document.body.style.overflow = '';
      }
      if (returnFocusEl) { returnFocusEl.focus(); }
    }

    /* ── About screen (Про нас) ──────────────────────────── */
    /* Figma: triggers .js-open-about → #screen-about (1691-5491)          *
     * Two triggers: heading button (1593:16725) + CTA icon button.         */

    if (aboutTriggers.length && screenAbout) {

      function openAboutScreen(e) {
        e.preventDefault();
        closeAllOverlays();   /* ensure no other screen stays --open */
        showContainer();
        screenAbout.classList.add('about-screen--open');
        screenAbout.removeAttribute('aria-hidden');
        screenAbout.setAttribute('tabindex', '-1');
        screenAbout.scrollTop = 0;
        screenAbout.focus({ preventScroll: true });
      }

      function closeAboutScreen() {
        screenAbout.classList.remove('about-screen--open');
        screenAbout.setAttribute('aria-hidden', 'true');
        hideContainerIfEmpty(ctaIconBtn);
      }

      /* Bind every .js-open-about trigger */
      aboutTriggers.forEach(function (btn) {
        btn.addEventListener('click', openAboutScreen);
      });

      if (btnAboutClose) {
        btnAboutClose.addEventListener('click', closeAboutScreen);
      }

      /* "толочити" CTA (Figma 1922:14223) → close about-screen →
         open "Толоки 375 Тиждень" screen (Figma 1921:15307)       */
      var btnAboutTolochyty = document.getElementById('btn-about-tolochyty');
      if (btnAboutTolochyty && screenTolokaWeek) {
        btnAboutTolochyty.addEventListener('click', function (e) {
          e.preventDefault();
          screenAbout.classList.remove('about-screen--open');
          screenAbout.setAttribute('aria-hidden', 'true');
          showContainer();
          screenTolokaWeek.classList.add('toloka-week-screen--open');
          screenTolokaWeek.removeAttribute('aria-hidden');
          screenTolokaWeek.setAttribute('tabindex', '-1');
          screenTolokaWeek.scrollTop = 0;
          screenTolokaWeek.focus({ preventScroll: true });
        });
      }

      screenAbout.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { closeAboutScreen(); }
      });

    }

    /* ── Nav dropdown ───────────────────────────────────────
       Initialized per-header by initNavDropdown() in main.js,
       called in the fetch injection callback for every header.
       No code needed here — transition.js handles screen open/close only. */

    /* ── closeAllOverlays — shared helper ───────────────────
       Strips --open from every overlay screen without touching
       the container. Called before opening a new screen so
       only one screen is ever active at a time.              */
    function closeAllOverlays() {
      if (screen) {
        screen.classList.remove('map-screen--open');
        screen.setAttribute('aria-hidden', 'true');
      }
      if (screenAbout) {
        screenAbout.classList.remove('about-screen--open');
        screenAbout.setAttribute('aria-hidden', 'true');
      }
      if (screenToloka) {
        screenToloka.classList.remove('toloka-screen--open');
        screenToloka.setAttribute('aria-hidden', 'true');
      }
      if (screenMapFull) {
        screenMapFull.classList.remove('map-full-screen--open');
        screenMapFull.setAttribute('aria-hidden', 'true');
      }
      if (screenMaps) {
        screenMaps.classList.remove('maps-screen--open');
        screenMaps.setAttribute('aria-hidden', 'true');
      }
      if (screenProfile) {
        screenProfile.classList.remove('profile-screen--open');
        screenProfile.setAttribute('aria-hidden', 'true');
      }
      if (screenTolokaWeek) {
        screenTolokaWeek.classList.remove('toloka-week-screen--open');
        screenTolokaWeek.setAttribute('aria-hidden', 'true');
      }
    }

    /* ── Map screen (Мапа толок) ─────────────────────────── */

    var trigger  = document.getElementById('btn-join');
    var screen   = document.getElementById('screen-map');
    var closeBtn = screen && screen.querySelector('[data-close-screen]');

    /* Guard: bail gracefully if required elements are missing */
    if (!trigger || !screen) { return; }

    /* ── Open ──────────────────────────────────────────────── */
    function openScreen(e) {
      e.preventDefault();
      showContainer();
      screen.classList.add('map-screen--open');
      screen.removeAttribute('aria-hidden');
      screen.setAttribute('tabindex', '-1');
      screen.scrollTop = 0;
      screen.focus({ preventScroll: true });
    }

    /* ── Close ─────────────────────────────────────────────── */
    function closeScreen() {
      screen.classList.remove('map-screen--open');
      screen.setAttribute('aria-hidden', 'true');
      hideContainerIfEmpty(trigger);
    }

    /* Bind trigger */
    trigger.addEventListener('click', openScreen);

    /* Bind close button (burger icon in map screen header — id="btn-map-close") */
    if (closeBtn) {
      closeBtn.addEventListener('click', closeScreen);
    }

    /* Close on Escape key (accessibility + power-user UX)     */
    screen.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeScreen(); }
    });

    /* ── Join confirmation modal + Registration modal ──────── */
    /* join:     Figma 1593:15559 · Trigger: #btn-tolochyty     */
    /* register: Figma 1593:15939 · Trigger: #btn-join-register */

    var btnTolochyty    = document.getElementById('btn-tolochyty');
    var modalJoin       = document.getElementById('modal-join');
    var btnModalClose   = document.getElementById('btn-join-modal-close');
    var btnJoinRegister = document.getElementById('btn-join-register');
    var modalRegister   = document.getElementById('modal-register');
    var btnRegisterClose = document.getElementById('btn-register-close');

    if (btnTolochyty && modalJoin) {

      /* ── Helpers ──────────────────────────────────────────── */

      /* stampOverlay: positions an overlay element so it covers  *
       * exactly the visible area at the current scroll position  */
      function stampOverlay(el) {
        el.style.top    = screen.scrollTop    + 'px';
        el.style.height = screen.clientHeight + 'px';
      }

      /* closeAll: hides every modal layer and restores scroll    */
      function closeAll() {
        modalJoin.classList.remove('join-modal--open');
        modalJoin.setAttribute('aria-hidden', 'true');
        if (modalRegister) {
          modalRegister.classList.remove('join-modal--open');
          modalRegister.setAttribute('aria-hidden', 'true');
        }
        screen.style.overflowY = '';
        btnTolochyty.focus();
      }

      /* ── Open join modal ──────────────────────────────────── */
      function openModal() {
        stampOverlay(modalJoin);
        modalJoin.classList.add('join-modal--open');
        modalJoin.setAttribute('aria-hidden', 'false');
        screen.style.overflowY = 'hidden';
        modalJoin.setAttribute('tabindex', '-1');
        modalJoin.focus({ preventScroll: true });
      }

      /* ── Open register modal ──────────────────────────────── */
      function openRegisterModal() {
        if (!modalRegister) { return; }
        /* Swap: hide join modal, show register modal             */
        modalJoin.classList.remove('join-modal--open');
        modalJoin.setAttribute('aria-hidden', 'true');
        stampOverlay(modalRegister);
        modalRegister.classList.add('join-modal--open');
        modalRegister.setAttribute('aria-hidden', 'false');
        modalRegister.setAttribute('tabindex', '-1');
        modalRegister.focus({ preventScroll: true });
      }

      /* ── Bindings: join modal ─────────────────────────────── */
      btnTolochyty.addEventListener('click', openModal);

      if (btnModalClose) {
        btnModalClose.addEventListener('click', closeAll);
      }

      if (btnJoinRegister) {
        btnJoinRegister.addEventListener('click', openRegisterModal);
      }

      modalJoin.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { closeAll(); }
      });

      modalJoin.addEventListener('click', function (e) {
        if (e.target === modalJoin) { closeAll(); }
      });

      /* ── Bindings: register modal ─────────────────────────── */
      if (modalRegister) {

        if (btnRegisterClose) {
          btnRegisterClose.addEventListener('click', closeAll);
        }

        modalRegister.addEventListener('keydown', function (e) {
          if (e.key === 'Escape') { closeAll(); }
        });

        modalRegister.addEventListener('click', function (e) {
          if (e.target === modalRegister) { closeAll(); }
        });

      }

      /* ── Success toast ──────────────────────────────────────
         Figma node 1593:15213 — "Заявку прийнято"
         Triggered by both buttons in Frame 810 (1593:15951).
         Animation: fade in 0.4 s → hold → fade out 0.6 s (4 s total).
         animationend removes .toast--visible so it resets for reuse.   */

      var toastOverlay        = document.getElementById('toast-overlay');
      var toastSuccess        = document.getElementById('toast-success');
      var actionBtnsDefault   = document.getElementById('map-action-btns-default');
      var actionBtnsJoined    = document.getElementById('map-action-btns-joined');

      /* switchToJoinedState: called once the toast finishes fading.
         Swaps the entire container: hides Figma 1669:13552 (толочити),
         reveals Figma 1669:13569 (прийнято + Мінуснутися).
         Uses style.display (inline styles) — the .map-action-btns class
         sets display:flex which would override a [hidden] attribute since
         author stylesheets beat UA stylesheets regardless of specificity. */
      function switchToJoinedState() {
        if (actionBtnsDefault) { actionBtnsDefault.style.display = 'none'; }
        if (actionBtnsJoined)  { actionBtnsJoined.style.display  = 'flex'; }
      }

      function showToast() {
        closeAll();                      /* close all modals first        */
        if (!toastOverlay || !toastSuccess) { return; }
        /* Stamp current scroll offset — same pattern as openModal()     */
        stampOverlay(toastOverlay);
        /* Show backdrop overlay                                          */
        toastOverlay.classList.add('toast-overlay--visible');
        /* Reset card in case it was mid-animation from a previous tap   */
        toastSuccess.classList.remove('toast--visible');
        /* Force reflow so removing+re-adding the class restarts anim    */
        void toastSuccess.offsetWidth;
        toastSuccess.classList.add('toast--visible');
        /* When animation ends: hide overlay, swap action buttons        */
        toastSuccess.addEventListener('animationend', function handler() {
          toastSuccess.classList.remove('toast--visible');
          toastOverlay.classList.remove('toast-overlay--visible');
          toastSuccess.removeEventListener('animationend', handler);
          switchToJoinedState();
        });
      }

      /* Bind both .register-btn elements inside #modal-register        */
      if (modalRegister) {
        var registerBtns = modalRegister.querySelectorAll('.register-btn');
        registerBtns.forEach(function (btn) {
          btn.addEventListener('click', function (e) {
            e.preventDefault();   /* stop native form submit            */
            showToast();
          });
        });
      }

    }

    /* ── District dropdown ──────────────────────────────────── */
    /* Figma node 1593:14332 — relevant state: dropdown-open    */

    var districtBtn   = document.getElementById('map-district-btn');
    var dropdown      = document.getElementById('map-dropdown');
    var districtLabel = document.getElementById('map-district-label');

    /* Timer reference for collapse animation (180ms matches CSS keyframe) */
    var closeTimer = null;

    if (districtBtn && dropdown) {

      /* Toggle the dropdown */
      districtBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var isOpen = dropdown.classList.contains('map-dropdown--open');
        if (isOpen) {
          closeDropdown();
        } else {
          openDropdown();
        }
      });

      /* Select an option — update label and close */
      dropdown.addEventListener('click', function (e) {
        var opt = e.target.closest('.map-dropdown__option');
        if (!opt) { return; }
        var label = opt.getAttribute('data-label');
        if (label && districtLabel) {
          districtLabel.textContent = label;
        }
        closeDropdown();
      });

      /* Close on click outside the toolbar wrapper              */
      document.addEventListener('click', function (e) {
        if (!e.target.closest('.map-toolbar-wrap')) {
          closeDropdown();
        }
      });

      /* Close on Escape inside the map screen                   */
      screen.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && dropdown.classList.contains('map-dropdown--open')) {
          closeDropdown();
          districtBtn.focus();
        }
      });
    }

    /* ── Toloka screen — close + Escape ─────────────────────────
       Opened by #btn-about-tolochyty (handled in about section).
       Closing returns focus to .js-open-about trigger (main page). */

    if (screenToloka) {

      function closeTolokaScreen() {
        screenToloka.classList.remove('toloka-screen--open');
        screenToloka.setAttribute('aria-hidden', 'true');
        hideContainerIfEmpty(ctaIconBtn);  /* return focus to main-page about trigger */
      }

      var btnTolokaClose = screenToloka && screenToloka.querySelector('[data-close-screen]');
      if (btnTolokaClose) {
        btnTolokaClose.addEventListener('click', closeTolokaScreen);
      }

      screenToloka.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { closeTolokaScreen(); }
      });

      /* Map button (Figma 1593:14217) → "Мапа толок 375" screen (Figma 1256:15438)
         Pattern: close toloka first, open map-full second; container stays active. */
      if (btnTolokaMap && screenMapFull) {
        btnTolokaMap.addEventListener('click', function () {
          /* 1. Close toloka (no focus return — transitioning to map-full) */
          screenToloka.classList.remove('toloka-screen--open');
          screenToloka.setAttribute('aria-hidden', 'true');
          /* 2. Open map-full (container stays active — no flicker)         */
          mapFullOpenedFrom = 'toloka';
          showContainer();
          screenMapFull.classList.add('map-full-screen--open');
          screenMapFull.removeAttribute('aria-hidden');
          screenMapFull.setAttribute('tabindex', '-1');
          screenMapFull.scrollTop = 0;
          screenMapFull.focus({ preventScroll: true });
        });
      }

    }

    /* ── Map Full screen (Мапа толок — Figma 1092:14419) ─────────────────
       Opened from toloka-screen map button (#btn-toloka-map).
       Closing (burger close / Escape) returns to toloka screen.           */

    if (screenMapFull) {

      function closeMapFullScreen() {
        screenMapFull.classList.remove('map-full-screen--open');
        screenMapFull.setAttribute('aria-hidden', 'true');
        var from = mapFullOpenedFrom;
        mapFullOpenedFrom = null;
        if (from === 'map' && screen) {
          /* Came from calendar button on map screen — return there */
          screen.classList.add('map-screen--open');
          screen.removeAttribute('aria-hidden');
          screen.setAttribute('tabindex', '-1');
          screen.scrollTop = 0;
          screen.focus({ preventScroll: true });
        } else if (from === 'profile' && screenProfile) {
          /* Came from event item in profile Recently Events — return there */
          screenProfile.classList.add('profile-screen--open');
          screenProfile.removeAttribute('aria-hidden');
          screenProfile.setAttribute('tabindex', '-1');
          screenProfile.focus({ preventScroll: true });
        } else if (from === 'toloka-week' && screenTolokaWeek) {
          /* Came from event card on Толоки 375 Тиждень — return there */
          screenTolokaWeek.classList.add('toloka-week-screen--open');
          screenTolokaWeek.removeAttribute('aria-hidden');
          screenTolokaWeek.setAttribute('tabindex', '-1');
          screenTolokaWeek.scrollTop = 0;
          screenTolokaWeek.focus({ preventScroll: true });
        } else if (screenToloka) {
          /* Came from toloka screen — return there */
          screenToloka.classList.add('toloka-screen--open');
          screenToloka.removeAttribute('aria-hidden');
          screenToloka.setAttribute('tabindex', '-1');
          screenToloka.scrollTop = 0;
          screenToloka.focus({ preventScroll: true });
        } else {
          hideContainerIfEmpty(ctaIconBtn);
        }
      }

      /* Calendar button on map screen → open "Мапа толок 375" (Figma 1256:15438) */
      if (btnMapCalendar && screenMapFull) {
        btnMapCalendar.addEventListener('click', function () {
          /* 1. Close map screen (no focus return — transitioning to map-full) */
          screen.classList.remove('map-screen--open');
          screen.setAttribute('aria-hidden', 'true');
          /* 2. Open map-full; record origin so close returns here             */
          mapFullOpenedFrom = 'map';
          showContainer();
          screenMapFull.classList.add('map-full-screen--open');
          screenMapFull.removeAttribute('aria-hidden');
          screenMapFull.setAttribute('tabindex', '-1');
          screenMapFull.scrollTop = 0;
          screenMapFull.focus({ preventScroll: true });
        });
      }

      if (btnMapFullClose) {
        btnMapFullClose.addEventListener('click', closeMapFullScreen);
      }

      screenMapFull.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          /* If the district dropdown is open, let it handle Escape first  */
          if (mapFullDropdown &&
              mapFullDropdown.classList.contains('map-full-dropdown--open')) {
            return;
          }
          closeMapFullScreen();
        }
      });

      /* ── Map-full district dropdown ──────────────────────────────────
         Same open/close pattern as #screen-map district dropdown.
         Wrapper (.map-full-toolbar__district-wrap) is position:relative;
         panel (#map-full-dropdown) is position:absolute below button.   */

      var mapFullDistrictBtn   = document.getElementById('map-full-district-btn');
      var mapFullDropdown      = document.getElementById('map-full-dropdown');
      var mapFullDistrictLabel = document.getElementById('map-full-district-label');
      var mapFullCloseTimer    = null;

      function openMapFullDropdown() {
        if (mapFullCloseTimer) {
          clearTimeout(mapFullCloseTimer);
          mapFullCloseTimer = null;
        }
        mapFullDropdown.classList.remove('map-full-dropdown--closing');
        mapFullDropdown.classList.add('map-full-dropdown--open');
        mapFullDropdown.removeAttribute('aria-hidden');
        mapFullDistrictBtn.setAttribute('aria-expanded', 'true');
      }

      function closeMapFullDropdown() {
        if (!mapFullDropdown.classList.contains('map-full-dropdown--open') &&
            !mapFullDropdown.classList.contains('map-full-dropdown--closing')) {
          return;
        }
        mapFullDropdown.classList.remove('map-full-dropdown--open');
        mapFullDropdown.classList.add('map-full-dropdown--closing');
        mapFullDistrictBtn.setAttribute('aria-expanded', 'false');
        mapFullDropdown.setAttribute('aria-hidden', 'true');
        mapFullCloseTimer = setTimeout(function () {
          mapFullDropdown.classList.remove('map-full-dropdown--closing');
          mapFullCloseTimer = null;
        }, 180);
      }

      if (mapFullDistrictBtn && mapFullDropdown) {

        /* Toggle open/close on button click */
        mapFullDistrictBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          if (mapFullDropdown.classList.contains('map-full-dropdown--open')) {
            closeMapFullDropdown();
          } else {
            openMapFullDropdown();
          }
        });

        /* Select an option — update label and close */
        mapFullDropdown.addEventListener('click', function (e) {
          var opt = e.target.closest('.map-full-dropdown__option');
          if (!opt) { return; }
          var label = opt.getAttribute('data-label');
          if (label && mapFullDistrictLabel) {
            mapFullDistrictLabel.textContent = label;
          }
          closeMapFullDropdown();
        });

        /* Close on click outside the district-wrap */
        document.addEventListener('click', function (e) {
          if (!e.target.closest('.map-full-toolbar__district-wrap')) {
            closeMapFullDropdown();
          }
        });

        /* Close on Escape inside map-full screen */
        screenMapFull.addEventListener('keydown', function (e) {
          if (e.key === 'Escape' && mapFullDropdown.classList.contains('map-full-dropdown--open')) {
            closeMapFullDropdown();
            mapFullDistrictBtn.focus();
          }
        });

      }

    }

    /* ── Maps screen (Мапа толок 375 — Figma 1256:15438) ────────────────
       Opened by [data-open-screen="maps"] links in the nav dropdown.
       Closing: Escape key.                                               */

    if (screenMaps) {

      function openMapsScreen(e, from) {
        if (e) { e.preventDefault(); }
        mapsOpenedFrom = from || null;
        closeAllOverlays();
        showContainer();
        screenMaps.classList.add('maps-screen--open');
        screenMaps.removeAttribute('aria-hidden');
        screenMaps.setAttribute('tabindex', '-1');
        screenMaps.scrollTop = 0;
        screenMaps.focus({ preventScroll: true });
      }

      function closeMapsScreen() {
        screenMaps.classList.remove('maps-screen--open');
        screenMaps.setAttribute('aria-hidden', 'true');
        /* Reset FAB to default state on close */
        var fab     = document.getElementById('maps-fab');
        var fabActs = document.getElementById('maps-fab-actions');
        if (fab && fabActs) {
          fabActs.classList.remove('maps-fab-actions--open');
          fabActs.setAttribute('aria-hidden', 'true');
          fab.setAttribute('aria-expanded', 'false');
          fab.setAttribute('aria-label', 'Додати подію');
          var plusSvg = fab.querySelector('.maps-fab__plus');
          var xSvg    = fab.querySelector('.maps-fab__x');
          if (plusSvg) { plusSvg.style.display = '';     }
          if (xSvg)    { xSvg.style.display    = 'none'; }
        }
        var from = mapsOpenedFrom;
        mapsOpenedFrom = null;
        if (from === 'toloka-week' && screenTolokaWeek) {
          screenTolokaWeek.classList.add('toloka-week-screen--open');
          screenTolokaWeek.removeAttribute('aria-hidden');
          screenTolokaWeek.setAttribute('tabindex', '-1');
          screenTolokaWeek.scrollTop = 0;
          screenTolokaWeek.focus({ preventScroll: true });
        } else {
          hideContainerIfEmpty(null);
        }
      }

      /* Wire every [data-open-screen="maps"] nav link */
      document.querySelectorAll('[data-open-screen="maps"]').forEach(function (link) {
        link.addEventListener('click', openMapsScreen);
      });

      /* ── Calendar popup (Figma 1967:6699) — CalendarBlank button 1593:14297 ── */
      var btnMapsCalendar     = document.getElementById('btn-maps-calendar');
      var mapsCalendarOverlay = document.getElementById('maps-calendar-overlay');

      function openMapsCalendar() {
        if (!mapsCalendarOverlay) { return; }
        mapsCalendarOverlay.style.top    = screenMaps.scrollTop  + 'px';
        mapsCalendarOverlay.style.height = screenMaps.clientHeight + 'px';
        mapsCalendarOverlay.classList.add('maps-calendar-overlay--open');
        mapsCalendarOverlay.removeAttribute('aria-hidden');
      }

      function closeMapsCalendar() {
        if (!mapsCalendarOverlay) { return; }
        mapsCalendarOverlay.classList.remove('maps-calendar-overlay--open');
        mapsCalendarOverlay.setAttribute('aria-hidden', 'true');
      }

      if (btnMapsCalendar) {
        btnMapsCalendar.addEventListener('click', openMapsCalendar);
      }

      if (mapsCalendarOverlay) {
        /* Backdrop click (outside popup card) closes it */
        mapsCalendarOverlay.addEventListener('click', function (e) {
          if (e.target === mapsCalendarOverlay) { closeMapsCalendar(); }
        });
      }

      screenMaps.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          /* Dismiss calendar popup first if it is open */
          if (mapsCalendarOverlay &&
              mapsCalendarOverlay.classList.contains('maps-calendar-overlay--open')) {
            closeMapsCalendar();
          } else {
            closeMapsScreen();
          }
        }
      });

      /* ── Maps district dropdown ─────────────────────────────────────── */
      var mapsDistrictBtn   = document.getElementById('maps-district-btn');
      var mapsDropdown      = document.getElementById('maps-dropdown');
      var mapsDistrictLabel = document.getElementById('maps-district-label');
      var mapsCloseTimer    = null;

      /* ── Maps FAB (Figma 1922:14212 → 1922:14207 + 1933:5943) ───────────
         Click Plus → show action buttons + swap to X icon.
         Click X (or outside) → hide action buttons + swap back to Plus. */

      var mapsFab        = document.getElementById('maps-fab');
      var mapsFabActions = document.getElementById('maps-fab-actions');

      if (mapsFab && mapsFabActions) {

        var fabPlusIcon = mapsFab.querySelector('.maps-fab__plus');
        var fabXIcon    = mapsFab.querySelector('.maps-fab__x');

        function openFab() {
          mapsFabActions.classList.add('maps-fab-actions--open');
          mapsFabActions.setAttribute('aria-hidden', 'false');
          mapsFab.setAttribute('aria-expanded', 'true');
          mapsFab.setAttribute('aria-label', 'Закрити');
          if (fabPlusIcon) { fabPlusIcon.style.display = 'none'; }
          if (fabXIcon)    { fabXIcon.style.display    = '';     }
        }

        function closeFab() {
          mapsFabActions.classList.remove('maps-fab-actions--open');
          mapsFabActions.setAttribute('aria-hidden', 'true');
          mapsFab.setAttribute('aria-expanded', 'false');
          mapsFab.setAttribute('aria-label', 'Додати подію');
          if (fabPlusIcon) { fabPlusIcon.style.display = '';     }
          if (fabXIcon)    { fabXIcon.style.display    = 'none'; }
        }

        mapsFab.addEventListener('click', function () {
          if (mapsFab.getAttribute('aria-expanded') === 'true') {
            closeFab();
          } else {
            openFab();
          }
        });

        /* Close on click outside the FAB wrapper */
        document.addEventListener('click', function (e) {
          if (mapsFab.getAttribute('aria-expanded') !== 'true') { return; }
          if (!e.target.closest('.maps-fab-wrap')) { closeFab(); }
        });

      }

      if (mapsDistrictBtn && mapsDropdown) {

        function openMapsDropdown() {
          clearTimeout(mapsCloseTimer);
          mapsDropdown.classList.remove('map-full-dropdown--closing');
          mapsDropdown.classList.add('map-full-dropdown--open');
          mapsDropdown.removeAttribute('aria-hidden');
          mapsDistrictBtn.setAttribute('aria-expanded', 'true');
        }

        function closeMapsDropdown() {
          if (!mapsDropdown.classList.contains('map-full-dropdown--open') &&
              !mapsDropdown.classList.contains('map-full-dropdown--closing')) { return; }
          mapsDropdown.classList.remove('map-full-dropdown--open');
          mapsDropdown.classList.add('map-full-dropdown--closing');
          mapsDistrictBtn.setAttribute('aria-expanded', 'false');
          mapsDropdown.setAttribute('aria-hidden', 'true');
          mapsCloseTimer = setTimeout(function () {
            mapsDropdown.classList.remove('map-full-dropdown--closing');
          }, 180);
        }

        mapsDistrictBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          if (mapsDropdown.classList.contains('map-full-dropdown--open')) {
            closeMapsDropdown();
          } else {
            openMapsDropdown();
          }
        });

        mapsDropdown.addEventListener('click', function (e) {
          var opt = e.target.closest('.map-full-dropdown__option');
          if (!opt) { return; }
          if (mapsDistrictLabel) { mapsDistrictLabel.textContent = opt.getAttribute('data-label'); }
          closeMapsDropdown();
        });

        document.addEventListener('click', function (e) {
          if (!e.target.closest('.map-full-toolbar__district-wrap')) {
            closeMapsDropdown();
          }
        });

        screenMaps.addEventListener('keydown', function (e) {
          if (e.key === 'Escape' && mapsDropdown.classList.contains('map-full-dropdown--open')) {
            closeMapsDropdown();
            mapsDistrictBtn.focus();
          }
        });

      }

    }

    /* ── Profile screen "Кабінет" (Figma 1697:5571) ─────────────────────
       Opened by "Профіль" [data-open-screen="profile"] in nav dropdown. */

    if (screenProfile) {

      function openProfileScreen(e) {
        if (e) { e.preventDefault(); }
        closeAllOverlays();
        showContainer();
        screenProfile.classList.add('profile-screen--open');
        screenProfile.removeAttribute('aria-hidden');
        screenProfile.setAttribute('tabindex', '-1');
        screenProfile.scrollTop = 0;
        screenProfile.focus({ preventScroll: true });
      }

      function closeProfileScreen() {
        screenProfile.classList.remove('profile-screen--open');
        screenProfile.setAttribute('aria-hidden', 'true');
        hideContainerIfEmpty(null);
      }

      document.querySelectorAll('[data-open-screen="profile"]').forEach(function (link) {
        link.addEventListener('click', openProfileScreen);
      });

      screenProfile.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { closeProfileScreen(); }
      });

      /* ── Recently Events → open map-full screen (Figma 1697:6210) ───────
         Click any .profile-event-item → close profile, open map-full.
         Closing map-full with mapFullOpenedFrom='profile' returns here.   */
      if (screenMapFull) {
        var profileEventsList = screenProfile.querySelector('.profile-events-list');
        if (profileEventsList) {
          profileEventsList.addEventListener('click', function (e) {
            var item = e.target.closest('.profile-event-item');
            if (!item) { return; }
            screenProfile.classList.remove('profile-screen--open');
            screenProfile.setAttribute('aria-hidden', 'true');
            mapFullOpenedFrom = 'profile';
            showContainer();
            screenMapFull.classList.add('map-full-screen--open');
            screenMapFull.removeAttribute('aria-hidden');
            screenMapFull.setAttribute('tabindex', '-1');
            screenMapFull.scrollTop = 0;
            screenMapFull.focus({ preventScroll: true });
          });
        }
      }

      /* ── Choosing Tags popup (Figma 1922:14284) ───────────────────────
         Opened by #btn-profile-add-tag (+). X closes; ✓ confirms.
         Tags toggle --active on click.                                   */

      var tagsOverlay    = document.getElementById('profile-tags-popup');
      var btnAddTag      = document.getElementById('btn-profile-add-tag');
      var btnAddTag2     = document.getElementById('btn-profile-add-tag-2');
      var btnTagsClose   = document.getElementById('btn-profile-tags-close');
      var btnTagsConfirm = document.getElementById('btn-profile-tags-confirm');
      var tagsBlock1     = document.getElementById('profile-tags-block-1');
      var tagsBlock2     = document.getElementById('profile-tags-block-2');

      /* Which + button opened the popup — used for focus return on close */
      var tagsPopupTrigger = null;

      if (tagsOverlay && btnAddTag) {

        function openTagsPopup(triggerBtn) {
          tagsPopupTrigger = triggerBtn || btnAddTag;
          tagsOverlay.style.top    = screenProfile.scrollTop + 'px';
          tagsOverlay.style.height = screenProfile.clientHeight + 'px';
          tagsOverlay.classList.add('profile-tags-overlay--open');
          tagsOverlay.setAttribute('aria-hidden', 'false');
          tagsPopupTrigger.setAttribute('aria-expanded', 'true');
          screenProfile.style.overflowY = 'hidden';
          tagsOverlay.setAttribute('tabindex', '-1');
          tagsOverlay.focus({ preventScroll: true });
        }

        function closeTagsPopup() {
          tagsOverlay.classList.remove('profile-tags-overlay--open');
          tagsOverlay.setAttribute('aria-hidden', 'true');
          if (tagsPopupTrigger) { tagsPopupTrigger.setAttribute('aria-expanded', 'false'); }
          screenProfile.style.overflowY = '';
          /* Any close action swaps Tags Block 1 → Tags Block 2 (Figma 1945:6113) */
          if (tagsBlock1 && tagsBlock2) {
            tagsBlock1.hidden = true;
            tagsBlock2.hidden = false;
          }
          if (tagsPopupTrigger) { tagsPopupTrigger.focus(); }
          tagsPopupTrigger = null;
        }

        btnAddTag.addEventListener('click', function () { openTagsPopup(btnAddTag); });

        /* + button in Tags Block 2 also opens the popup */
        if (btnAddTag2) {
          btnAddTag2.addEventListener('click', function () { openTagsPopup(btnAddTag2); });
        }

        if (btnTagsClose)   { btnTagsClose.addEventListener('click',   closeTagsPopup); }
        if (btnTagsConfirm) { btnTagsConfirm.addEventListener('click', closeTagsPopup); }

        tagsOverlay.addEventListener('click', function (e) {
          if (e.target === tagsOverlay) { closeTagsPopup(); }
        });

        tagsOverlay.addEventListener('keydown', function (e) {
          if (e.key === 'Escape') { closeTagsPopup(); }
        });

        /* Toggle active state on each choosable tag */
        tagsOverlay.addEventListener('click', function (e) {
          var tag = e.target.closest('.profile-choosetag:not(.profile-choosetag--disabled):not(:disabled)');
          if (!tag) { return; }
          tag.classList.toggle('profile-choosetag--active');
        });

      }

    }

    /* ── Toloka Week screen "Толоки 375 Тиждень" (Figma 1921:15307) ───────
       Opened by hero "Толочити" button (#btn-hero-tolochyty / Figma 1922:14168). */

    if (screenTolokaWeek) {

      var btnHeroTolochyty = document.getElementById('btn-hero-tolochyty');

      function openTolokaWeekScreen(e) {
        if (e) { e.preventDefault(); }
        closeAllOverlays();
        showContainer();
        screenTolokaWeek.classList.add('toloka-week-screen--open');
        screenTolokaWeek.removeAttribute('aria-hidden');
        screenTolokaWeek.setAttribute('tabindex', '-1');
        screenTolokaWeek.scrollTop = 0;
        screenTolokaWeek.focus({ preventScroll: true });
      }

      function closeTolokaWeekScreen() {
        screenTolokaWeek.classList.remove('toloka-week-screen--open');
        screenTolokaWeek.setAttribute('aria-hidden', 'true');
        hideContainerIfEmpty(btnHeroTolochyty);
      }

      if (btnHeroTolochyty) {
        btnHeroTolochyty.addEventListener('click', openTolokaWeekScreen);
      }

      var btnTolokaWeekClose = screenTolokaWeek.querySelector('[data-close-screen]');
      if (btnTolokaWeekClose) {
        btnTolokaWeekClose.addEventListener('click', closeTolokaWeekScreen);
      }

      screenTolokaWeek.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { closeTolokaWeekScreen(); }
      });

      /* ── Map section button → open Мапа толок 375 (Figma 1921:15381 → 1256:15438) */
      if (screenMaps) {
        var btnTwOpenMaps = document.getElementById('btn-tw-open-maps');
        if (btnTwOpenMaps) {
          btnTwOpenMaps.addEventListener('click', function () {
            mapsOpenedFrom = 'toloka-week';
            closeAllOverlays();
            showContainer();
            screenMaps.classList.add('maps-screen--open');
            screenMaps.removeAttribute('aria-hidden');
            screenMaps.setAttribute('tabindex', '-1');
            screenMaps.scrollTop = 0;
            screenMaps.focus({ preventScroll: true });
          });
        }
      }

      /* ── Event card "доєднатися" → open map-full screen (Figma 1921:15371 → 1092:14419) */
      if (screenMapFull) {
        var btnTwEventJoin = document.getElementById('btn-tw-event-join');
        if (btnTwEventJoin) {
          btnTwEventJoin.addEventListener('click', function () {
            screenTolokaWeek.classList.remove('toloka-week-screen--open');
            screenTolokaWeek.setAttribute('aria-hidden', 'true');
            mapFullOpenedFrom = 'toloka-week';
            showContainer();
            screenMapFull.classList.add('map-full-screen--open');
            screenMapFull.removeAttribute('aria-hidden');
            screenMapFull.setAttribute('tabindex', '-1');
            screenMapFull.scrollTop = 0;
            screenMapFull.focus({ preventScroll: true });
          });
        }
      }

      /* ── Period toggle: Тиждень ↔ Місяць (Figma 1921:15749 / 1921:15312 / 1921:15306) */
      var btnTwWeek   = document.getElementById('btn-tw-week');
      var btnTwMonth  = document.getElementById('btn-tw-month');
      var twWeekWrap  = document.getElementById('tw-week-wrap');
      var twMonthWrap = document.getElementById('tw-month-wrap');

      if (btnTwWeek && btnTwMonth && twWeekWrap && twMonthWrap) {

        btnTwMonth.addEventListener('click', function () {
          twWeekWrap.hidden  = true;
          twMonthWrap.hidden = false;
          btnTwMonth.classList.add('tw-period-btn--active');
          btnTwWeek.classList.remove('tw-period-btn--active');
        });

        btnTwWeek.addEventListener('click', function () {
          twMonthWrap.hidden = true;
          twWeekWrap.hidden  = false;
          btnTwWeek.classList.add('tw-period-btn--active');
          btnTwMonth.classList.remove('tw-period-btn--active');
        });

      }

    }

    /* ── "Головна" nav link (Figma 1929:5967) ────────────────────────────
       Closes any active overlay and returns to the Main Mobile screen (1261:4680).
       Bound to every [data-nav-home] element — present in every injected header. */
    document.querySelectorAll('[data-nav-home]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        closeAllOverlays();
        hideContainerIfEmpty(null);
      });
    });

    /* ── CTA registration modal (Figma 1593:15939) ────────────────────────
       Opened by #btn-cta-register in the CTA banner.
       Fixed overlay — no scroll lock on body needed (uses its own layer). */

    var btnCtaRegister      = document.getElementById('btn-cta-register');
    var modalCtaRegister    = document.getElementById('modal-cta-register');
    var btnCtaRegisterClose = document.getElementById('btn-cta-register-close');

    if (btnCtaRegister && modalCtaRegister) {

      function openCtaRegister(e) {
        e.preventDefault();
        modalCtaRegister.classList.add('cta-register-modal--open');
        modalCtaRegister.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        modalCtaRegister.setAttribute('tabindex', '-1');
        modalCtaRegister.focus({ preventScroll: true });
      }

      function closeCtaRegister() {
        modalCtaRegister.classList.remove('cta-register-modal--open');
        modalCtaRegister.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        btnCtaRegister.focus();
      }

      btnCtaRegister.addEventListener('click', openCtaRegister);

      /* Header "Зареєструватися" buttons (Figma 1904:5111) — present in every
         injected header; all open the same registration modal.                */
      document.querySelectorAll('[data-open-register]').forEach(function (btn) {
        btn.addEventListener('click', openCtaRegister);
      });

      if (btnCtaRegisterClose) {
        btnCtaRegisterClose.addEventListener('click', closeCtaRegister);
      }

      /* Close on backdrop click */
      modalCtaRegister.addEventListener('click', function (e) {
        if (e.target === modalCtaRegister) { closeCtaRegister(); }
      });

      /* Close on Escape */
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' &&
            modalCtaRegister.classList.contains('cta-register-modal--open')) {
          closeCtaRegister();
        }
      });

    }

    /* ── Events toolbar district dropdown (Figma 1593:13719 + 1678:5813) ──
       Same panel design as map screen; reuses .map-dropdown CSS classes.   */

    var eventsDistrictBtn   = document.getElementById('events-district-btn');
    var eventsDropdownEl    = document.getElementById('events-dropdown');
    var eventsDistrictLabel = document.getElementById('events-district-label');
    var eventsCloseTimer    = null;

    if (eventsDistrictBtn && eventsDropdownEl) {

      function openEventsDropdown() {
        clearTimeout(eventsCloseTimer);
        eventsDropdownEl.classList.remove('map-dropdown--closing');
        eventsDropdownEl.classList.add('map-dropdown--open');
        eventsDropdownEl.removeAttribute('aria-hidden');
        eventsDistrictBtn.setAttribute('aria-expanded', 'true');
      }

      function closeEventsDropdown() {
        if (!eventsDropdownEl.classList.contains('map-dropdown--open') &&
            !eventsDropdownEl.classList.contains('map-dropdown--closing')) { return; }
        eventsDropdownEl.classList.remove('map-dropdown--open');
        eventsDropdownEl.classList.add('map-dropdown--closing');
        eventsDistrictBtn.setAttribute('aria-expanded', 'false');
        eventsDropdownEl.setAttribute('aria-hidden', 'true');
        eventsCloseTimer = setTimeout(function () {
          eventsDropdownEl.classList.remove('map-dropdown--closing');
        }, 180);
      }

      eventsDistrictBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (eventsDropdownEl.classList.contains('map-dropdown--open')) {
          closeEventsDropdown();
        } else {
          openEventsDropdown();
        }
      });

      eventsDropdownEl.addEventListener('click', function (e) {
        var opt = e.target.closest('.map-dropdown__option');
        if (!opt) { return; }
        if (eventsDistrictLabel) { eventsDistrictLabel.textContent = opt.getAttribute('data-label'); }
        closeEventsDropdown();
      });

      document.addEventListener('click', function (e) {
        if (!e.target.closest('.events-dropdown-wrap')) {
          closeEventsDropdown();
        }
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && eventsDropdownEl.classList.contains('map-dropdown--open')) {
          closeEventsDropdown();
          eventsDistrictBtn.focus();
        }
      });

    }

    function openDropdown() {
      /* Cancel any in-progress collapse so re-opening is instant */
      if (closeTimer) {
        clearTimeout(closeTimer);
        closeTimer = null;
      }
      dropdown.classList.remove('map-dropdown--closing');
      dropdown.classList.add('map-dropdown--open');
      dropdown.removeAttribute('aria-hidden');
      districtBtn.setAttribute('aria-expanded', 'true');
    }

    function closeDropdown() {
      if (!dropdown.classList.contains('map-dropdown--open') &&
          !dropdown.classList.contains('map-dropdown--closing')) {
        return; /* already closed — nothing to do */
      }
      dropdown.classList.remove('map-dropdown--open');
      dropdown.classList.add('map-dropdown--closing');
      districtBtn.setAttribute('aria-expanded', 'false');
      dropdown.setAttribute('aria-hidden', 'true');
      /* After the 180ms collapse keyframe finishes, restore display:none */
      closeTimer = setTimeout(function () {
        dropdown.classList.remove('map-dropdown--closing');
        closeTimer = null;
      }, 180);
    }

  });

}());
