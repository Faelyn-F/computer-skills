# 🖥️ Computer Skills — Bilingual Teaching Website

A static website for teaching basic computer skills to Deaf Iranian adult learners.
All content is bilingual: **English first**, then **Persian (فارسی)** underneath.

📚 **Skills taught:** Email (Gmail/MailBox), Document creation (Google Docs), Google Drive, Internet basics, Keyboard & mouse.

---

## 🚀 Deploy to GitHub Pages

1. Push this project to a GitHub repository.
2. Go to **Settings** → **Pages**.
3. Under **"Branch"**, select `master` (or `main`) and folder `/ (root)`.
4. Click **Save**.
5. Wait 1–2 minutes. The site will be live at `https://YOUR-USERNAME.github.io/computer-skills/`.

---

## 📁 Project Structure

```
computer-skills/
├── index.html                          # Home page (5 lesson cards)
├── lessons/
│   ├── email.html                      # Email lesson reference (9 steps + screenshot SVGs)
│   ├── email-practice.html             # Email interactive guided practice (original)
│   ├── email-app/                      # 📬 MAILBOX SIMULATION (new v2)
│   │   ├── register.html               #   Create account (full form + validation)
│   │   ├── signin.html                 #   Sign in + password recovery (4-step flow)
│   │   ├── inbox.html                  #   Inbox / compose / read / manage / search
│   │   ├── terms.html                  #   Fictional Terms of Service & Privacy Policy
│   │   ├── tasks.html                  #   Task Cards (20 tasks, English + Persian)
│   │   ├── teacher.html                #   Teacher Review Panel (access-code protected)
│   │   └── js/
│   │       └── mailbox-store.js        #   Core data layer (localStorage API)
│   ├── document.html                   # Google Docs lesson (9 steps)
│   ├── document-practice.html          # Google Docs interactive practice
│   ├── drive.html                      # Google Drive lesson (6 steps)
│   ├── drive-practice.html             # Google Drive interactive practice
│   ├── internet.html                   # Internet basics lesson (7 steps)
│   └── keyboard.html                   # Keyboard & mouse lesson (7 steps)
├── images/
│   ├── placeholder.svg                 # Generic placeholder
│   └── screenshots/
│       └── email-*.svg                 # 9 Email lesson screenshot illustrations
├── css/
│   └── style.css                       # Global styles (responsive, RTL/LTR)
├── js/
│   └── main.js                         # Checkbox state, navigation helpers
└── README.md
```

---

## 📬 MailBox Email Simulation — How It Works

The `lessons/email-app/` directory contains a complete standalone email simulation called **MailBox**.

### 🔒 Privacy & Safety

- **NO real data is transmitted anywhere.** Everything stays in the browser using `localStorage`.
- **NO connection to Gmail, Outlook, or any real email provider.**
- **NO real passwords should be entered.** The password field accepts any practice password.
- The simulated email domain is `@mailbox.example` (not a real domain).
- A privacy warning is displayed outside the registration form reminding learners not to reuse real passwords.

### 🗄️ localStorage Usage

| localStorage Key | Purpose |
|------------------|---------|
| `mailbox_accounts` | All simulated user accounts (name, email, password hash, recovery info) |
| `mailbox_emails_{username}` | Email messages for each user (inbox, sent, drafts, spam, trash) |
| `mailbox_session` | Current signed-in user and session state |
| `mailbox_reset_codes` | Temporary password reset verification codes |
| `mailbox_tasks` | Completed task identifiers |
| `mailbox_teacher_code` | Teacher panel access code (default: `teacher123`) |

**⚠️ Important:** The password "hashing" (`simpleHash`) is for simulation only. It is NOT cryptographic. Never use this project to store real passwords.

### 👤 How to Add Fictional Accounts

Learners create accounts through `register.html`. Teachers can also programmatically add accounts by opening the browser console and running:

```javascript
MailboxStore.createAccount({
  firstName: 'Ali',
  lastName: 'Rezaei',
  username: 'ali.rezaei',
  password: 'Practice123',
  recoveryEmail: 'ali@example.com',
  phone: '',
  country: 'Iran',
  language: 'en-fa',
  dob: { day: 15, month: 3, year: 1990 },
  agreedToTerms: true
});
```

### 📧 Pre-loaded Inbox Messages

When a new account is created, 6 fictional emails are automatically added to the inbox:

| # | From | Subject | Attachment |
|---|------|---------|------------|
| 1 | Springfield College | Your Class Timetable | timetable.pdf |
| 2 | City Health Clinic | Appointment Confirmation | appointment-details.pdf |
| 3 | Riverside Community Centre | Welcome Lunch | — |
| 4 | Mrs. Lisa Chen | Welcome to English Class | — |
| 5 | LUCKY PRIZE WINNER (spam) | URGENT!!! You Have WON | — |
| 6 | City Public Library | Your Library Card is Ready | class-photo.jpg |

To modify pre-loaded emails, edit the `getPreloadedEmails()` function in `js/mailbox-store.js`.

### 📋 Task Cards

`tasks.html` contains 20 example tasks across 6 categories:
- **Account Creation** (4 tasks)
- **Signing In** (3 tasks)
- **Sending Email** (3 tasks)
- **Reading Email** (2 tasks)
- **Managing Email** (4 tasks)
- **Email Safety** (3 tasks)
- **Persian Practice** (1 task)

Tasks describe outcomes only — they do NOT tell the learner which button to click.
Each task is bilingual (English + Persian).

To add new task cards, edit `tasks.html` following the existing card template.

### 📎 Practice Attachments

Fictional attachment filenames (e.g., `timetable.pdf`, `appointment-details.pdf`) are bundled in the simulation. They are referenced by name only — no real files are uploaded or downloaded. When a learner "attaches" a file, a random sample filename is added to the compose window.

To add new fictional attachment names, edit the `sampleFiles` array in the `attach` click handler inside `inbox.html`.

### 🔍 Teacher Review Panel

Access the teacher panel at `lessons/email-app/teacher.html`.

**Default access code:** `teacher123` (configurable in `mailbox-store.js` → `getTeacherCode()`).

**Features:**
- View all simulated accounts and their data
- View sent messages, drafts, spam/trash items
- View completed tasks
- Export all practice data as a downloadable JSON file
- Print a review summary
- Reset inboxes (restore pre-loaded emails)
- Delete accounts
- Reset all practice data

**⚠️ Security note:** The access code is stored in plain text in `localStorage`. This is NOT secure authentication. It exists only to prevent learners from accidentally accessing the panel. Do NOT store sensitive information.

To change the access code, run this in the browser console on any MailBox page:
```javascript
MailboxStore.setTeacherCode('your-new-code');
```

---

## 🎨 Design Features (All Pages)

| Feature | Description |
|---------|-------------|
| 🌐 Bilingual | English + Persian on every step |
| 📱 Responsive | Desktop, tablet, and phone |
| ♿ Accessible | Large text, large buttons, keyboard navigation, alt text, skip links, visible focus |
| 🧏 Deaf-friendly | No audio, visual instructions, icons, numbered steps |
| ↔️ RTL + LTR | Persian RTL, English LTR, auto-detection in email compose |
| ✅ Progress | "Completed" checkboxes saved in localStorage |
| 🧭 Navigation | Previous / Home / Next buttons on every page |
| 🎨 High contrast | Dark header, white cards, yellow accents |

---

## 🧪 Testing Checklist

- [x] Create a simulated account
- [x] Reject a duplicate username
- [x] Reject a weak password (fewer than 8 chars, no numbers)
- [x] Reject mismatched passwords
- [x] Sign in successfully
- [x] Handle an incorrect password
- [x] Recover a simulated password (4-step flow)
- [x] Compose and send an email (To, Cc, Bcc, subject, body)
- [x] Send without subject (confirmation prompt)
- [x] Save and reopen a draft (auto-save on 2s idle)
- [x] Reply and forward
- [x] Add and remove an attachment
- [x] Search for an email
- [x] Move email to Trash and restore it
- [x] Report a message as spam
- [x] Star and unstar messages
- [x] Type Persian right-to-left (auto-detection)
- [x] Type mixed Persian and English
- [x] Navigate using only the keyboard (Tab, Enter, Delete, Escape, Ctrl+Enter)
- [x] Spam link disabled with safe message
- [x] Reset all locally stored practice data
- [x] Export practice data as JSON
- [x] Print summary

---

## ⚠️ Persian Translation Note

All Persian translations in this project were created with AI assistance.
**They should be reviewed by a fluent Persian speaker** before use in a real classroom.

---

## 📝 License

This project is for educational use. Feel free to adapt it for your classroom.
