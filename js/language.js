/* ============================================================
   Computer Skills — Language Module
   Handles language preference, routing, and content visibility.
   ============================================================ */

(function () {
  'use strict';

  var STORAGE_KEY = 'computerSkillsPreferredLanguage';
  var VALID_LANGS = ['en', 'fa', 'zh'];

  // --- Language Preference ---

  function getPreferredLanguage() {
    try {
      var lang = localStorage.getItem(STORAGE_KEY);
      if (lang && VALID_LANGS.indexOf(lang) !== -1) {
        return lang;
      }
    } catch (e) {
      // localStorage not available — ignore
    }
    return null;
  }

  function setPreferredLanguage(lang) {
    if (VALID_LANGS.indexOf(lang) === -1) {
      console.warn('Invalid language code: ' + lang);
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      // Ignore
    }
  }

  // --- URL Helpers ---

  function getQueryParam(name) {
    var url = new URL(window.location.href);
    return url.searchParams.get(name);
  }

  function isChooseLanguage() {
    return getQueryParam('chooseLanguage') === 'true';
  }

  // --- Determine if we are on the root language selection page ---

  function isRootPage() {
    var path = window.location.pathname.replace(/\/$/, '');
    // Root page: /index.html, /, or ends with /computer-skills/index.html (GitHub Pages)
    var parts = path.split('/');
    var last = parts[parts.length - 1] || parts[parts.length - 2] || '';
    // If last segment is index.html and we're not in a lang subdirectory
    if (last === 'index.html') {
      var parent = parts[parts.length - 2] || '';
      if (VALID_LANGS.indexOf(parent) === -1) {
        return true;
      }
    }
    // Also check if this is the bare directory (serving index.html by default)
    if (last === '' || last === 'computer-skills') {
      return true;
    }
    return false;
  }

  // --- Determine current language page from path ---

  function getCurrentLangFromPath() {
    var path = window.location.pathname.replace(/\/$/, '');
    var parts = path.split('/');
    // Check if the parent directory of index.html is a lang code
    for (var i = parts.length - 1; i >= 0; i--) {
      if (VALID_LANGS.indexOf(parts[i]) !== -1) {
        return parts[i];
      }
    }
    return null;
  }

  // --- Auto-redirect on root page ---

  function handleRootPage() {
    // Only run on the root language selection page
    if (!isRootPage()) return;
    // If user explicitly wants to choose, always show selection
    if (isChooseLanguage()) return;
    // If language is saved, auto-redirect
    var saved = getPreferredLanguage();
    if (saved) {
      window.location.replace(saved + '/index.html');
    }
  }

  // --- Apply language mode to lesson pages ---

  function applyLanguageMode(lang) {
    if (!lang || VALID_LANGS.indexOf(lang) === -1) {
      // Default to Persian mode (preserves existing behavior)
      lang = 'fa';
    }
    document.documentElement.setAttribute('data-lang', lang);

    // Log for debugging
    console.log(
      'Computer Skills — Language mode: ' + lang +
      ' (voice count: ' + (window.speechSynthesis ? window.speechSynthesis.getVoices().length : 'N/A') + ')'
    );
  }

  // --- Initialize language mode on lesson/child pages ---

  function initLanguageMode() {
    // Skip on root page
    if (isRootPage()) return;

    var pathLang = getCurrentLangFromPath();
    var queryLang = getQueryParam('lang');
    var savedLang = getPreferredLanguage();

    var lang;
    if (pathLang) {
      // On a language homepage (en/index.html, fa/index.html, zh/index.html)
      // Use the path — ignore previously saved preference
      lang = pathLang;
    } else if (queryLang && VALID_LANGS.indexOf(queryLang) !== -1) {
      // Lesson page with explicit ?lang= parameter
      lang = queryLang;
    } else {
      // Lesson page without explicit language — use saved preference or default
      lang = savedLang || 'fa';
    }

    applyLanguageMode(lang);

    // Persist the resolved language
    if (lang !== savedLang) {
      setPreferredLanguage(lang);
    }
  }

  // --- Change Language helper ---

  function goToLanguageSelection() {
    window.location.href = '../index.html?chooseLanguage=true';
  }

  // --- Expose global API ---

  window.ComputerSkills = window.ComputerSkills || {};
  window.ComputerSkills.Language = {
    STORAGE_KEY: STORAGE_KEY,
    VALID_LANGS: VALID_LANGS,
    getPreferredLanguage: getPreferredLanguage,
    setPreferredLanguage: setPreferredLanguage,
    getQueryParam: getQueryParam,
    isChooseLanguage: isChooseLanguage,
    isRootPage: isRootPage,
    getCurrentLangFromPath: getCurrentLangFromPath,
    applyLanguageMode: applyLanguageMode,
    goToLanguageSelection: goToLanguageSelection,
    initLanguageMode: initLanguageMode
  };

  // --- Auto-init ---

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      handleRootPage();
      initLanguageMode();
    });
  } else {
    handleRootPage();
    initLanguageMode();
  }
})();
