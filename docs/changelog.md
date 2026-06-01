# Changelog

All notable changes to this project are documented here, newest first.

---

## [Unreleased]

---

## 2026-05-31 — Мапа толок 375: calendar popup on CalendarBlank button (Figma 1593:14297 → 1967:6699)

### Added
- `index.html` — `id="btn-maps-calendar"` on the right toolbar button in `#screen-maps`.
- `index.html` — `#maps-calendar-overlay` popup (white 348px card, r:20px, padding 20px): title "Календар подій", 7-day week row (Sun31–Sat6 reusing `.tw-day`/`.tw-week-row` classes), pagination (gray + active lavender pill + 3 lavender dots).
- `components/maps-screen.css` — `.maps-calendar-overlay` (position:absolute, rgba backdrop, z-index:--z-sticky:200); `.maps-calendar-overlay--open` (flex, center); `.maps-calendar-popup` (white card, 348px, gap 40px); `.maps-calendar-popup__header`, `.maps-calendar-popup__title` (Unbounded 400 20px UPPER); `.maps-calendar-popup__week-wrap` (column, center, gap 20px); gray dot scope rule.
- `js/transition.js` — `openMapsCalendar()` / `closeMapsCalendar()` with stampOverlay; click `#btn-maps-calendar` → open; backdrop click → close; Escape key now dismisses popup first, then screen.

---

## 2026-05-31 — Мапа толок 375: Filter Menu buttons updated to size=medium (Figma 1256:15654)

### Changed
- `index.html` — Left button (1593:14301): replaced `btn btn--outline map-full-toolbar__btn` + `icon-filter-btn.svg` (20×18) with `map-full-toolbar__icon-btn` + `btn-filter-left.svg` (72×48).
- `index.html` — Middle button (1593:14292): removed `btn btn--outline` classes; swapped icon/label order (CaretDoubleDown `icon-caret-double-down.svg` 24×24 now first, label second, matching Figma layer order).
- `index.html` — Right button (1593:14297): replaced `btn btn--outline map-full-toolbar__btn` + `icon-calendar-blank.svg` (18×20) with `map-full-toolbar__icon-btn` + `btn-filter-right.svg` (72×48).

---

## 2026-05-31 — Толоки 375 Тиждень: Map section button opens Мапа толок 375 (Figma 1921:15381 → 1256:15438)

### Added
- `index.html` — `id="btn-tw-open-maps"` on the ArrowRight button in the Map section of `#screen-toloka-week`.
- `js/transition.js` — `var mapsOpenedFrom = null` variable (mirrors `mapFullOpenedFrom` pattern).
- `js/transition.js` — `openMapsScreen(e, from)` now accepts an optional `from` parameter; stores it in `mapsOpenedFrom` before opening.
- `js/transition.js` — `closeMapsScreen()`: when `mapsOpenedFrom === 'toloka-week'`, closes maps and re-opens `#screen-toloka-week` instead of hiding the container.
- `js/transition.js` — Click handler for `#btn-tw-open-maps` inside `if (screenTolokaWeek)`: calls `openMapsScreen(e, 'toloka-week')`, which runs `closeAllOverlays()` then opens `#screen-maps`.

---

## 2026-05-31 — Map-full Filter Menu: correct component sizes for Figma 1678:5809 (size=medium)

### Changed
- `index.html` — Left button (1678:5810): replaced CSS-styled `<button>` + icon with bare wrapper around `btn-filter-left.svg` (72×48px pre-rendered Figma export); uses new `.map-full-toolbar__icon-btn` class.
- `index.html` — Middle button (1678:5811): removed `.btn .btn--outline` classes; uses `.map-full-toolbar__dropdown` standalone.
- `index.html` — Right button (1678:5812): same approach as left; wraps `btn-filter-right.svg` (72×48px).
- `components/map-full-screen.css` — Replaced `.map-full-toolbar__btn` with `.map-full-toolbar__icon-btn` (bare button reset); img pinned to 72×48px.
- `components/map-full-screen.css` — `.map-full-toolbar__dropdown`: replaced `border: 1.5px` with `box-shadow: 0 0 0 1.5px var(--color-text)` so button auto-sizes to exactly 48px tall; added `display:flex; align-items:center; justify-content:center; cursor:pointer`; icon children pinned to 24×24px.

### Why
CSS `border` on `width:auto` elements adds to computed size: 24px icon + 48px padding + 3px border = 75×51px vs Figma 72×48px. Pre-rendered SVGs carry their own border; `box-shadow` on the fill button doesn't affect layout size.

### Added
- `assets/images/icons/btn-filter-left.svg` — Figma export of node 1678:5810 (funnel button, 72×48).
- `assets/images/icons/btn-filter-right.svg` — Figma export of node 1678:5812 (calendar button, 72×48).
- `assets/images/icons/icon-funnel.svg` — raw Figma icon component 1156:25271.
- `assets/images/icons/icon-caret-double-down.svg` — raw Figma icon component 1156:23867.

---

## 2026-05-31 — Толоки 375 Тиждень: event card "доєднатися" opens map-full screen (Figma 1921:15371 → 1092:14419)

### Added
- `index.html` — `id="btn-tw-event-join"` on the "доєднатися" button inside the event card in `#screen-toloka-week`.
- `js/transition.js` — click handler for `#btn-tw-event-join` inside `if (screenTolokaWeek)`: closes toloka-week screen, sets `mapFullOpenedFrom = 'toloka-week'`, opens `#screen-map-full`. Added `else if (from === 'toloka-week')` branch in `closeMapFullScreen()` to return to the toloka-week screen when closing map-full.

---

## 2026-05-31 — About screen: "толочити" button opens Толоки 375 Тиждень (Figma 1922:14223)

### Changed
- `js/transition.js` — `#btn-about-tolochyty` handler updated: previously opened `#screen-toloka` (monthly calendar, Figma 1256:15801); now closes the about screen and opens `#screen-toloka-week` (Толоки 375 Тиждень, Figma 1921:15307). Guard changed from `screenToloka` to `screenTolokaWeek`.

---

## 2026-05-31 — Fix: map-full screen Content section invisible / zero-width collapse

### Fixed
- `components/map-full-screen.css` — `.map-full-screen` was using `left: 0; right: 0` (full viewport width) while every other overlay screen uses `left: max(0px, calc(50% - (var(--viewport-mobile) / 2))); width: min(var(--viewport-mobile), 100%)`. Without this constraint the flex container's cross-axis width was unreliable, causing `.map-full-content` (which had no explicit `width`) to collapse to zero width and become invisible. Fixed by: applying the 375px viewport constraint to the screen container; adding `width: 100%`, `align-self: stretch`, and `min-height: var(--size-map-content-h)` to `.map-full-content`; added `background-color: var(--color-gray-light)` as a visible fallback if the map image fails to load.

---

## 2026-05-31 — Map full screen: fix right toolbar button icon (Figma 1678:5812)

### Fixed
- `index.html` — Right toolbar button in `#screen-map-full` Content section was using `icon-calendar.svg`. Figma node 1678:5812 is identical to 1678:5810 (both `State-layer state=Default size=medium` with filter/funnel icon). Changed to `icon-filter-btn.svg` with `aria-label="Фільтрувати"` to match the spec — both outer toolbar buttons are now the same filter icon.

---

## 2026-05-31 — Toloka Week screen: Місяць/Тиждень period toggle (Figma 1921:15306 / 1921:15312)

### Added
- `css/tokens.css` — `--color-day-disabled-bg: #E4E7E9` (past-day fill in month view).
- `index.html` — `id="btn-tw-week"` / `id="btn-tw-month"` on period buttons; `id="tw-week-wrap"` on existing week wrap; hidden `#tw-month-wrap` with 30-day grid: days 1–17 disabled, day 18 today, day 19 + 25–30 default, days 20–24 selected; same gray·active·3×inactive pagination.
- `components/toloka-week-screen.css` — `.tw-month-wrap` (column, center, gap 20px), `.tw-month-grid` (row wrap, gap 8px, 328px), `.tw-month-day` (40×53px), `.tw-month-day__circle` (40×40, r 25px) with `--disabled` / `--today` / `--selected` modifiers, `.tw-month-day__num` (SemiBold 20px; disabled uses `--color-disabled-fg`).
- `js/transition.js` — inside `if (screenTolokaWeek)`: "Місяць" click hides week wrap, shows month wrap, swaps `--active` class; "Тиждень" click reverses.

---

## 2026-05-31 — Toloka Week screen: layout corrections (Figma 1921:15307)

### Fixed
- `components/toloka-week-screen.css` — `.tw-calendar` gap corrected from 40px to **28px** (Figma 1921:15309). `.tw-day__circle` gained explicit `height: 4.375rem` (70px per Figma layout_1SM2ZN — padding alone yielded ~58px). Added `.toloka-week-screen .toloka-pagination__dot--gray { background-color: var(--color-disabled-bg) }` for the past-week indicator dot.
- `index.html` — Week pagination reordered to match Figma: **gray (#CDD2D4) · active lavender pill · 3 × lavender inactive** (was: active first, 4 inactive).

---

## 2026-05-31 — New screen: Толоки 375 Тиждень (Figma 1921:15307)

### Added
- `css/tokens.css` — `--color-day-circle-bg: #F5F6F6` for week-view day circles.
- `components/toloka-week-screen.css` — new file. Screen container (`.toloka-week-screen` / `--open`), calendar section (`.tw-calendar`, `.tw-calendar__inner`, `.tw-calendar__title`), period pills (`.tw-period-row`, `.tw-period-group`, `.tw-period-btn`, `--active`), week row (`.tw-week-wrap`, `.tw-week-row`), day cell (`.tw-day`, `.tw-day__circle` with `--today` / `--selected`, `.tw-day__name`, `.tw-day__num`, `.tw-day__dot`). Event card, toolbar, pagination, map section, and footer reuse existing `toloka-screen.css` / `footer.css` classes.
- `index.html` — `id="btn-hero-tolochyty"` on hero CTA `<a>`; `<link>` for new CSS; full `#screen-toloka-week` section with shared header, 7-day week row (нд 31 today · пн 1 default · вт–пт selected · сб 6 default), week pagination, toolbar, event card (`event-card-park.png`), event pagination, map section, footer.
- `js/transition.js` — `var screenTolokaWeek`; `tolokaWeekOpen` check in `hideContainerIfEmpty`; `closeAllOverlays` extended; `openTolokaWeekScreen()` / `closeTolokaWeekScreen()` with `[data-close-screen]` + Escape support; `#btn-hero-tolochyty` click handler calls `e.preventDefault()` before opening.
- `docs/architecture.md` — new row in features table.

---

## 2026-05-31 — Profile screen: event items open map-full screen (Figma 1697:6210 → 1092:14419)

### Added
- `js/transition.js` — click delegation on `.profile-events-list` inside `#screen-profile`: clicking any `.profile-event-item` closes the profile screen, sets `mapFullOpenedFrom = 'profile'`, and opens `#screen-map-full`. Added `else if (from === 'profile')` branch in `closeMapFullScreen()` so closing map-full returns to the profile screen.
- `components/profile-screen.css` — `.profile-event-item` gains `cursor: pointer` and a hover background (`var(--Action-quantery-black-hover)`) to signal interactivity.

---

## 2026-05-31 — Fix: [hidden] attribute overridden by author display rules

### Fixed
- `css/style.css` — added `[hidden] { display: none !important; }` to the reset block. Author-stylesheet `display` rules (e.g. `.profile-tags-block { display: flex }`) beat the UA stylesheet's `display: none` for `[hidden]`, so elements with the `hidden` attribute were visible. The `!important` rule restores expected behaviour project-wide.

---

## 2026-05-31 — Profile screen: Tags Block 2 state on popup close (Figma 1945:6113)

### Changed
- `js/transition.js` — Block swap (`tagsBlock1.hidden = true; tagsBlock2.hidden = false`) moved into `closeTagsPopup()` so every close action (X button, ✓ button, backdrop click, Escape) triggers the transition from Tags Block 1 → Tags Block 2. Removed separate `confirmTagsPopup()` — both close and confirm buttons now call the same `closeTagsPopup()`.

### Added
- `index.html` — Tags Block split into two states: `#profile-tags-block-1` (default, visible) and `#profile-tags-block-2` (hidden by default, Figma 1945:6113). Block 2 adds `#кен` (default tag) to row 2 between `#природа` and the `+` button. Second `+` button has `id="btn-profile-add-tag-2"`.

---

## 2026-05-31 — Profile screen: "Choosing tags" popup (Figma 1922:14284)

### Added
- `css/tokens.css` — 3 new tokens: `--color-purple-light (#D9D5FF)`, `--color-tag-disabled-border (#494F55)`, `--color-tag-disabled-text (#555F65)`.
- `index.html` — `id="btn-profile-add-tag"` + `aria-expanded/controls` on the existing + button in the Tags Block. Inserted `#profile-tags-popup` overlay (role=dialog) with X close, ✓ confirm, title "Обери свої захоплення", and 6 rows of tag buttons (default/active/disabled states per Figma 1922:14284).
- `components/profile-screen.css` — `.profile-stat-card--filled` now uses `var(--color-purple-light)` instead of raw `#D9D5FF`. Appended: `.profile-tags-overlay` (absolute inset backdrop), `.profile-tags-popup` (lavender card 335px r:20px), `.profile-tags-popup__header/title`, `.profile-tags-grid/__row`, `.profile-choosetag` with `--active` and `--disabled` modifiers.
- `js/transition.js` — inside `if (screenProfile)`: `openTagsPopup()` / `closeTagsPopup()` (stampOverlay pattern locks profile scroll), backdrop-click and Escape close, tag click-toggle via event delegation on `.profile-choosetag`.

---

## 2026-05-31 — Profile screen: event list — single-line ellipsis truncation

### Fixed
- `components/profile-screen.css` — `.profile-event-name` gains `white-space:nowrap; overflow:hidden; text-overflow:ellipsis; min-width:0`. `min-width:0` is required because flex items default to `min-width:auto` (content size), which prevents shrinking below the text width and breaks ellipsis. Title now truncates on one line; date stays on the same row.

---

## 2026-05-31 — Profile screen: fix Achievements Stats layout (Figma 1697:6281)

### Fixed
- `components/profile-screen.css` — `.profile-stats` changed from `justify-content: space-between` (no gap) to `gap: 0.9375rem` (15px) with default `flex-start`. Matches Figma `layout_ZH85GS: gap 15px`. The two 140px cards + 15px gap = 295px = the exact content width (375 − 2×40px padding), so visually equivalent but now spec-correct.

---

## 2026-05-31 — Profile screen: fix Requirements Block layout (Figma 1697:6228)

### Fixed
- `index.html` — stat cards: icon + number wrapped in `<div class="profile-stat-inner">` matching Figma Frame 858 (`layout_DKUFYX: column, center, gap:5px`); `отриманих ачівок` label uses `<br>` to match Figma line break.
- `components/profile-screen.css` — `.profile-stat-inner` added (`flex column, center, gap:5px`); `.profile-stat-number` given `display:block` (was `<span>` — inline elements ignore `width` and `text-align`); `.profile-stat-label` given `display:block; align-self:stretch` to fill card width per Figma `sizing:horizontal:fill`.

---

## 2026-05-31 — Profile screen: fix Tags Block layout (Figma 1697:5956)

### Fixed
- `components/profile-screen.css` — `.profile-tags-row` and `.profile-tags-add-row` changed from `flex-wrap: wrap` to `flex-wrap: nowrap`; added `.profile-tag--w135` (135px fixed, Figma `layout_4YXEIS`) and `.profile-tag--w194` (194px fixed, Figma `layout_XQPG7S`). The two widths sum to 335px + 6px gap = 335px, matching the 375px container minus 2×20px padding exactly.
- `index.html` — `#годую_білок` tag gains `profile-tag--w135`; `#готую_смачні_пиріжечки` tag gains `profile-tag--w194`.

---

## 2026-05-31 — Profile screen "Кабінет" (Figma 1697:5571)

### Added
- `assets/images/profile/avatar-59743e.png` — profile avatar (Figma node 1697:6678, imageRef 1b3dec28, 431×260 cropped).
- `components/profile-screen.css` — new overlay screen: `.profile-screen` / `.profile-screen--open`; Profile Info (87×87 circle avatar, Unbounded 20px UPPER name); Tags Block (green #BAD342 tags with border, r:40px; add-tag button 32×32); divider (rgba(0,0,0,0.2)); Achievements Block (heading, promo row with Light 300 16px text, 2 stat cards 140×hug r:24px — filled #D9D5FF and outline); Recently Events (h1 mobile heading + count chip, 3 event cards with border r:12px, "Показати інші події" label-sm #A978FF button); shared purple footer.
- `index.html` — `<link>` for `profile-screen.css`; `#screen-profile` HTML block (header `data-include` slot, all profile sections, inline footer); "Профіль" nav link (in `<template id="tpl-header">`) gains `data-open-screen="profile"`.
- `components/header.html` — "Профіль" nav link gains `data-open-screen="profile"`.
- `js/transition.js` — `screenProfile` variable; `openProfileScreen` / `closeProfileScreen`; `[data-open-screen="profile"]` binding; Escape handler; `hideContainerIfEmpty` and `closeAllOverlays` updated to include profile screen.
- `docs/architecture.md` — Profile screen entry in Features table.

---

## 2026-05-31 — Nav dropdown: "Комʼюніті" → "Профіль" (Figma 1929:5970)

### Changed
- `components/header.html` — fourth dropdown link text updated "Комʼюніті" → "Профіль".
- `index.html` — same change applied to all occurrences in `<template id="tpl-header">`.

---

## 2026-05-31 — Header "Зареєструватися" opens registration popup (Figma 1904:5111)

### Changed
- `components/header.html` — added `data-open-register` to `<a class="btn--primary">Зареєструватися</a>`.
- `index.html` — same `data-open-register` added to all 5 occurrences of the button in `<template id="tpl-header">` (via `replace_all`).
- `js/transition.js` — `document.querySelectorAll('[data-open-register]')` bound to `openCtaRegister` inside the existing CTA register modal block; all injected header buttons call the same handler.

---

## 2026-05-31 — CTA "ДОЄДНАТИСЯ" opens registration popup (Figma 1593:15939)

### Added
- `index.html` — `#modal-cta-register` inserted between `</main>` and `#screen-container`: fixed `.cta-register-modal` overlay (z-index 400, centred to 375px) containing `.register-modal__card` with all 4 inputs (Ім'я, Прізвище, Номер телефону, E-mail), agreement checkbox, and two action buttons (Зареєструватися / Увійти в особистий кабінет). Input IDs prefixed `cta-reg-*` to avoid conflict with `#modal-register` in map screen.
- `components/register-modal.css` — `.cta-register-modal` (position:fixed, top/bottom:0, left/width use `--viewport-mobile` formula, z-index:400, same modal-backdrop + blur tokens) and `.cta-register-modal--open { display:block }`.
- `js/transition.js` — `openCtaRegister` / `closeCtaRegister`; open on `#btn-cta-register` click; close on × / backdrop click / Escape; body scroll lock on open, released on close.

### Changed
- `index.html` — CTA button `id` changed `btn-about` → `btn-cta-register`; removed `js-open-about` class (about screen still triggered by section heading button which retains `js-open-about`).

---

## 2026-05-31 — CTA hobby tags: remove border from default state (Figma 1268:4729/4731/4735/4739)

### Fixed
- `components/cta.css` — `.hobby-tag--default` `border: 1px solid` removed. Figma nodes 1268:4729/4731/4735/4739 (componentId 1045:14716, State=Default) have no `strokes` property — the border was incorrect.

---

## 2026-05-31 — CTA banner Info: replace icon button with "ДОЄДНАТИСЯ" (Figma 1837:14148)

### Changed
- `index.html` — CTA Info frame: removed `.cta-heading-row` wrapper (heading and button are now direct children of `.cta-info`); replaced `<a class="cta-icon-btn">` (56×56 circular arrow button) with `<a class="cta-join-btn">` text button "ДОЄДНАТИСЯ". `id="btn-about"` and `js-open-about` class retained so about-screen trigger still works.
- `components/cta.css` — `.cta-info` gap updated `var(--space-5)` (20px) → `1.75rem` (28px) matching Figma `layout_7J18DB`; added `.cta-join-btn` (outline, `#0D0E0F` border 1.5px, r 32px, padding 12×24, Manrope SemiBold 16px UPPER, hover inverts to dark fill).

---

## 2026-05-31 — Events toolbar map button opens Мапа толок 375

### Changed
- `index.html` — added `data-open-screen="maps"` to the map button (`btn--map`) in the events toolbar. The existing `[data-open-screen="maps"]` binding in `transition.js` handles the click, calling `openMapsScreen()` with no additional code needed.

---

## 2026-05-31 — Events toolbar dropdown: fix as absolute popup (no layout shift)

### Fixed
- `components/events.css` — added `.events-dropdown-wrap .map-dropdown { position: absolute; top: calc(100% + var(--space-1)); left: 0; z-index: var(--z-raised); }`. Root cause: `.map-dropdown` has no `position:absolute` by default — in the map screen it works because `.map-toolbar-wrap` is already absolutely positioned. On the main page the dropdown was in normal flow, shifting content below when opened.

---

## 2026-05-31 — Events toolbar: district dropdown (Figma 1593:13719 + 1678:5813)

### Added
- `index.html` — events toolbar "Оберіть район" button wrapped in `<div class="events-dropdown-wrap">` (relative); button gains `id="events-district-btn"`, `aria-haspopup`, `aria-expanded`; label text wrapped in `<span id="events-district-label">`; dropdown panel `id="events-dropdown"` added below the button, reusing `.map-dropdown` / `.map-dropdown__list` / `.map-dropdown__option` / `.map-dropdown__scrollbar` classes from `map-screen.css` (same Figma 1678:5813 design: 178px, white, `#0D0E0F` 1px border, r:20px, shadow, 3 district options).
- `components/events.css` — `.events-dropdown-wrap { position: relative; }`.
- `js/transition.js` — `openEventsDropdown` / `closeEventsDropdown` with 180ms collapse timer; toggle on `#events-district-btn` click; option-select updates `#events-district-label`; outside-click closes (`.events-dropdown-wrap` boundary); Escape closes and returns focus to button. Placed after the "Головна" nav-home block, before `openDropdown`.

---

## 2026-05-31 — "Головна" nav link opens Main Mobile screen (Figma 1929:5967 → 1261:4680)

### Added
- `js/transition.js` — `[data-nav-home]` click handler added after the maps screen block: `e.preventDefault()` → `closeAllOverlays()` → `hideContainerIfEmpty(null)`. Closes any active overlay (map, about, toloka, maps, map-full) and reveals the underlying main page. Bound to all matching elements so it works from every injected header instance.

### Changed
- `components/header.html` — "Головна" nav link: `href="/"` → `href="#" data-nav-home` (prevents page reload; JS handles navigation).
- `index.html` — same `data-nav-home` change in `<template id="tpl-header">` (both occurrences via `replace_all`).

---

## 2026-05-31 — Maps screen: Crosshair icon updated to exact Figma path

### Changed
- `assets/images/icons/icon-crosshair.svg` — replaced hand-authored approximation with the exact SVG path provided from Figma (filled style, `fill="#0E0F10"`, 24×24, concentric rings + 4 axis lines with inner/outer tick marks).

---

## 2026-05-31 — Maps screen: Crosshair button (Figma 1593:14358)

### Added
- `assets/images/icons/icon-crosshair.svg` — Phosphor Crosshair Regular 24×24, `#0E0F10` stroke 1.5px (circle r=4 + 4 axis lines). Figma API could not export component node 1156:24905 directly; SVG hand-authored from Phosphor spec.
- `index.html` — Crosshair button (`<button class="maps-crosshair-btn">`) added above the Plus FAB inside `.maps-card-fab`; Plus FAB and action buttons wrapped in new `.maps-fab-wrap` (position:relative) so action buttons anchor to the Plus, not the whole container.
- `components/maps-screen.css` — `.maps-card-fab` restored to `flex column · align-end · gap 8px`; `.maps-crosshair-btn` (white bg, black border 1.5px, r 32px, padding 12×24, matches toolbar button style); `.maps-fab-wrap` (position:relative); removed `margin-left:auto` from `.maps-fab` (parent flex handles right-alignment).
- `js/transition.js` — outside-click boundary updated from `.maps-card-fab` to `.maps-fab-wrap`.

---

## 2026-05-31 — Maps screen: FAB fixed position + slide-in animation

### Fixed
- `components/maps-screen.css` — `.maps-card-fab` changed from `display:flex; flex-direction:column` to a plain block container; the flex column was pushing the Plus button down when action buttons appeared. `.maps-fab` gains `margin-left:auto` to stay right-aligned without flex. `.maps-fab-actions` is now `position:absolute; top: calc(3.5rem + 0.5rem); right:0` (64px below the FAB top, never in flow). Animation uses `opacity + translateY(0.625rem→0)` with `220ms ease-out`; toggled by `.maps-fab-actions--open` class.
- `index.html` — restructured `.maps-card-fab`: FAB button is first (in-flow), action buttons are sibling (absolutely positioned below). Removed `.maps-fab-area` wrapper. Removed `hidden` attribute; uses `aria-hidden` + CSS class instead.
- `js/transition.js` — `openFab`/`closeFab` switch from `hidden` attribute to `classList.add/remove('maps-fab-actions--open')` + `aria-hidden` toggle. `closeMapsScreen` FAB reset updated to match.

---

## 2026-05-31 — Maps screen: remove duplicate Plus button

### Fixed
- `index.html` — removed `<img class="maps-screen__card-img" src="card-1329-12035.png">` from inside `.maps-card-fab`. Figma node 1329:12035 renders as a single IMAGE-SVG that bakes the Plus button into the image; keeping the image created a second (non-interactive) Plus alongside the HTML FAB button. The HTML FAB is now the only Plus on the screen.
- `components/maps-screen.css` — removed `.maps-screen__card-img` rule (no longer referenced).

---

## 2026-05-31 — Maps screen: FAB button + action panel (Figma 1922:14212 / 1933:5943)

### Added
- `components/maps-screen.css` — replaced `.maps-screen__card` absolute rule with a full card+FAB layout: `.maps-card-fab` (absolute at x=109/y=502, column/align-end/gap 8px, 245px wide); `.maps-screen__card-img` (fills container width); `.maps-fab-area` (column/align-end/gap 6px); `.maps-fab-actions` (same column layout, `[hidden]` collapses to `display:none`); `.maps-fab-action-btn` (#7A2EEF fill, r 32px, padding 12×24, SemiBold 16px UPPER white); `.maps-fab` (56×56 circle, #7A2EEF).
- `index.html` — replaced bare `<img class="maps-screen__card">` with `.maps-card-fab` container: card image + `.maps-fab-area` holding hidden `.maps-fab-actions` ("Створити подію" + "Запропонувати подію" buttons, Figma 1933:5943) and `#maps-fab` trigger (Plus SVG default / X SVG `style="display:none"`, Figma 1922:14212 → 1922:14207).
- `js/transition.js` — `openFab` / `closeFab` helpers; toggle on `#maps-fab` click; outside-click close (`.maps-card-fab` boundary); `closeMapsScreen` resets FAB to default state (hidden actions, Plus icon, aria-expanded false) every time the screen closes.

---

## 2026-05-31 — Maps screen: correct Filter Menu icons (Figma 1256:15654)

### Fixed
- `index.html` — `#screen-maps` Filter Menu toolbar: filter button icon changed from `icon-filter.svg` → `icon-filter-btn.svg` (exact Figma Funnel path, componentId 1156:25271, 20×18); calendar button icon changed from `icon-calendar.svg` → `icon-calendar-blank.svg` (CalendarBlank, componentId 1156:25621, 18×20). Both files already existed from the map screen implementation.

---

## 2026-05-31 — Maps screen: constrain to 375 px viewport width

### Fixed
- `components/maps-screen.css` — `.maps-screen` width constraint applied: replaced `left:0; right:0` with `left: max(0px, calc(50% - (var(--viewport-mobile) / 2)))` and `width: min(var(--viewport-mobile), 100%)`. The screen is now capped at 375 px and centred on wider viewports, matching the pattern used by `.about-screen` and `.map-screen`.

---

## 2026-05-31 — Maps screen: "Мапа толок 375" (Figma 1256:15438)

### Added
- `components/maps-screen.css` — new overlay screen component: `.maps-screen` / `.maps-screen--open` container; `.maps-screen__content` (721px relative frame); `.maps-screen__bg` (absolute full-fill map bg); `.maps-screen__toolbar` (absolute at `top: 1.3125rem` = 21px, reuses `.map-full-toolbar__btn` / `.map-full-toolbar__district-wrap` / `.map-full-dropdown` classes from `map-full-screen.css`); `.maps-screen__card` (absolute at x=109 / y=502, 245px wide).
- `index.html` — `<link>` for `maps-screen.css` in `<head>`; `#screen-maps` HTML block inside `#screen-container` after `#screen-map-full`: header `data-include` slot, main content (map bg `map-bg-350d31.png` + toolbar + `map-bg-350d31.png` + district dropdown + card `card-1329-12035.png`), inline footer.
- `js/transition.js` — `screenMaps` variable; `openMapsScreen` / `closeMapsScreen` functions; `[data-open-screen="maps"]` click bindings (all nav links); Escape handler; district dropdown block (`mapsDistrictBtn` / `mapsDropdown` / `mapsDistrictLabel`). `hideContainerIfEmpty` updated to check `.maps-screen--open`. `closeAllOverlays` updated to strip `.maps-screen--open`.

### Changed
- `components/header.html` — "Мапа толок" nav link gains `data-open-screen="maps"`.
- `index.html` `<template id="tpl-header">` — same `data-open-screen="maps"` added (both occurrences via `replace_all`).
- `docs/architecture.md` — Maps screen entry added to Features table.

---

## 2026-05-31 — Header injection: fallback template for file:// access

### Fixed
- `index.html` — added `<template id="tpl-header">` to `<head>` containing the full header HTML (identical to `components/header.html`). The browser keeps `<template>` content inert (not rendered). Used by `main.js` when `fetch()` is unavailable.
- `js/main.js` — injection callback now sets `data-nav-init="1"` on the injected header before calling `initNavDropdown` (prevents double-initialisation). `.catch()` handler reads `<template id="tpl-header">`, clones its content, replaces the `[data-include]` slot, and calls `initNavDropdown` on the fallback header. Added `toloka:ready` listener as a safety net that calls `initNavDropdown` on any `.site-header` still missing `data-nav-init`.

**Result:** headers are visible on every screen in both HTTP and `file://` environments. On HTTP, `fetch()` replaces each slot with the content from `components/header.html` (the canonical source). On `file://`, the inline `<template>` provides the same content synchronously.

---

## 2026-05-31 — Nav dropdown: works on all screens via fetch injection

### Changed
- `components/header.html` — rewritten as the single source of truth for every header: burger button uses `data-nav-menu` attribute (no `id`, safe for multiple injections), dual icons (`.btn-menu__burger` + `.btn-menu__close` with `style="display:none"`), `<nav class="header-nav-dropdown">` with 4 links (Головна / Мапа толок / Про нас `.js-open-about` / Комʼюніті). Removed `data-close-screen` — nav dropdown is now the navigation mechanism on all screens.
- `index.html` — replaced all 5 inline `<header class="site-header">` blocks with `<div data-include="site-header">`: main page header + the 4 identical overlay screen headers (`data-close-screen` variant). Headers are now loaded via `fetch()` on every screen.
- `js/main.js` — added module-level `initNavDropdown(headerEl)` function: scoped burger-toggle, icon-swap (`showBurger` / `showX`), open/close with 220ms/180ms animation, outside-click via `headerEl.contains(e.target)`, Escape, nav-link close. Injection callback now calls `initNavDropdown(injectedHeader)` immediately after each `site-header` fragment is placed in the DOM — runs once per screen, before `toloka:ready`.
- `js/transition.js` — removed old ID-based nav dropdown block (`#btn-nav-menu` / `#header-nav-dropdown`). Added `closeAllOverlays()` helper that strips `--open` from all four overlay screens without touching the container. `openAboutScreen` now calls `closeAllOverlays()` first so navigating to "Про нас" from any overlay closes the current screen cleanly. Existing `if (closeBtn)` / `if (btnAboutClose)` guards already handle the absence of `data-close-screen` gracefully; Escape key remains the secondary close mechanism for each screen.

---

## 2026-05-31 — Header nav dropdown: JS icon swap fix

### Fixed
- `index.html` — `.btn-menu__close` SVG now has `style="display:none"` inline so it is hidden by default regardless of CSS specificity.
- `components/header.css` — removed the CSS-only `aria-expanded` icon-swap rules (`.btn-menu__close { display:none }` and the two `[aria-expanded="true"]` overrides). The existing `.btn--menu svg { display:block }` rule has higher specificity (0,1,1) than a bare class rule (0,1,0) and was overriding the hide, causing both icons to render simultaneously. Replaced with a code comment explaining the JS-only approach.
- `js/transition.js` — added `showBurgerIcon()` / `showCloseIcon()` helpers that set `element.style.display` directly (inline styles beat all CSS specificity). `openNavDropdown` calls `showCloseIcon()`; `closeNavDropdown` calls `showBurgerIcon()`.

---

## 2026-05-31 — Header nav dropdown (Figma 1929:5965)

### Added
- `index.html` — main-page `<header>` only: added `id="btn-nav-menu"`, `aria-expanded`, `aria-controls` to the burger button; added X-icon SVG (`<svg class="btn-menu__close">`, Figma 1929:5935 / componentId 1156:25139) alongside the existing burger SVG (`<svg class="btn-menu__burger">`); added `<nav class="header-nav-dropdown" id="header-nav-dropdown">` with 4 links (Головна / Мапа толок / Про нас / Комʼюніті). Overlay-screen headers are unchanged.
- `components/header.css` — `.btn-menu__burger/close` icon-swap rules (CSS-only via `aria-expanded`); `.header-nav-dropdown` (absolute below sticky header, white, `--shadow-nav-dropdown`, radius `0 0 20px 20px`); `--open/--closing` animation classes; `nav-dropdown-expand` (220ms ease-out) / `nav-dropdown-collapse` (180ms ease-in) keyframes; `.header-nav-dropdown__list` (column, right-aligned, 197px, gap 16px); `.header-nav-dropdown__link` (SemiBold 24px, padding 8px 16px, radius 32px, state-layer hover/active/focus).
- `css/tokens.css` — `--shadow-nav-dropdown: 0px 7px 8px 0px rgba(0,0,0,0.15)` (Figma effect_M7UCOB).
- `js/transition.js` — nav dropdown block: `openNavDropdown` / `closeNavDropdown` with animation timer; toggle on `#btn-nav-menu` click; close on outside-document click; close on Escape (returns focus to button); close when any dropdown link is clicked.

---

## 2026-05-31 — Restore #screen-map-full content to Figma 1092:14419

### Fixed
- `index.html` — restored full event-detail content of `#screen-map-full` (Figma 1092:14419 "Мапа толок (вибрана толока) 375"):
  - Map content area: image swapped `map-bg-350d31.png` (721px) → `map-bg-5331e4.png` (425px); removed `map-full-card` overlay (Figma 1329:12035); toolbar retained.
  - Added `<article class="map-full-event">` with all seven sub-sections: Event Header (subtitle bar + badges + title + толочити button), Event Image (`event-photo-b6a466.png` 266px), Event Description (body text + dividers + info block + links), Participants Block (3 organizers + 7 members with tag popups + show-more + unregistered note), Requirements Block (6 animated checkboxes), Event Actions (Фото до/після + extra photo `event-photo-48fc6a.png` + 5-dot pagination).
- `components/map-full-screen.css` — corrected `.map-full-content` height `45.0625rem` (721px) → `26.5625rem` (425px); `.map-full-toolbar` top `1.3125rem` (21px) → `0.625rem` (10px); updated file header comments to reference Figma 1092:14419.

---

## 2026-05-31 — About screen: second social bg image + CTA button fixes (Figma 1691:5491)

### Added
- `assets/images/about/social-bg-26b1ad.png` — second social media background image (Figma node 1837:14205, imageRef `42882447`, cropped 375×384px). Stacks on top of `social-bg.png` inside `.about-social__bg` to match the two-layer Figma composite.

### Fixed
- `index.html` — added second `<img class="about-social__bg-img">` in `.about-social__bg` (Figma fill_O5TLVA, node 1837:14205) before the overlay div; updated Figma fill/effect reference comments to match actual node IDs.
- `components/about-screen.css` — `.about-social__bg-img` gained `position: absolute; inset: 0` so both images occupy the same 375×384 space (parent is already `position: absolute` and sized explicitly).
- `components/about-screen.css` — `.about-cta-btn` corrected three style errors vs Figma 1922:14223:
  - `background-color` `#A978FF` → `var(--color-purple-dark)` `#7A2EEF` (Figma fill_EPFDDL).
  - `border-radius` `var(--radius-pill)` 100px → `var(--radius-btn-toolbar)` 32px.
  - `font-size` `var(--text-base)` 16px → `var(--text-lg)` 18px (Desktop/Label Special/special-lg).

---

## 2026-05-30 — Calendar button opens "Мапа толок 375" (Figma 1256:15438)

### Added
- `index.html` — `id="btn-map-calendar"` on the calendar filter button in `#screen-map`.
- `assets/images/map/map-bg-350d31.png` — 375×721 map background for Figma 1256:15438.
- `assets/images/map/card-1329-12035.png` — Card Container (Figma 1329:12035, IMAGE-SVG) rendered as PNG.

### Changed
- `index.html` — replaced incorrect `#screen-map-full` body (duplicate event-info panel, wrong 425px map) with correct Figma 1256:15438 content: 721px map background, filter toolbar, card container at x=109/y=502.
- `components/map-full-screen.css` — `.map-full-content` height 425px → 721px; switched from flex-column to absolute-children layout matching Figma 1256:15483; `.map-full-toolbar` changed to `position:absolute; top:21px`; added `.map-full-card` rule.
- `js/transition.js` — added `btn-map-calendar` click handler (closes `#screen-map`, opens `#screen-map-full`); introduced `mapFullOpenedFrom` tracker so `closeMapFullScreen()` returns to the originating screen (`#screen-map` or `#screen-toloka`).

---

## 2026-05-30 — Map screen (1092:14419) structure corrected to match Figma

### Fixed
- `index.html` — added missing section dividers (`<hr class="map-divider" />`) between Event Description↔Participants Block (Figma Vector 43, 1385:4745) and Participants Block↔Requirements (Figma Vector 42, 1385:4743).
- `index.html` — moved Event Actions block (Figma 1127:15985) inside `.map-event-info` as its correct last child; it was previously placed as a sibling after the Event Info panel. Added divider before it (Figma Vector 43, 1385:6019).
- `components/map-screen.css` — corrected `.map-toolbar-wrap` top offset from `24px` → `10px` to match Figma Content frame `padding-top: 10px` (layout_KNU5C0).

---

## 2026-05-30 — Map screen content area updated to Figma 1678:5807

### Changed
- `assets/images/map/map-bg-5331e4.png` — downloaded map background matching Figma node 1678:5807 (imageRef 775678392607bf15c46a749c47c6a488ee41166a, cropped 375×425px).
- `index.html` — updated `.map-content__img` src from `map-content-5ef8bd.png` → `map-bg-5331e4.png`; corrected intrinsic dimensions to 375×425.

---

## 2026-05-30 — Header and footer inlined on screen-map-full

### Changed
- `index.html` — replaced `data-include="site-header"` and `data-include="site-footer"` placeholders in `#screen-map-full` with inline HTML matching Figma nodes 1907:5312 (header) and 1908:5090 (footer). `data-close-screen` retained on the burger button.

---

## 2026-05-30 — Header inlined on Мапа толок, Про нас, Толоки 375 screens

### Changed
- `index.html` — replaced `<div data-include="site-header">` with inline `<header class="site-header">` HTML (Figma node 1907:5312, inline SVG burger icon) in three overlay screens: `#screen-map`, `#screen-about`, `#screen-toloka`. `data-close-screen` retained on the burger button so `transition.js` can close each screen.

---

## 2026-05-30 — Footer inlined on Мапа толок, Про нас, Толоки 375 screens

### Changed
- `index.html` — replaced `<div data-include="site-footer">` with inline `<footer class="site-footer">` HTML (Figma node 1908:5090) in three overlay screens: `#screen-map`, `#screen-about`, `#screen-toloka`.

---

## 2026-05-30 — Main Mobile footer inlined to match Figma 1908:5090

### Changed
- `index.html` — replaced `<div data-include="site-footer">` placeholder with inline `<footer class="site-footer">` HTML matching Figma node 1908:5090; footer is now always visible without requiring an HTTP server.

---

## 2026-05-30 — Main Mobile header inlined; burger icon converted to inline SVG

### Changed
- `index.html` — replaced `<div data-include="site-header">` placeholder with inline `<header class="site-header">` HTML matching Figma node 1907:5312; removed `data-close-screen` attribute (not applicable on the main page). Header is now always visible without requiring an HTTP server.
- `components/header.html` — burger menu button `<img src="icon-burger.svg">` replaced with inline SVG path (matches Figma IMAGE-SVG node; renders without asset fetch).

---

## 2026-05-30 — Fragment injection moved to main.js; about-screen footer unified

### Changed
- `js/main.js` — merged the `fetch()`-based fragment injection from `includes.js` directly into `main.js` as an IIFE; removed `export` keywords from `setupCanvas` and `applyDPRToAll` (file was loaded as a regular script, not a module, so `export` caused a parse error preventing execution). `toloka:ready` is still dispatched after all slots settle.
- `js/includes.js` — emptied; now contains only a deprecation comment. Logic lives in `main.js`.
- `index.html` — removed `<script src="js/includes.js"></script>` (redundant now that `main.js` handles injection); replaced the inline `<footer class="about-footer">` in `#screen-about` with `<div data-include="site-footer"></div>` so the about screen loads its footer via `fetch()` from `components/footer.html`, consistent with all other screens.

---

## 2026-05-30 — Header button color corrected to match Figma 1905:5090

### Fixed
- `components/header.css` — `.header-nav .btn--primary` default background changed from `var(--color-purple-accent)` (#9251FB) to `var(--color-brand)` (#A978FF) to match Figma node 1905:5090 `fill_5IA4DT`; hover now correctly darkens to `var(--color-purple-accent)` (#9251FB). Updated Figma reference in comments from node 1261-4680 / 1510:13645 to 1905:5090.

---

## 2026-05-30 — Unified shared header and footer across all screens

### Added
- `components/header.html` — canonical shared header fragment (`<header class="site-header">`) with `data-close-screen` attribute on the burger/close button instead of per-screen unique IDs.
- `components/footer.html` — canonical shared footer fragment (`<footer class="site-footer">`) using the existing `footer.css` classes and `<img>` social icons (not inline SVG).
- `js/includes.js` — `fetch()`-based HTML fragment loader. Finds every `[data-include]` placeholder, fetches the corresponding fragment, and replaces the placeholder with parsed DOM nodes. Dispatches the custom event `toloka:ready` after all fetches settle (success or fail) so that `transition.js` can safely query the injected elements. Requires an HTTP server (`fetch()` does not work on `file://` URLs).

### Changed
- `index.html` — All 5 inline `<header class="site-header">` blocks replaced with `<div data-include="site-header"></div>`. All 4 inline footer blocks (2 `site-footer` + 2 old `toloka-footer`) replaced with `<div data-include="site-footer"></div>`. Preload hints added for both fragment files. `<script src="js/includes.js">` added before `main.js`/`transition.js`.
- `js/transition.js` — Outer listener changed from `DOMContentLoaded` to `toloka:ready` so close-button bindings run after the injected header DOM exists. All 4 per-screen close-button lookups changed from `getElementById('btn-*-close')` to `screen.querySelector('[data-close-screen]')` — works with the shared header fragment.
- `components/toloka-screen.css` — Removed the entire `.toloka-footer*` CSS block (~122 lines, Figma 1593:16532). The toloka screen now renders the shared `site-footer` fragment styled by `footer.css`.
- `docs/architecture.md` — Added `header.html`, `footer.html`, `includes.js` to the directory tree, component conventions section, and Features table. Added two new Decisions log entries.

---

## 2026-05-30 — Refactor: replace inline header/footer markup with shared component placeholders

### Changed
- `index.html` — 11 edits applied in sequence:
  1. Added `<link rel="preload">` hints for `components/header.html` and `components/footer.html` in `<head>`.
  2. Added `<script src="js/includes.js">` before `js/main.js`.
  3. Replaced main-page `<header class="site-header">` with `<div data-include="site-header"></div>`.
  4. Replaced main-page `<footer class="site-footer">` with `<div data-include="site-footer"></div>`.
  5. Replaced map screen (`#screen-map`) inline header with shared component placeholder.
  6. Replaced map screen inline footer with shared component placeholder.
  7. Replaced about screen (`#screen-about`) inline header (id="btn-about-close") with shared component placeholder.
  8. Replaced toloka screen (`#screen-toloka`) inline header (id="btn-toloka-close") with shared component placeholder.
  9. Replaced toloka screen `<footer class="toloka-footer">` (Figma 1593:16532) with shared component placeholder.
  10. Replaced map-full screen (`#screen-map-full`) inline header (id="btn-map-full-close") with shared component placeholder.
  11. Replaced map-full screen `<footer class="toloka-footer">` (Figma 1593:16491) with shared component placeholder.
- Result: `data-include="site-header"` appears 5 times; `data-include="site-footer"` appears 4 times.

---

## 2026-05-30 — Map full screen: full rebuild targeting correct Figma node 1092:14419

### Changed
- `css/tokens.css` — replaced the five old map-full tokens (`--map-full-toolbar-top`, `--map-full-card-left`, `--map-full-card-top`, `--map-full-min-height`, `--map-full-card-width`) with seven new tokens matching node 1092:14419: `--size-map-content-h` (425px), `--map-full-dropdown-w` (178px), `--size-avatar-lg` (60px), `--size-event-img-h` (266px), `--size-extra-img-h` (250px), `--radius-count-chip` (27px), `--size-avatar-badge` (14px).
- `assets/images/map-full/` — replaced old map bg with `map-bg-5331e4.png` (375×425, imageRef suffix 5331e4, cropped from Figma node 1678:5807).
- `index.html` — completely rewrote `#screen-map-full` to target Figma node 1092:14419 ("Мапа толок (вибрана толока) 375"). New content: same site-header; updated Content section (375×425, correct map bg, toolbar in normal flow at padding-top:10px, district dropdown wrapped in `.map-full-toolbar__district-wrap` with `#map-full-dropdown` panel of 3 options); full Event Info `<article class="map-full-event">` with 7 sub-sections (event header with subtitle bar + badges + title + CTA button; event photo 266px; description + info rows; links; participants with organizers + members with avatar badges; requirements checklist; actions with photo buttons + extra image + pagination); corrected footer nav to 5 links (Головна / Про нас / Мапа толок / Ком'юніті / Особистий кабінет).
- `components/map-full-screen.css` — complete rewrite for the correct Figma node. Removed: old `.map-full-card` / `.map-full-card__img` absolute overlay approach; old absolute toolbar positioning. Added: `.map-full-content` as `height:425px` flex column; `.map-full-toolbar` in normal flow (z-index above bg); `.map-full-toolbar__district-wrap` (`position:relative; flex:1`) + `.map-full-toolbar__dropdown`; `.map-full-dropdown` with open/closing animation keyframes + `.map-full-dropdown__option`; all 30+ `.map-full-event__*` styles for every sub-section of the Event Info article.
- `js/transition.js` — updated map-full Figma reference comment from 1256:15438 to 1092:14419; added district dropdown vars (`mapFullDistrictBtn`, `mapFullDropdown`, `mapFullDistrictLabel`, `mapFullCloseTimer`) and `openMapFullDropdown` / `closeMapFullDropdown` helpers inside the `if (screenMapFull)` block; bound toggle, option-select, outside-click, and Escape handlers for the map-full dropdown; modified the screen-close Escape handler to yield to the dropdown Escape handler when dropdown is open.

---

## 2026-05-30 — Map full screen: toloka map button → "Мапа толок 375" (Figma 1256:15438)

### Added
- `components/map-full-screen.css` — new component for the "Мапа толок 375" full-map overlay screen (Figma 1256:15438). Contains `.map-full-screen` / `.map-full-screen--open` (flex column), `.map-full-content` (flex:1, position:relative, min-height from token), `.map-full-content__bg` (object-fit:cover map background), `.map-full-toolbar` (absolute at top:21px — filter + district + calendar buttons), `.map-full-card` (absolute at x:109, y:502 — event card image). All position values referenced via tokens.
- `#screen-map-full` HTML block added inside `#screen-container` in `index.html`, after `#screen-toloka`. Contains: `.site-header`, `.map-full-content` with map bg image + filter toolbar + card container, and a `.toloka-footer` (reusing the same purple footer pattern and classes).
- `index.html` `<head>` — `<link>` for `components/map-full-screen.css` added after toloka-screen.css.
- `css/tokens.css` — five new map-full layout tokens: `--map-full-toolbar-top` (21px), `--map-full-card-left` (109px), `--map-full-card-top` (502px), `--map-full-min-height` (721px), `--map-full-card-width` (245px).

### Changed
- `index.html` — added `id="btn-toloka-map"` to the 56×56 arrow button inside `.toloka-map-section` (Figma 1593:14217) so JS can wire its click handler.
- `js/transition.js` — declared `screenMapFull`, `btnTolokaMap`, `btnMapFullClose` at top of DOMContentLoaded. Added `mapFullOpen` check to `hideContainerIfEmpty`. Added toloka→map-full transition on `#btn-toloka-map` click (close toloka, open map-full, container stays active). Added `closeMapFullScreen()` which closes map-full and re-opens toloka. Bound to `#btn-map-full-close` click and Escape keydown on `#screen-map-full`.

---

## 2026-05-30 — Consistent header layout across all four screens

### Changed
- `components/map-screen.css` — `.map-screen--open` changed from `display: block` to `display: flex; flex-direction: column`. Removed `overflow-x: hidden` (was blocking `position: sticky` in some browsers) and `scrollbar-gutter: stable` (created a width asymmetry vs the body, which has no gutter).
- `components/about-screen.css` — same changes as map-screen.
- `components/toloka-screen.css` — same changes as map-screen.
- `components/header.css` — added `flex-shrink: 0` to `.site-header` so the header never squishes when it is a flex item inside any of the four flex-column parents (body + three overlay screens).

**Why:** The `<body>` is `display: flex; flex-direction: column`, making the main page's `.site-header` a flex item. The overlay screens were `display: block`, putting their `.site-header` in a different layout context. Switching all screens to flex column makes `.site-header` a flex item in every context, guaranteeing identical rendering.

---

## 2026-05-28 — Header CTA button colour: #A978FF (Figma 1256:15802)

### Changed
- `components/header.css` — `.header-nav .btn--primary` now sets `background-color: var(--color-purple-accent)` (#A978FF), overriding the base `--color-brand` (#9251FB) to match Figma node 1256:15802 (`fill_BX4F7O`). Hover darkens back to `--color-brand`. Applies to all four page headers.

---

## 2026-05-28 — Toloka screen: instant open (no animation)

### Changed
- `components/toloka-screen.css` — removed `@keyframes toloka-slide-in` and the `animation:` declaration from `.toloka-screen--open`; screen now appears instantly when opened (Figma 1256:15801).

---

## 2026-05-28 — Header consolidation: collapse .header-inner wrapper (Figma 1261:4681)

### Changed
- `index.html` — removed `<div class="header-inner">` wrapper from all four screen headers (Main Mobile, Мапа толок `#screen-map`, Про нас `#screen-about`, Толоки 375 `#screen-toloka`). Flex layout now lives directly on `.site-header`, matching Figma node 1261:4681 which is a single flat flex frame with no inner wrapper.
- `components/header.css` — `.header-inner` rule removed; `.site-header` is now the flex container (`display:flex; justify-content:space-between; align-items:center`).

---

## 2026-05-28 — Unified site header across all four pages

### Changed
- `index.html` — Toloka screen (`#screen-toloka`): replaced bespoke `.toloka-header` markup with the standard `.site-header` / `.header-inner` structure (logo + "Зареєструватися" + burger `id="btn-toloka-close"`), matching Main Mobile, Мапа толок, and Про нас exactly.
- `components/toloka-screen.css` — removed all `.toloka-header*` rule blocks; header styling is now provided by the shared `components/header.css`.

---

## 2026-05-28 — Toloka screen footer: fix logo vertical position (1593:16540)

### Fixed
- `components/toloka-screen.css` — `.toloka-footer__nav`: corrected `align-items` from `flex-start` to `center` (Figma layout_WOM03P `alignItems: center`). Logo "toloka" is now vertically centred next to the nav links instead of pinned to the top.

---

## 2026-05-28 — Toloka screen map header: replace button with Figma SVG (1593:14217)

### Changed
- `index.html` — Map header button in `#screen-toloka` (Figma 1256:15912): replaced `<img icon-map-btn.svg>` with the inline SVG from node 1593:14217 (56×56 outlined pill, ArrowRight icon, stroke #0D0E0F 1.5px, rx 27.25).
- `components/toloka-screen.css` — `.toloka-map-btn`: stripped duplicate `border`, `width`, `height`, `border-radius` rules; the inline SVG carries all visual properties.

---

## 2026-05-28 — Toloka screen event card: fix Badge ID icon

### Changed
- `index.html` — Badge ID in `#screen-toloka` event card (Figma 1256:15830 BadgesContainer → Badge ID): replaced `<img icon-map-pin.svg>` with the correct inline hashtag/ID SVG (`fill="#9251FB"`, 14×14).

---

## 2026-05-28 — Toloka screen toolbar: fix third button icon

### Changed
- `index.html` — third `.toloka-toolbar-btn` in `#screen-toloka` toolbar (Figma 1256:15820): replaced `<img icon-filter.svg>` with the correct inline folded-map SVG; updated `aria-label` to "Мапа".

---

## 2026-05-28 — Toloka screen with slide-in transition

### Added
- `components/toloka-screen.css` — full styles for the new "Толоки 375" overlay screen (Figma 1256:15801): slide-in `@keyframes toloka-slide-in` (320ms), header, calendar day grid (30 chips), event card, pagination, map section, footer.
- `#screen-toloka` HTML inside `#screen-container` in `index.html`: header with "Зареєструватися" + burger close (`id="btn-toloka-close"`), 30-day calendar grid (day 18 active, day 24 today), event card (blurred bg image, badges, name, location, "доєднатися"), 5-dot pagination, map image, purple footer with nav + social icons + legal.
- `assets/images/toloka-screen/event-card-5ea7ba.png` — event card photo from Figma (imageRef 78465e868271cfef3c012a53e2bd794fae82234e, 1080×1350 @2x).
- `assets/images/toloka-screen/map-350d31.png` — map image from Figma (imageRef de3c31f4a8437960a598e16dcec7042fe8db73b6, 779×779 @2x).
- Two new tokens in `css/tokens.css`: `--color-day-default` (#D9D9D9), `--color-day-active` (rgba(146,81,251,0.60)), `--radius-day-chip` (1.5625rem / 25px).

### Changed
- `js/transition.js` — `#btn-about-tolochyty` click now closes about-screen then slides in toloka-screen (no flicker — container stays active between the two). Added `closeTolokaScreen()`, `#btn-toloka-close` binding, and Escape-key handler for toloka screen. Updated `hideContainerIfEmpty()` to also check `toloka-screen--open`.
- `index.html` — added `<link rel="stylesheet" href="components/toloka-screen.css">`.

---

## 2026-05-28 — "толочити" CTA closes about-screen and opens main page (Figma 1705-5935 → 1256-15801)

### Changed
- `index.html` — added `id="btn-about-tolochyty"` to the `.about-cta-btn` anchor in the About Project section (Figma node 1705:5935)
- `js/transition.js` — bound `#btn-about-tolochyty` click to `closeAboutScreen()`: prevents default navigation, hides the about-screen overlay, and reveals the main "Толоки 375" page (Figma node 1256:15801)

---

## 2026-05-28 — Tag tooltip popup on member hashtag tags (Figma nodes 1420-6342, 1471-13840)

### Added
- `components/tag-popup.css` — new component: `.tag-popup` (209px wide, `#EAE8FF` bg, `border-radius: 8px 0 8px 8px`, absolute below tag), `.tag-popup__wrap` (row flex-end wrap gap 2px), `.tag-chip` / `.tag-chip--match` / `.tag-chip--no-match`; popup revealed via `.map-member-tag:hover` and `:focus-within` (keyboard support)
- `css/tokens.css` — `--space-0-5: 0.125rem` (2px chip gap), `--color-tag-popup-bg: #EAE8FF` (Figma fill_YRPUP0), `--radius-xs: 0.25rem` (4px chip radius), `--radius-sm: 0.5rem` (8px popup radius)
- `docs/architecture.md` — added `tag-popup.css` to component table

### Changed
- `index.html` — 4 member tags with counts (Марія ×3, Іванка ×1, Роман ×7, Артем ×1): removed `aria-hidden="true"`, added `tabindex="0"` + `aria-label`, nested `.tag-popup` with sample hashtag chips inside each; tags without a count unchanged
- `index.html` — added `<link rel="stylesheet" href="components/tag-popup.css">` to `<head>`

---

## 2026-05-28 — Replace about-screen header with main-page header (Figma node 1261-4681)

### Changed
- `index.html` — about-screen (`#screen-about`) header updated to match Figma node 1261-4681 (main-page header): X close SVG replaced with `<img src="assets/images/icons/icon-burger.svg">` (Figma `1593:16722`); `aria-label` on `<nav>` changed to "Головна навігація" to match; Figma reference in comment updated from `1691:5492` to `1261:4681`. `id="btn-about-close"` preserved so `transition.js` close behaviour is unaffected.

---

## 2026-05-28 — Update Team Section to composite image (Figma node 1698-14507)

### Changed
- `index.html` — replaced 8 individual `.team-member` card divs with a single `<img class="about-team__members-img">` pointing to `assets/images/about/team/team-members.png` (downloaded from Figma node 1877:5164, imageRef `67b70bbefc6ea0c8f974e1a07ee77c565c9b3a7c`, 335×419 px display)
- `components/about-screen.css` — `.about-team__members`: changed from `row/wrap` card grid to `column, gap: var(--space-2-5), padding: var(--space-2-5) 0` (Figma `layout_X0MBQ8`); added `.about-team__members-img` rule (`width: 100%; height: auto`)
- `components/about-screen.css` — `.about-team__header` gap: replaced raw `1.75rem` with `var(--space-7)` (token discipline)
- `components/about-screen.css` — removed dead rules: `.team-member`, `.team-member__avatar`, `.team-member__info`, `.team-member__name`, `.team-member__role`

### Added
- `css/tokens.css` — `--space-7: 1.75rem` (28px — team header gap, Figma `layout_CIOKC9`)
- `assets/images/about/team/team-members.png` — composite team member image downloaded from Figma (670×838 px at 2×)

---

## 2026-05-28 — Replace footer social icons and fix nav alignment (Figma node 1698-14104)

### Changed
- `index.html` — social icon `<img>` tags replaced with inline SVGs from Figma (TelegramLogo 1156:24524 → InstagramLogo 1156:24513 → WhatsappLogo 1156:24557); corrected order to match Figma component order
- `components/about-screen.css` — `.about-footer__nav`: reverted `align-items` from `stretch` to `center` (Figma `layout_WFF8BP: alignItems: center`)
- `components/about-screen.css` — `.about-footer__logo`: simplified back to plain typography (flex column removed; centring handled by parent row's `align-items: center`)
- `components/about-screen.css` — `.about-footer__social`: gap changed from `var(--space-4)` to `0` (Figma `layout_BJPP00` has no gap between 40×40px icon buttons); added `svg` rule referencing `layout_9FKFNR` icon frame

---

## 2026-05-28 — Fix footer layout in Про нас page (Figma node 1698-14104)

### Added
- `index.html` — social icons row (`about-footer__social`) with Instagram, Telegram, WhatsApp buttons inserted inside `.about-footer__bottom` above the legal block
- `components/about-screen.css` — `.about-footer__social` and `.about-footer__social-btn` rules: row layout, 16px gap, 40×40px icon buttons with opacity hover transition

### Changed
- `components/about-screen.css` — `.about-footer__nav`: `align-items` changed from `center` to `stretch` so logo column can align to bottom (Figma `layout_4F4DE9: justifyContent: flex-end`)
- `components/about-screen.css` — `.about-footer__links a`: added `display: block` and `padding: var(--space-1) var(--space-4)` (4px 16px) for State-layer hit target spacing (Figma `layout_J9QGA2`)
- `components/about-screen.css` — `.about-footer__logo`: converted to flex column with `justify-content: flex-end; align-items: flex-end` so the wordmark sits at the bottom-right of the nav row, matching Figma `layout_4F4DE9`

---

## 2026-05-28 — Fix team members grid layout (Figma node 1705-5588)

### Fixed
- `components/about-screen.css` — `.about-team__members`: added `align-items: flex-start` (cards hug content height, matching Figma `sizing: vertical: hug`) and `align-content: flex-start` (rows pack to top with no extra inter-line space); replaced raw `1.5rem 0.75rem` gap with `var(--space-6) var(--space-3)` to satisfy token discipline

---

## 2026-05-28 — Replace trust section icons with Figma SVGs (node 1757-14119)

### Changed
- `index.html` — replaced 4 placeholder Feather Icons (stroke-based) in `.about-values` with the exact Phosphor icons from Figma:
  - Value 1 "Діємо разом": users icon → Handshake (Figma 1156:25459)
  - Value 2 "Відповідальність": check-circle → SealCheck (Figma 1156:25544)
  - Value 3 "Безпека та комфорт": feather shield → Shield (Figma 1156:25533)
  - Value 4 "Відкритість": cast/radio → Megaphone (Figma 1156:24484)
- All new SVGs use `fill="currentColor"` on the `<path>` so `.value-item__icon { color: var(--color-purple-primary) }` keeps the purple colouring; clip-path IDs are namespaced (`clip-handshake`, `clip-shield`, `clip-megaphone`) to avoid conflicts

---

## 2026-05-28 — Fix "Про нас" page layout issues (Figma node 1691-5491)

### Fixed
- `css/tokens.css` — added `--space-30: 7.5rem` (120px) to the spacing scale; previously missing, causing raw `7.5rem` values in component CSS
- `components/about-screen.css` — `.about-section-heading`: replaced raw hex `#0D0E0F` with `var(--color-text)` (token discipline violation per CLAUDE.md rule 4)
- `components/about-screen.css` — `.screen-about-meta` padding corrected from `100px 20px` → `120px 20px` to match Figma `layout_1PEG64`; now uses `var(--space-30) var(--space-5)`
- `components/about-screen.css` — `.about-social` padding changed from raw `7.5rem 0` → `var(--space-30) 0` (120px 0) to use the new token
- `components/about-screen.css` — `.about-footer__logo` text alignment corrected from `right` → `left` to match Figma `style_FVW44I` (`textAlignHorizontal: LEFT`)

---

## 2026-05-28 — Unify header across all pages (Figma node 1691-5492)

### Changed
- `index.html` — replaced the about-screen's custom `.about-header` block with the shared `.site-header` / `.header-inner` / `.header-nav` markup (identical structure to main page and map screen); close button reuses `.btn.btn--outline.btn--menu` with an ✕ SVG icon and keeps `id="btn-about-close"`
- `components/about-screen.css` — removed all `.about-header*` rules (60 lines); styling is now fully handled by `header.css` shared tokens

---

## 2026-05-28 — Fix "About project" section layout (Figma node 1261-4725)

### Fixed
- `components/about-screen.css` — renamed `.about-project` → `.screen-about-meta` to remove CSS collision with `about.css`; the bleed was applying `gap: 40px`, `padding: 100px 20px`, and `align-items: center` to the main-page block that should have `gap: 24px` and no extra padding
- `index.html` — updated about-screen Мета section class to `screen-about-meta` accordingly
- `components/about.css` — corrected `.about-icon-btn` from 48×48px to **56×56px** to match Figma `layout_229P9U` dimensions for node 1593:16725
- `index.html` — wired both about-screen triggers with `class="js-open-about"`: the heading button (Figma 1593:16725, previously pointing to `#events`) and the CTA button
- `js/transition.js` — replaced single `id="btn-about"` lookup with `querySelectorAll('.js-open-about')` so both buttons open the about screen; first trigger used as return-focus target on close

---

## 2026-05-28 — Implement "Про нас" screen from Figma (node 1691-5491)

### Added
- `assets/images/about/social-instagram.png` — Instagram social card avatar (Figma imageRef 7f544af9, 439×440)
- `assets/images/about/social-telegram.png` — Telegram social card avatar (Figma imageRef 0515b0f9, 598×598)
- `assets/images/about/social-whatsapp-2445c3.png` — WhatsApp social card avatar (Figma imageRef b8c57282, cropped 334×334)
- `css/tokens.css` — `--color-text-muted-half: rgba(13,14,15,0.50)` for team role text and hero shadow
- `css/tokens.css` — `--gradient-about-hero-overlay` for the Figma bottom gradient (fill_ERUN69: 180deg transparent→rgba(0,0,0,0.49))

### Changed
- `css/tokens.css` — updated `--color-about-social-overlay` from 0.65 → 0.70 to match Figma fill_7AKT8Q exactly
- `components/about-screen.css` — complete rewrite to match exact Figma measurements:
  - Hero: `position:relative; height:720px` with absolute shadow (rgba(13,14,15,0.5)), gradient overlay at y=465/h=255, text-wrapper at x=30/y=250/w=315, description at x=30/y=575/w=315
  - Trust items: flat column layout (no card borders); icon 24px purple + title body-lg 20px + description body-md 16px
  - Team members: flex-wrap, 90px cards, 60×60 circular avatars, role text 11px rgba(13,14,15,0.5)
  - Social section: relative, absolute bg at y=61/h=384, dark overlay rgba(13,14,15,0.7) + blur(4px), content 335px wide, vertical social cards 100px wide
  - Contacts: column centered items, body-md labels + body-sm purple values
  - Footer: #9251FB background, min-height 350px, Unbounded Bold 24px logo
- `index.html` — complete rewrite of `#screen-about` with:
  - Exact Figma copy (Ukrainian text from nodes 1783:5701, 1705:5930, 1705:5933, trust items, team names/roles, social handles, contact details)
  - Hero: `hero-slide-2feb8b.png` (Slide 3, Figma default), shadow div, gradient div
  - 8 real team members from Figma (Андрій Мельник, Олена Ковальчук, Максим Дорошенко, Мар'яна Савицька, Софія Яворська, Дмитро Павлюк, Юлія Козак, Анна Гавриш) with downloaded avatars
  - Social section: vertical cards (avatar + platform name + handle) for Instagram/Telegram/WhatsApp
  - Footer: purple background, 5 nav links, Unbounded logo, Terms/Privacy/copyright

---

## 2026-05-28 — Screen architecture: fixed container + instant switching

### Changed
- `index.html` — wrapped `#screen-map` and `#screen-about` in a new `<div id="screen-container" class="screen-container">`. Container is `position:fixed;inset:0;display:none;z-index:300` and only shown when a screen is active.
- `css/style.css` — added `.screen-container` (hidden fixed host) and `.screen-container--active` (display:block) rules.
- `components/map-screen.css` — `.map-screen` changed from `position:fixed` + `transform:translateX(100vw)` + `transition:none` to `position:absolute;display:none` within the container. `.map-screen--open` now sets `display:block` instead of `transform:translateX(0)`. Removed `z-index` (container handles stacking), `will-change`, and all transform/transition properties.
- `components/about-screen.css` — same structural change as map-screen: `position:absolute;display:none` / `.about-screen--open { display:block }`. Removed all transform, transition, and z-index properties.
- `js/transition.js` — replaced per-screen `document.body.style.overflow` management with shared `showContainer()` / `hideContainerIfEmpty(returnFocusEl)` helpers. `showContainer` activates the container and locks body scroll; `hideContainerIfEmpty` checks both screens before hiding the container and restoring scroll, ensuring correct behaviour if multiple screens ever become active simultaneously.

### Fixed
- On desktop viewports wider than 375 px, the overlay screens previously appeared as a visible stripe at x=375 px because `transform:translateX(100vw)` moves by viewport width but the element starts at `left: max(0px, calc(50% − 187.5px))`. Replaced the whole approach: container is `display:none` by default, so screens are completely invisible regardless of viewport width.

---

## 2026-05-28 — About screen: "Про нас" slide-in overlay

### Added
- `components/about-screen.css` — all styles for the "Про нас" overlay screen (slide-in from right, same 300ms ease-out transition as map-screen). Sections: `.about-hero` (720px image + gradient overlay), `.about-meta` (title + body + CTA), `.about-trust` (4-item card list with inline SVG icons), `.about-team` (2-column grid, 8 member cards), `.about-social` (bg image + dark overlay + 3 social link rows), `.about-contacts` (email + 2 handles), plus the shared site-footer.
- `index.html` — `<link>` for `components/about-screen.css`; `id="btn-about"` on `.cta-icon-btn` (replaces `href="#events"` with `href="#"` since navigation is now JS-driven); full `#screen-about` markup (8 sections, footer) inserted after `#screen-map` before `</body>`.
- `js/transition.js` — about-screen open/close block (mirrors map-screen pattern): `openAboutScreen()` / `closeAboutScreen()` bound to `#btn-about`, `#btn-about-close`, and `Escape` key. Focus management: overlay receives focus on open, trigger receives focus on close.
- `css/tokens.css` — three new colour tokens (`--color-about-social-overlay`, `--color-social-link-bg`, `--color-social-link-bg-hover`), one new gradient (`--gradient-about-hero`), one new letter-spacing token (`--letter-spacing-wide: 0.05em`).

### Changed
- `index.html` — `.cta-icon-btn` `aria-label` updated from "Перейти до найближчих подій" to "Перейти до сторінки Про нас" to match actual destination.

---

## 2026-05-28 — Action buttons: fix joined-state button layout

### Fixed
- `components/map-screen.css`:
  - `.btn--pryyniato` — added `min-width: 0` (prevents flex overflow beyond `flex:1` lane); changed `padding-inline: 0` → `var(--space-4)` (16px). Figma specifies 80px but that's for the full-width component; at half-row (~162 px) 16px gives visible breathing room without clipping.
  - `.btn--minusnutysya` — added `min-width: 0`; changed `padding-inline: var(--space-6)` (24px) → `var(--space-3)` (12px). At half-row, 24px padding left only 114 px for content (icon 24 + gap 8 + text ~84 px = 116 px → overflow); 12px gives 139 px clearance so all content fits.

---

## 2026-05-28 — Action buttons: fix hidden container visible on load

### Fixed
- `index.html` — replaced `hidden` attribute with `style="display:none"` on `#map-action-btns-joined`. Root cause: `.map-action-btns { display: flex }` is an author stylesheet rule; author styles always override the UA stylesheet's `[hidden] { display: none }` rule, so the joined container was visible on load despite having `hidden`.
- `js/transition.js` — `switchToJoinedState()` now uses `style.display = 'none'` / `style.display = 'flex'` (inline styles). Inline styles have the highest specificity and cannot be overridden by class selectors, guaranteeing the swap is atomic and layout-shift-free.

---

## 2026-05-28 — Action buttons: correct to container-level swap

### Changed
- `index.html` — split single `#map-action-btns` into two sibling containers mirroring the Figma structure: `#map-action-btns-default` (Figma 1669:13552, visible on load, contains `#btn-tolochyty`) and `#map-action-btns-joined` (Figma 1669:13569, `hidden` on load, contains `#btn-pryyniato` + `#btn-minusnutysya`).
- `js/transition.js` — `switchToJoinedState()` now hides/shows the two containers as whole units (`actionBtnsDefault.hidden = true`, `actionBtnsJoined.hidden = false`) instead of toggling individual buttons within one container.

---

## 2026-05-28 — Action buttons: swap to joined state after toast

### Added
- `components/map-screen.css` — `.btn--pryyniato` (same `#7A2EEF` fill as толочити, `flex:1`, Figma node 1669:13570) and `.btn--minusnutysya` (transparent bg, `#0D0E0F` stroke 1.5px, `flex:1`, UserMinus icon 24×24, label not uppercase, Figma node 1669:13571).
- `index.html` — `id="map-action-btns"` on the action container; `#btn-pryyniato` and `#btn-minusnutysya` (with inline UserMinus SVG) added as hidden siblings of `#btn-tolochyty`.
- `js/transition.js` — `switchToJoinedState()` hides `#btn-tolochyty` and reveals the two joined-state buttons; called inside the `animationend` handler of `showToast()` so the swap happens exactly when the toast finishes fading out.

---

## 2026-05-28 — Toast: animate backdrop in sync with card

### Changed
- `components/toast.css` — added `animation: toast-lifecycle 4s ease forwards` to `.toast-overlay--visible`. The backdrop now shares the exact same keyframe, duration, and easing as the card, so both fade in and fade out together. No JS change needed — the existing `animationend` handler on the card already removes `.toast-overlay--visible` at the correct moment.

---

## 2026-05-28 — Toast: scroll-relative backdrop overlay

### Changed
- `components/toast.css` — added `.toast-overlay` / `.toast-overlay--visible`: `position: absolute` backdrop with `background-color: var(--color-modal-backdrop)` and `backdrop-filter: var(--blur-modal)`, mirroring `.join-modal` exactly. Changed `.toast` from `position: fixed` to `position: absolute` so it centres within the overlay rather than the viewport.
- `index.html` — wrapped `#toast-success` in new `#toast-overlay` div.
- `js/transition.js` — `showToast()` now calls `stampOverlay(toastOverlay)` (reuses existing helper) to position the overlay at the current scroll offset, adds `.toast-overlay--visible`, and removes it alongside `.toast--visible` on `animationend`.

---

## 2026-05-28 — Success toast notification (Figma node 1593:15213)

### Added
- `css/tokens.css` — three new tokens: `--color-toast-bg` (`#D7F5E5`), `--color-toast-text` (`#0D4F2B`), `--color-toast-icon` (`#008557`).
- `components/toast.css` — new component. `@keyframes toast-lifecycle`: opacity 0→1 over first 10% (0.4 s), holds through 85% (3.4 s), fades to 0 by 100% (4 s). `.toast` uses `position: fixed` inside `#screen-map` (the map screen's CSS transform makes it the containing block, so the toast centres within the 375 px panel). `.toast--visible` triggers the animation. `animationend` removes the class so the element resets for reuse. `prefers-reduced-motion` variant skips the animation and keeps full opacity.
- `index.html` — `<link>` for `toast.css`; `id="btn-register-submit"` on the submit button; `#toast-success` element (text + CheckCircle SVG inline) with `role="status" aria-live="polite"` for screen-reader announcement.
- `js/transition.js` — `showToast()`: calls `closeAll()`, force-reflows the toast element to restart the animation if triggered twice, adds `.toast--visible`, binds a one-shot `animationend` listener that removes the class. Both `.register-btn` elements inside `#modal-register` call `showToast()` with `e.preventDefault()` to suppress native form submission.

---

## 2026-05-28 — Register modal: centre card in overlay

### Fixed
- `components/register-modal.css` — `.register-modal__card` changed from `left: var(--space-5); transform: translateY(-50%)` to `left: 50%; transform: translate(-50%, -50%)`. The previous value anchored the card 20px from the overlay's left edge (correct only at exactly 375px); the new value centres it on both axes regardless of overlay width.

---

## 2026-05-28 — Register modal: fix form content to match Figma 1593:15942

### Fixed
- `index.html` — `#modal-register` form updated to match Figma node 1593:15942 (Frame 812):
  - Added **Прізвище** input field (node 1593:15945, placeholder "Введіть прізвище")
  - Added **E-mail** input field (node 1593:15947, placeholder "Введіть свою пошту", `type="email"`)
  - Fixed **Номер телефону** placeholder from "+380" to "+(380)XX XXX XX XX" (node 1593:15946)
  - Updated agreement text to exact Figma copy: "Я даю згоду на підтягнення моїх докуметів з Дії для підтвердження особи" (node 1593:15948–15949)

---

## 2026-05-28 — Registration modal (Figma node 1593:15939)

### Added
- `components/register-modal.css` — new component file with styles for the registration form card: `.register-modal__card` (scrollable, max-height 90%), `.register-modal__close`, `.register-modal__title`, `.register-form`, `.register-inputs`, `.register-input` / `__label` / `__textbox` / `__field`, `.register-agreement` checkbox row, `.register-btns` + `.register-btn`.
- `index.html` — `<link>` for `register-modal.css`; `id="btn-join-register"` on the "Увійти / зареєструватися" button in `#modal-join`; full `#modal-register` markup (two input fields — Ім'я + Телефон, agreement checkbox, two action buttons) inserted inside `#screen-map` after `#modal-join`.
- `js/transition.js` — `stampOverlay()` helper (stamps `top`/`height` from current scroll position); `closeAll()` (closes both modals, restores scroll, returns focus to `#btn-tolochyty`); `openRegisterModal()` (swaps join modal out, stamps + opens register modal); event bindings for `#btn-join-register`, `#btn-register-close`, Escape, and backdrop click on `#modal-register`. Register modal reuses `.join-modal` + `.join-modal--open` classes so it inherits the same overlay colour and blur without duplicating CSS.
- `css/tokens.css` — `--color-gray-input` (`#A6A6A6`) and `--radius-input` (`0.25rem / 4px`) tokens added earlier in this session.

## 2026-05-28 — Map screen: prevent width shift when modal opens

### Fixed
- `components/map-screen.css` — added `scrollbar-gutter: stable` to `.map-screen`. When `openModal()` sets `overflow-y: hidden` the native scrollbar (~17 px on desktop) disappears; without this property the content area expands by that amount, making the screen appear to widen. `scrollbar-gutter: stable` permanently reserves the scrollbar track so the layout width stays exactly 375 px whether the scrollbar is visible or not.

---

## 2026-05-28 — Join modal: width capped at 375 px; button text no longer overflows

### Fixed
- `components/join-modal.css` — `.join-modal` gained `width: 100%; max-width: var(--viewport-mobile)` so the overlay is explicitly capped at 375 px in all viewport contexts.
- `components/join-modal.css` — `.join-modal__btn-register` `padding-inline` reduced from `var(--space-20)` (80 px) to `var(--space-5)` (20 px). The card content area is 295 px (335 px − 2 × 20 px card padding); the Figma's 80 px inline padding left only 135 px for "УВІЙТИ / ЗАРЕЄСТРУВАТИСЯ" (~220 px at Manrope SemiBold 16 px), causing overflow. 20 px padding gives 255 px — text fits on one line.

---

## 2026-05-28 — Join modal overlays current scroll position (position: absolute)

### Changed
- `components/join-modal.css` — `.join-modal` changed from `position: fixed; inset: 0` to `position: absolute; left: 0; right: 0`. Overlay now follows the user's scroll position rather than locking to the viewport top.
- `js/transition.js` — `openModal()` now stamps `modalJoin.style.top = screen.scrollTop + 'px'` and `modalJoin.style.height = screen.clientHeight + 'px'` before revealing the overlay. This positions the backdrop exactly over the visible viewport area at the moment of trigger, regardless of how far the user has scrolled.

---

## 2026-05-28 — Fix: join modal CSS selector prevented it from opening

### Fixed
- `components/join-modal.css` — replaced `[aria-hidden="false"]` selector with `.join-modal--open` class. The previous selector never matched because JS used `removeAttribute('aria-hidden')` (no attribute = no value to match against).
- `js/transition.js` — `openModal()` now uses `classList.add('join-modal--open')` + `setAttribute('aria-hidden', 'false')` (display toggling via class, semantics via aria). `closeModal()` uses `classList.remove('join-modal--open')` + `setAttribute('aria-hidden', 'true')`.
- Popup is Figma node 1593:15560 — Notification Container (335×217 px white card).

---

## 2026-05-28 — Join confirmation modal (Figma node 1593:15559)

### Added
- `components/join-modal.css` — new component: modal overlay + notification card styles.
  - Backdrop: `position:fixed; inset:0` (fixed to `#screen-map` via CSS transform containing block) · `rgba(13,14,15,0.20)` fill · `blur(4px)` backdrop filter.
  - Card: 335×auto · `border-radius 20px` · column · centre · `gap 16px` · `padding 20px` · vertically centred with `top:50%; translateY(-50%)`.
  - × close button: absolute `top:0; right:0` · 56px touch target.
  - Primary CTA "Увійти / зареєструватися": `#A978FF` fill · white text · fill-width · Manrope SemiBold 16px UPPER.
  - Secondary CTA "Взяти участь без реєстрації": transparent · `#0D0E0F` 1.5px stroke.
- `css/tokens.css` — two new tokens: `--color-modal-backdrop` (`rgba(13,14,15,0.20)`) and `--blur-modal` (`blur(4px)`).
- `index.html`:
  - `<link>` for `join-modal.css` added to `<head>`.
  - `id="btn-tolochyty"` added to the `btn--accepted` button in `.map-event-header`.
  - Modal HTML (`#modal-join`) added inside `#screen-map` before closing tag.
- `js/transition.js` — modal open/close logic: opens on `#btn-tolochyty` click, closes on × button / Escape key / backdrop click; map screen scroll locked while modal is visible.

---

## 2026-05-28 — Map screen transition changed to instant

### Changed
- `components/map-screen.css` — `.map-screen` transition changed from `transform 300ms ease-out` to `none`. Opening and closing the map screen overlay is now instant (no slide animation).

---

## 2026-05-28 — Map screen hidden correctly on wide viewports

### Fixed
- `components/map-screen.css` — changed `.map-screen` hidden-state transform from `translateX(100%)` to `translateX(100vw)`. The previous value (100% = 375 px) was insufficient to push the centred panel off-screen on viewports wider than 375 px, making the overlay visible beside the main page on desktop. `translateX(100vw)` always shifts the panel by the full viewport width, guaranteeing it is off-screen regardless of browser width. `.map-screen--open { transform: translateX(0) }` is unchanged.

---

## 2026-05-28 — All pages constrained to mobile frame width 375 px

### Fixed
- `css/style.css` — added `max-width: var(--viewport-mobile)` and `margin-inline: auto` to `body`. Every page (main + map screen overlay) is now capped at 375 px and centred on wider viewports, matching the Figma "Main Mobile" and "Мапа толок (вибрана толока) 375" frames exactly.

---

## 2026-05-28 — Map screen constrained to mobile frame width 375 px

### Fixed
- `components/map-screen.css` — `.map-screen` changed from `inset: 0` (full viewport) to a centred 375 px panel:
  - `left: max(0px, calc(50% - (var(--viewport-mobile) / 2)))` centres the overlay on wide screens and snaps to `left: 0` on viewports ≤ 375 px.
  - `width: min(var(--viewport-mobile), 100%)` caps the panel at 375 px on desktop while filling the screen on true mobile.
  - Uses the existing `--viewport-mobile: 375px` token; no raw pixel values added.
  - Slide-in animation (`translateX(100%)`) unchanged — 100% of 375 px slides the panel cleanly off-screen right.

---

## 2026-05-26 — Event card background replaced with Figma SVG export (node 1669:13251)

### Changed
- `assets/images/events/event-card-park-2.svg` — new file: Figma SVG export for the event-card-park 2 background (335×546, rx 40, pattern fill with base64-encoded PNG, Figma node 1669:13251).
- `index.html` — `.event-card__bg` `<img>` src updated from `event-card-park-2-67185b.png` to `event-card-park-2.svg`.

---

## 2026-05-26 — Dropdown button keeps white background when open (Figma 1678:5811)

### Fixed
- `components/map-screen.css` — removed `.map-toolbar__dropdown[aria-expanded="true"]` rule and added explicit `background-color: var(--color-white)` overrides for `:hover`, `:active`, `:focus`, and `:focus-visible` states. This suppresses the tints inherited from the base `.btn--outline` interaction states in `header.css`, keeping the button visually unchanged in all states.

---

## 2026-05-26 — Dropdown expand/collapse animation (Figma 1678:5813)

### Added
- `components/map-screen.css` — animated dropdown open/close:
  - `transform-origin: top center` on `.map-dropdown` so scale originates from the button edge.
  - `.map-dropdown--open` → `dropdown-expand` keyframe: `opacity 0→1`, `translateY(-6px)→0`, `scaleY(0.88→1)`, 220ms ease-out.
  - `.map-dropdown--closing` → `dropdown-collapse` keyframe: same props reversed, 180ms ease-in. Applied by JS before removing `display`.
- `js/transition.js` — animation-aware open/close logic:
  - `closeTimer` var tracks the 180ms collapse timeout.
  - `openDropdown()` cancels any pending close timer and removes `--closing` before adding `--open`, so rapid re-open is instant.
  - `closeDropdown()` swaps `--open` → `--closing`, sets `aria-expanded=false`, then removes `--closing` after 180ms (restoring `display:none`). Guards against double-close calls.

---

## 2026-05-26 — Map screen header unified with main header

### Changed
- `index.html` — map screen header (`#screen-map`) now matches the main site-header exactly:
  - Nav `aria-label` changed from `Навігація мапи` → `Головна навігація`.
  - Close button: class `btn--back` → `btn--menu`; `aria-label` → `Відкрити меню`; inline chevron SVG replaced with `<img src="icon-burger.svg" width="20" height="20">`. `id="btn-map-close"` preserved for JS close handler.
- `components/map-screen.css` — removed now-redundant `.btn--back` and `.btn--back svg` blocks; button is fully styled by `.btn--menu` in `header.css`.
- `js/transition.js` — updated stale comment on close-button binding to reflect burger icon.

---

## 2026-05-26 — Header burger icon replaced with exact Figma path

### Added
- `assets/images/icons/icon-burger.svg` — exact Figma path for the hamburger menu icon (20×20 viewBox, filled path, `fill="#0E0F10"`).

### Changed
- `index.html` — main site-header `.btn--menu`: replaced stroke-based inline SVG with `<img src="icon-burger.svg" width="20" height="20">`.
- `components/header.css` — extended `.btn--menu svg` selector to also cover `.btn--menu img` so size constraints apply to both element types.

---

## 2026-05-26 — Filter Menu icons & layout fix (Figma 1678:5809)

### Added
- `assets/images/icons/icon-calendar-blank.svg` — exact Figma path for CalendarBlank icon (18×20 viewBox, fill `#0E0F10`). Replaces previous inline stroke-based SVG in the calendar toolbar button.

### Changed
- `assets/images/icons/icon-filter-btn.svg` — replaced with exact Figma path (20×18 viewBox, fill `#0E0F10`); previously 17×16.
- `assets/images/icons/icon-dropdown.svg` — replaced with exact Figma path (17×17 viewBox, fill `#0E0F10`); previously 15×15.
- `index.html` — filter toolbar (Figma 1678:5809):
  - Filter `<img>`: `width/height` corrected to `20×18`.
  - Dropdown `<img>`: `width/height` corrected to `17×17`.
  - Calendar button: inline stroke SVG swapped for `<img src="icon-calendar-blank.svg" width="18" height="20">`.
- `components/map-screen.css`:
  - `.map-toolbar__btn img/svg` — `width/height` changed to `auto` so HTML attrs drive natural icon size.
  - `.map-toolbar__dropdown` — padding corrected `8px 16px` → `12px 24px` (Figma `layout_CG7UN0`); removed explicit `height`.
  - `.map-toolbar__dropdown img/svg` — same `width/height: auto`.

---

## 2026-05-26 — Header button border-radius fix (Figma 1256:15392)

### Fixed
- `components/header.css` — corrected border-radius on both header buttons to match Figma node 1256:15392:
  - `.header-nav .btn--primary` (register CTA): `var(--radius-advantage)` 24px → `var(--radius-btn-toolbar)` **32px** (Figma 1593:14353).
  - `.btn--menu` (burger): `var(--radius-btn-map)` 41px → `var(--radius-btn-toolbar)` **32px** (Figma 1593:14354).

---

## 2026-05-26 — BadgesContainer icon size overrides (Figma 1669:13543)

### Fixed
- `components/map-screen.css` — added per-variant `img` size overrides to correct badge icon dimensions that were being forced to `16×16px` by the base `.badge img` rule in `events.css`:
  - `.badge--map-transparent img`: `width: 1.125rem` (18px) + `height: auto` for the alarm icon (Figma layout_8JKGLI).
  - `.badge--map-white img`: `width: 0.875rem; height: 0.875rem` (14×14px) for the number icon (Figma layout_SY5N0Y).

---

## 2026-05-26 — Event Header number badge icon replaced with exact Figma path

### Added
- `assets/images/icons/icon-number.svg` — exact Figma path for componentId 1190:11183. Hash symbol inside a rounded rectangle, 14×14 viewBox, `fill="#8A38F5"` (purple vivid). Separate file from `icon-hashtag.svg` (which remains for participant member tags, componentId 937:45785).

### Changed
- `index.html` — Event Header badge 2: icon src `icon-hashtag.svg` → `icon-number.svg`; comment updated from "Hashtag icon" to "Number icon".

---

## 2026-05-26 — Event Header alarm icon replaced with exact Figma path

### Changed
- `assets/images/icons/icon-alarm.svg` — replaced stroke-based hand-drawn approximation with the exact Figma path. 16×15 viewBox, single filled path, `fill="#9251FB"` (purple accent). Clock face with hour/minute hands and two diagonal bell lines.
- `index.html` — alarm icon `img` attrs updated `width="18" height="18"` → `width="16" height="15"` to match natural viewBox proportions.

---

## 2026-05-26 — MapPinArea icon replaced with exact Figma path

### Changed
- `assets/images/icons/icon-map-pin-area.svg` — replaced hand-drawn approximation with the exact SVG path provided from Figma. 21×21 viewBox, single compound path, `fill="#A978FF"`. Pin body + hollow ring centre + ground-level area ellipse (shadow).

---

## 2026-05-26 — Info Block icons updated (Figma node 1102:14316)

### Added
- `assets/images/icons/icon-map-pin-area.svg` — hand-drawn MapPinArea (componentId 1156:24870): teardrop pin with hollow centre (fill-rule evenodd) + base area ellipse. `fill="#A978FF"` (fill_OSA7AX), 24×24.
- `assets/images/icons/icon-calendar-dot.svg` — CalendarDot (componentId 1156:25642): same compound paths as `icon-calendar.svg` (dot already present), `fill="#A978FF"`, 16×16 viewBox (scales to 24×24 via img attrs).

### Changed
- `assets/images/icons/icon-hourglass.svg` — fill changed from `var(--Foreground-icon-tertiary, #A978FF)` to hardcoded `#A978FF`. CSS variables are not resolved when SVG is loaded via `<img>` tag — the fallback value was correct but fragile.
- `index.html` — Info Block (node 1102:14316): swapped icon srcs:
  - Location row: `icon-map-pin.svg` → `icon-map-pin-area.svg`
  - Date row: `icon-calendar.svg` → `icon-calendar-dot.svg`
  - Duration row: `icon-hourglass.svg` unchanged (file updated in place)
  - Added per-row Figma componentId comments.

---

## 2026-05-26 — Additional Info Block updated (Figma node 1102:14411)

### Added
- `assets/images/icons/icon-link.svg` — hand-drawn Phosphor-style chain link icon, 24×24, `stroke="#9251FB"` (fill_1FRR2U / `--color-purple-accent`). Replaces `icon-arrow-right.svg` in the links block.

### Changed
- `index.html` — links block (3 rows): switched icon src `icon-arrow-right.svg → icon-link.svg`, updated `width/height` attrs to `24×24`; added class `map-info-block--links` to the wrapper; updated comment with Figma node reference.
- `components/map-screen.css` — added `.map-info-block--links` modifier: overrides gap `20px → 10px` to match `layout_RJNRC4` (location block keeps its 20px gap unchanged).

---

## 2026-05-26 — Participants tag: removed outline (Figma node 1385:4665)

### Changed
- `components/map-screen.css` — `.map-member-tag`: removed `border: 1px solid var(--color-border)`. Figma layout_GYWKAN (Tag container, 40×40) has no strokes. Updated comment to reference correct layout token.

---

## 2026-05-26 — Action Buttons: removed outline (Figma node 1593:16811)

### Changed
- `index.html` — removed `btn--outline` from both photo tab buttons (`Фото до` / `Фото після`). Figma State-layer 1593:16322 / 1593:16328 has no strokes.
- `components/map-screen.css` — `.btn--photo`: added `border: none; background-color: transparent; color: var(--color-text)`. Removed `border-color` from disabled rule (no border to recolour).

---

## 2026-05-26 — Event Actions implemented (Figma node 1127:15985)

### Added
- `assets/images/map/event-photo-48fc6a.png` — downloaded from Figma (RECTANGLE 1127:15978, imageRef `806ef43c…`, cropped 459×343px).
- `components/map-screen.css`:
  - `.map-extra-info` — wrapper for the Extra Info Block (layout_VEW1SS): `column · stretch · gap 10px · padding 0 20px`.
  - `.btn--photo:disabled` / `[aria-disabled]` — disabled state: text + border use `--color-disabled-fg` (#A9B2B7), pointer-events none. Matches Figma State=disabled fill_0121SQ.
  - `.map-photo-pagination` — dedicated pagination row (gap 10px, centered). Replaces borrowed `.events-pagination` class.
  - `.map-photo-pagination__dot` — 8×8px, fill `#BBB1FF`, r 19px.
  - `.map-photo-pagination__dot--active` — 30×8px (wider active dot). Matches layout_WA7ZUV.

### Changed
- `index.html` — `.map-photo-actions` block fully updated:
  - Comment + Figma reference updated to node 1127:15985.
  - Photo wrapped in `.map-extra-info` container (provides 0 20px padding per layout_VEW1SS).
  - Image src changed `event-photo-b6a466.png → event-photo-48fc6a.png`.
  - Pagination swapped from `.events-pagination` / `.pagination-dot` to `.map-photo-pagination` / `.map-photo-pagination__dot`.
  - Added `aria-disabled="true"` on disabled button.
- `components/map-screen.css`:
  - `.map-photo-actions` — padding `20px 20px 40px → 20px 0 40px` (no horizontal; inner block handles it). Added `align-items: center` so hug-width button row centres correctly. Matches layout_QAI9SG.
  - `.btn--photo` — removed `flex: 1` (Figma sizing is hug, not fill); padding `padding-block 16px → 8px 16px` (Figma layout_8M0Z9H exact).
  - `.map-extra-photo` — added `border-radius: 1.25rem` (20px, Figma node 1127:15978 exact).

---

## 2026-05-26 — Requirements List updated + checkbox animation (Figma node 1102:16475)

### Changed
- `index.html`: Google Fonts link updated — added Manrope weight `300` (Light).
- `index.html`: Requirements section fully restructured to match Figma node `1102:16475`:
  - Title + subtitle wrapped in `.map-requirements__header` (column, gap 20px) to match layout_JJF5I2.
  - Static SVG checkboxes replaced with accessible animated `<label>` + `<input type="checkbox">` structure (`.req-item`, `.req-item__input`, `.req-item__box`, `.req-item__check`, `.req-item__text`).
  - Item 6 text updated to full Figma copy: "Власні робочі рукавиці (за бажанням, якщо вам комфортніше у своїх)".
- `components/map-screen.css`:
  - `.map-requirements` — gap `20px → 40px`, added `border-radius: 20px`, `align-items: stretch`. Matches layout_URGPP1.
  - `.map-requirements__header` — new rule: column, stretch, gap 20px. Matches layout_JJF5I2.
  - `.map-requirements__title` — removed `text-transform: uppercase` (Figma style_GZKS3Y has no textCase).
  - `.map-requirements__subtitle` — font-weight `400 → 300` (Manrope Light), color `text-muted → text` (black, fill_WB92YO). Removed `margin-top` hack (gap now handled by header group).
  - `.map-requirements__list` — gap `16px → 10px`. Matches layout_1RD7DU.
  - Removed `.map-requirements__item svg` rule.

### Added (checkbox animation — pure CSS, no JS)
- `.req-item` — flex label row, gap 10px, pointer cursor.
- `.req-item__input` — native checkbox visually hidden; stays in the a11y tree for keyboard + screen readers.
- `.req-item__box` — custom 20×20 rounded square (r 4px, border 1.5px `--color-text`). On `:checked`: fills `--color-purple-dark` (#7A2EEF) with `200ms ease` colour transition + `req-box-pop` keyframe bounce (scale 1→1.15→0.95→1, 300ms).
- `.req-item__check` (inline SVG path `M1 4L4.5 7.5L11 1`) — checkmark draws in via `stroke-dashoffset: 20 → 0` transition (`250ms ease`, 80ms delay) when checked.
- `.req-item__text` — `line-through` + `opacity: 0.45` on checked (`200ms ease`).
- `.req-item__input:focus-visible` — 2px outline ring for keyboard users.
- `@media (prefers-reduced-motion: reduce)` — disables all transitions and animations.

---

## 2026-05-26 — Учасники section added (Figma node 1385:4659 / Participants Block 1102:15031)

### Added
- `index.html`: Wrapped the Organizers list in a new `.map-participants-block` wrapper (Figma 1102:15031: column, stretch, gap 20px, padding 20px). Added divider (Vector 44) and the full Учасники section (Figma 1385:4659) below it:
  - Header row: "Учасники" title + "7/9" count chip (border 1px, radius 27px).
  - 7 member rows (Figma Member row · layout_KJVCSP: space-between, center): avatar 40×40, name 16px Medium, tag circle 40×40 with hashtag icon + optional count badge. Members: Марія Василенко (×3), Андрій Марченко, Іванка Волошка (×1), Роман Ластівка (×7), Максим Бойко, Аніта Лебідь, Артем Вишневецький (×1).
  - "Показати більше учасників" outline button (radius 32px, #A978FF, SemiBold 14px).
  - "+2 незареєстровані користувачі" note (14px Medium, rgba(13,14,15,0.70)).
- `components/map-screen.css`: Added `.map-participants-block`, `.map-uchasnyky`, `.map-uchasnyky__header`, `.map-uchasnyky__count`, `.map-uchasnyky__container`, `.map-member-list`, `.map-member-row`, `.map-member-info`, `.map-member-avatar`, `.map-member-name`, `.map-member-tag`, `.map-member-tag__count`, `.map-show-more`, `.map-unregistered`.
- `css/tokens.css`: Added `--color-text-dim: rgba(13, 14, 15, 0.70)` (Figma fill_41H1G3 — unregistered note colour).

### Added (images)
- `assets/images/map/avatar-2f9201.png` — Марія Василенко (imageRef `2f9201c2…`, 335×335 cropped @2×).
- `assets/images/map/avatar-f8a463.png` — Андрій Марченко (imageRef `f8a463aa…`, 736×981 @2×).
- `assets/images/map/avatar-61ab36.png` — Роман Ластівка (imageRef `61ab3616…`, 685×772 @2×).
- `assets/images/map/avatar-0f6b00.png` — Максим Бойко (imageRef `0f6b007b…`, 900×1200 @2×).
- `assets/images/map/avatar-d074dc.png` — Аніта Лебідь (imageRef `d074dcae…`, 735×1103 @2×).
- `assets/images/map/avatar-1dc976.png` — Артем Вишневецький (imageRef `1dc9765e…`, 675×1200 @2×).
- Іванка Волошка reuses existing `assets/images/reviews/avatar.png` (imageRef `c1c3b161…`).

---

## 2026-05-26 — Participants List updated to Figma node 1385:4747

### Changed
- `index.html`: Replaced the entire `.map-participants` block. Old layout had two vertical sections ("Організатори" + "Учасники" with 5 placeholder members, count chip, show-more button, unregistered note). New layout matches Figma node `1385:4747` — single "Організатори" heading + horizontal row of 3 organizer cards (90px each, 60×60 avatar, 12px centered name). Учасники section, divider, and all placeholder members removed.
- `components/map-screen.css`: Replaced all old participant/member CSS with new organizer layout rules:
  - `.map-participants` — gap `20px → 28px`, added `align-items: center`, `border-radius: var(--radius-badge)` (20px). Matches layout_1K1461.
  - `.map-participants__title` — removed `text-transform: uppercase` (Figma style_SN82CU has no textCase). Added `line-height: var(--line-height-tight)`.
  - Added `.map-organizer-list` — row, center, gap 12px. Matches layout_LWBA26.
  - Added `.map-organizer-card` — column, center, gap 8px, width 90px. Matches layout_AFYH3J.
  - Added `.map-organizer-avatar` — 60×60px circle, white bg. Matches layout_D4ZACG.
  - Added `.map-organizer-name` — Manrope Medium 500, 12px, center, width 80px. Matches Mobile/Body/body-question mobile.
  - Removed: `.map-participants__section`, `.map-participants__header`, `.map-participants__count`, `.map-member`, `.map-member__avatar`, `.map-member__name`, `.map-show-more`, `.map-unregistered`.

### Added
- `assets/images/map/avatar-7f544a.png` — Команда Toloka Lviv avatar (Figma imageRef `7f544af9…`, 439×440 @2×).
- `assets/images/map/avatar-8727ea.png` — Маргарита Височинська avatar (Figma imageRef `8727ea78…`, 1152×2048 @2×).
- `assets/images/map/avatar-e4c3bb.png` — Кіра Бойко avatar (Figma imageRef `e4c3bbbe…`, 1080×1350 @2×).

---

## 2026-05-26 — Event Header updated to Figma node 1669:13541

### Changed
- `index.html`: Badge 1 (Заплановано) — icon changed from `icon-calendar.svg` (16×16) to `icon-alarm.svg` (18×18), matching Figma Alarm component `1156:25620`.
- `index.html`: Badge 2 — Hashtag icon (`icon-hashtag.svg`, 14×14) added before text; text changed from `#1328` → `1328` (the `#` is now the icon, matching Figma Hashtag component `1190:11183`).
- `index.html`: Action buttons — replaced two-button row ("прийнято" + "Мінуснутися") with a single full-width `btn--accepted` button labelled "толочити". Matches Figma Buttons Container `1669:13552` (single State-layer child, `sizing: fill`).
- `components/map-screen.css`: `.btn--accepted` — `flex: 1` replaced with `width: 100%` (sole button, no partner); comment + Figma node reference updated to `1669:13553`.
- `components/map-screen.css`: `.btn--decline` and `.btn--decline img/svg` rules removed (button no longer present in this screen state).

### Added
- `assets/images/icons/icon-alarm.svg` — Alarm clock icon, 18×18 viewBox, Phosphor Regular stroke style, `currentColor`. For "Заплановано" badge (Figma component `1156:25620`).
- `assets/images/icons/icon-hashtag.svg` — Hashtag icon, 14×14 viewBox, Phosphor Regular stroke style, `currentColor`. For "#1328" badge (Figma component `1190:11183`).

---

## 2026-05-26 — Info Block updated to Figma node 1102:14316

### Changed
- `components/map-screen.css`: `.map-info-block` — gap `12px → 20px` (`--space-5`), added `padding: var(--space-5) 0` (20px 0), added `align-items: stretch`. Matches Figma layout_BFDEI8.
- `components/map-screen.css`: `.map-info-row` — `align-items: flex-start → center`. Matches Figma layout_38HSGR. Removed `margin-top` optical tweak (no longer needed with center alignment).
- `components/map-screen.css`: `.map-info-row img, .map-info-row svg` — size `1.25rem → 1.5rem` (20px → 24px). Matches Figma layout_N9R1EV (24×24px icon slots).
- `index.html`: `width`/`height` attrs on the three location/date/duration info-row icons updated `20 → 24` to match the new CSS size.
- `index.html`: Hourglass row text — `3–4 години` (en dash) → `3-4 години` (hyphen) to match Figma verbatim copy.

---

## 2026-05-26 — Hourglass icon: fill color updated to Foreground-icon-tertiary token

### Changed
- `assets/images/icons/icon-hourglass.svg`: `fill` changed from `#0E0F10` to `var(--Foreground-icon-tertiary, #A978FF)` (purple-primary, Figma token `--Foreground-icon-tertiary`). Note: the SVG is loaded via `<img>`, so the CSS custom property falls back to `#A978FF` unconditionally; the token becomes live only if the icon is later inlined.

---

## 2026-05-25 — LocationBlock Hourglass icon (node 1156:25644)

### Fixed
- `assets/images/icons/icon-hourglass.svg`: SVG content corrected to the Figma-exported path from component definition node `1156:25644` (32×32 viewBox, single `<path>` with `fill="#0E0F10"`, hourglass silhouette — top/bottom rectangular halves joined at a centre pinch, sand cone in lower half). Replaces the initial hand-drawn stroke-based approximation.
- `index.html`: Duration row in the map screen description block — `<img>` src changed from `icon-arrow.svg` to `icon-hourglass.svg`. Figma node reference comment updated to reflect the component definition (`1156:25644`) rather than the instance (`1102:14319`).

---

## 2026-05-25 — Map toolbar dropdown: CalendarBlank icon + open state

### Fixed
- `index.html` (map screen toolbar): Right button (Figma node 1593:14332) icon corrected from `icon-filter.svg` to inline CalendarBlank SVG. `aria-label` updated to "Фільтр за датою".

### Added
- `index.html`: District dropdown panel `#map-dropdown` added below the toolbar row. Contains three options (Личаківський р-н, Залізничний р-н, Сихівський р-н) with `data-label` attrs and a decorative scrollbar. Toolbar wrapped in `.map-toolbar-wrap` (column, centered) to match Figma Container layout_OWLZAF.
- `components/map-screen.css`: `.map-toolbar-wrap` (absolute container, column, gap 8px), `.map-dropdown` / `.map-dropdown--open` (178px panel, white, border, radius 20px, `--shadow-dropdown`), `.map-dropdown__list` / `.map-dropdown__option` / `.map-dropdown__scrollbar` (Manrope Medium 12px `--color-false-black`, 4×40px scrollbar). `.map-toolbar__dropdown[aria-expanded="true"]` pressed-state overlay.
- `js/transition.js`: District dropdown toggle logic — click button to open/close; click option to select district and update `#map-district-label`; click outside `.map-toolbar-wrap` to close; Escape key to close.
- `css/tokens.css`: Added `--color-false-black: #404040` (Figma "False Black") and `--shadow-dropdown: 0px 4px 8px 0px rgba(0,0,0,0.15)` (Figma effect_55OAJH).

---

## 2026-05-25 — Map screen slide transition

### Added
- `components/map-screen.css`: Full-screen overlay component for the "Мапа толок (вибрана толока) 375" screen (Figma node 1092:14419). Includes overlay positioning, `translateX(100% → 0)` slide-in animation class `.map-screen--open`, map content area (425px), filter toolbar overlay, event info panel, participants section, requirements checklist, and photo actions section.
- `js/transition.js`: Click-handler for `#btn-join` → adds/removes `.map-screen--open` on `#screen-map`. Also wires up close button (`#btn-map-close`) and Escape key. Locks main-page scroll while overlay is open; restores focus on close.
- `assets/images/map/map-content-5ef8bd.png`: Figma export of aerial park map image (node `1256:15224`, cropped, 635×330 @2×).
- `assets/images/map/event-photo-b6a466.png`: Figma export of event detail park photo (node `1256:15222`, cropped, 459×325 @2×).
- Map screen HTML block in `index.html` (after footer): full `#screen-map` overlay with sticky header (back button replaces burger), map image, filter toolbar, event info panel, participants list, requirements checklist, photo actions, and footer.
- `css/tokens.css`: Added `--color-purple-vivid: #8A38F5` (map screen badge text / links, Figma `fill_X9Q04B`) and `--color-divider: rgba(0,0,0,0.2)` (section divider lines, Figma `fill_NRFYQX`).

### Changed
- `index.html`: Added `id="btn-join"` to the event card "доєднатися" `<a>` (line 281). Added `<link>` for `map-screen.css` and `<script>` for `transition.js`.

---

## 2026-05-25 — Event Card updated to Figma component 1669-13276

### Changed
- `assets/images/events/event-card-park-2-67185b.png`: New cropped image downloaded from Figma node `1669:13251` (imageRef `3bcb7a1f4846ccd7803f320b1c332e23488b651f`, crop transform x-offset 8.98% / x-scale 80.8%, exported 647×1072 @2×). Replaces the old 407px wide image that relied on overflow clipping.
- `index.html`: Event card updated to component `1669:13276` — background `<img>` src changed to `event-card-park-2-67185b.png` with `width="335"` (was `407`); date badge text `07.06` → `16.05`; members badge text `14/15` → `6/7`; `aria-label` date updated to match.
- `components/events.css`: `.event-card__bg img` — removed `position: absolute; left: 0; top: 0; width: var(--event-card-img-width)` overflow approach; replaced with `width: 100%; height: 100%; object-fit: cover` since the pre-cropped image fills the card exactly. Removed `overflow: hidden` and `box-shadow` from `.event-card__bg` (no longer needed).
- `css/tokens.css`: Removed `--event-card-img-width: 25.4375rem` token (407px image width no longer used).

---

## 2026-05-25 — Footer rebuilt to Figma node 1593-16574

### Changed
- `index.html`: Restructured `<footer>` entirely to match Figma node `1593:16574`.
  - **Footer Nav**: `align-items` updated to `center` (was `flex-start`). Nav links updated to 5 items in new order — Головна, Про нас, Мапа толок, Комʼюніті, Особистий кабінет (was 4 items; renamed "Карта толок" → "Мапа толок", added "Комʼюніті"). Logo brand now logo-only (social icons removed from this column).
  - **Footer Bottom**: Converted from flat row with separator spans to a `column` layout. Social icon buttons (Telegram, Instagram, WhatsApp) moved here as 40×40px circular buttons (`footer-social`). Legal section (`footer-legal`) is now a centred column: legal links row (`footer-legal__links`, gap 14px) containing "Terms of Service" + "Privacy Policy" (previously Ukrainian), and copyright span below. Separator `·` spans removed.
- `components/footer.css`: Full rewrite to match new structure.
  - `.site-footer` gap: `40px` → `20px`.
  - `.footer-nav` `align-items`: `flex-start` → `center`.
  - `.footer-links__link`: font `12px` → `14px` (label-sm); added `padding: 4px 16px`, `border-radius: 32px`, hover via `--Action-quantery-black-hover`.
  - `.footer-brand`: removed social icons sub-section.
  - `.footer-bottom`: `flex-direction` `row` → `column`; `gap` `4px` → `20px`; `align-items: center`.
  - `.footer-social__link`: `32×32px` → `40×40px` circle; hover via `--Action-quantery-black-hover`.
  - Added `.footer-legal` (column, centred, gap 4px) and `.footer-legal__links` (row, gap 14px).
  - `.footer-bottom__item`: added `padding: 4px 16px`, `border-radius: 32px`, hover via `--Action-quantery-black-hover`; removed opacity-based hover and separator styles.

---

## 2026-05-25 — Align state-layer tokens with Figma variable panel naming

### Changed
- `css/tokens.css`: Added three Figma-named tokens mirroring the `Action/quantery/black/<state>` variable path from the Figma design panel — `--Action-quantery-black-hover: rgba(13, 14, 15, 0.10)`, `--Action-quantery-black-pressed: rgba(13, 14, 15, 0.20)`, `--Action-quantery-black-focused: rgba(13, 14, 15, 0.05)`. Converted `--state-hover`, `--state-pressed`, `--state-focused` to semantic aliases pointing at these canonical tokens so existing component CSS continues to work unchanged.
- `components/header.css`: Updated `.btn--outline` state rules to reference the canonical Figma token names with the original rgba values as CSS fallbacks — `var(--Action-quantery-black-hover, rgba(13, 14, 15, 0.10))`, `var(--Action-quantery-black-pressed, ...)`, `var(--Action-quantery-black-focused, ...)`.

---

## 2026-05-25 — Events toolbar buttons updated to Figma State-layer components (1579-14699 / 1579-14908)

### Changed
- `css/tokens.css`: Added `--radius-btn-toolbar: 2rem` (32px) token matching Figma component specs for both the icon-only (`1579:14908`) and labeled (`1579:14699`) State-layer buttons.
- `components/events.css`: Updated `.btn--filter`, `.btn--map`, and `.events-dropdown` to use `--radius-btn-toolbar` (32px, was 41px). Corrected all three toolbar icon sizes to `20×20px` (was 16–17px / 14–15px) per Figma `layout_H7UHYO` / `layout_EYVCPG`. Added `text-transform: none` to `.events-dropdown` to match Figma `label-sm` style (no textCase transform). All interactive states (hover `rgba(13,14,15,0.10)`, pressed `rgba(13,14,15,0.20)`, focused `rgba(13,14,15,0.05)`, disabled `#CDD2D4`/`#A9B2B7`) and `150ms ease` transitions are inherited from `.btn--outline` (header.css) which already implements the Figma State-layer system.
- `index.html`: Updated `width`/`height` HTML attributes on all three toolbar icon `<img>` elements from 15–17 → `20`.

---

## 2026-05-25 — Event Card background image updated to event-card-park 2

### Changed
- Replaced `assets/images/events/event-card-park.png` with `assets/images/events/event-card-park-2.png` in the Event Card background (`index.html` line 233).
- New image downloaded from Figma node `I1256:15152;1385:4403;1619:6367` (800×1072 px @2×) matching the design spec for Figma file `eajDjc2uJlOllxC8Vi9eQ3`, node `1256-15152`.

---

## 2026-05-25 — Figma component library: apply State-layer system (node 1075-1557)

### Added
- `css/tokens.css` — 5 new interaction tokens from Figma State-layer component:
  - `--state-hover: rgba(13, 14, 15, 0.10)` — 10% dark tint for hover states
  - `--state-pressed: rgba(13, 14, 15, 0.20)` — 20% dark tint for active/pressed states
  - `--state-focused: rgba(13, 14, 15, 0.05)` — 5% dark tint for keyboard focus states
  - `--color-disabled-bg: #CDD2D4` — disabled button fill
  - `--color-disabled-fg: #A9B2B7` — disabled button label colour
- `components/advantages.css` — `.adv-item--violet-text`: white background with `#A978FF` (purple-primary) text, matching Figma "Type=Text · Color=Violet text" variant that was previously missing.
- `components/cta.css` — `.hobby-tag:hover` state: `rgba(0,0,0,0.20)` overlay, per Figma ComponentId 1045:14716 (State=Hover).

### Changed
- `components/header.css` — `.btn--outline` interaction states updated to match Figma State-layer spec:
  - `:hover` → `var(--state-hover)` (subtle 10% tint; text stays dark — was incorrectly going full-black fill with white text)
  - `:active` → `var(--state-pressed)` (20% tint)
  - `:focus-visible` → `var(--state-focused)` (5% tint) + 2px outline ring
  - `[disabled]` → disabled palette (`--color-disabled-bg/fg`), `cursor: not-allowed`
- `components/faq.css` — `.faq-item__answer` text style corrected to Figma "Mobile/Body/body-question":
  - `font-size`: `var(--text-sm)` (14 px) → `var(--text-xs)` (12 px)
  - `font-weight`: `var(--font-weight-regular)` (400) → `var(--font-weight-medium)` (500)
- `components/faq.css` — `.faq-cta__btn` interaction states updated to match Figma State-layer spec (same pattern as `.btn--outline` above):
  - `:hover` → `var(--state-hover)` (was full-black fill with white text)
  - `:active`, `:focus-visible`, `[disabled]` states added

---

## 2026-05-25 — js/main.js: HiDPI canvas DPR fix

### Added
- `js/main.js` — `setupCanvas(canvas)` utility:
  - Reads `window.devicePixelRatio` (defaults to `1` on non-HiDPI screens).
  - Sets the canvas backing-store to `cssSize × dpr` (physical pixels) so each logical pixel maps to the correct number of screen pixels.
  - Locks `canvas.style.width/height` to the original CSS size so layout is unaffected.
  - Pre-scales the returned `CanvasRenderingContext2D` by `dpr`, meaning all draw calls (including `lineWidth`) use logical CSS-pixel coordinates — a stroke drawn at `1.5` renders at the correct visual thickness on every screen density.
- `js/main.js` — `applyDPRToAll()`: calls `setupCanvas` on every `<canvas>` in the document; exported for use by component modules.
- `js/main.js` — `watchDPRChange()`: registers a `matchMedia` listener for `(resolution: <current>dppx)` that re-runs `applyDPRToAll` and re-registers itself whenever the user moves the browser window to a screen with a different DPR (e.g. Retina laptop → external 1× monitor).
- Both `setupCanvas` and `applyDPRToAll` are exported as ES module exports for import by future component scripts.

### Changed
- `js/main.js` — `DOMContentLoaded` now calls `applyDPRToAll` instead of only logging. The console message now includes the detected DPR value.

---

## 2026-05-25 — FAQ CTA button: match Figma node 1593:13772

### Changed
- `components/faq.css` — `.faq-cta__btn` updated to match Figma "State-layer / state=enable / size=medium" (node 1593:13772):
  - `border-radius`: `var(--radius-pill)` (100 px) → `var(--radius-btn-event)` (32 px)
  - `font-size`: `var(--text-sm)` (14 px) → `var(--text-base)` (16 px — matches `Desktop/Label/label-md`)
  - `line-height`: added `var(--line-height-label)` (1 = 100% — matches Figma text style)
  - `gap`: added `var(--space-2)` (8 px — matches Figma layout gap)
  - Padding, border, font-weight, and colour were already correct.

---

## 2026-05-25 — Event Card: replace background photo

### Changed
- `assets/images/events/event-card-park.png` — New background photo for the event card: Stryisky Park rotunda surrounded by green trees (supplied by user, 1 MB). Replaces `event-card-main.png`.
- `index.html` — Event card `<img>` src updated: `event-card-main.png` → `event-card-park.png`.

---

## 2026-05-25 — Event Card: update content to reflect upcoming event

### Changed
- `index.html` — Event card date badge: `16.05` → `07.06` (May 16 was already 9 days in the past; June 7 is an upcoming Sunday ~2 weeks from today, consistent with the "Найближчі толоки" section heading).
- `index.html` — Event card members badge: `6/7` → `14/15` (keeps the near-full urgency appropriate for the "Гаряча толока" status badge, with a more realistic group size for a park cleanup event).
- `index.html` — Article `aria-label` updated to include the date (`07.06`) for better screen-reader context.

---

## 2026-05-25 — Fix 8 issues found in full visual review

### Fixed
- `components/cta.css` — `.cta-tags` was rendered behind `.cta-banner` (same stacking context, later DOM sibling wins). Added `z-index: var(--z-raised)` to `.cta-tags` so the floating hobby tags now appear above the banner. *(Bug 1 — tags invisible)*
- `index.html` — FAQ item Q3 was a word-for-word duplicate of Q1 ("Що таке еко-толока…"). Replaced with a unique question: "Скільки часу зазвичай триває одна еко-толока?" with a matching answer about typical event duration. *(Bug 2 — duplicate FAQ)*
- `components/about.css` — Removed the `.about-text + .about-text { margin-top: var(--space-5) }` rule. The `.about-project` flex container already provides 24 px gap between all children; the extra `margin-top: 20px` on the second paragraph was doubling the gap to 44 px. *(Bug 3 — double paragraph spacing)*
- `components/events.css` — Added `scroll-margin-top: var(--header-height)` (88 px) to `.events` so the section title isn't hidden behind the sticky header when navigating via `href="#events"`. *(Bug 4 — sticky header overlap)*

### Changed
- `components/events.css` — Applied the long-defined `--gradient-card-overlay` token to `.event-card__bg::after` (absolute, `inset: 0`, `z-index: 1`). The gradient darkens the top and bottom of the event card image, improving text-badge contrast. The token was previously defined but never used. *(Issue 6 — dead token)*
- `css/tokens.css` — Fixed `--line-height-card`: was `1.125rem` (absolute unit, unusual for line-height); corrected to `1.125` (unitless ratio, scales with font-size). *(Issue 7 — absolute rem on line-height)*
- `index.html` — Added `<meta name="description">` with Ukrainian page description for SEO and link previews. *(Issue 8 — missing meta)*

### Refactor
- `css/tokens.css` — Added three new tokens to eliminate raw values in component files:
  - `--space-1-5: 0.375rem` (6 px — badge gap, rating gap)
  - `--radius-pagination: 1.1875rem` (19 px — pagination dot border-radius)
  - `--line-height-snug: 1.25` (125 % — between tight and normal; used for location text)
  - `--header-height: 5.5rem` (88 px — sticky header total height for scroll offsets)
- `components/events.css` — Replaced three raw values with tokens: `gap: 0.375rem` → `var(--space-1-5)`; `line-height: 1.25rem` → `var(--line-height-snug)`; `border-radius: 1.1875rem` → `var(--radius-pagination)`. *(Issue 5)*
- `components/reviews.css` — Replaced two raw values with tokens: `gap: 0.375rem` → `var(--space-1-5)`; `border-radius: 1.1875rem` → `var(--radius-pagination)`. *(Issue 5)*

---

## 2026-05-25 — CTA banner: fix hobby-tags layer structure (Figma node 1261:4811)

### Changed
- `index.html` — Moved `<div class="cta-tags">` from inside `.cta-banner` to be a direct sibling (child of `<section class="cta">`). In Figma the "Promo container" (node 1268:4691) is a sibling of the "Banner" frame, not a child of it. Previously the tags were nested inside `.cta-banner` which has `overflow: hidden`, clipping the absolutely-positioned tags at the banner edges.
- `components/cta.css`:
  - `.cta` — added `position: relative` so `.cta-tags` (absolute, `top: 3.722rem`) is anchored to the section frame rather than the nearest positioned ancestor.
  - `.cta-heading-row` — added `width: 100%` (matches Figma `alignSelf: stretch`).

---

## 2026-05-25 — CTA button: replace full-button SVG with clean arrow icon (node 1593:14122)

### Added
- `assets/images/icons/icon-arrow-right.svg` — New arrow-only icon (28×28, `viewBox="16 16 28 28"` crops the path to the 21×17.5px arrow centred in a 28×28 box — matches Figma ArrowRight node 1156:23883). No circle, no shadow — those come from `.cta-icon-btn` CSS.

### Changed
- `index.html` — CTA button `<img>` src: `icon-arrow.svg` → `icon-arrow-right.svg`. Removes the double-rendered circle and shadow that were baked into the old SVG (node 1261:4821).

---

## 2026-05-25 — CTA banner: match Figma node 1261:4811

### Added
- `assets/images/cta/cta-promo.png` — New full-bleed promo image (Figma node 1611:4951, imageRef `9cc1bb8b…`, 750×494 @ 2×). Replaces the old mockup + 3 doodle collage.
- `css/tokens.css` — Added `--size-cta-icon-btn: 3.5rem` (56px).

### Changed
- `components/cta.css`:
  - Replaced `.cta-promo__mockup` / `.cta-promo__doodle*` rules with a single full-bleed image rule. `.cta-promo` now uses `width: calc(100% + 2 × 20px)` + negative `margin-inline` to bleed past the banner's 20px side padding to fill 375px.
  - `.cta-icon-btn` — size 48px → 56px (`--size-cta-icon-btn`); `border-radius` 100px → 32px (`--radius-btn-event`); `box-shadow` updated to `0px 3px 4px rgba(0,0,0,.25)`; icon size 20px → 28px.
- `index.html` — Replaced promo image cluster (4 imgs) with single `<img src="cta-promo.png">`; icon button `width`/`height` attrs 20 → 28.

---

## 2026-05-25 — Reviews title: centre-align to match Figma node 1261:4780

### Changed
- `components/reviews.css` — `.reviews-title`: removed `max-width: 11.875rem` (title now fills parent width per Figma `sizing: fill`); changed `text-align: left` → `center` (Figma `textAlignHorizontal: CENTER`); removed `align-self: flex-start` (parent already centres children).

---

## 2026-05-25 — Event card image: remove left offset (Figma node I1256:15152;1385:4403;1619:6367)

### Changed
- `css/tokens.css` — Removed `--event-card-img-offset` token (−37px offset no longer present in Figma; image is now at x: 0).
- `components/events.css` — `.event-card__bg img`: `left` changed from `var(--event-card-img-offset)` → `0`. Image is now flush with the left edge; the 72px right overflow (407px − 335px) is clipped by `overflow: hidden`.

---

## 2026-05-25 — Event Card: full update to Figma node 1256:15152

### Added
- `assets/images/events/event-card-main.png` — New image downloaded from Figma (imageRef `3bcb7a1f…`, 800×1072 @ 2×, no crop). Replaces `event-card-2e98fc.png`.
- `css/tokens.css` — Three new tokens: `--event-card-img-offset: -2.3125rem` (−37px image left offset), `--event-card-img-width: 25.4375rem` (407px image width), `--radius-btn-event: 2rem` (32px CTA border-radius).

### Changed
- `index.html` — Updated event card `<img>` src to `event-card-main.png` (width attr 407); removed `<div class="event-card__overlay">` (gradient overlay not present in updated Figma node).
- `components/events.css`:
  - `.event-card__bg` — added `overflow: hidden` (clips 407px image to 335px card); added `box-shadow: var(--shadow-image)` (moved from removed overlay); removed old gradient overlay rule.
  - `.event-card__bg img` — now `position: absolute; left: var(--event-card-img-offset); width: var(--event-card-img-width); height: 100%`; removed `filter: blur(10px)` (no blur in updated Figma); `object-fit: cover`.
  - `.event-card__info .btn--primary` — added `border-radius: var(--radius-btn-event)` (32px, was 100px pill).

---

## 2026-05-25 — Event card ImageContainer: match Figma node 1611:4957

### Changed
- `assets/images/events/event-card-2e98fc.png` — New file. Downloaded from Figma node 1611:4919 (image rect inside event-card-park) with crop transform suffix `2e98fc`, 924×1241px at 2×. Replaces generic `event-card.png`.
- `index.html` — Updated event card `<img>` src to `event-card-2e98fc.png`.
- `components/events.css` — `.event-card__bg`: added `background-color: var(--color-black)` (matches outer frame fill `#000000`). `.event-card__bg img`: changed `object-fit: cover` → `fill` (Figma scaleMode STRETCH); removed `transform: scale(1.05)`.

---

## 2026-05-25 — Partners section: title centred to match Figma node 1261:4745

### Changed
- `components/partners.css` — `.partners-title`: removed `align-self: flex-start` (was left-aligning the title); added `text-align: center` to match Figma `textAlignHorizontal: CENTER`.

---

## 2026-05-25 — Event card overlay: gradient stops + blend modes

### Changed
- `css/tokens.css` — Updated `--gradient-card-overlay` third stop from `60%` → `59.62%`; opaque stops now use `#737373` shorthand (matches Figma exact values).
- `components/events.css` — Added `background-blend-mode: overlay` and `mix-blend-mode: multiply` to `.event-card__overlay` to match Figma ImageContainer shadow spec.

---

## 2026-05-25 — Header primary button: match Figma node 1510:13645

### Changed
- `components/header.css` — Added `.header-nav .btn--primary` scoped override to match the header-specific "button primary" component. Changes vs the global `.btn--primary`: `font-size` 14px → 12px (`--text-xs`), `padding` 10px 20px → 8px 16px (`--space-2 --space-4`), `border-radius` 100px → 24px (`--radius-advantage`), `border` removed (Figma has no stroke), `gap: var(--space-2)` (8px) added. Global `.btn--primary` unchanged so hero CTA and event buttons are unaffected.

---

## 2026-05-25 — Header burger menu button: match Figma node 1510:13629

### Changed
- `css/tokens.css` — Added `--size-btn-burger: 1.75rem` (28px fixed height for the burger menu button).
- `components/header.css` — Updated `.btn--menu`:
  - Removed `aspect-ratio: 1/1` (was a square; now pill-shaped).
  - `padding` changed from `8px` all sides → `var(--space-1) var(--space-3)` (4px 12px).
  - Added `height: var(--size-btn-burger)` (28px fixed).
  - Added `border-radius: var(--radius-btn-map)` (41px — same oval family as filter/map/dropdown buttons).
  - Added `gap: var(--space-2)` (8px).
  - Added explicit `width: 1.25rem; height: 1.25rem` (20×20px) to the inner SVG icon.

---

## 2026-05-25 — Hero mosaic: replace CSS grid with single composite image

### Changed
- `assets/images/hero/hero-mosaic.png` — New file. Downloaded from Figma node 1519:5257 (the updated "hero container" RECTANGLE, 866×867px source). Replaces the former four-cell CSS layout.
- `index.html` — Replaced the `.hero-mosaic` `<div>` (four child cells: photo, badge, green, main) with a single `<img class="hero-mosaic">` pointing to `hero-mosaic.png`. The badge "рух змін" text is now baked into the image.
- `components/hero.css` — Removed all `.hero-mosaic__cell`, `.hero-mosaic__cell--photo/badge/green/main`, and `.hero-badge` rules (no longer rendered in HTML). Replaced with a single `.hero-mosaic` rule: `display:block; width:100%; aspect-ratio:1/1; object-fit:cover`.

---

## 2026-05-25 — Hero container: remove manual rotations, pure Figma layout

### Changed
- `components/hero.css`:
  - `.hero-mosaic__cell--photo` — Removed `transform: rotate(-90deg)`. Now matches Figma layout_CFWBHC exactly: column · stretch · gap 10px, no rotation.
  - `.hero-mosaic__cell--badge` — Removed `transform: rotate(90deg)`. Figma layout_QGCJZO specifies no rotation; the shape is achieved purely by border-radius (98.866px 98.866px 0 98.866px) + column · flex-end · center · padding 20px 0 17px 104px.
  - `.hero-badge` — Removed `transform: rotate(-90deg)`. Now a plain flex child: `width: 74px`, `text-align: left`, typography unchanged. Positioned by parent padding.

---

## 2026-05-24 — Hero container: full update to Figma node 1261:5258

### Changed
- `assets/images/hero/hero-photo-1a5565.png` — Re-downloaded top-left cell photo with correct Figma crop transform (imageRef 25bd9ae7…, suffix 1a5565, 429×429px). Replaces hero-photo-6a1065.png.
- `assets/images/hero/hero-main-6715ac.png` — Re-downloaded bottom-right cell photo with correct Figma crop transform (imageRef cbdba137…, suffix 6715ac, 467×467px). Replaces hero-main.png.
- `index.html` — Updated both hero img src attributes to the new filenames.
- `components/hero.css`:
  - `.hero-mosaic__cell--photo` — Added `flex-direction: column`, changed `align-items: center` → `stretch`, added `gap: var(--space-2-5)` (10px). Matches layout_OGFZBS.
  - `.hero-mosaic__cell--badge` — Added `flex-direction: column`, `justify-content: flex-end`, `align-items: center`, `gap: var(--space-2-5)` (10px), `padding: var(--space-5) 0 var(--hero-badge-pad-bottom) var(--hero-badge-pad-left)` (20px 0 17px 104px), `overflow: visible`. Subtitle now positioned by flex layout (not absolute). Matches layout_BM2BGD.
  - `.hero-badge` — Removed `position: absolute`, `left`, `bottom`. Added `flex-shrink: 0`. Now a regular flex child of the badge cell; padding on parent controls placement.
- `css/tokens.css` — Replaced old badge-pad tokens (`--hero-badge-pad-top: 4.625rem`, `--hero-badge-pad-side: 1.21875rem`, `--hero-badge-pad-left: 7.125rem`) with Figma-exact values: `--hero-badge-pad-bottom: 1.0625rem` (17px), `--hero-badge-pad-left: 6.5rem` (104px). Top padding reuses `--space-5` (20px).

---

## 2026-05-24 — District Dropdown: updated to Figma component 1502:14098

### Changed
- `assets/images/icons/icon-dropdown.svg` — Downloaded custom "icon drop down" (node 1502:14428): double up-down chevron, fill #0D0E0F, viewBox 0 0 15 15.
- `index.html` — Dropdown button: icon `icon-caret-down.svg` (20×20) → `icon-dropdown.svg` (15×15).
- `components/events.css` — `.events-dropdown` updated: height 48px → `var(--size-btn-small)` (36px); added `border-radius: var(--radius-btn-map)` (41px) to match toolbar siblings; icon size → `var(--size-icon-dropdown)` (14.38px); added explicit `line-height` and `color` from Figma text style "Desktop/Label/label-sm". Source: Figma node 1502:14098.
- `css/tokens.css` — Added `--size-icon-dropdown: 0.899rem` (14.38px) to Component Sizes block.

---

## 2026-05-24 — Filter Button: updated to Figma component 1502:14406

### Changed
- `assets/images/icons/icon-filter-btn.svg` — Downloaded custom "icon" filter component (node 1502:14385): funnel path, fill #0D0E0F, viewBox 0 0 17 16. Replaces generic `icon-filter.svg`.
- `index.html` — Filter button: class `btn--icon` → `btn--filter`; icon `icon-filter.svg` (20×20) → `icon-filter-btn.svg` (17×16).
- `components/events.css` — Combined `.btn--map` and new `.btn--filter` into a single shared selector block (both have identical Figma specs: 36px height, 41px radius, 8/16px padding). Source: Figma node 1502:14406.

---

## 2026-05-24 — Map View Button: updated to Figma component 1502:14107

### Changed
- `assets/images/icons/icon-map-btn.svg` — Downloaded custom "icon map" component (node 1502:14386): folded-map path, fill #0D0E0F, viewBox 0 0 17 16.
- `index.html` — Map View button: icon switched from `icon-map.svg` (20×20) to `icon-map-btn.svg` (17×16).
- `components/events.css` — `.btn--map` updated: `border-radius` changed from inherited `--radius-pill` (100px) to `var(--radius-btn-map)` (41px); icon dimensions updated to `var(--size-icon-map-w)` × `var(--size-icon-map-h)`. Source: Figma node 1502:14107.
- `css/tokens.css` — Added `--radius-btn-map: 2.5625rem` (41px) to Border Radius block; added `--size-icon-map-w: 1.055rem` (16.88px) and `--size-icon-map-h: 0.976rem` (15.62px) to Component Sizes block.

---

## 2026-05-24 — Map View Button: circle → oval pill (Figma node 753:4712)

### Changed
- `index.html` — Map View button in Events toolbar: replaced `btn--icon` with `btn--map` modifier.
- `components/events.css` — Added `.btn--map` rule: `height: var(--size-btn-small)` (36px), `padding: 8px 16px`, `gap: 8px`, `width: auto` (hug). Border-radius 100px and 1.5px stroke come from the inherited `.btn--outline`. Produces an oval/pill silhouette matching Figma component "Button-outline / Type=Round / Size=Small / State=Enabled" (node 753:4712). Updated `.btn--icon` width/height to use `var(--size-icon-btn)` token.
- `css/tokens.css` — Added `--size-btn-small: 2.25rem` (36px) to Component Sizes block.

---

## 2026-05-24 — Figma component icons + CTA circle button

### Added
- `assets/images/icons/icon-telegram.svg` — Re-downloaded from Figma node 810:6939 (Platform=Telegram, Color=Negative — white icon on transparent). Replaces placeholder.
- `assets/images/icons/icon-instagram.svg` — Re-downloaded from Figma node 810:6975 (Platform=Instagram, Color=Negative). Replaces placeholder.
- `assets/images/icons/icon-whatsapp.svg` — Re-downloaded from Figma node 810:6953 (Platform=WhatsApp, Color=Negative). Replaces placeholder.
- `assets/images/icons/icon-arrow-cta.svg` — Downloaded from Figma node 949:12085 (Vector arrow inside CTA button component, 47×36 → right-pointing arrow, stroke #0D0E0F).
- `css/tokens.css` — Added `--size-btn-circle: 6.375rem` (102px, CTA circle button node 949:12087) and `--size-icon-btn: 3rem` (48px, outline icon button node 1299:11749) under a new "Component Sizes" block.
- `components/header.css` — Added `.btn--circle` modifier: 102×102px transparent circle with 2px dark (#0D0E0F) border, 10px padding, hover fills dark. Usage: `<a class="btn btn--circle"><img src="icon-arrow-cta.svg" …></a>`. Source: Figma node 949:12087.

### Changed
- `components/about.css` — `.about-icon-btn` width/height now reference `var(--size-icon-btn)` instead of raw `3rem`, satisfying token discipline.

---

## 2026-05-24 — Hero main cell: revert inner image to square (remove explicit dimensions)

### Reverted
- `components/hero.css` — Removed `.hero-mosaic__cell--main img` override (`width: 265.605px; height: 472.027px; aspect-ratio: 175/311`). The base rule `.hero-mosaic__cell img` (`width: 100%; height: 100%; object-fit: cover`) now applies, filling the square cell.

---

## 2026-05-24 — Hero main cell: inner image frame dimensions 265.605×472.027px

### Changed
- `css/tokens.css` — Added `--hero-main-img-width: 16.6003rem` (265.605px) and `--hero-main-img-height: 29.5017rem` (472.027px) matching Figma node 1261:5256 (Hero secondary image) exact dimensions.
- `components/hero.css` — Added `.hero-mosaic__cell--main img` rule overriding the base `width/height: 100%` with `width: var(--hero-main-img-width)`, `height: var(--hero-main-img-height)`, and `aspect-ratio: 175 / 311`. The image is larger than the 167.5×167.5 cell; excess is clipped by the existing `overflow: hidden` on the cell.

---

## 2026-05-24 — Hero subtitle: absolute position 19.5px from left & bottom of badge frame

### Changed
- `components/hero.css` — `.hero-badge` switched from flex-child to `position: absolute` within the badge cell (which already has `position: relative` from the base rule). `left: var(--hero-badge-pad-side)` and `bottom: var(--hero-badge-pad-side)` place it exactly 19.5px from the left edge and 19.5px from the bottom edge of the badge frame, matching Figma node 1368:12488 coordinates (x=19.5, y=114 → bottom distance = 167.5 − 114 − 34 = 19.5px). Removed `flex-shrink: 0` (not applicable to absolutely positioned elements).
- `components/hero.css` — `.hero-mosaic__cell--badge` padding removed (`74px 19.5px 19.5px 114px` was only used for flex-based positioning, now superseded by absolute positioning on the subtitle). `justify-content` and `align-items` also removed as they no longer affect any child.

---

## 2026-05-24 — Hero subtitle: width, -90deg rotation, flex-shrink, exact typography

### Changed
- `css/tokens.css` — Added `--hero-subtitle-width: 4.625rem` (74px — Figma node 1368:12488 text width).
- `components/hero.css` — Replaced `.hero-badge` rule with properties from Figma inspect:
  - `width: var(--hero-subtitle-width)` (74px) — replaces `width: min-content`
  - `transform: rotate(-90deg)` — text counter-rotates to cancel the parent's `rotate(90deg)`
  - `flex-shrink: 0` — prevents text from compressing inside the flex badge cell
  - `color: var(--color-white)` (#FFF)
  - `font-family: var(--font-heading)` (Unbounded)
  - `font-size: var(--text-sm)` (14px)
  - `font-style: normal`
  - `font-weight: var(--font-weight-medium)` (500)
  - `line-height: normal` — replaces `var(--line-height-tight)`
  - `text-transform: uppercase`

---

## 2026-05-24 — Hero badge cell: flex layout, 90deg rotation, Figma padding & border-radius

### Changed
- `css/tokens.css` — Added `--radius-hero-badge: 6.179rem` (98.866px — Figma node 1261:5255 exact borderRadius). Added three hero-badge padding tokens: `--hero-badge-pad-top: 4.625rem` (74px), `--hero-badge-pad-side: 1.21875rem` (19.5px), `--hero-badge-pad-left: 7.125rem` (114px).
- `components/hero.css` — Updated `.hero-mosaic__cell--badge` with all properties from Figma inspect:
  - `display: flex` · `justify-content: flex-end` · `align-items: center` (layout)
  - `transform: rotate(90deg)` (cell + content rotated 90° clockwise)
  - `padding: var(--hero-badge-pad-top) var(--hero-badge-pad-side) var(--hero-badge-pad-side) var(--hero-badge-pad-left)` → `74px 19.5px 19.5px 114px`
  - `border-radius: var(--radius-hero-badge) var(--radius-hero-badge) 0 var(--radius-hero-badge)` → `98.866px 98.866px 0 98.866px`
  - `background: var(--color-purple-dark)` → `#7A2EEF`
  - Removed old `align-items: flex-end` and `padding: var(--space-5)` (replaced by above)

---

## 2026-05-24 — Hero photo cell: flex layout, -90deg rotation, Figma border-radius

### Changed
- `css/tokens.css` — Added `--radius-hero-photo: 7.7293rem` (≈ 123.668px), the exact Figma `borderRadius` value for the top-left hero cell top-right corner (node 1256:15123).
- `components/hero.css` — Updated `.hero-mosaic__cell--photo` with all five properties from Figma inspect:
  - `display: flex` — cell is now a flex container
  - `align-items: center` — content centred on the cross-axis
  - `transform: rotate(-90deg)` — cell and its image rotated 90° counter-clockwise
  - `border-radius: 0 var(--radius-hero-photo) 0 0` — top-right corner only (123.668px), matching Figma `borderRadius: 0 123.67px 0 0`
  - `background: var(--color-white)` — white fill (#FFF)

---

## 2026-05-24 — Hero container: flex layout, correct radii, re-downloaded images

### Fixed
- `components/hero.css` — Replaced `display:grid` with `display:flex; flex-direction:row; flex-wrap:wrap; justify-content:space-between; align-items:flex-end` matching Figma `layout_FUJTTU` exactly. CSS Grid `aspect-ratio` on the container was the root cause of oval cells; Flexbox with `width:50%` per cell lets `aspect-ratio:1/1` reliably make each cell square.
- `components/hero.css` — Moved `border-radius:50%` to the **base** `.hero-mosaic__cell` rule so purple and green cells are guaranteed perfect circles. Only the top-left photo cell overrides with `border-radius:0 0 50% 0` (bottom-right corner only, per design brief).
- `components/hero.css` — Bottom-right photo cell inherits `border-radius:50%` from base (full pill/circle shape, per design brief). Removed the previous `0 0 0 pill` partial-radius that created a "D" shape.
- `components/hero.css` — Added `object-position:center` alongside `object-fit:cover` on all cell images to guarantee distortion-free fill.

### Changed
- `assets/images/hero/hero-photo-6a1065.png` — Re-downloaded top-left photo from Figma node `1256:15124` with correct crop transform `[[0.434, 0, 0.208], [0, 0.651, 0.191]]`; result is a 521×521 pre-cropped square (replaces hero-bg.png).
- `assets/images/hero/hero-main.png` — Re-downloaded from Figma node `1256:15132` (imageRef `a552225c…`, FILL/cover mode, 1374×2058).
- `assets/images/hero/hero-secondary.png` — Re-downloaded from Figma node `1261:5256` (imageRef `cbdba137…`, FILL/cover mode, 736×1308).
- `index.html` — Updated top-left hero cell `<img>` src to `hero-photo-6a1065.png`.

---

## 2026-05-24 — Fix hero mosaic: force true circles via cell aspect-ratio

### Fixed
- `components/hero.css` — Removed `aspect-ratio: 1` and `grid-template-rows: 1fr 1fr` from `.hero-mosaic` (grid-container aspect-ratio is unreliable inside a flex column and did not constrain row heights). Moved `aspect-ratio: 1 / 1` onto `.hero-mosaic__cell` instead: the `1fr` column determines the cell's width; `aspect-ratio` sets height = width, guaranteeing a square. Container height auto-sizes around the cells.
- `components/hero.css` — Removed asymmetric `border-radius` overrides from `.hero-mosaic__cell--photo` (`0 pill 0 0`), `.hero-mosaic__cell--badge` (`pill pill 0 pill`), and `.hero-mosaic__cell--main` (`0 0 0 pill`). All four cells now inherit `border-radius: 50%` from the base `.hero-mosaic__cell` rule, producing four equal perfect circles matching the Figma target.

---

## 2026-05-24 — Fix hero section visual discrepancies (5 issues)

### Fixed
- `components/hero.css` — Added `grid-template-rows: 1fr 1fr` to `.hero-mosaic` so both grid rows have equal height. Combined with the existing `aspect-ratio: 1` on the container this forces all four cells to be square, turning the purple and green pill-radius cells into circles instead of tall ovals.
- `components/hero.css` — Added `width: min-content` to `.hero-badge` so "рух змін" wraps onto two lines ("РУХ" / "ЗМІН") matching the Figma target.
- `components/header.css` — Added `.btn--menu` modifier (square icon button: `aspect-ratio: 1/1`, `padding: 8px`, inherits `btn--outline` border) for the hamburger toggle.

### Changed
- `index.html` (header nav) — Replaced the single "Найближчі події" outline button with two items: a filled purple `btn--primary` "Зареєструватися" link and a square `btn--menu btn--outline` hamburger button (inline SVG 3-line icon), matching the Figma header layout.

---

## 2026-05-24 — Build FAQ and Footer sections (page complete)

### Added
- `components/faq.css` — FAQ accordion section. `.faq`: column, `padding 60px 20px`, `20px` gap, max-width `--viewport-mobile`. `.faq-title`: Unbounded Medium 500 24px 120% `−0.04em` letter-spacing. `.faq-image`: full-width, `radius --radius-badge` (20px), `overflow: hidden`. `.faq-list`: column, `8px` gap. `.faq-item` (`<details>`): `1px solid --color-border`, `radius --radius-badge`, `overflow: hidden`. `summary`: flex row, space-between, `20px` padding, Manrope Bold 700 14px 120%; default UA marker removed. `.faq-item__caret` (SVG chevron): 24×24, `transition: transform`, rotates 180° when `[open]`. `.faq-item__answer`: `padding 0 20px 20px`, Manrope Regular 400 14px 150% lh. `.faq-cta`: column, center, `8px` gap; `.faq-cta__text` (14px regular); `.faq-cta__btn` (outline pill, `padding 12px 24px`, `radius --radius-pill`).
- `components/footer.css` — Site footer. `.site-footer`: `background --color-purple-accent` (#9251FB), `padding 40px 20px 60px`, column, `40px` gap, max-width `--viewport-mobile`. `.footer-nav`: row, space-between, align-start. `.footer-links` (column, `4px` gap): `.footer-links__link` (Manrope SemiBold 600 12px, white, 90% opacity). `.footer-brand` (column, align-end, `20px` gap): `.footer-logo` (Unbounded Bold 700 24px, white). `.footer-social` (row, `12px` gap): `.footer-social__link` (32×32, flex center); icon images 24×24. `.footer-bottom`: row, wrap, `4px` gap; `.footer-bottom__item` (Manrope SemiBold 600 12px, white, 70% opacity); `.footer-bottom__sep` (separator dot).
- `assets/images/faq/faq-image.png` — FAQ section illustration (600×600 @2×), Figma node 1261:4866, imageRef `01498796…`.
- `assets/images/icons/icon-telegram.svg` — Telegram social icon, Figma node 1156:24524.
- `assets/images/icons/icon-instagram.svg` — Instagram social icon, Figma node 1156:24513.
- `assets/images/icons/icon-whatsapp.svg` — WhatsApp social icon, Figma node 1156:24557.

### Changed
- `index.html` — added `<section class="faq">` (6 `<details>` accordion items + FAQ image + CTA row) before `</main>`; added `<footer class="site-footer">` (nav links, logo, social icons, legal bottom row) after `</main>`. Linked `components/faq.css` and `components/footer.css` in `<head>`.
- `docs/architecture.md` — updated Directory structure, Features table (added FAQ + Footer rows), and Decisions log (added marquee, FAQ, Figma node ID notes).

---

## 2026-05-24 — Build CTA Banner section component

### Added
- `components/cta.css` — CTA Banner styles. Outer `.cta`: `60px 0` padding. `.cta-banner`: green `--color-accent` bg, `position: relative`, `overflow: hidden`, `40px 20px 140px` padding (extra bottom for floating tags), column, `40px` gap. `.cta-tags`: absolute overlay `375×623px` at `top 3.722rem`; `.hobby-tag` base (Manrope Medium 500 12px, `radius --radius-card` 40px, `4px 10px` padding); `.hobby-tag--default` (transparent bg, dark border/text); `.hobby-tag--pressed` (dark bg, white text); 8 per-tag position classes using `%` coords derived from Figma (x/375, y/623). `.cta-promo`: `257×247px` relative container, `overflow: visible`; 4 absolute children — `.cta-promo__mockup` (317×256px, base layer), `.cta-promo__doodle--1/2/3` (70×63, 91×80, 88×125). `.cta-info`: column, center, `20px` gap, `z-index --z-raised` above tags. `.cta-heading`: Unbounded Medium 500 24px 120% UPPER center. `.cta-icon-btn`: 48px circle, 1.5px border, `--radius-pill`, `box-shadow 2px 2px 4px 0 rgba(0,0,0,0.4)`.
- `assets/images/cta/cta-doodle-1.png` — decorative doodle (736×660 @2×), Figma node 1261:4814, imageRef `2e35ab2c…`.
- `assets/images/cta/cta-mockup.png` — app mockup (4096×2731 @2×), Figma node 1261:4815, imageRef `566f6eaa…`.
- `assets/images/cta/cta-doodle-2.png` — decorative doodle (736×660 @2×), Figma node 1261:4816, imageRef `b68036b1…`.
- `assets/images/cta/cta-doodle-3.png` — decorative doodle (1024×1444 @2×), Figma node 1261:4817, imageRef `8635d670…`.
- `assets/images/icons/icon-arrow.svg` — arrow right icon, Figma node 1261:4821 (CTA icon button).

### Changed
- `index.html` — added `<section class="cta">` after Advantages. 8 floating hobby tags (pressed/default states, verbatim Figma labels). Promo image cluster with mockup + 3 doodles. Heading "долучайся до спільноти та знаходь однодумців" + arrow icon button. Linked `components/cta.css`.

---

## 2026-05-24 — Build Advantages section component

### Added
- `components/advantages.css` — Advantages section with CSS marquee animation. Section: `padding 60px 0`, `overflow: hidden`, column, `40px` gap. Title: Unbounded Regular 400 20px UPPER. Tracks wrapper: column, `10px` gap. Each `.adv-row` clips overflow; `.adv-track` animates via `adv-marquee-ltr` / `adv-marquee-rtl` (`translateX 0 → -50%` for ltr, reversed for rtl) — contains 2 duplicate `.adv-set`s for seamless infinite loop. Per-row durations: 20s/26s/22s/28s/23s/25s. Item styles: `.adv-item` base (`height 50px`, `padding 10px 20px`, `radius --radius-advantage 24px`, Manrope Medium 500 20px); `.adv-item--white` (white bg, dark text), `.adv-item--purple` (`--color-purple-primary`, white text), `.adv-item--violet` (`--color-purple-accent`, white text), `.adv-item--pic` (`50×50`, `radius 24px 24px 0 24px`, white bg). `prefers-reduced-motion` pauses all animations.
- `assets/images/advantages/adv-319.png` — advantage image 319 (490×338 @2×), Figma imageRef `a13f9955d4b82c8248acaccf7502278cc7201499`. Used in rows 1, 3, 4, 5.
- `assets/images/advantages/adv-84.png` — advantage image 84 (872×1088 @2×), Figma imageRef `b043a03a8cb22a7e59e19aba031d8dfa65a00a3b`. Used in row 2.
- `assets/images/advantages/adv-95.png` — advantage image 95 (640×640 @2×), Figma imageRef `f941e73d54ea9656032532a6b7cb387c9bdd99bd`. Used in row 6.

### Changed
- `index.html` — added `<section class="advantages">` after Reviews. 6 marquee rows (rows 1/3/5 ltr, rows 2/4/6 rtl), verbatim Figma labels: Нові знайомства, Спільні цінності, Тімбілдинг, Екосвідомість, Зміна рутини, Круте оточення, Автерпаті, Корисні змагання, Зручний пошук, Командна робота, Реальні зміни, Активний відпочинок, Зелений Львів, Рівні та досягнення, Єднання громади, Чисте місто, Швидка реєстрація, Карта подій, Внесок у спільну справу. Duplicate sets marked `aria-hidden="true"`. Linked `components/advantages.css`.

---

## 2026-05-24 — Build Reviews section component

### Added
- `components/reviews.css` — Reviews section styles. Outer section: `position: relative`, `overflow: hidden`, `60px 0` padding — contains two absolutely-positioned decorative bg images (left: `x≈-92`, bottom; right: `x≈227`, `top≈160px`). Inner `.reviews-inner`: `position: relative`, `z-index: --z-raised`, `40px 20px` padding, `40px` column gap, centered. Section title: Unbounded Regular 400 20px UPPER, max-width 190px. `.review-card`: white bg, `1px` border `--color-border`, `--radius-badge` (20px), `40px 20px` padding, `40px` column gap. Avatar: `60×60` circle, `--radius-avatar` (30px), `--color-red-avatar` bg. Reviewer name: Manrope Bold 700 16px. Details: Manrope Medium 500 14px. Date: Manrope Medium 500 12px, margin-left auto. Review text: Manrope SemiBold 600 14px 120% lh, centered. Pagination: all dots `--color-pagination-inactive`; active `30×8px`, inactive `8×8px`, `radius 19px`, `10px` gap. Gallery: `250px` height, `--radius-badge`, `--color-gray-light` bg.
- `assets/images/reviews/bg-reviews.png` — decorative background image (820×1200 @2×), Figma node 1261:4777, imageRef `5e648243a0847eb03b5ec26e14a95cf3fdbb7479`. Reused for both left and right positions.
- `assets/images/reviews/avatar.png` — reviewer avatar (736×1247 @2×, ellipse crop), Figma node 1261:4784, imageRef `c1c3b161d0229a0204a88e8f45a8e5369f2d5bee`.
- `assets/images/reviews/review-photo.png` — gallery photo (1200×1600 @2×), Figma node 1261:4807, imageRef `7e2a3db90ed02546a59e43a1cc89c607936bfac7`.
- `assets/images/icons/icon-rating.svg` — 5-star rating SVG, Figma node 1261:4791.

### Changed
- `index.html` — added `<section class="reviews">` after Events. Verbatim Figma copy: reviewer "Іванка Волошка", details "Толока №2134 Галицький р.", date "10.05.2026", review body text. Five pagination dots. Photo gallery. Linked `components/reviews.css`.

---

## 2026-05-24 — Build Upcoming Events section component

### Added
- `components/events.css` — Upcoming Events section styles. Section: column, center, `60px 20px` padding, `20px` gap. Header block: column, `20px` gap, title (Unbounded Regular 400 20px UPPER center), toolbar row (space-between). `.btn--icon` 48px circle for filter/map buttons. `.events-dropdown` outline pill with label+icon. Event card: `relative`, `546px` height, `radius 40px`, `20px` padding — bg image layer (`blur(10px)`, `scale(1.05)`), gradient overlay layer (`--gradient-card-overlay`), content layer (z-index 2). Badges: `flex-wrap`, `6px` gap, white pills (`radius 20px`, `4px 10px` padding); `.badge--status` purple (`--color-purple-accent`) variant. Event info: column `24px` gap, `backdrop-filter blur(3.5px)`, title (Manrope Bold 700 24px 120% white), location row (gap 12px, Manrope Bold 700 16px white). Pagination: 5 dots — active `30×8px` `--color-purple-pagination`, inactive `8×8px` `--color-pagination-inactive`, `radius 19px`, `10px` gap.
- `assets/images/events/event-card.png` — event card background photo (1080×1350 @2×), Figma node `I1256:15152;1385:4403;1256:15214`, imageRef `78465e868271cfef3c012a53e2bd794fae82234e`.
- `assets/images/icons/icon-calendar.svg` — CalendarDot icon (16×16), Figma node `I1256:15152;1385:4410`, fill `#9251FB`.
- `assets/images/icons/icon-person.svg` — PersonArmsSpread icon (16×16), Figma node `I1256:15152;1385:4413`.
- `assets/images/icons/icon-star.svg` — Star icon (14×14), Figma node `I1256:15152;1385:4481`.
- `assets/images/icons/icon-map-pin.svg` — location map pin icon (20×24), Figma node `I1256:15152;1385:4421`.
- `assets/images/icons/icon-caret-down.svg` — CaretDoubleDown icon (20×20), Figma node `I1261:4765;753:4715`.
- `assets/images/icons/icon-filter.svg` — Filter/Funnel button icon (52×48 incl. border), Figma node `1261:4764`.
- `assets/images/icons/icon-map.svg` — Map view button icon, Figma node `1261:4766`.

### Changed
- `index.html` — added `<section class="events" id="events">` after Partners. Verbatim Figma copy: event title "Розчищення стежок Стрийського парку від сухостою, гілок та листя", location "Сихівський р-н, вул. Паркова, 16", badges "16.05 / 6/7 / #1328 / Гаряча толока", CTA "доєднатися". Five pagination dots. Linked `components/events.css`.

---

## 2026-05-24 — Build Partners section component

### Added
- `components/partners.css` — Partners section styles. Green background (`--color-accent` / `#BAD342`), column layout, `40px 20px` padding, `40px` gap. Section heading: Unbounded Regular 400 20px UPPER. Partner list: `flex-wrap`, centered, `12px` gap. Each `.partner-logo` item: row, `8px` gap, `4px` padding; SVG icon `24px` square; `.partner-name` Manrope SemiBold 600 `--text-lg` (18px ≈ 18.4px Figma).
- `assets/images/partners/logo-ecowave.svg` — EcoWave partner logo, downloaded from Figma node 1261:4749.
- `assets/images/partners/logo-zelenyi.svg` — Зелений Простір logo, Figma node 1261:4752.
- `assets/images/partners/logo-domivka.svg` — Домівка ВТ logo, Figma node 1261:4755.
- `assets/images/partners/logo-dobrobud.svg` — Добробуд Львів logo, Figma node 1261:4758.

### Changed
- `index.html` — added `<section class="partners">` after About Us. Four partner items with verbatim Figma names: EcoWave, Зелений Простір, Домівка ВТ, Добробуд Львів. Linked `components/partners.css`.

---

## 2026-05-24 — Build About Us section component

### Added
- `components/about.css` — About Us section styles. Section frame: column, `100px 20px` padding (`--space-25 --space-5`), `40px` gap. About-project sub-block: column, `24px` gap, heading row (space-between, center) with `.about-title` (Unbounded Regular 400 20px UPPER) and `.about-icon-btn` (48px circle, 1.5px border, `--radius-pill`). Body text: Manrope Medium 500 16px 150% lh. Stats grid: two rows of 2 `.stat` items each (Unbounded Regular 400 36px number + Manrope Regular 400 14px label, column center, 8px gap, 150px wide, rows centered with 32px gap).

### Changed
- `index.html` — added `<section class="about">` after hero. Copy verbatim from Figma: "про проєкт" heading, two-paragraph body, stats 645+/760+/150+/10 with Ukrainian labels. Linked `components/about.css`.

---

## 2026-05-24 — Build hero section component

### Added
- `components/hero.css` — full hero section styles. 2×2 image mosaic grid (four cells with asymmetric Figma border-radii mapped to `--radius-pill` tokens): top-left photo cell (`0 pill 0 0`), top-right purple badge cell (`pill pill 0 pill`, `--color-purple-dark`), bottom-left green accent cell (`--color-green-accent`), bottom-right photo collage cell. Headline card (Unbounded Medium 500 30px UPPER, radius 20px). `.hero-cta` padding override (`16px 80px`) reusing `.btn--primary` from header component.
- `assets/images/hero/hero-bg.png` — hero background photo, downloaded from Figma (1200×800 @2×).
- `assets/images/hero/hero-main.png` — main hero portrait photo (1374×2058 @2×).
- `assets/images/hero/hero-secondary.png` — secondary hero photo (736×1308 @2×).
- `assets/images/hero/hero-screenshot.png` — UI screenshot overlay image (732×554 @2×).

### Changed
- `index.html` — added `<section class="hero">` inside `<main>` with 2×2 mosaic, headline card ("ДОЛУЧАЙСЯ — ЗМІНИМО ЛЬВІВ РАЗОМ"), and "Толочити" CTA. Linked `components/hero.css`.

---

## 2026-05-24 — Build header/navigation component

### Added
- `components/header.css` — header component styles: sticky bar, logo (Unbounded Bold 700 16px), outline nav button, shared `.btn` / `.btn--outline` / `.btn--primary` base classes. All values via `var()` tokens only.

### Changed
- `index.html` — replaced placeholder `<header>` with Figma-accurate markup: `.site-header > .header-inner > .header-logo` + `.header-nav > .btn.btn--outline`. Page language set to `uk`. Title updated to "Toloka — еко-толкучка". Added `<link>` for `components/header.css`. Placeholder `<footer>` removed (will be its own component). `<main>` given `id="main-content"` ready for sections.
- `css/style.css` — fixed 8 stale token references left over from the generic scaffold (`--font-sans` → `--font-body`, `--font-weight-normal` → `--font-weight-regular`, `--color-brand-primary` → `--color-brand`, `--color-neutral-100` → `--color-gray-light`, `--color-muted` → `--color-text-muted`, `--radius-sm` → `--radius-badge`, `--shadow-sm` → `--shadow-image`). Removed `--font-mono` (no mono token in design). Removed `.site-header`, `.main-content`, `.site-footer` blocks — moved to component files.

---

## 2026-05-24 — Replace design tokens with Figma-extracted values

### Changed
- `css/tokens.css` — fully replaced generic placeholder tokens with values extracted directly from the Figma frame "еко-толкучка" (node 1261-4680). Changes cover:
  - **Colors:** brand purples (`#A978FF`, `#9251FB`, `#7A2EEF`), green accent (`#BAD342`), grays, alpha overlays, pagination states, semantic aliases (bg, text, border, brand, accent).
  - **Typography:** families (`Unbounded` for headings, `Manrope` for body), 8 size steps (12–36 px), 4 weight steps (400–700), 4 line-height values, 2 letter-spacing values.
  - **Spacing:** 12-step scale from 4 px to 100 px matching Figma section paddings and gaps.
  - **Border radius:** 5 named radii (avatar 30 px, badge 20 px, advantage 24 px, card 40 px, pill 100 px).
  - **Shadows / Filters:** image drop shadow, two backdrop-blur values, card gradient overlay.
  - **Transitions, z-index, layout, breakpoints:** retained and aligned to project needs.

---

## 2026-05-24 — Add Google Fonts for Unbounded and Manrope

### Added
- `index.html` — three `<link>` tags in `<head>`: two `preconnect` hints to `fonts.googleapis.com` and `fonts.gstatic.com`, plus the Google Fonts stylesheet loading **Unbounded** (weights 400, 500, 700) and **Manrope** (weights 400, 500, 600, 700) with `display=swap`. Inserted before the CSS links for earliest possible font resolution. Weights match those specified in the Figma design tokens.

---

## 2026-05-24 — Initial scaffold

### Added
- `index.html` — base HTML shell with header, main, footer
- `css/tokens.css` — full design-token set (colors, typography, spacing, radii, shadows, transitions, z-index, breakpoints)
- `css/style.css` — global reset and layout styles; references tokens only via `var()`
- `js/main.js` — JS entry point
- `components/` — empty directory for future UI components
- `assets/images/` — empty directory for images
- `assets/fonts/` — empty directory for local fonts
- `docs/architecture.md` — project structure and design decisions
- `docs/changelog.md` — this file
- `CLAUDE.md` — AI assistant workflow instructions
