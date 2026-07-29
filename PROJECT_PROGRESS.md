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
