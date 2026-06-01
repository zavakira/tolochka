# CLAUDE.md — AI Assistant Instructions

These rules apply to every session in this project. Follow them strictly.

---

## 1. Document every change in `docs/changelog.md`

After completing **any** change — no matter how small — append an entry to `docs/changelog.md` under today's date. Use this format:

```markdown
## YYYY-MM-DD — <short title>

### Added | Changed | Fixed | Removed
- Description of what changed and why.
```

Never skip this step.

---

## 2. Explain before acting — always ask for confirmation

Before making **any** change to the codebase:

1. State clearly **what** you are about to do and **why**.
2. List every file that will be created, modified, or deleted.
3. Wait for the user to confirm ("yes", "go ahead", "ok", etc.) before proceeding.

Do **not** make any edits speculatively or "in anticipation" of approval.

---

## 3. Keep every component in its own file

- UI components live in `components/`.
- One component = one file (e.g., `components/modal.js`, `components/card.css`).
- Do **not** embed component logic or styles directly in `index.html` or `css/style.css`.
- Import/include components explicitly from `index.html` or `js/main.js`.

---

## 4. Design token discipline

- All raw values (colors, spacing, font sizes, shadows, etc.) belong in `css/tokens.css`.
- All other CSS files reference tokens with `var(--token-name)`.
- Never write a raw hex color, pixel value, or magic number outside `tokens.css`.

---

## 5. Update `docs/architecture.md` when the structure changes

If a new feature, component, or directory is added, update the Features table and Directory structure section in `docs/architecture.md`.

---

## 6. Commit hygiene (if git is used)

- Commit messages: `type(scope): short description` (conventional commits).
- Never commit directly to `main`; use a feature branch.
- End every commit message with:
  `Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>`
