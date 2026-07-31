/* ============================================================
   Bilingual Audio Player — Persian audio support for Email module
   Single-instance playback, keyboard accessible, graceful error handling
   ============================================================ */

(function () {
  'use strict';

  var AUDIO_BASE = 'assets/audio/fa/email/';

  /**
   * AudioManager — singleton that ensures only one audio file plays at a time.
   */
  var AudioManager = (function () {
    var currentAudio = null;
    var currentButton = null;
    var buttons = [];

    function stopAll() {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
      }
      if (currentButton) {
        setButtonState(currentButton, 'idle');
        currentButton = null;
      }
    }

    function resetButton(btn) {
      setButtonState(btn, 'idle');
      if (currentButton === btn) {
        currentButton = null;
        currentAudio = null;
      }
    }

    function play(audio, btn) {
      // Stop any currently playing audio
      if (currentAudio && currentAudio !== audio) {
        stopAll();
      }

      currentAudio = audio;
      currentButton = btn;
      setButtonState(btn, 'playing');

      audio.play().catch(function (err) {
        // Handle playback errors silently for the learner
        console.warn('[AudioPlayer] Playback failed for ' + btn.getAttribute('data-audio-file') + ':', err.message);
        setButtonState(btn, 'idle');
        currentAudio = null;
        currentButton = null;
      });
    }

    function pause(audio, btn) {
      audio.pause();
      setButtonState(btn, 'paused');
    }

    function resume(audio, btn) {
      // Ensure no other audio is playing
      if (currentAudio && currentAudio !== audio) {
        stopAll();
      }
      currentAudio = audio;
      currentButton = btn;
      setButtonState(btn, 'playing');

      audio.play().catch(function (err) {
        console.warn('[AudioPlayer] Resume failed for ' + btn.getAttribute('data-audio-file') + ':', err.message);
        setButtonState(btn, 'idle');
        currentAudio = null;
        currentButton = null;
      });
    }

    function registerButton(btn) {
      buttons.push(btn);
    }

    function getButtons() {
      return buttons;
    }

    return {
      stopAll: stopAll,
      resetButton: resetButton,
      play: play,
      pause: pause,
      resume: resume,
      registerButton: registerButton,
      getButtons: getButtons
    };
  })();

  /**
   * Set the visual state of an audio button.
   * States: 'idle' | 'playing' | 'paused' | 'error' | 'loading'
   */
  function setButtonState(btn, state) {
    // Remove all state classes
    btn.classList.remove('audio-playing', 'audio-paused', 'audio-error', 'audio-loading');

    var statusEl = btn.querySelector('.audio-status');
    var iconEl = btn.querySelector('.audio-icon');

    switch (state) {
      case 'playing':
        btn.classList.add('audio-playing');
        btn.setAttribute('aria-pressed', 'true');
        if (iconEl) { iconEl.textContent = '⏸️'; }
        if (statusEl) {
          statusEl.innerHTML =
            '<span class="audio-status-en">Playing…</span>' +
            '<span class="audio-status-fa" lang="fa" dir="rtl">در حال پخش…</span>';
        }
        break;

      case 'paused':
        btn.classList.add('audio-paused');
        btn.setAttribute('aria-pressed', 'false');
        if (iconEl) { iconEl.textContent = '▶️'; }
        if (statusEl) {
          statusEl.innerHTML =
            '<span class="audio-status-en">Paused</span>' +
            '<span class="audio-status-fa" lang="fa" dir="rtl">مکث</span>';
        }
        break;

      case 'loading':
        btn.classList.add('audio-loading');
        btn.setAttribute('aria-pressed', 'false');
        if (iconEl) { iconEl.textContent = '⏳'; }
        if (statusEl) {
          statusEl.innerHTML =
            '<span class="audio-status-en">Loading…</span>' +
            '<span class="audio-status-fa" lang="fa" dir="rtl">در حال بارگیری…</span>';
        }
        break;

      case 'error':
        btn.classList.add('audio-error');
        btn.setAttribute('aria-pressed', 'false');
        btn.setAttribute('aria-disabled', 'true');
        if (iconEl) { iconEl.textContent = '🔇'; }
        if (statusEl) {
          statusEl.innerHTML =
            '<span class="audio-status-en">Unavailable</span>' +
            '<span class="audio-status-fa" lang="fa" dir="rtl">در دسترس نیست</span>';
        }
        break;

      default: // 'idle'
        btn.setAttribute('aria-pressed', 'false');
        btn.removeAttribute('aria-disabled');
        if (iconEl) { iconEl.textContent = '🔊'; }
        if (statusEl) {
          statusEl.innerHTML = '';
        }
        break;
    }
  }

  /**
   * Create an audio button element.
   * @param {string} fileName - e.g. "compose.mp3"
   * @returns {HTMLButtonElement}
   */
  function createAudioButton(fileName) {
    var audioPath = AUDIO_BASE + fileName;

    // --- Build the button ---
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'audio-btn';
    btn.setAttribute('data-audio-file', fileName);
    btn.setAttribute('data-audio-path', audioPath);
    btn.setAttribute('aria-label', 'Listen: ' + fileName.replace('.mp3', '').replace(/-/g, ' ') + ' — گوش دهید');
    btn.setAttribute('aria-pressed', 'false');

    // Speaker icon
    var icon = document.createElement('span');
    icon.className = 'audio-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = '🔊';
    btn.appendChild(icon);

    // Label text
    var label = document.createElement('span');
    label.className = 'audio-label';
    label.innerHTML =
      '<span class="audio-label-en">Listen</span>' +
      '<span class="audio-label-fa" lang="fa" dir="rtl">گوش دهید</span>';
    btn.appendChild(label);

    // Status text (hidden until playing)
    var status = document.createElement('span');
    status.className = 'audio-status';
    btn.appendChild(status);

    // --- Create the Audio element ---
    var audio = new Audio();
    audio.preload = 'none';

    // --- Event handlers ---

    // Load start
    audio.addEventListener('loadstart', function () {
      setButtonState(btn, 'loading');
    });

    // Can play
    audio.addEventListener('canplay', function () {
      // Restore playing state if we were waiting to play
      if (btn.classList.contains('audio-loading')) {
        setButtonState(btn, 'idle');
      }
    });

    // Play event
    audio.addEventListener('play', function () {
      setButtonState(btn, 'playing');
    });

    // Pause event
    audio.addEventListener('pause', function () {
      if (audio.currentTime > 0 && !audio.ended) {
        setButtonState(btn, 'paused');
      }
    });

    // Ended normally
    audio.addEventListener('ended', function () {
      setButtonState(btn, 'idle');
      AudioManager.resetButton(btn);
    });

    // Error handling — graceful degradation
    audio.addEventListener('error', function () {
      var src = audio.querySelector ? audio.getAttribute('src') || audioPath : audioPath;
      console.warn('[AudioPlayer] Audio file missing or cannot load: ' + src);
      setButtonState(btn, 'error');
      // Disable the button but keep it visible
      btn.disabled = true;
      AudioManager.resetButton(btn);
    });

    // --- Click handler ---
    btn.addEventListener('click', function (e) {
      e.preventDefault();

      // If button is disabled (error state), do nothing
      if (btn.disabled) {
        return;
      }

      // If this button is already playing, pause it
      if (btn.classList.contains('audio-playing')) {
        AudioManager.pause(audio, btn);
        return;
      }

      // If this button is paused, resume it
      if (btn.classList.contains('audio-paused')) {
        AudioManager.resume(audio, btn);
        return;
      }

      // Otherwise, set source and play
      // Only set src if not already loaded (avoid re-fetching)
      if (!audio.getAttribute('src')) {
        audio.src = audioPath;
      }
      AudioManager.play(audio, btn);
    });

    // --- Keyboard handler ---
    btn.addEventListener('keydown', function (e) {
      if (e.key === ' ' || e.key === 'Spacebar') {
        // Space should toggle play/pause
        e.preventDefault();
        btn.click();
      }
    });

    // Register with the manager
    AudioManager.registerButton(btn);

    return btn;
  }

  /**
   * Insert an audio button after a given DOM element.
   * @param {Element} afterElement — the DOM node to insert after
   * @param {string} fileName — audio filename (e.g. "compose.mp3")
   * @returns {HTMLButtonElement|null} the created button, or null on failure
   */
  function insertAudioButton(afterElement, fileName) {
    if (!afterElement || !afterElement.parentNode) {
      console.warn('[AudioPlayer] Cannot insert button: invalid anchor element for ' + fileName);
      return null;
    }

    var btn = createAudioButton(fileName);

    // Create a wrapper container for spacing
    var container = document.createElement('div');
    container.className = 'audio-btn-container';
    container.appendChild(btn);

    // Insert after the given element
    afterElement.parentNode.insertBefore(container, afterElement.nextSibling);
    return btn;
  }

  /**
   * Insert an audio button as the last child of a container.
   * @param {Element} containerEl — the DOM node to append into
   * @param {string} fileName — audio filename
   * @returns {HTMLButtonElement|null}
   */
  function appendAudioButton(containerEl, fileName) {
    if (!containerEl) {
      console.warn('[AudioPlayer] Cannot append button: invalid container for ' + fileName);
      return null;
    }

    var btn = createAudioButton(fileName);

    var wrapper = document.createElement('div');
    wrapper.className = 'audio-btn-container';
    wrapper.appendChild(btn);

    containerEl.appendChild(wrapper);
    return btn;
  }

  /**
   * Stop all audio — called on hash change, back-to-topics, page leave.
   */
  function stopAllAudio() {
    AudioManager.stopAll();
  }

  // --- Global event listeners for stopping audio ---

  // Hash change (learner navigates between topics)
  window.addEventListener('hashchange', function () {
    stopAllAudio();
  });

  // Page unload (learner leaves the page)
  window.addEventListener('beforeunload', function () {
    stopAllAudio();
  });

  // Listen for navigation clicks on topic cards and back buttons
  document.addEventListener('click', function (e) {
    var target = e.target;

    // Check if the click is on a topic card link (<a href="#...">)
    var cardLink = target.closest('.topic-card');
    if (cardLink) {
      stopAllAudio();
      return;
    }

    // Check if the click is on a "Back to Email Topics" button
    if (target.closest('.back-to-topics')) {
      stopAllAudio();
      return;
    }

    // Check if the click is on a topic-nav button (prev/next)
    if (target.closest('.topic-nav-btn')) {
      stopAllAudio();
      return;
    }
  });

  // --- Auto-initialize from container markers in the DOM ---
  function initFromContainers() {
    var containers = document.querySelectorAll('.audio-btn-container[data-audio-file]');
    for (var i = 0; i < containers.length; i++) {
      var container = containers[i];
      var fileName = container.getAttribute('data-audio-file');
      if (!fileName) { continue; }
      var btn = createAudioButton(fileName);
      container.appendChild(btn);
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFromContainers);
  } else {
    initFromContainers();
  }

  // --- Expose public API ---
  window.AudioPlayer = {
    createButton: createAudioButton,
    insertAfter: insertAfter,
    appendTo: appendAudioButton,
    stopAll: stopAllAudio
  };

})();
