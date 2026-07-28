/* ============================================================
   MailBox Store — Core Data Layer
   Manages all localStorage operations for the MailBox simulation.
   NO real data is ever transmitted — everything stays in the browser.
   ============================================================ */

var MailboxStore = (function () {
  'use strict';

  // --- localStorage keys ---
  var ACCOUNTS_KEY = 'mailbox_accounts';
  var EMAILS_PREFIX = 'mailbox_emails_';
  var SESSION_KEY = 'mailbox_session';
  var RESET_CODES_KEY = 'mailbox_reset_codes';
  var TASKS_KEY = 'mailbox_tasks';
  var TEACHER_CODE_KEY = 'mailbox_teacher_code';

  // ============================================================
  //  INTERNAL HELPERS
  // ============================================================

  function loadJSON(key) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function saveJSON(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (e) {
      return false;
    }
  }

  function now() {
    return new Date().toISOString();
  }

  function nowDisplay() {
    var d = new Date();
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var h = d.getHours();
    var ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12; if (h === 0) h = 12;
    var m = String(d.getMinutes()).padStart(2, '0');
    return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear() + ' ' + h + ':' + m + ' ' + ampm;
  }

  function generateId() {
    return 'em_' + Date.now() + '_' + Math.random().toString(36).substr(2, 8);
  }

  function generateResetCode() {
    return String(Math.floor(100000 + Math.random() * 900000));
  }

  function simpleHash(str) {
    // NOT cryptographic — for simulation only
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      var ch = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + ch;
      hash = hash & hash;
    }
    return 'sim_' + Math.abs(hash).toString(36);
  }

  // ============================================================
  //  ACCOUNT MANAGEMENT
  // ============================================================

  function getAccounts() {
    return loadJSON(ACCOUNTS_KEY) || {};
  }

  function saveAccounts(accounts) {
    return saveJSON(ACCOUNTS_KEY, accounts);
  }

  /**
   * Create a new simulated MailBox account.
   * @param {Object} data - { username, password, firstName, lastName, recoveryEmail, phone, country, language, dob }
   * @returns {{ success: boolean, error?: string, account?: object }}
   */
  function createAccount(data) {
    var accounts = getAccounts();

    // Username validation
    if (!data.username) {
      return { success: false, error: 'Please enter a username.' };
    }
    if (!/^[a-zA-Z0-9._]+$/.test(data.username)) {
      return { success: false, error: 'Username can only contain letters, numbers, dots, and underscores.' };
    }
    if (data.username.length < 3) {
      return { success: false, error: 'Username must be at least 3 characters.' };
    }
    if (data.username.length > 30) {
      return { success: false, error: 'Username must be 30 characters or fewer.' };
    }

    // Check if username exists
    if (accounts[data.username.toLowerCase()]) {
      return { success: false, error: 'This email address is already taken.' };
    }

    // Password validation
    if (!data.password) {
      return { success: false, error: 'Please enter a password.' };
    }
    if (data.password.length < 8) {
      return { success: false, error: 'Password must be at least 8 characters.' };
    }
    if (!/[a-zA-Z]/.test(data.password) || !/[0-9]/.test(data.password)) {
      return { success: false, error: 'Password must contain at least one letter and one number.' };
    }

    // Required fields
    if (!data.firstName) {
      return { success: false, error: 'Please enter your first name.' };
    }
    if (!data.lastName) {
      return { success: false, error: 'Please enter your last name.' };
    }
    if (!data.dob || !data.dob.day || !data.dob.month || !data.dob.year) {
      return { success: false, error: 'Please enter your date of birth.' };
    }

    // Date validation
    var dob = data.dob;
    var day = parseInt(dob.day), month = parseInt(dob.month), year = parseInt(dob.year);
    if (isNaN(day) || isNaN(month) || isNaN(year) || day < 1 || day > 31 || month < 1 || month > 12 || year < 1900 || year > new Date().getFullYear()) {
      return { success: false, error: 'Please enter a valid date of birth.' };
    }
    var daysInMonth = new Date(year, month, 0).getDate();
    if (day > daysInMonth) {
      return { success: false, error: 'Please enter a valid date of birth.' };
    }

    // Country
    if (!data.country) {
      return { success: false, error: 'Please select your country.' };
    }

    // Terms
    if (!data.agreedToTerms) {
      return { success: false, error: 'You must agree to the terms of service.' };
    }

    var usernameLower = data.username.toLowerCase();
    var account = {
      username: usernameLower,
      email: usernameLower + '@mailbox.example',
      passwordHash: simpleHash(data.password),
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      recoveryEmail: data.recoveryEmail ? data.recoveryEmail.trim() : '',
      phone: data.phone ? data.phone.trim() : '',
      country: data.country,
      language: data.language || 'en',
      dob: { day: day, month: month, year: year },
      createdAt: now(),
      lastSignIn: null
    };

    accounts[usernameLower] = account;
    saveAccounts(accounts);

    // Initialize inbox with pre-loaded emails
    initializeInbox(usernameLower);

    return { success: true, account: account };
  }

  /**
   * Check if a username is already taken.
   */
  function accountExists(username) {
    var accounts = getAccounts();
    return !!accounts[username.toLowerCase()];
  }

  /**
   * Suggest alternative usernames based on the requested one.
   */
  function suggestUsernames(desired, firstName, lastName) {
    var suggestions = [];
    var base = desired.replace(/[^a-zA-Z0-9._]/g, '').toLowerCase();
    if (firstName) firstName = firstName.toLowerCase().replace(/[^a-z]/g, '');
    if (lastName) lastName = lastName.toLowerCase().replace(/[^a-z]/g, '');

    var candidates = [];
    if (firstName && lastName) {
      candidates.push(firstName + '.' + lastName);
      candidates.push(firstName.charAt(0) + lastName);
      candidates.push(firstName + '.' + lastName.charAt(0));
      candidates.push(firstName + lastName);
    }
    if (base) candidates.push(base);
    candidates.push(base + Math.floor(Math.random() * 90 + 10));
    candidates.push(base + '.' + Math.floor(Math.random() * 900 + 100));

    var accounts = getAccounts();
    for (var i = 0; i < candidates.length && suggestions.length < 3; i++) {
      if (!accounts[candidates[i]] && suggestions.indexOf(candidates[i]) === -1) {
        suggestions.push(candidates[i]);
      }
    }

    return suggestions.slice(0, 3);
  }

  /**
   * Get account by username.
   */
  function getAccount(username) {
    var accounts = getAccounts();
    return accounts[username.toLowerCase()] || null;
  }

  /**
   * Sign in.
   */
  function signIn(username, password) {
    var account = getAccount(username);
    if (!account) {
      return { success: false, error: 'Email address not found.' };
    }
    if (account.passwordHash !== simpleHash(password)) {
      return { success: false, error: 'Incorrect password. Please try again.' };
    }

    // Update session
    saveJSON(SESSION_KEY, {
      currentUser: account.username,
      signInTime: now(),
      keepSignedIn: true
    });

    // Update last sign in
    account.lastSignIn = now();
    var accounts = getAccounts();
    accounts[account.username] = account;
    saveAccounts(accounts);

    return { success: true, account: account };
  }

  /**
   * Sign out.
   */
  function signOut() {
    localStorage.removeItem(SESSION_KEY);
  }

  /**
   * Get current session.
   */
  function getSession() {
    return loadJSON(SESSION_KEY);
  }

  /**
   * Get current user from session.
   */
  function getCurrentUser() {
    var session = getSession();
    if (!session || !session.currentUser) return null;
    return getAccount(session.currentUser);
  }

  /**
   * Update sign-in time.
   */
  function updateSignInTime(username) {
    var accounts = getAccounts();
    if (accounts[username]) {
      accounts[username].lastSignIn = now();
      saveAccounts(accounts);
    }
  }

  /**
   * Delete account.
   */
  function deleteAccount(username) {
    var accounts = getAccounts();
    delete accounts[username.toLowerCase()];
    saveAccounts(accounts);
    localStorage.removeItem(EMAILS_PREFIX + username.toLowerCase());
    localStorage.removeItem(SESSION_KEY);
  }

  // ============================================================
  //  PASSWORD RECOVERY
  // ============================================================

  function requestPasswordReset(username) {
    var account = getAccount(username);
    if (!account) {
      return { success: false, error: 'No account found with that email address.' };
    }

    var methods = [];
    if (account.recoveryEmail) methods.push({ type: 'email', value: account.recoveryEmail });
    if (account.phone) methods.push({ type: 'phone', value: account.phone });

    if (methods.length === 0) {
      return { success: false, error: 'No recovery email or phone number is associated with this account. Recovery is unavailable.', noRecovery: true };
    }

    // Generate and store reset code
    var code = generateResetCode();
    var codes = loadJSON(RESET_CODES_KEY) || {};
    codes[username.toLowerCase()] = { code: code, expires: Date.now() + 600000 }; // 10 min
    saveJSON(RESET_CODES_KEY, codes);

    return {
      success: true,
      methods: methods,
      // In a real app this code would be sent. Here we show it to simulate.
      code: code
    };
  }

  function verifyResetCode(username, code) {
    var codes = loadJSON(RESET_CODES_KEY) || {};
    var entry = codes[username.toLowerCase()];
    if (!entry) return { success: false, error: 'No reset code was requested. Please try again.' };
    if (Date.now() > entry.expires) {
      delete codes[username.toLowerCase()];
      saveJSON(RESET_CODES_KEY, codes);
      return { success: false, error: 'The verification code has expired. Please request a new one.' };
    }
    if (entry.code !== code) {
      return { success: false, error: 'The verification code is incorrect. Please try again.' };
    }
    return { success: true };
  }

  function resetPassword(username, newPassword) {
    if (!newPassword || newPassword.length < 8) {
      return { success: false, error: 'Password must be at least 8 characters.' };
    }
    if (!/[a-zA-Z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
      return { success: false, error: 'Password must contain at least one letter and one number.' };
    }

    var accounts = getAccounts();
    var account = accounts[username.toLowerCase()];
    if (!account) return { success: false, error: 'Account not found.' };

    account.passwordHash = simpleHash(newPassword);
    saveAccounts(accounts);

    // Clean up reset code
    var codes = loadJSON(RESET_CODES_KEY) || {};
    delete codes[username.toLowerCase()];
    saveJSON(RESET_CODES_KEY, codes);

    return { success: true };
  }

  // ============================================================
  //  PRE-LOADED INBOX MESSAGES
  // ============================================================

  function getPreloadedEmails(username) {
    var account = getAccount(username);
    var name = account ? account.firstName : 'there';
    var emailAddr = account ? account.email : username + '@mailbox.example';

    return [
      {
        id: 'pre_1',
        from: 'registrar@springfield-college.example',
        fromName: 'Springfield College Registrar',
        to: emailAddr,
        subject: 'Your Class Timetable — Semester 2',
        body: 'Dear ' + name + ',\n\nPlease find attached your class timetable for Semester 2, 2026.\n\nClasses begin on Monday, 15 September 2026.\n\nIf you have any questions, please contact the student services office.\n\nBest regards,\nRegistrar Office\nSpringfield College',
        date: new Date(Date.now() - 2 * 86400000).toISOString(),
        displayDate: '2 days ago',
        read: false,
        starred: false,
        folder: 'inbox',
        hasAttachments: true,
        attachments: ['timetable.pdf'],
        isSpam: false
      },
      {
        id: 'pre_2',
        from: 'appointments@city-health-clinic.example',
        fromName: 'City Health Clinic',
        to: emailAddr,
        subject: 'Appointment Confirmation — Dr. Williams',
        body: 'Dear ' + name + ',\n\nThis email confirms your appointment:\n\nDate: Friday, 22 August 2026\nTime: 10:30 AM\nDoctor: Dr. Sarah Williams\nLocation: City Health Clinic, 42 Park Road, Room 3B\n\nPlease arrive 10 minutes early. If you need to reschedule, please call us.\n\nA copy of your appointment details is attached.\n\nKind regards,\nCity Health Clinic Reception',
        date: new Date(Date.now() - 3 * 86400000).toISOString(),
        displayDate: '3 days ago',
        read: false,
        starred: false,
        folder: 'inbox',
        hasAttachments: true,
        attachments: ['appointment-details.pdf'],
        isSpam: false
      },
      {
        id: 'pre_3',
        from: 'events@community-centre.example',
        fromName: 'Riverside Community Centre',
        to: emailAddr,
        subject: 'Community Event — Welcome Lunch This Saturday',
        body: 'Hello everyone,\n\nYou are invited to our free Welcome Lunch for new community members!\n\nWhen: Saturday, 2 August 2026, 12:00 PM – 2:00 PM\nWhere: Riverside Community Centre, Main Hall\nWhat: Lunch, activities, and a chance to meet your neighbours\n\nEveryone is welcome. Please bring your family!\n\nSee you there,\nRiverside Community Centre Team',
        date: new Date(Date.now() - 4 * 86400000).toISOString(),
        displayDate: '4 days ago',
        read: false,
        starred: false,
        folder: 'inbox',
        hasAttachments: false,
        attachments: [],
        isSpam: false
      },
      {
        id: 'pre_4',
        from: 'mrs.chen@springfield-college.example',
        fromName: 'Mrs. Lisa Chen',
        to: emailAddr,
        subject: 'Welcome to English Class',
        body: 'Dear ' + name + ',\n\nWelcome to the English for Adult Learners class! I am very happy to have you in my class.\n\nOur first class is on Monday, 15 September at 9:00 AM in Room 201.\n\nPlease bring:\n- A notebook\n- A pen or pencil\n- Your student ID card\n\nIf you have any questions before the first class, you can reply to this email.\n\nLooking forward to meeting you!\n\nBest wishes,\nMrs. Lisa Chen\nEnglish Teacher, Springfield College',
        date: new Date(Date.now() - 5 * 86400000).toISOString(),
        displayDate: '5 days ago',
        read: false,
        starred: false,
        folder: 'inbox',
        hasAttachments: false,
        attachments: [],
        isSpam: false
      },
      {
        id: 'pre_5',
        from: 'winner@lucky-prize-scam.example',
        fromName: 'LUCKY PRIZE WINNER',
        to: emailAddr,
        subject: 'URGENT!!! You Have WON $500,000!!! CLAIM NOW!!!',
        body: 'CONGRATULATIONS!!!\n\nYou have been selected as the WINNER of the INTERNATIONAL LOTTERY DRAW!!!\n\nPrize: $500,000 (USD)\n\nTo CLAIM your prize, you MUST:\n\n1. Click this link RIGHT NOW: http://claim-your-prize.scam.example\n2. Enter your FULL bank details\n3. Send your PASSWORD for verification\n\nDO NOT MISS THIS!!! THIS IS URGENT!!!\n\nHurry! Offer ends in 24 hours!!!',
        date: new Date(Date.now() - 1 * 86400000).toISOString(),
        displayDate: 'Yesterday',
        read: false,
        starred: false,
        folder: 'inbox',
        hasAttachments: false,
        attachments: [],
        isSpam: true
      },
      {
        id: 'pre_6',
        from: 'info@city-library.example',
        fromName: 'City Public Library',
        to: emailAddr,
        subject: 'Your Library Card is Ready',
        body: 'Dear ' + name + ',\n\nYour library card has been processed and is ready for collection.\n\nPlease visit the City Public Library main branch at 15 Oak Street during opening hours (Monday–Saturday, 9 AM – 6 PM).\n\nPlease bring a photo ID to collect your card.\n\nWith your library card you can:\n- Borrow books, DVDs, and audiobooks\n- Use the library computers\n- Access free Wi-Fi\n- Join reading groups\n\nWelcome to the library!\n\nCity Public Library Staff',
        date: new Date(Date.now() - 6 * 86400000).toISOString(),
        displayDate: '6 days ago',
        read: false,
        starred: false,
        folder: 'inbox',
        hasAttachments: true,
        attachments: ['class-photo.jpg'],
        isSpam: false
      }
    ];
  }

  function initializeInbox(username) {
    var emails = getPreloadedEmails(username);
    saveJSON(EMAILS_PREFIX + username.toLowerCase(), emails);
  }

  // ============================================================
  //  EMAIL MANAGEMENT
  // ============================================================

  function getEmails(username) {
    return loadJSON(EMAILS_PREFIX + username.toLowerCase()) || [];
  }

  function saveEmails(username, emails) {
    return saveJSON(EMAILS_PREFIX + username.toLowerCase(), emails);
  }

  function getEmailsByFolder(username, folder) {
    var all = getEmails(username);
    return all.filter(function (e) { return e.folder === folder; });
  }

  function getEmail(username, emailId) {
    var emails = getEmails(username);
    for (var i = 0; i < emails.length; i++) {
      if (emails[i].id === emailId) return emails[i];
    }
    return null;
  }

  function sendEmail(username, emailData) {
    var emails = getEmails(username);
    var sentEmail = {
      id: generateId(),
      from: getAccount(username).email,
      fromName: getAccount(username).firstName + ' ' + getAccount(username).lastName,
      to: Array.isArray(emailData.to) ? emailData.to.join(', ') : emailData.to,
      cc: emailData.cc || '',
      bcc: emailData.bcc || '',
      subject: emailData.subject || '(no subject)',
      body: emailData.body || '',
      date: now(),
      displayDate: 'Just now',
      read: true,
      starred: false,
      folder: 'sent',
      hasAttachments: !!(emailData.attachments && emailData.attachments.length > 0),
      attachments: emailData.attachments || [],
      isSpam: false
    };
    emails.push(sentEmail);
    saveEmails(username, emails);
    return { success: true, email: sentEmail };
  }

  function saveDraft(username, draftData) {
    var emails = getEmails(username);
    var draftId = draftData.id || generateId();

    // Remove existing draft with same id
    emails = emails.filter(function (e) { return e.id !== draftId; });

    var draft = {
      id: draftId,
      from: getAccount(username).email,
      fromName: '',
      to: draftData.to || '',
      cc: draftData.cc || '',
      bcc: draftData.bcc || '',
      subject: draftData.subject || '',
      body: draftData.body || '',
      date: now(),
      displayDate: 'Draft',
      read: true,
      starred: false,
      folder: 'drafts',
      hasAttachments: !!(draftData.attachments && draftData.attachments.length > 0),
      attachments: draftData.attachments || [],
      isSpam: false
    };

    emails.push(draft);
    saveEmails(username, emails);
    return { success: true, draft: draft };
  }

  function deleteDraft(username, draftId) {
    var emails = getEmails(username).filter(function (e) { return e.id !== draftId; });
    saveEmails(username, emails);
  }

  function updateEmail(username, emailId, updates) {
    var emails = getEmails(username);
    for (var i = 0; i < emails.length; i++) {
      if (emails[i].id === emailId) {
        for (var key in updates) {
          if (updates.hasOwnProperty(key)) emails[i][key] = updates[key];
        }
        break;
      }
    }
    saveEmails(username, emails);
  }

  function moveEmail(username, emailId, targetFolder) {
    updateEmail(username, emailId, { folder: targetFolder });
  }

  function deleteEmail(username, emailId) {
    moveEmail(username, emailId, 'trash');
  }

  function permanentDelete(username, emailId) {
    var emails = getEmails(username).filter(function (e) { return e.id !== emailId; });
    saveEmails(username, emails);
  }

  function restoreEmail(username, emailId) {
    moveEmail(username, emailId, 'inbox');
  }

  function toggleStar(username, emailId) {
    var email = getEmail(username, emailId);
    if (email) updateEmail(username, emailId, { starred: !email.starred });
  }

  function toggleRead(username, emailId) {
    var email = getEmail(username, emailId);
    if (email) updateEmail(username, emailId, { read: !email.read });
  }

  function reportSpam(username, emailId) {
    moveEmail(username, emailId, 'spam');
    updateEmail(username, emailId, { isSpam: true });
  }

  function archiveEmail(username, emailId) {
    // In this simulation, archive is a folder
    moveEmail(username, emailId, 'archive');
  }

  // ============================================================
  //  SEARCH
  // ============================================================

  function searchEmails(username, query) {
    if (!query || !query.trim()) return [];
    var q = query.toLowerCase().trim();
    var emails = getEmails(username);
    return emails.filter(function (e) {
      return (e.subject && e.subject.toLowerCase().indexOf(q) !== -1) ||
             (e.from && e.from.toLowerCase().indexOf(q) !== -1) ||
             (e.fromName && e.fromName.toLowerCase().indexOf(q) !== -1) ||
             (e.body && e.body.toLowerCase().indexOf(q) !== -1) ||
             (e.to && e.to.toLowerCase().indexOf(q) !== -1);
    });
  }

  // ============================================================
  //  UNREAD COUNT
  // ============================================================

  function getUnreadCount(username) {
    var emails = getEmails(username);
    return emails.filter(function (e) { return e.folder === 'inbox' && !e.read; }).length;
  }

  // ============================================================
  //  TASK TRACKING
  // ============================================================

  function getTasks() {
    return loadJSON(TASKS_KEY) || {};
  }

  function markTaskComplete(taskId) {
    var tasks = getTasks();
    tasks[taskId] = { completed: true, completedAt: now() };
    saveJSON(TASKS_KEY, tasks);
  }

  function isTaskComplete(taskId) {
    var tasks = getTasks();
    return !!(tasks[taskId] && tasks[taskId].completed);
  }

  function resetTasks() {
    localStorage.removeItem(TASKS_KEY);
  }

  // ============================================================
  //  TEACHER PANEL
  // ============================================================

  function getTeacherCode() {
    return localStorage.getItem(TEACHER_CODE_KEY) || 'teacher123';
  }

  function setTeacherCode(code) {
    localStorage.setItem(TEACHER_CODE_KEY, code);
  }

  function getAllPracticeData() {
    var accounts = getAccounts();
    var result = [];
    for (var username in accounts) {
      if (accounts.hasOwnProperty(username)) {
        var account = accounts[username];
        var emails = getEmails(username);
        var tasks = getTasks();
        result.push({
          account: account,
          emails: emails,
          emailCount: emails.length,
          sentCount: emails.filter(function(e){return e.folder==='sent';}).length,
          draftCount: emails.filter(function(e){return e.folder==='drafts';}).length,
          spamCount: emails.filter(function(e){return e.folder==='spam';}).length,
          trashCount: emails.filter(function(e){return e.folder==='trash';}).length,
          inboxCount: emails.filter(function(e){return e.folder==='inbox';}).length,
          tasks: tasks
        });
      }
    }
    return result;
  }

  function exportDataJSON() {
    var data = getAllPracticeData();
    return JSON.stringify(data, null, 2);
  }

  // ============================================================
  //  RESET FUNCTIONS
  // ============================================================

  function resetAllData() {
    var keys = [];
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      if (key.indexOf('mailbox_') === 0) keys.push(key);
    }
    keys.forEach(function(k) { localStorage.removeItem(k); });
  }

  function resetInbox(username) {
    initializeInbox(username);
  }

  function resetAccount(username) {
    deleteAccount(username);
  }

  // ============================================================
  //  PUBLIC API
  // ============================================================

  return {
    // Account
    createAccount: createAccount,
    accountExists: accountExists,
    suggestUsernames: suggestUsernames,
    getAccount: getAccount,
    getAllAccounts: function() { return getAccounts(); },
    signIn: signIn,
    signOut: signOut,
    getSession: getSession,
    getCurrentUser: getCurrentUser,
    updateSignInTime: updateSignInTime,
    deleteAccount: deleteAccount,

    // Password recovery
    requestPasswordReset: requestPasswordReset,
    verifyResetCode: verifyResetCode,
    resetPassword: resetPassword,

    // Email CRUD
    getEmails: getEmails,
    getEmailsByFolder: getEmailsByFolder,
    getEmail: getEmail,
    sendEmail: sendEmail,
    saveDraft: saveDraft,
    deleteDraft: deleteDraft,
    updateEmail: updateEmail,
    moveEmail: moveEmail,
    deleteEmail: deleteEmail,
    permanentDelete: permanentDelete,
    restoreEmail: restoreEmail,
    toggleStar: toggleStar,
    toggleRead: toggleRead,
    reportSpam: reportSpam,
    archiveEmail: archiveEmail,
    initializeInbox: initializeInbox,
    getUnreadCount: getUnreadCount,

    // Search
    searchEmails: searchEmails,

    // Tasks
    getTasks: getTasks,
    markTaskComplete: markTaskComplete,
    isTaskComplete: isTaskComplete,
    resetTasks: resetTasks,

    // Teacher
    getTeacherCode: getTeacherCode,
    setTeacherCode: setTeacherCode,
    getAllPracticeData: getAllPracticeData,
    exportDataJSON: exportDataJSON,

    // Reset
    resetAllData: resetAllData,
    resetInbox: resetInbox,
    resetAccount: resetAccount,

    // Helpers
    now: now,
    nowDisplay: nowDisplay,
    generateId: generateId
  };
})();
