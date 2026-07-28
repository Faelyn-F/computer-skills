# 🖥️ Computer Skills — Bilingual Teaching Website

A static website for teaching basic computer skills to Deaf Iranian adult learners.  
All content is bilingual: **English first**, then **Persian (فارسی)** underneath.

📚 **Skills taught:** Email (Gmail), Document creation (Google Docs), Google Drive, Internet basics, Keyboard & mouse.

## 🚀 Deploy to GitHub Pages

### Step 1 — Create a GitHub repository

1. Go to [github.com](https://github.com) and sign in.
2. Click the **+** icon (top right) → **New repository**.
3. Name it: `computer-skills` (or any name you like).
4. Keep it **Public**.
5. Do **NOT** add a README, .gitignore, or license (this project already has them).
6. Click **Create repository**.

### Step 2 — Push the code to GitHub

Open a terminal (Command Prompt or PowerShell) in this folder, then run:

```bash
# Initialize git
git init
git add .
git commit -m "Initial commit: bilingual computer skills website"

# Connect to your GitHub repository (replace YOUR-USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/computer-skills.git

# Push the code
git branch -M main
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. Go to your repository on GitHub.
2. Click **Settings** (top tab).
3. Click **Pages** (left sidebar).
4. Under **"Branch"**, select `main` and folder `/ (root)`.
5. Click **Save**.
6. Wait 1–2 minutes. Your website will be live at:  
   `https://YOUR-USERNAME.github.io/computer-skills/`

---

## 📁 Project Structure

```
computer-skills/
├── index.html                   # Home page with 5 lesson cards
├── lessons/
│   ├── email.html               # Email lesson (9 steps)
│   ├── document.html            # Google Docs lesson (9 steps)
│   ├── drive.html               # Google Drive lesson (6 steps)
│   ├── internet.html            # Internet basics lesson (7 steps)
│   └── keyboard.html            # Keyboard & mouse lesson (7 steps)
├── css/
│   └── style.css                # Global styles (responsive, RTL/LTR)
├── js/
│   └── main.js                  # Checkbox state, navigation helpers
├── images/
│   └── placeholder.png          # Screenshot placeholder
└── README.md                    # This file
```

## 🎨 Design Features

| Feature | Description |
|---------|-------------|
| 🌐 Bilingual | English + Persian on every step |
| 📱 Responsive | Works on desktop, tablet, and phone |
| ♿ Accessible | Large text, large buttons, keyboard navigation, alt text, skip links |
| 🧏 Deaf-friendly | No audio, visual instructions, icons, numbered steps |
| ↔️ RTL + LTR | Persian paragraphs are right-to-left, English is left-to-right |
| ✅ Progress | "Completed" checkboxes saved in your browser |
| 🧭 Navigation | Previous / Home / Next buttons on every page |
| 🎨 High contrast | Dark header, white cards, yellow accents |

## ⚠️ Persian Translation Note

All Persian translations in this project were created with AI assistance.  
**They should be reviewed by a fluent Persian speaker** before use in a real classroom.

## 📝 License

This project is for educational use. Feel free to adapt it.
