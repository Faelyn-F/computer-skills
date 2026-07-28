/* ============================================================
   Bilingual Computer Skills — Main JavaScript
   Navigation, checkboxes, accessibility helpers
   ============================================================ */

(function () {
  'use strict';

  // --- Save & Restore Checkbox States (localStorage) ---
  function getStorageKey(checkbox) {
    // Build a unique key from the page path + checkbox id/data-step
    var page = window.location.pathname.replace(/[^a-zA-Z0-9]/g, '_');
    var id = checkbox.id || checkbox.getAttribute('data-step') || '';
    return 'cs_checkbox_' + page + '_' + id;
  }

  function saveCheckbox(checkbox) {
    try {
      var key = getStorageKey(checkbox);
      if (checkbox.checked) {
        localStorage.setItem(key, 'done');
      } else {
        localStorage.removeItem(key);
      }
    } catch (e) {
      // localStorage not available — silently ignore
    }
  }

  function restoreCheckboxes() {
    var checkboxes = document.querySelectorAll('.step-checkbox');
    checkboxes.forEach(function (cb) {
      try {
        var key = getStorageKey(cb);
        if (localStorage.getItem(key) === 'done') {
          cb.checked = true;
        }
      } catch (e) {
        // Ignore
      }
      // Listen for changes
      cb.addEventListener('change', function () {
        saveCheckbox(cb);
      });
    });
  }

  // --- Keyboard Accessibility: make card-links work with Enter/Space ---
  function initCardKeyboard() {
    var cards = document.querySelectorAll('.card-link');
    cards.forEach(function (link) {
      link.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          link.click();
        }
      });
    });
  }

  // --- Active Nav Highlight ---
  function highlightCurrentNav() {
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    var navLinks = document.querySelectorAll('.nav-btn');
    navLinks.forEach(function (btn) {
      var href = btn.getAttribute('href');
      if (href && href.indexOf(currentPage) !== -1) {
        btn.classList.add('disabled');
      }
    });
  }

  // --- Smooth focus management ---
  function initFocusManagement() {
    // Move focus to main content on load for screen readers
    var main = document.getElementById('main-content');
    if (main && window.location.hash === '#main') {
      main.focus();
    }
  }

  // --- Init on DOM ready ---
  function init() {
    restoreCheckboxes();
    initCardKeyboard();
    highlightCurrentNav();
    initFocusManagement();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
