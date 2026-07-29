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
