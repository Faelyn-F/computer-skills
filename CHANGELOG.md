# Computer Skills — Changelog

## 2026-08-05

### Added
- Document introduction page (`lessons/document.html`) — short visual overview with CSS mockup editor
- 9 control cards: New document, Document name, Document page, Font, Font size, File menu, Insert menu, Save status, Download as PDF
- Large "Start Document Practice" CTA button linking to placeholder practice page
- TypingClub external link section (`https://www.edclub.com/`) with `target="_blank"` and `rel="noopener noreferrer"`
- Placeholder Document practice page (`lessons/document-practice.html`) with "being prepared" message
- Language-aware "Back to Course Home" navigation (JavaScript sets correct `../{lang}/index.html`)
- CSS: document editor mockup, control cards grid, start button, TypingClub section (~250 lines)
- Responsive styles for mockup, cards, and buttons at 768px and 480px breakpoints

### Changed
- `lessons/document.html`: replaced old 9-step Google Docs tutorial with short visual introduction
- `lessons/document-practice.html`: replaced old 9-step Google Docs simulation with placeholder page
- `css/style.css`: added Document introduction styles

### Removed
- All Google Docs and Microsoft Word branding from Document pages
- Old 9-step long-form tutorial format from Document introduction
- Old interactive Google Docs simulation (deferred to future phase)

### Preserved
- All Email module files (email.html, email-practice.html, email-app/)
- All language homepages (fa/, en/, zh/)
- All other lesson modules (Drive, Internet, Keyboard)
- Language module (js/language.js), main.js, audio-player.js
- All localStorage keys and Email practice progress data

### Deferred
- Virtual document editor (interactive simulation)
- Tasks 1–5 (create/rename, type, font/size, save/download PDF, page numbers)
- Chinese Document translations
- Audio support for Document module

---

## 2026-07-31

### Added
- Language selection start page (`index.html`) with English, فارسی, 中文
- English-only course homepage (`en/index.html`)
- Persian-English bilingual homepage (`fa/index.html`) — preserved from original root
- Chinese-English placeholder homepage (`zh/index.html`)
- Language module (`js/language.js`) — persistence, routing, content visibility
- Shared locale files (`assets/locales/en.json`, `fa.json`, `zh.json`)
- Change Language button on all language homepages
- CSS language-mode content visibility rules (`html[data-lang]`)
- Chinese course card titles (`.zh-title`)

### Changed
- Root `index.html`: from bilingual course homepage → language selection page
- All lesson pages: added `js/language.js` for language-aware content visibility
- All email-app pages: added `js/language.js`
- `fa/index.html`: paths adjusted to `../` for assets, lessons, and scripts

### Preserved
- All existing Persian-English Email content (6 topics, annotated images, topic navigation)
- All existing lesson pages (email, document, drive, internet, keyboard)
- All existing practice pages (email-practice, document-practice, drive-practice)
- Virtual Inbox and Tasks 1–5 (email-practice.html)
- All email-app/ pages (register, signin, inbox, tasks, teacher, terms)
- All localStorage keys and progress data (cs_checkbox_*, mb_*, mailbox_*)
- All CSS styling, accessibility features, RTL/LTR support
- Direct lesson links (e.g., `lessons/email.html#reply`) default to Persian mode

### Deferred
- Persian audio MP3 recording
- Full Chinese lesson translations
- Tasks 6–15
- Further localisation migration into locale JSON files

---

## 2026-07-31 — Audio Preview: Root-Cause Analysis & Complete Rewrite

### Root Cause Analysis

| Problem | Root Cause |
|---------|-----------|
| Voice reads English instead of Persian | `populateVoices()` fell back to ALL voices when no Persian voice found, including English voices. English voice + `lang=fa-IR` → garbled pseudo-Persian |
| Only headings read, not full text | Old code read from hardcoded JS array, only first text node per section |

### Fixes Applied
1. Strict voice selection: exact `fa-IR` → `fa-*` prefix → null (never fallback to non-Persian)
2. Persian character validation: `[؀-ۿ]` Unicode range check before playback
3. Explicit `[data-audio-transcript]` containers with `[data-audio-target]` mapping
4. Multi-element text collection via `querySelectorAll('p, li, [data-audio-sentence]')`
5. Phonetic Persian renderings for English interface terms
6. Debug panel with real-time diagnostics

### Audio Units: 9 → 12
Message body split into 4 independent units (overview, greeting, reason, closing/name).

### Files Modified
| File | Change |
|------|--------|
| `lessons/audio-preview.html` | Complete rewrite: 12-unit HTML + strict voice selection + Persian validation + debug panel |
| `assets/audio/fa/email/transcripts-fa.json` | Extended to 12 units with phonetic Persian guides |
| `CHANGELOG.md` | Created |
