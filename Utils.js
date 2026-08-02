
  SF.utils = (() => {
    'use strict';

    function escapeHtml(value) {
      return String(value ?? '').replace(
        /[&<>"']/g,
        function (character) {
          const replacements = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
          };

          return replacements[character];
        }
      );
    }

    function countWords(value) {
      const text = String(value || '').trim();

      if (!text) {
        return 0;
      }

      return text
        .split(/\s+/)
        .filter(Boolean)
        .length;
    }

    function clamp(value, minimum, maximum) {
      const number = Number(value);

      if (!Number.isFinite(number)) {
        return minimum;
      }

      return Math.min(
        Math.max(number, minimum),
        maximum
      );
    }

    function getRank(tokens) {
      const total = Number(tokens) || 0;

      if (total >= 285) {
        return 'Confident Speaker';
      }

      if (total >= 200) {
        return 'REES Specialist';
      }

      if (total >= 130) {
        return 'TAD Navigator';
      }

      if (total >= 75) {
        return 'Detail Explorer';
      }

      if (total >= 30) {
        return 'Idea Builder';
      }

      return 'Voice Starter';
    }

    function showToast(message) {
      const toast =
        document.getElementById('toast');

      if (!toast) {
        return;
      }

      toast.textContent =
        String(message || '');

      toast.classList.add('show');

      window.setTimeout(function () {
        toast.classList.remove('show');
      }, 2600);
    }

    return {
      escapeHtml,
      countWords,
      clamp,
      getRank,
      showToast
    };
  })();
