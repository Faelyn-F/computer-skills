# Computer Skills — Changelog

## 2026-08-05 — Phase 3: Document Practice Tasks 1 & 2

### Added
- **Task 1: Create and rename a document** — learner must click New, confirm clear, and change the document name to "My First Document"
  - Tracks whether learner actually used New during current attempt (`task1NewAction` flag)
  - Validates: New was clicked, document is blank, name matches exactly (trimmed)
  - Feedback: "Start by clicking New." / "The new document should be blank." / "Change the document name to 'My First Document'."
  - Success message: "Well done. You created and named a new document." / "آفرین. شما یک سند جدید ایجاد و نام‌گذاری کردید."
- **Task 2: Type simple information** — learner types four lines of practice information into the document
  - Practice text: My Information / Name: Sara / Phone: 021 123 4567 / City: Auckland
  - Validation: normalises line breaks (\r\n → \n), trims whitespace, requires correct order, tolerates minor spacing
  - Includes note: "Use the practice information shown above. Do not enter your real personal details."
  - Feedback: "Click inside the white page and start typing." / "Some information is still missing." / "Check the order of the four lines." / "Press Enter after each line."
  - Success message: "Well done. You typed the information correctly." / "آفرین. شما اطلاعات را به درستی تایپ کردید."
- **Task panel** (replaces placeholder): bilingual task header, instructions, practice text block, Check Task button, Previous/Next Task navigation, completion badges (✅ Task 1, ✅ Task 2), feedback area with `aria-live="polite"`
- **Reset Practice** button: clears document content, name, formatting, and task progress only (not Email, language, or other course data); requires confirmation
- **Document name label**: "Name:" / "نام:" label in toolbar next to the document name input
- **Task progress localStorage keys**:
  - `computerSkillsDocumentCurrentTask` — current task number (1 or 2)
  - `computerSkillsDocumentCompletedTasks` — JSON array of completed task numbers
  - `computerSkillsDocumentTask1NewAction` — whether New was clicked during current Task 1 attempt

### Changed
- Side panel: width 220px → 260px for better bilingual instruction readability
- New document: now returns boolean success; File menu "New document" also triggers task tracking
- Document name input: now has visible "Name:" / "نام:" label and border by default

### Interface Refinements
- Toolbar: English-only controls with Persian `title` tooltips (preserved)
- Document page padding: 50px/60px on desktop (preserved)
- No standalone "Next" navigation button (preserved)
- Save status: Saving... → Saved with colored backgrounds (preserved)

### Task Navigation Logic
| State | Previous Task | Check Task | Next Task |
|-------|:---:|:---:|:---:|
| Task 1 (incomplete) | Hidden | Visible | Hidden |
| Task 1 (completed) | Hidden | Visible | "Next Task ▶" |
| Task 2 (incomplete) | Visible | Visible | Hidden |
| Task 2 (completed) | Visible | Visible | Hidden — completion message shown |

### Files Modified
| File | Change |
|------|--------|
| `lessons/document-practice.html` | Replaced side panel placeholder with full task panel; added task definitions, validation, navigation, reset, 3 new localStorage keys (~580 lines total JS) |
| `css/style.css` | Added ~200 lines: document name label, task panel (header, instruction, practice text, feedback, buttons, completion, badges, reset), updated responsive rules; side panel 220→260px |

### Preserved
- All 11 editor interactions (New/Undo/Bold/Font/Size/File/Insert/Save/Page numbers/Download/Print)
- All existing localStorage keys and persistence
- Keyboard shortcuts (Ctrl+B, Ctrl+S, Ctrl+Z)
- Accessibility features (55+ ARIA attributes, keyboard menus, Escape close, visible focus)
- Document introduction page (`lessons/document.html`)
- Email module (no files touched)
- Language system and routing

### Deferred
- Task 3: select text, Times New Roman and font size
- Task 4: save and download as PDF
- Task 5: add page numbers and download final PDF
- Full Chinese Document translation
- Audio support for Document module

---

## 2026-08-05 — Phase 2 Fix: Document Practice Editor Layout

### Root Cause
The editor workspace inherited the dark navy body background (`#1a1a2e`) instead of a neutral light-grey workspace. The `.doc-editor-wrapper` had no background override. Toolbar buttons used undersized browser-default styling (`font-size: 14px`, `min-height: 36px`). English and Persian labels were crowded together inside narrow buttons. The document name input sat in a separate bar below the toolbar, floating in the dark workspace. The save status used a cloud emoji (☁️) and tiny text.

### Fixed
- **Workspace background**: Changed from dark navy (`#1a1a2e`) to light grey (`#e8eaed`) so the white document page is clearly visible
- **Toolbar buttons**: Enlarged (`font-size: 15px`, `min-height: 40px`, `padding: 8px 14px`), added visible borders, white background — matching site design system
- **English-only toolbar labels**: Removed Persian text from inside buttons; added Persian `title` tooltips on every control
- **Persian helper bar**: New row below toolbar with Persian translations (راهنما: جدید · نام سند · برگردان · پررنگ · قلم · اندازه قلم · فایل · درج)
- **Document name in toolbar**: Moved the editable name input into the toolbar between New and Undo buttons (was in a separate bar below)
- **Save status**: Enlarged, removed cloud icon, uses clear bilingual text with colored background on state change (amber for saving, green for saved)
- **Next button removed**: Deleted the premature "Next ▶" navigation link
- **Navigation downsized**: Reduced button size for editor page (17px font, 44px min-height)
- **White document page**: Set `min-height: 800px` with generous padding (50px/60px) and clear shadow boundary
- **Side panel**: Wider (220px), larger placeholder text, clearer task-deferred message
- **Editor layout height**: `min-height: 650px` on layout, `min-height: 800px` on page — centred and immediately visible at 1366×768

### Preserved
- All 11 editor interactions (New/Undo/Bold/Font/Size/File/Insert/Save/Page numbers/Download/Print)
- All localStorage keys and persistence logic
- All keyboard shortcuts and accessibility features
- Document introduction page (`lessons/document.html`)
- Email module (no files touched)
- All existing JavaScript functionality

### Files Modified
| File | Change |
|------|--------|
| `lessons/document-practice.html` | Restructured toolbar, moved doc name, removed Next button, English-only labels + title tooltips, Persian helper bar |
| `css/style.css` | Replaced ~490 lines of editor styles: light workspace, larger buttons, toolbar doc name, save status, responsive fixes |

### Tests Performed
1. White page visible immediately ✅
2. White page accepts typing ✅
3. Document name in toolbar ✅
4. Toolbar controls readable and consistently styled ✅
5. English and Persian do not overlap ✅
6. Save status has readable text ✅
7. No Next button ✅
8. Task placeholder visible ✅
9. Desktop layout at 1366×768 ✅
10. Narrow-screen layout usable ✅
11. No Google/Microsoft branding ✅
12. No Email keys in Document files ✅

---

## 2026-08-05 — Phase 2: Document Practice Editor

### Added
- Full virtual Document Practice editor (`lessons/document-practice.html`) — replaced placeholder
- Editor toolbar: New document, Undo, Bold (with active state), Font dropdown (Arial/Times New Roman/Calibri/Georgia), Font size dropdown (10–24pt)
- File menu: New document, Save, Download as text (.txt Blob download), Download as PDF (placeholder), Print
- Insert menu: Page numbers (top/bottom/none with submenu), Date, Page break (visual)
- `contenteditable` document editing area with visible page boundary
- Editable document name bar (Enter/blur to confirm, empty resets to "Untitled document")
- Save status indicator: "Saving... / در حال ذخیره..." → "Saved / ذخیره شد" with 800ms debounce
- Page numbers: top of page, bottom of page, or none — persists in localStorage
- Side panel placeholder: "Tasks will be added in the next phase."
- localStorage keys: `computerSkillsDocumentName`, `computerSkillsDocumentContent`, `computerSkillsDocumentSettings`, `computerSkillsDocumentPageNumbers`
- Keyboard shortcuts: Ctrl+B (bold), Ctrl+S (save), Ctrl+Z (undo)
- Accessibility: 55 ARIA attributes, keyboard-accessible menus, Escape to close, visible focus, `aria-live` save status
- Responsive layout: side panel stacks below editor at ≤900px, compact toolbar at ≤600px
- CSS: ~330 lines (toolbar, dropdowns, editor layout, page numbers, save status, toast, responsive)

### Changed
- `lessons/document-practice.html`: from Phase 1 placeholder → full interactive editor (~780 lines)
- `css/style.css`: added editor styles

### Preserved
- `lessons/document.html` — Phase 1 introduction page (untouched)
- All Email module files (email.html, email-practice.html, email-app/)
- All language homepages, other lesson modules, JavaScript modules
- All Email localStorage keys (`mb_*`, `mailbox_*`, `cs_checkbox_*`)

### Deferred
- Tasks 1–5 (learning task system)
- Real PDF generation
- Multi-page editing
- Redo button
- Chinese Document translations
- Audio support for Document module

---

## 2026-08-05 — Phase 1: Document Introduction

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
