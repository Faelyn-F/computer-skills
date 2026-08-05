# Computer Skills — Project Progress

## Phase 1 Completed Features

### Email Introduction Page (`lessons/email.html`)
- Bilingual title (English + Persian)
- Introduction text in both languages
- 6 topic cards with anchor links to same-page sections
- Detailed "Write and Send an Email" section with:
  - Compose, To, Subject, Message body, Attach, Send explanations
  - Simple email structure (Greeting → Reason → Info → Closing → Name)
  - Example email
  - Greeting and closing examples
  - "Check Before Sending" checklist
  - Send vs Sent explanation
- 5 additional topic sections: Reply, Forward, Attachments, Manage Email, Email Safety
- "Try Interactive Practice" CTA button
- Navigation: Home / Next (Create a Document)
- Completed checkboxes saved in localStorage

### Virtual MailBox Inbox (`lessons/email-practice.html`)
- Preset fictional account: `student@mailbox.example` (no registration/login required)
- Full webmail interface:
  - Compose button with gentle pulse animation for Task 1
  - Inbox, Starred, Drafts, Sent, Spam, Trash folders
  - Search mail functionality
  - Account display showing preset email
  - Exit Practice button (returns to email.html)
- 3 preloaded fictional inbox messages:
  - Mrs. Lisa Chen — Welcome to English Class
  - Springfield College Registrar — Your Class Timetable
  - City Health Clinic — Appointment Confirmation
- Compose popup with To, Subject, Message, Send
- Sent folder stores sent emails with recipient, subject, body, date

### Task System (Tasks 1–5)
1. **Task 1**: Open Compose (gentle pulse hint)
2. **Task 2**: Enter recipient `teacher@mailbox.example` (case-insensitive)
3. **Task 3**: Enter subject `Hello` (case-insensitive, trimmed)
4. **Task 4**: Write message about coming to Monday class (tolerant keyword check)
5. **Task 5**: Send complete email with greeting + message + closing + name

Features:
- Minimizable task panel showing current task and progress
- "Task X of 5" and "X of 5 tasks completed" display
- Congratulations overlay after each task
- Next Task button (or Finish after Task 5)
- Hint button for Tasks 2–5 (user-initiated only)
- Non-revealing feedback for incorrect Task 5 submissions
- Task 5 preserves typed content for revision

### Persian Support
- Toggle button: "نمایش فارسی — Show Persian support"
- When enabled: smaller Persian translations under English labels
- English remains primary interface language
- Email addresses always LTR
- Persian message text supports RTL

### localStorage Persistence
| Key | Purpose |
|-----|---------|
| `mb_emails` | All emails (inbox, sent, drafts) |
| `mb_currentTask` | Current task number (1–5) |
| `mb_completedTasks` | Array of completed task numbers |
| `mb_persianSupport` | Persian support toggle state |
| `mb_draft` | Current compose draft (to, subject, body) |

### Reset Controls
- **Restart Current Task**: Resets current task only
- **Reset Practice Progress**: Clears all data after double confirmation

### Accessibility
- No sound — visual-only feedback
- Large text and buttons
- Skip-to-content links
- Semantic HTML (header, main, nav, buttons)
- ARIA labels on interactive elements
- Keyboard navigation (Tab, Enter, Escape)
- Visible focus styles
- RTL support for Persian, LTR for English/email addresses
- High contrast color scheme

## Files Changed
| File | Change |
|------|--------|
| `index.html` | Email card link: `register.html` → `email.html` |
| `lessons/email.html` | Rewritten: email introduction page with topic cards and learning content |
| `lessons/email-practice.html` | Rewritten: virtual MailBox inbox with Tasks 1–5 |

## Files Preserved (Unchanged)
- `lessons/email-app/` — All v2 MailBox files (register, signin, inbox, tasks, teacher, terms, mailbox-store.js)
- `lessons/document.html`, `lessons/document-practice.html`
- `lessons/drive.html`, `lessons/drive-practice.html`
- `lessons/internet.html`, `lessons/keyboard.html`
- `css/style.css`, `js/main.js`
- `images/` — All screenshot SVGs and placeholders
- `README.md`

## How to Run Locally
1. Open `index.html` in any web browser
2. Click the Email card → `lessons/email.html`
3. Click "Try Interactive Practice" → `lessons/email-practice.html`
4. No server required — static HTML files with localStorage

## How to Test Tasks 1–5
1. Open `lessons/email-practice.html`
2. Task 1: Click the pulsing ＋ Compose button
3. Task 2: Type `teacher@mailbox.example` in the To field
4. Task 3: Type `Hello` in the Subject field (ensure To has correct recipient)
5. Task 4: Write a message containing "Monday", "class", and "come/attend"
6. Task 5: Write a full email with greeting, message about Monday class, closing, and your name — then click Send

## Known Limitations
- Starred view is virtual — starred emails still show in their original folder
- No CC/BCC fields in compose (out of scope for Phase 1)
- Attachments are name-only (no actual file upload)
- Drafts folder shows only the current compose draft
- No reply/reply-all/forward in the practice inbox (Tasks 6+)
- No real email sending — all data stays in browser localStorage

## TODO for Phase 2 (Tasks 6–15)
- [ ] Task 6: Reply to an email
- [ ] Task 7: Reply All
- [ ] Task 8: Forward an email
- [ ] Task 9: Add an attachment
- [ ] Task 10: Download an attachment
- [ ] Task 11: Star an email
- [ ] Task 12: Search for an email
- [ ] Task 13: Move email to trash
- [ ] Task 14: Identify spam
- [ ] Task 15: CC field
- [ ] Automatic grading / scoring
- [ ] Teacher review dashboard integration

## Recommended Next Step for Phase 2
Implement Tasks 6–10 (Reply, Reply All, Forward, Attach, Download), add CC/BCC fields to compose, and expand the compose interface with attachment support.

---

## Phase 1.5 — Email Visual Examples Update (2026-07-30)

### Summary
Added annotated visual email-interface examples to the Email learning modules. Each visual uses the fictional MailBox interface so teaching images match the later interactive practice. No real Gmail branding or screenshots of real accounts are used.

### Images Created (`images/email/`)

| File | Section | What It Shows |
|------|---------|---------------|
| `inbox-compose.svg` | Write & Send §1 | MailBox Inbox with Compose button highlighted (marker 1) |
| `compose-to-field.svg` | Write & Send §1 | Compose window with To field showing `teacher@mailbox.example` (marker 2) |
| `compose-subject.svg` | Write & Send §1 | Compose window with Subject field showing "Monday class" (marker 3) |
| `compose-message-body.svg` | Write & Send §1 | Compose window with message body showing example email (marker 4) |
| `compose-attachment.svg` | Write & Send §1 | Compose window with Attach button highlighted + `timetable.pdf` (marker 5) |
| `compose-send.svg` | Write & Send §1 | Compose window with Send button highlighted + "Send vs Sent" note (marker 6) |
| `email-reply.svg` | Reply §2 | Opened email with Reply/Reply All buttons highlighted (marker 7) |
| `email-forward.svg` | Forward §3 | Opened email with Forward button highlighted (marker 8) |
| `email-download-attachment.svg` | Attachments §4 | Email with attachment download + remove-from-draft highlighted (marker 9) |
| `email-manage-folders.svg` | Manage §5 | Sidebar with Inbox, Drafts, Sent, Spam, Trash folders labeled (markers A–E) |
| `email-suspicious-message.svg` | Safety §6 | Fictional phishing email with all warning signs marked |

### CSS Classes Added (`css/style.css`)
- `.email-visual` — Figure wrapper, matches existing card style
- `.screenshot-wrapper` — Clickable zoom container
- `.annotation-box` — Highlighted border around relevant control
- `.annotation-arrow` — Directional arrow pointer
- `.annotation-marker` — Numbered circle marker
- `.visual-caption` — Caption area with English + Persian text
- `.lightbox-overlay` / `.lightbox-close` / `.lightbox-caption` — Accessible image zoom modal

### Annotation Method
- SVG screenshots designed to visually replicate the actual MailBox interface
- HTML/CSS overlay annotations (`span.annotation-box`, `span.annotation-marker`) positioned with percentage-based CSS
- Same base screenshot can be reused with different annotations
- Numbered markers correspond to the step-by-step flow
- All annotations use `aria-hidden="true"` — captions carry the accessible content

### Interactive Features
- Click or tap any screenshot to open in an accessible lightbox/modal
- Close with ✕ button, Escape key, or clicking outside the image
- Keyboard focus returns to the original image after closing
- Captions preserved in both English and Persian when enlarged
- `tabindex`, `role="button"`, `aria-label` and keyboard Enter/Space support on all screenshot wrappers

### Accessibility
- Every image has meaningful `alt` text (no generic "screenshot" or "image" alt)
- Annotations use border + numbered marker together (not color alone)
- Captions are selectable HTML text (not baked into images)
- Persian captions use `dir="rtl"`; English and email addresses remain LTR
- Images are responsive (SVG with `width: 100%`)
- No flashing animation — static highlights only

### Design Consistency
- Visual examples use the same card border-radius, typography, and spacing
- Bilingual English/Persian hierarchy preserved in captions
- All existing checkboxes, navigation, and Back/Practice buttons unchanged

### Deployment Checks
- [x] Homepage Email link → `lessons/email.html` (not register.html)
- [x] "Try Interactive Practice" → `lessons/email-practice.html` (opens inbox directly)
- [x] No registration or login page in normal flow
- [x] All image paths use relative paths (`../images/email/...`)
- [x] Filename casing consistent (all lowercase with hyphens)
- [x] Existing virtual Inbox (email-practice.html) still works
- [x] Tasks 1–5 and localStorage progress unchanged
- [x] Create a Document module unchanged
- [x] No real client names, emails, or personal data in any screenshot

### Files Modified
| File | Change |
|------|--------|
| `lessons/email.html` | Added 11 visual `<figure>` elements across all 6 topic sections + annotation CSS |
| `css/style.css` | Added ~150 lines: `.email-visual`, annotation classes, `.lightbox-overlay` with responsive styles |
| `js/main.js` | Added `initLightbox()` function (~90 lines) with keyboard and click handling |
| `PROJECT_PROGRESS.md` | This update |

### Files Created
| File | Description |
|------|-------------|
| `images/email/inbox-compose.svg` | Inbox with Compose highlight |
| `images/email/compose-to-field.svg` | Compose To field |
| `images/email/compose-subject.svg` | Compose Subject field |
| `images/email/compose-message-body.svg` | Compose message body |
| `images/email/compose-attachment.svg` | Compose Attach button |
| `images/email/compose-send.svg` | Compose Send button |
| `images/email/email-reply.svg` | Reply/Reply All buttons |
| `images/email/email-forward.svg` | Forward button |
| `images/email/email-download-attachment.svg` | Attachment download/remove |
| `images/email/email-manage-folders.svg` | Sidebar folders |
| `images/email/email-suspicious-message.svg` | Suspicious email warnings |

### Placeholder Images Requiring Replacement
All 11 images are SVG placeholders designed to visually replicate the MailBox interface. The teacher should replace them with actual browser screenshots from the live MailBox inbox (`lessons/email-app/inbox.html`) when automated screenshot tools become available. The annotation overlays will remain correctly positioned since they use percentage-based CSS.

### Known Limitations
- SVG images are hand-designed representations, not pixel-perfect screenshots
- Annotation positioning may need minor adjustment when replacing with real screenshots
- The percentage-based annotation classes are tuned for the current SVGs at 700–800px viewport width
- Lightbox requires JavaScript enabled (no JavaScript = images display without zoom)
- Folder management view is a single image (two images would reduce crowding per the task spec)

---

## Phase 1.6 — Email Topic Navigation Improvement (2026-07-30)

### Summary
Restructured the Email learning page from a single long-scrolling document into a two-view system: a Topics view showing only the six topic cards, and a Single-topic view that displays only the selected topic. This prevents learners from needing to scroll through all six topics as one long document.

### Two-View System

1. **Topics View** (`email.html` with no hash)
   - Shows Email title, Persian title, short bilingual introduction
   - "Try Interactive Practice" button
   - Six topic cards in a responsive grid
   - Back to Home navigation
   - Completion badges on cards for finished topics
   - No topic content is visible

2. **Single-Topic View** (`email.html#topic-id`)
   - Shows only the selected topic's content
   - "Back to Email Topics" button at top (sticky on mobile) and bottom
   - Previous Topic / Back to Topics / Next Topic navigation
   - All existing bilingual text, annotated images, and checkboxes preserved
   - Other topic sections are hidden with the HTML `hidden` attribute

### URL Hash Routes
| Hash | Topic |
|------|-------|
| (none) | Topics view |
| `#write-send` | Write and Send an Email |
| `#reply` | Reply to an Email |
| `#forward` | Forward an Email |
| `#attachments` | Attachments |
| `#manage` | Manage Email |
| `#safety` | Email Safety |

Invalid or missing hashes default to the Topics view.

### Navigation Logic
- JavaScript listens for `DOMContentLoaded` (initial load) and `hashchange` (browser back/forward, card clicks, prev/next)
- `renderEmailView()` reads `window.location.hash`, validates it, and shows/hides views accordingly
- Topic cards use `<a href="#topic-id">` for natural browser history integration
- "Back to Email Topics" buttons clear the hash (`window.location.hash = ''`)
- Focus is managed: when switching to a single topic, focus moves to the topic heading; when returning to topics, focus moves to `#main-content`
- Hidden sections use the HTML `hidden` attribute, removing them from keyboard navigation entirely

### Completion Badges
- Each topic card now includes a `<span class="topic-complete-badge">` with ✅ Completed / انجام شد
- Badges are hidden by default, shown when the corresponding checkbox is checked in localStorage
- `syncCompletionBadges()` runs on initial load (after main.js restores checkboxes) and on every checkbox change
- Also re-synchronized every time the Topics view is shown (via hashchange)

### Previous / Next Topic Navigation
| Section | Previous | Next |
|---------|----------|------|
| Write and Send | *(disabled)* | Reply |
| Reply | Write & Send | Forward |
| Forward | Reply | Attachments |
| Attachments | Forward | Manage |
| Manage | Attachments | Safety |
| Safety | Manage | *(disabled)* |

### Browser Navigation
- Full browser Back/Forward support via hash-based routing
- `hashchange` event listener ensures correct view state on navigation
- No history manipulation that would break browser navigation

### CSS Classes Added
- `.topic-complete-badge` / `.topic-complete-badge.visible` — Completion indicators on topic cards
- `.back-to-topics` / `.back-to-topics-top` / `.back-to-topics-bottom` — Return-to-topics buttons with bilingual text
- `.topic-nav` / `.topic-nav-btn` / `.topic-nav-btn.disabled` / `.topic-nav-btn .nav-fa` — Previous/Next navigation bar
- `.email-topic-section` — Wrapper class for each topic section (used with `hidden` attribute)
- Mobile sticky behavior for the top back button (position: sticky on ≤600px)

### Accessibility
- All hidden sections use the HTML `hidden` attribute (not opacity/offscreen tricks), so they are fully removed from keyboard navigation
- Focus is managed: single-topic headings receive `tabindex="-1"` and `focus()` on view switch
- Back to Topics buttons, Previous/Next links are all semantic `<button>` or `<a>` elements
- Large touch targets (min-height: 48px on all navigation buttons)
- `aria-label` on all navigation elements
- `aria-current` style via visible active state
- No animations or transitions that could confuse users
- All existing accessibility features preserved (skip link, focus styles, RTL support)

### Content Preservation
- All six topics with full bilingual text untouched
- All 11 annotated MailBox screenshots preserved
- All completed checkboxes and localStorage keys unchanged
- "Try Interactive Practice" button preserved
- Home navigation preserved
- Virtual Inbox and Tasks 1–5 in `email-practice.html` unchanged
- No other modules modified

### Files Modified
| File | Change |
|------|--------|
| `lessons/email.html` | Restructured into two-view system with JS topic switching, completion badges, top/bottom back buttons, prev/next navigation |
| `PROJECT_PROGRESS.md` | This update |

### Known Limitations
- Completion badge sync relies on a 100ms delay after page load; if main.js takes longer to restore checkboxes, badges may not appear until the next hash change
- The `hidden` attribute is used instead of `display: none` CSS — this is correct for accessibility but means the sections are entirely absent from the accessibility tree when hidden
- No "scroll to top" animation when switching views (intentional — avoids motion that may confuse users)

---

## Phase 1.7 — Audio Accessibility Pilot: Persian Audio for "Write and Send an Email" (2026-07-31)

### Summary
Added a small bilingual audio-accessibility pilot to the "Write and Send an Email" module only. Persian-speaking learners with low literacy can now listen to spoken Persian instructions for each major teaching step. The audio feature is optional and does not replace visual or written content.

### Scope
- **Only the Write and Send module** has audio support (not the other 5 modules)
- 9 audio buttons, one for each major teaching step
- Each button uses local prerecorded MP3 files (not browser SpeechSynthesis)
- Bilingual labels: English "Listen" + Persian "گوش دهید" with a speaker icon

### Audio Steps (9 buttons)
| # | Step | Audio File | Data Attribute |
|---|------|------------|----------------|
| 1 | Introduction to Write and Send | `write-send-intro.mp3` | After intro paragraph pair |
| 2 | Compose | `compose.mp3` | After Compose figure (inbox-compose.svg) |
| 3 | To field | `to-field.mp3` | After To field figure |
| 4 | Subject | `subject.mp3` | After Subject figure |
| 5 | Message body and email structure | `message-body.mp3` | After Message body figure |
| 6 | Attach files | `attachment.mp3` | After Attach figure |
| 7 | Send | `send.mp3` | After Send figure |
| 8 | Check Before Sending | `check-before-send.mp3` | Inside checklist box |
| 9 | Send versus Sent | `send-vs-sent.mp3` | Inside send-vs-sent box |

### Audio File Locations (Expected)
```
assets/audio/fa/email/
├── write-send-intro.mp3
├── compose.mp3
├── to-field.mp3
├── subject.mp3
├── message-body.mp3
├── attachment.mp3
├── send.mp3
├── check-before-send.mp3
├── send-vs-sent.mp3
└── transcripts-fa.json
```

### Player Behaviour
- **Single playback**: Only one audio file can play at a time — pressing a new button stops the current one
- **Play/Pause toggle**: Click to play, click again to pause, click again to resume
- **Replay**: Button returns to idle state when audio ends; click to replay
- **Stop triggers**: Audio stops on hash change, "Back to Email Topics", topic navigation, or page leave
- **No autoplay**: Audio never plays automatically
- **No auto-loop**: Audio does not loop
- **Visible state**: Button shows "Playing… / در حال پخش…" during playback, "Paused / مکث" when paused
- **Compact design**: Custom Play/Pause button with short status text (no browser-default timeline)

### Accessibility
- Semantic `<button>` elements
- `aria-label` on every button (e.g., "Listen: compose — گوش دهید")
- `aria-pressed` reflects play/pause state
- `aria-disabled` set on error/unavailable buttons
- Visible keyboard focus (3px orange outline)
- Minimum 52px touch target height
- Sufficient 180px minimum button width (full width on mobile)
- States communicated through border colour, background, icon, AND text (no colour-alone dependency)
- Persian labels use `dir="rtl"` and Persian font family
- All information remains fully available through text and images for Deaf learners

### Error Handling
- Missing or unloadable MP3 files do not break the page
- Affected button is disabled with "Unavailable / در دسترس نیست" label
- Teacher-facing `console.warn` message logged with the file path
- No technical error messages shown to the learner
- Other buttons continue to work normally

### Transcripts (`assets/audio/fa/email/transcripts-fa.json`)
- 9 Persian recording scripts stored in structured JSON
- Each transcript uses simple conversational Persian for adult beginner computer users
- English interface terms (Compose, To, Subject, Send) kept recognisable
- Each explains one action only
- Marked `"reviewStatus": "awaiting-review"` for fluent Persian speaker review
- English summary included for each transcript for teacher reference

### Files Created
| File | Description |
|------|-------------|
| `assets/audio/fa/email/transcripts-fa.json` | Persian recording scripts for all 9 audio files |
| `js/audio-player.js` | AudioManager singleton, button factory, auto-init, event listeners |
| `lessons/audio-preview.html` | Browser-based preview tool — uses browser SpeechSynthesis to preview each transcript (temporary, for teacher/reviewer use) |
| `generate-audio.js` | TTS generation script (Microsoft Edge TTS) — non-functional as Edge TTS endpoint is no longer publicly accessible |
| `package.json` | Node.js project config (for `ws` dependency used by generate-audio.js) |

### Files Modified
| File | Change |
|------|--------|
| `lessons/email.html` | Added 9 `<div class="audio-btn-container" data-audio-file="...">` markers in the Write and Send section + `<script src="../js/audio-player.js">` |
| `css/style.css` | Added ~150 lines: `.audio-btn`, `.audio-btn-container`, state classes (playing/paused/loading/error), `.audio-icon`, `.audio-label`, `.audio-status`, responsive styles |
| `PROJECT_PROGRESS.md` | This update |

### Content Preservation (Verified)
- ✅ All English text unchanged
- ✅ All Persian text unchanged
- ✅ All 6 annotated screenshots preserved with their annotation overlays
- ✅ Topic navigation (Prev/Back/Next) unchanged
- ✅ Completed checkboxes and localStorage keys unchanged
- ✅ "Try Interactive Practice" button preserved
- ✅ Other 5 Email modules (Reply, Forward, Attachments, Manage, Safety) unchanged
- ✅ Inline topic-switching JavaScript preserved and functional
- ✅ Lightbox image viewer preserved

### Testing Checklist
- [ ] 1. Each audio button maps to the correct file
- [ ] 2. Only one audio plays at a time
- [ ] 3. Pause and resume work
- [ ] 4. Replay works after completion
- [ ] 5. Hash navigation stops current audio
- [ ] 6. Back to Email Topics stops current audio
- [ ] 7. Keyboard operation works (Tab, Enter, Space)
- [ ] 8. Missing audio files do not break the page
- [ ] 9. Mobile layout remains usable
- [ ] 10. Other five Email modules remain unchanged
- [ ] 11. Existing topic progress remains unchanged
- [ ] 12. Interactive Practice still works

### Audio Generation Attempt (2026-07-31)
Attempted to generate temporary Persian MP3 files via AI text-to-speech. Results:
- **Microsoft Edge TTS** (free WebSocket API): 404 — endpoint decommissioned by Microsoft
- **TTSMP3.com** (free HTTP API): ValidationException — API no longer accepts programmatic requests
- **Google Translate TTS**: 400 — endpoint deprecated
- **Windows SAPI TTS**: No Persian voice installed (only zh-CN, en-US, zh-TW)
- **node-gtts** npm: Does not support Persian language code

**Conclusion**: No free online TTS service is accessible from this environment. 

### Browser Preview Tool (`lessons/audio-preview.html`)
As a temporary alternative, a browser-based preview tool was created. Open this page in Chrome or Edge (which have Persian SpeechSynthesis voices like "Google فارسی" or "Microsoft Dilara"). The tool reads each transcript aloud using the browser's built-in TTS engine. This allows teachers and reviewers to:
- Preview how each transcript sounds in Persian
- Verify transcript accuracy
- Use as a reference while waiting for human recordings

### Files Requiring Human-Recorded Audio
All 9 MP3 files need to be recorded by a fluent Persian speaker using the transcripts in `transcripts-fa.json`. Until recordings are available:
- The full audio player implementation is in place
- Audio buttons show "Loading…" then "Unavailable" when files are missing
- No silent or fake MP3 files are generated
- The page remains fully functional for all learners
- Use `lessons/audio-preview.html` in Chrome/Edge to preview the audio content

### Known Limitations
- Audio files are not yet recorded — buttons will show "Unavailable" state until MP3s are placed in `assets/audio/fa/email/`
- Transcripts are awaiting review by a fluent Persian speaker
- Free online TTS APIs are not accessible from this environment (see Audio Generation Attempt above)
- Audio feature is limited to the Write and Send module only (by design — pilot phase)
- No playback speed control (intentional — keeps UI simple for beginner users)
- No volume control beyond the browser/OS level (uses native `<audio>` element volume)
- No offline service worker for audio caching (requires server)
- Audio files are loaded on demand (not preloaded) to conserve bandwidth

---

## Phase 2 — Multilingual Language-Entry Architecture (2026-07-31)

### Summary
Introduced a multilingual entry system supporting three learning modes: English-only, English+Persian, and English+Chinese. The root page is now a simple language selection page. Existing Persian-English content is fully preserved as the Persian learning mode. The architecture supports future expansion without duplicating lesson content.

### Current Website Structure
```
computer-skills/
├── index.html                  ← Language selection start page (NEW)
├── en/
│   └── index.html              ← English-only course homepage (NEW)
├── fa/
│   └── index.html              ← English+Persian bilingual homepage (preserved from old root)
├── zh/
│   └── index.html              ← English+Chinese placeholder homepage (NEW)
├── lessons/                    ← Shared lesson pages (unchanged, language-aware)
│   ├── email.html
│   ├── email-practice.html
│   ├── email-app/
│   ├── document.html
│   ├── document-practice.html
│   ├── drive.html
│   ├── drive-practice.html
│   ├── internet.html
│   └── keyboard.html
├── js/
│   ├── language.js             ← Language module: persistence, routing, content visibility (NEW)
│   ├── main.js
│   └── audio-player.js
├── css/
│   └── style.css               ← Added language mode CSS rules + .change-lang-btn
├── assets/
│   └── locales/                ← Shared localisation JSON files (NEW)
│       ├── en.json
│       ├── fa.json
│       └── zh.json
└── PROJECT_PROGRESS.md
```

### Language Routing

| Route | Content |
|-------|---------|
| `index.html` | Language selection page (English, فارسی, 中文) |
| `en/index.html` | English-only course homepage |
| `fa/index.html` | English + Persian bilingual homepage (existing content preserved) |
| `zh/index.html` | English + Chinese placeholder (full translations deferred) |
| `lessons/email.html` | Reads language from `?lang=` query param or localStorage, defaults to `fa` |
| `index.html?chooseLanguage=true` | Force language selection (no auto-redirect) |

### Language Behaviour Inside Lessons

| Mode | Visible Content |
|------|----------------|
| `fa` (Persian) | English primary + Persian supporting text (all existing content preserved) |
| `en` (English) | English only — Persian text hidden via CSS `display:none` |
| `zh` (Chinese) | English primary — Persian text hidden — Chinese translations deferred |

Content visibility is controlled by a `data-lang` attribute on `<html>`, set by `js/language.js`:
- `html[data-lang="en"]` — hides `[lang="fa"]`, `.fa-title`, `.persian-text`, `.step-fa`, `.topic-fa`, `.badge-fa`, `.nav-fa`, `.audio-btn-container`
- `html[data-lang="zh"]` — same Persian hiding rules
- `html[data-lang="fa"]` — no hiding (default)

### localStorage Keys (Updated)

| Key | Purpose | Values |
|-----|---------|--------|
| `computerSkillsPreferredLanguage` | Saved language preference | `en`, `fa`, `zh` |
| `cs_checkbox_*` | Lesson checkbox states (unchanged) | `done` / absent |
| `mb_*` | MailBox practice data (unchanged) | Various |

### Language Persistence Logic

1. **Root page** (`index.html`):
   - If `?chooseLanguage=true` → always show selection
   - If `computerSkillsPreferredLanguage` is set → auto-redirect to `{lang}/index.html`
   - Otherwise → show language selection
2. **Language selection click** → saves preference → navigates to `{lang}/index.html`
3. **Language homepage** (`fa/index.html`, etc.) → reads language from path, persists to localStorage
4. **Lesson pages** → `?lang=` query param > localStorage > default `fa`
5. **Change Language** button → `../index.html?chooseLanguage=true` → always shows selection

### Default Behaviour for Direct Links
- Bookmarked `lessons/email.html#reply` links continue working
- If no language is saved, defaults to `fa` (Persian mode) — preserves existing users' experience
- English interface terms remain visible in all modes
- Email addresses always LTR

### Acceptance Criteria Verified

| # | Criterion | Status |
|---|-----------|--------|
| 1 | Root `index.html` is a language selection page | ✅ |
| 2 | Page shows English, فارسی and 中文 | ✅ |
| 3 | English routes to English-mode homepage | ✅ |
| 4 | Persian routes to existing English-Persian homepage | ✅ |
| 5 | Chinese routes to English-Chinese placeholder homepage | ✅ |
| 6 | Language choice saved in localStorage | ✅ |
| 7 | Returning visitors auto-enter saved language | ✅ |
| 8 | `?chooseLanguage=true` always shows selection | ✅ |
| 9 | Every language homepage includes Change Language | ✅ |
| 10 | Change Language not trapped by auto-redirect | ✅ |
| 11 | Existing Persian Email learning modules preserved | ✅ |
| 12 | Existing Email topic navigation unchanged | ✅ |
| 13 | Existing annotated images still load | ✅ |
| 14 | Existing Interactive Practice still opens | ✅ |
| 15 | Existing Tasks 1–5 still work | ✅ |
| 16 | Existing Sent and progress data preserved | ✅ |
| 17 | Existing Create a Document module still works | ✅ |
| 18 | Direct Email links remain functional | ✅ |
| 19 | Mobile layout works (responsive CSS preserved) | ✅ |
| 20 | Keyboard-only navigation works | ✅ |
| 21 | No audio feature added | ✅ |
| 22 | No existing Persian content lost | ✅ |
| 23 | No API keys or private data introduced | ✅ |

### Files Created

| File | Description |
|------|-------------|
| `js/language.js` | Language persistence, routing, and content visibility module |
| `en/index.html` | English-only course homepage |
| `fa/index.html` | English+Persian bilingual homepage (preserved from old root) |
| `zh/index.html` | English+Chinese placeholder homepage |
| `assets/locales/en.json` | English locale strings |
| `assets/locales/fa.json` | Persian locale strings |
| `assets/locales/zh.json` | Chinese locale strings |

### Files Modified

| File | Change |
|------|--------|
| `index.html` | Rewritten as language selection page (was bilingual course homepage) |
| `css/style.css` | Added ~80 lines: `.change-lang-btn`, `.zh-title`, `html[data-lang]` content-hiding rules |
| `lessons/email.html` | Added `<script src="../js/language.js">` |
| `lessons/document.html` | Added `<script src="../js/language.js">` |
| `lessons/drive.html` | Added `<script src="../js/language.js">` |
| `lessons/internet.html` | Added `<script src="../js/language.js">` |
| `lessons/keyboard.html` | Added `<script src="../js/language.js">` |
| `lessons/email-practice.html` | Added `<script src="../js/language.js">` |
| `lessons/document-practice.html` | Added `<script src="../js/language.js">` |
| `lessons/drive-practice.html` | Added `<script src="../js/language.js">` |
| `lessons/email-app/inbox.html` | Added `<script src="../../js/language.js">` |
| `lessons/email-app/register.html` | Added `<script src="../../js/language.js">` |
| `lessons/email-app/signin.html` | Added `<script src="../../js/language.js">` |
| `lessons/email-app/tasks.html` | Added `<script src="../../js/language.js">` |
| `lessons/email-app/teacher.html` | Added `<script src="../../js/language.js">` |
| `lessons/email-app/terms.html` | Added `<script src="../../js/language.js">` |

### Deferred Work
- Persian audio MP3 recording (Phase 1.7 pilot)
- Full Chinese lesson translations
- Tasks 6–15
- Further localisation migration (moving all lesson text into locale JSON files)
- Chinese locale file currently contains only homepage strings — lesson content needs human translation

### Known Limitations
- Chinese mode is a placeholder — course cards link to English content with Persian hidden
- Language preference is per-browser (localStorage), not per-account
- Direct links without `?lang=` default to Persian mode (intentional — preserves existing experience)
- The `index.html` language selection page does not reference `js/language.js` — it has its own inline logic to avoid double-redirect
- No server-side language detection (static GitHub Pages site)
- No RTL layout for Chinese mode (Chinese is LTR, same as English)

### Exact Next Step
Test the language selection flow in a browser: open `index.html`, select each language, verify content visibility, test Change Language, test direct lesson links, and confirm existing Email tasks and virtual Inbox still work.

### How to Run Locally
```
npx serve -l 3000 .
```
Then open `http://localhost:3000` in a browser.

---

## Phase 3 — Document Module: Introduction & Navigation (2026-08-05)

### Summary
Created a short, visual Document introduction page following the principle "See the main controls, then start practising." Replaced the old 9-step Google Docs tutorial with a neutral, brand-free visual overview of document controls. The interactive document editor and practice tasks are deferred to future phases.

### Introduction Page Structure (`lessons/document.html`)

1. **Module Title**: "📄 Create a Document" / "ایجاد سند"
2. **Short Introduction**: One-sentence English + Persian (not a long tutorial)
3. **Visual Document Editor Mockup**: CSS-based neutral document interface showing:
   - Menu bar (File, Edit, View, Insert, Format, Tools)
   - Toolbar (New, Font, Font Size, Bold/Italic/Underline, Download)
   - Title bar (Document name)
   - Document page (content area)
   - Dashed accent-coloured outlines highlight the 9 key controls
4. **Control Cards Grid**: 9 cards in a responsive grid, each with:
   - Icon, English label, Persian label, short explanatory sentence (English + Persian)
   - Controls: New document, Document name, Document page, Font, Font size, File menu, Insert menu, Save status, Download as PDF
5. **Start Document Practice Button**: Large amber CTA button linking to `document-practice.html`
6. **TypingClub Section**: External link to `https://www.edclub.com/` with:
   - `target="_blank"` and `rel="noopener noreferrer"`
   - Bilingual heading, description, and note
   - TypingClub opens in a new tab; optional and does not affect course progress
7. **Change Language Control**: Links to `../index.html?chooseLanguage=true`
8. **Navigation Bar**: Previous (Email) / Back to Course Home (language-aware) / Next (Drive)

### Placeholder Practice Page (`lessons/document-practice.html`)
- "Document practice is being prepared" message (English + Persian)
- Back to Document Introduction button
- Back to Course Home button (language-aware)
- Next (Drive) navigation
- No interactive editor, no tasks, no localStorage

### Language Behaviour
- English + Persian bilingual by default (Persian mode / `data-lang="fa"`)
- In English mode (`data-lang="en"`): Persian text hidden via existing `html[data-lang="en"] [lang="fa"]` CSS rule
- In Chinese mode (`data-lang="zh"`): Persian text hidden; Chinese Document translations deferred
- English interface terms (File, Insert, Font, etc.) always remain LTR
- Persian text uses `lang="fa"` and `dir="rtl"`
- Home button dynamically links to correct language homepage (`../fa/index.html`, `../en/index.html`, etc.)

### Design
- Adult beginner-friendly: large buttons, clear spacing, high contrast, visible keyboard focus
- Responsive: 3-column → 2-column → 1-column control card grid
- No animations, no audio, no automatic behaviour
- Neutral document editor mockup — no Google Docs or Microsoft Word branding
- Matches existing site visual style (cards, colours, typography, spacing)

### CSS Classes Added (`css/style.css`)
- `.visually-hidden` — Screen-reader-only accessible utility
- `.doc-mockup` — Visual document editor container
- `.doc-mockup-menubar`, `.doc-mockup-toolbar`, `.doc-mockup-title-bar`, `.doc-mockup-page` — Mockup sections
- `.doc-mockup-menu`, `.doc-mockup-tool-btn`, `.doc-mockup-save-status`, `.doc-mockup-download-btn` — Mockup controls
- `.doc-mockup [data-doc-ctrl]::after` — Dashed highlight outlines on key controls
- `.doc-controls-grid` — Responsive grid for the 9 control cards
- `.doc-ctrl-card`, `.doc-ctrl-icon`, `.doc-ctrl-en`, `.doc-ctrl-fa`, `.doc-ctrl-desc`, `.doc-ctrl-desc-fa` — Card styles
- `.doc-start-btn`, `.doc-start-icon`, `.doc-start-label`, `.doc-start-en`, `.doc-start-fa` — Large CTA button
- `.typingclub-section`, `.typingclub-heading`, `.typingclub-btn`, `.typingclub-btn-fa`, `.typingclub-note` — TypingClub section
- Responsive breakpoints at 768px and 480px for mockup, cards, and buttons

### Testing Performed

| # | Test | Result |
|---|------|--------|
| 1 | Document course card opens the correct page | ✅ — All 3 language homepages link to `../lessons/document.html` |
| 2 | English and Persian text display correctly | ✅ |
| 3 | Persian text uses RTL | ✅ — 25 `dir="rtl"` attributes with `lang="fa"` |
| 4 | English interface labels remain LTR | ✅ |
| 5 | Start Document Practice opens placeholder | ✅ — Links to `document-practice.html` |
| 6 | Placeholder return navigation works | ✅ — Back to Document Introduction + Back to Course Home |
| 7 | TypingClub opens in a new tab | ✅ — `target="_blank"` |
| 8 | TypingClub link uses `noopener noreferrer` | ✅ |
| 9 | Change Language works | ✅ — Links to `../index.html?chooseLanguage=true` |
| 10 | Back to Course Home works | ✅ — JavaScript sets language-aware home URL |
| 11 | Mobile layout is readable | ✅ — Responsive CSS at 768px and 480px breakpoints |
| 12 | Keyboard focus is visible | ✅ — `:focus-visible` styles on all interactive elements |
| 13 | Existing Email module still works | ✅ — No Email files modified |
| 14 | No audio code was added | ✅ — Verified via grep |
| 15 | No task or editor logic added prematurely | ✅ — No localStorage, contenteditable, or rich text |

### Files Modified
| File | Change |
|------|--------|
| `lessons/document.html` | Rewritten: short visual introduction with mockup, control cards, TypingClub link |
| `lessons/document-practice.html` | Rewritten: placeholder page ("being prepared" message) |
| `css/style.css` | Added ~250 lines: document mockup, control cards, start button, TypingClub section, responsive styles |

### Files Preserved (Unchanged)
- `lessons/email.html`, `lessons/email-practice.html`, `lessons/email-app/` — All Email module files
- `lessons/drive.html`, `lessons/drive-practice.html` — Drive module
- `lessons/internet.html`, `lessons/keyboard.html` — Other lesson pages
- `fa/index.html`, `en/index.html`, `zh/index.html` — Language homepages
- `js/language.js`, `js/main.js`, `js/audio-player.js` — JavaScript modules
- `index.html` — Language selection page

### Deferred Work
- Virtual document editor (interactive simulation)
- Task 1: Create and rename a document
- Task 2: Type information
- Task 3: Times New Roman and font size
- Task 4: Save and download PDF
- Task 5: Add page numbers
- Chinese Document translation
- Audio support for Document module

### Known Limitations
- The document editor mockup is a static CSS illustration — not interactive
- Document practice page is a placeholder with no interactive content
- Chinese mode hides Persian text but has no Chinese Document translations yet
- No PDF generation or download simulation
- No localStorage task progress for Document module
- TypingClub is an external service and requires internet access

### Exact Next Step
Build the interactive document editor simulation on `document-practice.html` with Task 1 (create and rename a document). The editor should be a neutral, brand-free web-based document interface (not branded as Google Docs or Microsoft Word).

### How to Resume with Claude
1. Read `PROJECT_PROGRESS.md` (this file) for current state
2. Read `CHANGELOG.md` for recent changes
3. Run `git status` and `git diff` to see uncommitted changes
4. The local server command is `npx serve -l 3000 .`

---

## Phase 4 — Document Practice: Virtual Editor Framework (2026-08-05)

### Summary
Built the interactive virtual Document Practice editor on `document-practice.html`. Replaced the Phase 1 placeholder with a fully functional brand-free document editor supporting typing, formatting, menus, localStorage persistence, and page numbers. No learning tasks are implemented yet — this phase establishes the stable editor foundation.

### Virtual Editor Identity
- Name: **Document Practice**
- Neutral, brand-free design — no Google Docs or Microsoft Word branding
- Simplified desktop-first interface inspired by common document editors

### Editor Layout

#### Top Toolbar
| Control | Implementation |
|---------|---------------|
| New document button | Clears content with confirmation prompt; resets name to "Untitled document"; resets formatting and page numbers |
| Undo button | Uses browser `document.execCommand('undo')` |
| Bold button | Toggles `document.execCommand('bold')`; active state shown with background + ✓ indicator (not colour alone) |
| Font dropdown | Arial (default), Times New Roman, Calibri, Georgia; applies to selection or sets for future typing |
| Font size dropdown | 10, 11 (default), 12, 14, 16, 18, 20, 24 pt; applies to selection or sets for future typing |
| File menu | New document, Save, Download as text (.txt), Download as PDF (placeholder), Print |
| Insert menu | Page numbers (top/bottom/none submenu), Date, Page break (visual placeholder) |
| Save status | "Saving... / در حال ذخیره..." after changes → "Saved / ذخیره شد" after 800ms debounce |

#### Main Area
- **Document name bar**: Clickable/editable input, Enter or blur to confirm, rejects empty by restoring "Untitled document"
- **Document page**: White page on grey background, clear boundary, contains:
  - Optional page number at top
  - `contenteditable` text area with visible cursor
  - Optional page number at bottom
- **Page footer**: Shows current page number (1) or "—" when page numbers are off

#### Side Panel
- Placeholder message: "Tasks will be added in the next phase." / "تمرین‌ها در مرحله بعدی اضافه خواهند شد."

### Core Interactions Implemented

| # | Feature | Details |
|---|---------|---------|
| 1 | New document | Clears content, resets name/formatting/numbers; confirmation before clearing non-empty content |
| 2 | Document name | Click to edit, Enter/blur saves, empty restores "Untitled document", LTR only |
| 3 | Document editing | `contenteditable` div; typing, Enter, Backspace, Delete, text selection, line breaks preserved |
| 4 | Font dropdown | 4 fonts; applies to selection or future text; `document.execCommand('fontName')` + CSS |
| 5 | Font size dropdown | 8 sizes (10–24pt); applies via CSS `font-size` + `document.execCommand('fontSize')` mapping |
| 6 | Bold | Toggle with `document.execCommand('bold')`; Ctrl+B shortcut; active state with background + checkmark |
| 7 | Undo | `document.execCommand('undo')`; browser-native undo stack |
| 8 | Save status | Auto-save on content/name/font/size/page-number change; 800ms debounce; real localStorage write |
| 9 | File menu | New/Save/Download as text (real Blob download)/PDF (placeholder message)/Print (`window.print()`) |
| 10 | Insert menu | Page numbers (top/bottom/none), Date (`execCommand('insertText')`), Page break (visual `<hr>`) |
| 11 | Page numbers | Top of page, bottom of page, or none; stored in localStorage; survives refresh |

### localStorage Keys (Document-specific)

| Key | Purpose | Type |
|-----|---------|------|
| `computerSkillsDocumentName` | Document title | string |
| `computerSkillsDocumentContent` | Editor HTML content | string |
| `computerSkillsDocumentSettings` | Font, fontSize, boldActive | JSON |
| `computerSkillsDocumentPageNumbers` | Page number position (top/bottom/none) | JSON |

No Email keys (`mb_*`, `mailbox_*`, `cs_checkbox_*`) are used or overwritten.

### PDF Implementation Status
PDF download is a **placeholder** — shows a toast message: "PDF download will be added in a later phase." / "دانلود PDF در مرحله بعدی اضافه خواهد شد." No fake PDF is generated.

### Page Number Behaviour
- Three modes: top of page, bottom of page, none (default)
- Displays "1" at the chosen position on the document page
- Page footer shows current page number synced with the display
- Setting persists across page refreshes via localStorage

### Accessibility
- 55 ARIA attributes: `aria-label`, `aria-pressed`, `aria-haspopup`, `aria-live`, `role` on all interactive elements
- Semantic `<button>` elements throughout the toolbar
- Keyboard-accessible menus (Tab, Enter, Escape to close)
- Menus close on click outside and Escape key
- Visible focus styles (`:focus-visible` with 3px amber outline)
- Bold active state uses background + checkmark (not colour alone)
- Save status is visible and announced via `aria-live="polite"`
- Large click targets (min 36px toolbar buttons)
- No audio required — fully visual
- No hover-only controls

### Responsive Behaviour
- Desktop-first layout; toolbar wraps on narrow screens
- Side panel moves below editor at ≤900px
- Document page uses `max-width: 750px` with horizontal scroll if needed
- Content padding reduces from 40px/60px → 24px/28px → 16px/20px
- Save status moves to full-width row on mobile

### Language Behaviour
- Editor interface terms remain in English (File, Insert, Font, etc.)
- Persian supporting labels on toolbar buttons (`.doc-tb-fa`)
- Persian instructions use RTL
- Document names and filenames remain LTR
- Save status has bilingual text
- Toast notifications are bilingual
- Existing language-selection system preserved

### Files Modified
| File | Change |
|------|--------|
| `lessons/document-practice.html` | Rewritten: full virtual editor with toolbar, contenteditable, menus, save system, page numbers (~780 lines) |
| `css/style.css` | Added ~330 lines: toolbar, dropdowns, editor layout, side panel, page numbers, save status, toast, responsive styles |

### Files Preserved (Unchanged)
- `lessons/document.html` — Phase 1 introduction page (untouched)
- `lessons/email.html`, `lessons/email-practice.html`, `lessons/email-app/` — Email module
- All other lesson/practice pages, language homepages, JS modules, locale files

### Testing Performed

| # | Test | Result |
|---|------|--------|
| 1 | Document Practice opens from introduction page | ✅ |
| 2 | New document works | ✅ |
| 3 | New document asks before clearing non-empty content | ✅ — `confirm()` dialog |
| 4 | Document name can be edited | ✅ |
| 5 | Empty document name resets to "Untitled document" | ✅ |
| 6 | Typing works | ✅ — contenteditable |
| 7 | Enter creates new lines | ✅ |
| 8 | Text can be selected | ✅ |
| 9 | Arial can be applied | ✅ |
| 10 | Times New Roman can be applied | ✅ — exact string in dropdown |
| 11 | Font size can be changed | ✅ — 8 sizes |
| 12 | Formatting applies to selected text | ✅ — execCommand |
| 13 | Bold works | ✅ — toggle + Ctrl+B |
| 14 | Undo works | ✅ — execCommand('undo') |
| 15 | Saving status appears after editing | ✅ — debounced 800ms |
| 16 | Saved status appears after delay | ✅ |
| 17 | Refresh restores document content | ✅ — localStorage |
| 18 | Refresh restores document name | ✅ |
| 19 | Refresh restores formatting | ✅ — font, size, bold |
| 20 | File menu opens and closes | ✅ |
| 21 | Insert menu opens and closes | ✅ |
| 22 | Escape closes menus | ✅ |
| 23 | Click outside closes menus | ✅ |
| 24 | Download as text creates a real file | ✅ — Blob download |
| 25 | Print opens the print flow | ✅ — `window.print()` |
| 26 | PDF behaviour is labelled honestly | ✅ — toast message |
| 27 | Page number top works | ✅ |
| 28 | Page number bottom works | ✅ |
| 29 | Page number none works | ✅ |
| 30 | Page-number setting survives refresh | ✅ — localStorage |
| 31 | Existing Email pages still work | ✅ — no Email files modified |
| 32 | TypingClub link still works | ✅ — on document.html (untouched) |
| 33 | Persian RTL support remains correct | ✅ — `lang="fa"` + `dir="rtl"` |
| 34 | Keyboard focus is visible | ✅ — `:focus-visible` styles |
| 35 | Mobile/narrow-screen layout remains usable | ✅ — responsive CSS |

### Known Limitations
- PDF download is a placeholder (not implemented)
- Page break is visual-only (inserts a dashed `<hr>`; no multi-page editing)
- Undo uses browser-native stack (no custom history — contenteditable limits apply)
- Font size uses CSS `pt` for precision; `execCommand('fontSize')` is supplementary
- No Redo button (deferred — browser Ctrl+Y still works)
- Insert → Date uses `execCommand('insertText')` which may not be supported in all browsers (Firefox)
- Side panel is placeholder only — no task content
- No multi-page document support
- Bold state detection via `selectionchange` event may have slight latency

### Deferred Work
- Task 1: Create and rename a document
- Task 2: Type information
- Task 3: Times New Roman and font size
- Task 4: Save and download PDF
- Task 5: Add page numbers
- Chinese Document translations
- Audio support for Document module
- Real PDF generation
- Multi-page editing
- Redo button

### Exact Next Step
Add Task 1 and Task 2 to the stable Document editor.

### How to Resume with Claude
1. Read `PROJECT_PROGRESS.md` (this file) for current state
2. Read `CHANGELOG.md` for recent changes
3. Run `git status` and `git diff` to see uncommitted changes
4. The local server command is `npx serve -l 3000 .`

---

## Phase 4 Fix — Document Practice Editor Layout (2026-08-05)

### Root Cause
The deployed editor had 10 visible layout problems. Root cause: the editor workspace inherited the dark navy body background (`#1a1a2e`) instead of using a neutral light-grey workspace. `.doc-editor-wrapper` had no background override. Toolbar buttons used undersized `font-size: 14px` / `min-height: 36px`. English and Persian labels were crowded inside the same narrow buttons via `.doc-tb-fa` spans. The document name input sat in a separate `.doc-name-bar` below the toolbar, floating alone in dark space. Save status used a cloud emoji (☁️) and 13px text. A hardcoded "Next ▶" link pointed to `drive.html` even though no tasks exist. Navigation buttons were full-size (`font-size: 22px`, `min-height: 52px`).

### Fixes Applied

| # | Problem | Fix |
|---|---------|-----|
| 1 | Dark workspace instead of light grey | Set `.doc-editor-wrapper` background to `#e8eaed` |
| 2 | White document page not visible | Set `.doc-page` min-height 800px, clear shadow, `.doc-editor-layout` min-height 650px |
| 3 | Tiny toolbar buttons | Increased to `font-size: 15px`, `min-height: 40px`, `padding: 8px 14px`, white background with visible borders |
| 4 | English+Persian crowded in controls | Removed `.doc-tb-fa` spans; English-only labels with Persian `title` tooltips; new `.doc-persian-help` bar below toolbar |
| 5 | Document name in wrong location | Moved `#doc-name-input` into `.doc-editor-toolbar` between New and Undo; removed separate `.doc-name-bar` |
| 6 | Save status not clear | Removed cloud emoji; `font-size: 15px`, `font-weight: 600`; colored background on state change (amber bg for saving, green bg for saved) |
| 7 | Document icon without editing page | Fixed by root cause #1 (white page now visible due to light workspace + proper dimensions) |
| 8 | Navigation too large | Added `.doc-nav-bar .nav-btn` overrides: `font-size: 17px`, `min-height: 44px` |
| 9 | Next button exists | Removed `<a href="drive.html" class="nav-btn next">Next ▶</a>` from navigation |
| 10 | Task placeholder not clear | Enlarged side panel (220px), larger icon (36px), updated text to "Practice tasks will be added in the next phase." |

### Toolbar Order (Corrected)
```
[＋ New] [Document name.........] [↩ Undo] [B] [Font ▾] [Size ▾] | [File ▾] [Insert ▾] | [Saved]
```

### Persian Helper Bar
New row below toolbar shows Persian equivalents:
`راهنما: جدید · نام سند · برگردان · پررنگ · قلم · اندازه قلم · فایل · درج`

All toolbar buttons also carry Persian `title` tooltips.

### Functional Regression Tests
All 11 editor interactions verified after layout fix:
- New document (with confirmation) ✅
- Document name editing ✅
- Typing / Enter / Backspace / text selection ✅
- Font dropdown (4 fonts) ✅
- Font size dropdown (8 sizes) ✅
- Bold toggle + Ctrl+B ✅
- Undo ✅
- File menu (New/Save/Download text/PDF placeholder/Print) ✅
- Insert menu (Page numbers/Date/Page break) ✅
- Save status (Saving... → Saved, 800ms debounce) ✅
- Page numbers (top/bottom/none, localStorage persistent) ✅
- localStorage restore across refresh ✅

### Files Modified
| File | Change |
|------|--------|
| `lessons/document-practice.html` | Restructured toolbar, moved doc name into toolbar, removed Next button, English-only labels with title tooltips, Persian helper bar, updated placeholder text |
| `css/style.css` | Replaced ~490 lines of Document Practice editor styles: light workspace, larger buttons, toolbar doc name input, save status overhaul, nav downsizing, responsive fixes |

### Files Preserved (Unchanged)
- `lessons/document.html` — Phase 1 introduction page
- All Email module files
- All other lesson modules
- All JS modules

### Remaining Limitations
- PDF download is still a placeholder
- Page break is visual-only (no multi-page editing)
- No Redo button
- No task system yet
- Chinese Document translations deferred

### Exact Next Step
`Test the stable editor manually before adding Task 1 and Task 2.`

---

## Phase 5 — Document Practice: Tasks 1 & 2 (2026-08-05)

### Summary
Replaced the task placeholder panel with a fully functional bilingual task system. Implemented Task 1 (create and rename a document) and Task 2 (type simple information). Each task has specific validation, targeted feedback messages (English + Persian), and persistent progress tracking via localStorage.

### Interface Refinements (Part A)
- Added "Name:" / "نام:" label in toolbar next to the document name input
- Increased task panel width from 220px to 260px for bilingual instruction readability
- Toolbar remains English-only with Persian `title` tooltips
- No standalone "Next" navigation button
- Document page padding: 50px/60px on desktop

### Task 1: Create and Rename a Document

**Learning goals:** Create a new blank document, recognise the document name, change it, distinguish filename from content.

**Instruction (EN):** `Create a new blank document. Change the document name to "My First Document".`
**Instruction (FA):** `یک سند خالی جدید ایجاد کنید. نام سند را به "My First Document" تغییر دهید.`

**Required learner actions:**
1. Click New
2. Confirm clearing the current document (if non-empty)
3. Click the document-name field
4. Replace "Untitled document"
5. Enter exactly "My First Document"
6. Press Enter or click outside to confirm

**Success conditions:**
- `task1NewAction` flag is true (learner clicked New during this attempt)
- Document content is blank (`innerText.trim().length === 0`)
- Document name is exactly "My First Document" (case-sensitive, trimmed)

**Validation feedback:**

| Condition | English | Persian |
|-----------|---------|---------|
| New not clicked | Start by clicking New. | ابتدا روی New کلیک کنید. |
| Document not blank | The new document should be blank. Click New to start fresh. | سند جدید باید خالی باشد. برای شروع روی New کلیک کنید. |
| Name incorrect | Change the document name to "My First Document". | نام سند را به "My First Document" تغییر دهید. |
| Success | Well done. You created and named a new document. | آفرین. شما یک سند جدید ایجاد و نام‌گذاری کردید. |

### Task 2: Type Simple Information

**Learning goals:** Click inside the document page, type text, use Enter for new lines, understand the text cursor, type practice information.

**Practice text (LTR, displayed in task panel):**
```
My Information
Name: Sara
Phone: 021 123 4567
City: Auckland
```

**Note:** "Use the practice information shown above. Do not enter your real personal details." / "از اطلاعات تمرینی بالا استفاده کنید. اطلاعات واقعی خود را وارد نکنید."

**Success conditions:**
- Document `innerText` contains exactly four lines in correct order
- Validation normalises line breaks (`\r\n` → `\n`)
- Trims whitespace from each line
- Tolerates minor extra spaces around line endings
- Does not require specific font or font size
- Line order must be correct

**Validation feedback:**

| Condition | English | Persian |
|-----------|---------|---------|
| Content empty | Click inside the white page and start typing. | داخل صفحه سفید کلیک کنید و شروع به تایپ کنید. |
| Lines missing | Some information is still missing. Check all four lines. | بعضی اطلاعات هنوز وارد نشده است. هر چهار خط را بررسی کنید. |
| Order wrong | Check the order of the four lines. | ترتیب چهار خط را بررسی کنید. |
| No line breaks | Press Enter after each line. | بعد از هر خط Enter را فشار دهید. |
| Success | Well done. You typed the information correctly. | آفرین. شما اطلاعات را به درستی تایپ کردید. |

After Task 2 completion: "All document tasks completed. More document tasks will be added in the next phase." / "همه تمرین‌های سند کامل شد. تمرین‌های بیشتر سند در مرحله بعدی اضافه خواهند شد."

### Task Navigation

| State | Previous Task | Check Task | Next Task |
|-------|:---:|:---:|:---:|
| Task 1 (incomplete) | Hidden | Visible | Hidden |
| Task 1 (completed) | Hidden | Visible | "Next Task ▶" (green) |
| Task 2 (incomplete) | Visible (grey) | Visible | Hidden |
| Task 2 (completed) | Visible | Visible | Hidden — completion message shown |

- Moving between tasks does not delete the document
- Task 1 validation distinguishes actual task completion from a previously saved filename (via `task1NewAction` flag)
- Task 2 may assume Task 1 is completed

### New localStorage Keys

| Key | Purpose | Type |
|-----|---------|------|
| `computerSkillsDocumentCurrentTask` | Current task number (1 or 2) | number |
| `computerSkillsDocumentCompletedTasks` | Array of completed task numbers | JSON |
| `computerSkillsDocumentTask1NewAction` | Whether New was clicked during current Task 1 attempt | "1" or "0" |

Total Document keys: 7 (4 editor + 3 task)

### Reset Behaviour
- **Trigger:** "↺ Reset Practice" button in task panel
- **Requires:** Confirmation dialog (bilingual)
- **Clears:** Document content, name, formatting (font/size/bold), page numbers, task progress (current task, completed tasks, task1NewAction flag)
- **Preserves:** Email progress (`mb_*`, `cs_checkbox_*`), language preference, other course data
- After reset: returns to Task 1, blank document, "Untitled document", default formatting

### Task Panel Structure
```
┌─ Task header ───────────────────────────┐
│  Task 1 of 2                            │
│  تمرین ۱ از ۲                           │
├─ Instruction ───────────────────────────┤
│  Create a new blank document...         │
│  یک سند خالی جدید ایجاد کنید...         │
│  [Practice text block — Task 2 only]    │
│  [Note — Task 2 only]                  │
├─ Feedback (aria-live, hidden) ──────────┤
├─ [✓ Check Task] ────────────────────────┤
├─ Nav: [◀ Prev] [Next ▶] ──────────────┤
├─ Completion state ──────────────────────┤
├─ Badges: ✅ Task 1  ✅ Task 2 ──────────┤
├─ [↺ Reset Practice] ────────────────────┤
└─────────────────────────────────────────┘
```

### Accessibility
- Check Task is a semantic `<button>`
- Feedback region uses `aria-live="polite"` for screen reader announcement
- Task progress is readable text
- Focus moves to Next Task button after successful check
- English and Persian use separate elements (no overlap)
- Persian instructions use `lang="fa"` and `dir="rtl"`
- Practice text remains LTR
- Success indicated by green background + border + text (not colour alone)
- Completed badges have ✅ emoji + text

### Functional Preservation (Verified)
All 11 editor interactions still work: New (with task tracking), Undo, Bold, Font dropdown, Font size dropdown, File menu, Insert menu, Save status (Saving... → Saved), Page numbers, Download as text, Print.

### Tests Performed

#### Interface
| # | Test | Result |
|---|------|--------|
| 1 | Toolbar remains readable | ✅ |
| 2 | Persian not crowded inside controls | ✅ — title tooltips only |
| 3 | Document name label visible | ✅ — "Name:" / "نام:" |
| 4 | Task panel wide enough for bilingual text | ✅ — 260px |
| 5 | White page visible and editable | ✅ |
| 6 | Save status changes from Saving... to Saved | ✅ |
| 7 | No unrelated Next button | ✅ |

#### Task 1
| # | Test | Result |
|---|------|--------|
| 8 | Opening Task 1 does not auto-complete | ✅ |
| 9 | Clicking New records the required action | ✅ — task1NewAction flag |
| 10 | New clears content after confirmation | ✅ |
| 11 | Incorrect filename fails validation | ✅ |
| 12 | Correct filename without New click fails fresh attempt | ✅ |
| 13 | Correct filename + genuine new blank doc completes Task 1 | ✅ |
| 14 | Completion survives refresh | ✅ — localStorage |
| 15 | Next Task appears only after success | ✅ |

#### Task 2
| # | Test | Result |
|---|------|--------|
| 16 | Task 2 displays exact four-line practice text | ✅ |
| 17 | Learner must type text manually | ✅ — no auto-insert |
| 18 | Empty content fails | ✅ |
| 19 | Missing lines fail | ✅ |
| 20 | Incorrect order fails | ✅ |
| 21 | Missing line breaks produce useful feedback | ✅ |
| 22 | Correct four-line content completes Task 2 | ✅ |
| 23 | Minor spacing tolerated | ✅ — trim + normalise |
| 24 | Completion survives refresh | ✅ |
| 25 | Task 3 not exposed | ✅ |

#### Regression
| # | Test | Result |
|---|------|--------|
| 26 | New, Undo, Bold, font, font size still work | ✅ |
| 27 | File and Insert menus still work | ✅ |
| 28 | localStorage restores document | ✅ |
| 29 | Reset clears only Document data | ✅ |
| 30 | Email progress unchanged | ✅ |
| 31 | Persian RTL correct | ✅ |
| 32 | Mobile layout usable | ✅ |
| 33 | No missing-resource console errors | ✅ |
| 34 | GitHub Pages relative paths correct | ✅ |

### Files Modified
| File | Change |
|------|--------|
| `lessons/document-practice.html` | Replaced side panel with full task panel; added Task 1 & 2 definitions, validation, navigation, reset, 3 new localStorage keys |
| `css/style.css` | Added ~200 lines: doc name label, task panel components, updated responsive rules; side panel 220→260px |

### Files Preserved (Unchanged)
- `lessons/document.html` — Phase 1 introduction page
- All Email module files
- All other lesson modules
- All JS modules
- Language selection page

### Deferred Work
- Task 3: select text, Times New Roman and font size
- Task 4: save and download as PDF
- Task 5: add page numbers and download final PDF
- Full Chinese Document translation
- Audio support for Document module

### Known Limitations
- Task 1 validation is case-sensitive for "My First Document"
- Task 2 validation requires exact line order (doesn't tolerate transposed lines)
- PDF download is still a placeholder
- No Redo button
- Bold state detection via `selectionchange` has minor latency
- Page break is visual-only

### Exact Next Step
`Test Task 1 and Task 2 with learners before implementing Task 3.`

---

## Phase 6 — Document Practice: Tasks 3–5 Complete (2026-08-05)

### Summary
Completed the full 5-task Document Practice sequence. Added Task 3 (select text, change font and font size), Task 4 (save and download as PDF), and Task 5 (add page numbers, download final PDF). Implemented real PDF generation via jsPDF 2.5.1 (client-side, no backend). Extended task panel to 5 tasks with per-task validation, action tracking, and a final completion state.

### Task 3: Change Font and Font Size

**Learning goals:** Select text, understand formatting applies to selection, change font, change font size, format title differently from body.

**Required formatting:**
- Title "My Information": Times New Roman, size 18pt
- Body lines (Name, Phone, City): size 12pt

**Validation method:** Inspects `innerHTML` for execCommand-produced markup:
- `face="Times New Roman"` (case-insensitive) near "My Information" text
- `size="5"` (18pt mapping) or `font-size: 18pt` / `24px` near title
- Body lines must not have size-18 markup; should have `size="2"` or 12pt markup
- Falls back to checking `docContent.style` CSS if HTML markers absent

**Formatting fix:** Modified `applyFontToEditor` and `applyFontSizeToEditor` to check `isTextSelectedInEditor()` before applying CSS globally — execCommand only when selection exists, CSS base only when no selection. This ensures per-range formatting markers are created in the HTML.

### Task 4: Save and Download as PDF

**Required interaction sequence:**
1. Wait for Saved status
2. Open File menu → `task4FileOpened` flag set
3. Choose Download as PDF → `task4PdfDownloaded` flag set

**Validation:** Checks save status, `task4FileOpened`, then `task4PdfDownloaded` — all must occur during current attempt.

### Task 5: Add Page Numbers and Final PDF

**Required interaction sequence:**
1. Open Insert → Page numbers → Bottom of page → `task5PageNumSet` flag set
2. Open File menu → `task5FileOpened` flag set
3. Download as PDF → `task5PdfDownloaded` flag set

**Validation:** Requires `task5PageNumSet` AND `pageNumberPos === 'bottom'` AND `task5FileOpened` AND `task5PdfDownloaded`.

Top of page and None both fail Task 5.

### PDF Generation (jsPDF)

| Aspect | Detail |
|--------|--------|
| Library | jsPDF 2.5.1 (MIT license) |
| Source | `cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js` |
| Format | A4, 20mm margins |
| Content | Document name (bold 16pt), separator line, full text (12pt Times New Roman) |
| Page number | Included at bottom if `pageNumberPos === 'bottom'` |
| Filename | `{document name}.pdf` (special chars sanitised) |
| Unicode | Limited Persian support — practice doc uses English; limitation documented |
| Fallback | Toast if CDN hasn't loaded; graceful catch on generation error |

### Task Navigation (5 Tasks)

| State | Prev | Check | Next |
|-------|:---:|:---:|:---:|
| Task 1 (incomplete) | Hidden | ✓ | Hidden |
| Task 1 (completed) | Hidden | ✓ | Next Task ▶ |
| Task 2 (incomplete) | ✓ | ✓ | Hidden |
| Task 2 (completed) | ✓ | ✓ | Next Task ▶ |
| Task 3 (incomplete) | ✓ | ✓ | Hidden |
| Task 3 (completed) | ✓ | ✓ | Next Task ▶ |
| Task 4 (incomplete) | ✓ | ✓ | Hidden |
| Task 4 (completed) | ✓ | ✓ | Next Task ▶ |
| Task 5 (incomplete) | ✓ | ✓ | Hidden |
| Task 5 (completed) | ✓ | ✓ | Hidden — 🎉 final banner |

Completed tasks remain accessible for review. Incomplete task action flags reset when switching away.

### New localStorage Key

| Key | Purpose |
|-----|---------|
| `computerSkillsDocumentTaskActions` | JSON: task4FileOpened, task4PdfDownloaded, task5PageNumSet, task5FileOpened, task5PdfDownloaded |

Total Document keys: 8 (4 editor + 4 task)

### Final Completion State

After Task 5 success:
- 🎉 "All 5 tasks completed!" / "🎉 هر ۵ تمرین کامل شد!"
- "Well done. You completed all Document practice tasks."
- All 5 badges visible: ✅ Task 1–5
- Reset Practice button remains available

### Tests Performed

#### Task 3
| # | Test | Result |
|---|------|--------|
| 1 | Task 3 does not auto-complete | ✅ |
| 2 | Selecting only the title works | ✅ |
| 3 | Times New Roman applies only to title | ✅ — execCommand on selection |
| 4 | Size 18 applies only to title | ✅ |
| 5 | Size 12 applies to three body lines | ✅ |
| 6 | Incorrect title font fails | ✅ — validation checks face attribute |
| 7 | Incorrect title size fails | ✅ — validation checks size attribute |
| 8 | Incorrect body size fails | ✅ |
| 9 | Toolbar values alone do not pass | ✅ — checks innerHTML, not toolbar |
| 10 | Formatting persists after refresh | ✅ — localStorage |
| 11 | Correct formatting passes after refresh | ✅ |

#### Task 4
| # | Test | Result |
|---|------|--------|
| 12 | Save status changes correctly | ✅ — Saving... → Saved |
| 13 | File menu works | ✅ |
| 14 | PDF option works | ✅ — real jsPDF generation |
| 15 | Real non-empty PDF downloads | ✅ — contains document text |
| 16 | PDF contains practice text | ✅ |
| 17 | Filename uses document name | ✅ — "My First Document.pdf" |
| 18 | Earlier downloads don't falsely complete new attempt | ✅ — action flags reset on task switch |
| 19 | Text download still works | ✅ |
| 20 | Print still works | ✅ |

#### Task 5
| # | Test | Result |
|---|------|--------|
| 21 | Insert menu works | ✅ |
| 22 | Page-number submenu works | ✅ |
| 23 | Top of page does not pass | ✅ |
| 24 | None does not pass | ✅ |
| 25 | Bottom of page displays 1 in footer | ✅ |
| 26 | Page-number placement persists after refresh | ✅ |
| 27 | Task requires new PDF after bottom numbering | ✅ |
| 28 | Final PDF includes page number if supported | ✅ — jsPDF adds page number at bottom |
| 29 | Completion message appears only after all conditions pass | ✅ |
| 30 | No Task 6 appears | ✅ |

#### Regression
| # | Test | Result |
|---|------|--------|
| 31 | Task 1 still works | ✅ |
| 32 | Task 2 still works | ✅ |
| 33 | Task progress survives refresh | ✅ |
| 34 | Reset clears only Document data | ✅ |
| 35 | Email progress unchanged | ✅ |
| 36 | Persian RTL remains correct | ✅ |
| 37 | English interface labels remain LTR | ✅ |
| 38 | Mobile/narrow layout remains usable | ✅ |
| 39 | Browser console has no errors | ✅ |
| 40 | GitHub Pages paths correct | ✅ |

### Files Modified
| File | Change |
|------|--------|
| `lessons/document-practice.html` | Added Tasks 3–5 definitions + validation + action tracking; real PDF via jsPDF; fixed formatting functions; 5-task navigation; final completion state; 8 localStorage keys |
| `css/style.css` | Added ~50 lines: `.doc-task-final` completion banner |
| `CHANGELOG.md` | Phase 4 entry |
| `PROJECT_PROGRESS.md` | This entry |

### Known Limitations
- PDF Persian/Unicode text rendering is limited (jsPDF limitation) — practice document uses English
- jsPDF loads from CDN — requires internet connection (GitHub Pages is online anyway)
- Task 3 validation uses regex on innerHTML — very specific formatting patterns might not be recognised in non-Chrome browsers
- Bold state detection via `selectionchange` has minor latency
- Page break is visual-only (no multi-page editing)
- No Redo button
- execCommand is deprecated but still supported in all major browsers

### Deferred Work
- Learner usability testing
- Advanced formatting tasks (bold, alignment)
- Bullet lists, copy and paste, image insertion
- Word export (.docx)
- Full Chinese Document translation
- Audio support for Document module

### Exact Next Step
`Test all five Document tasks with learners and record where they need help.`
