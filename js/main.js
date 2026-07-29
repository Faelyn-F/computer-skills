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

  // --- Lightbox for screenshots ---
  function initLightbox() {
    var wrappers = document.querySelectorAll('.screenshot-wrapper');
    if (wrappers.length === 0) return;

    // Create lightbox overlay once
    var overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Image viewer');

    var img = document.createElement('img');
    img.alt = '';
    overlay.appendChild(img);

    var caption = document.createElement('div');
    caption.className = 'lightbox-caption';
    overlay.appendChild(caption);

    var closeBtn = document.createElement('button');
    closeBtn.className = 'lightbox-close';
    closeBtn.setAttribute('aria-label', 'Close image viewer');
    closeBtn.textContent = '✕';
    overlay.appendChild(closeBtn);

    document.body.appendChild(overlay);

    var lastFocused = null;

    function openLightbox(wrapper) {
      lastFocused = wrapper;
      var sourceImg = wrapper.querySelector('img');
      var figcaption = wrapper.closest('.email-visual') ? wrapper.closest('.email-visual').querySelector('.visual-caption') : null;

      if (sourceImg) {
        img.src = sourceImg.src;
        img.alt = sourceImg.alt || '';
      }

      if (figcaption) {
        var enEl = figcaption.querySelector('.english-text');
        var faEl = figcaption.querySelector('.persian-text');
        caption.innerHTML = '';
        if (enEl) {
          var enDiv = document.createElement('div');
          enDiv.className = 'en-caption';
          enDiv.textContent = enEl.textContent;
          caption.appendChild(enDiv);
        }
        if (faEl) {
          var faDiv = document.createElement('div');
          faDiv.className = 'fa-caption';
          faDiv.textContent = faEl.textContent;
          caption.appendChild(faDiv);
        }
      }

      overlay.classList.add('visible');
      closeBtn.focus();
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      overlay.classList.remove('visible');
      document.body.style.overflow = '';
      if (lastFocused) {
        lastFocused.focus();
        lastFocused = null;
      }
    }

    closeBtn.addEventListener('click', closeLightbox);

    overlay.addEventListener('click', function(e) {
      if (e.target === overlay || e.target === img) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && overlay.classList.contains('visible')) {
        closeLightbox();
      }
    });

    // Attach click handlers to wrappers
    wrappers.forEach(function(wrapper) {
      wrapper.setAttribute('tabindex', '0');
      wrapper.setAttribute('role', 'button');
      wrapper.setAttribute('aria-label', 'Click to enlarge image');
      wrapper.addEventListener('click', function() {
        openLightbox(wrapper);
      });
      wrapper.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(wrapper);
        }
      });
    });
  }

  // --- Init on DOM ready ---
  function init() {
    restoreCheckboxes();
    initCardKeyboard();
    highlightCurrentNav();
    initFocusManagement();
    initLightbox();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
