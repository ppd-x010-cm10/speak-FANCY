
SF.dashboard = (() => {
  'use strict';

  const { escapeHtml } = SF.utils;

  function showWelcome() {
    const profile = SF.storage.getProfile();

    SF.app.setView(`
      <main class="app-shell">
        <section class="card hero">
          <p class="eyebrow">Structure your ideas. Speak with confidence.</p>
          <h1>Speak FANCY</h1>
          <p>
            ${
              profile
                ? `Welcome back, <strong>${escapeHtml(profile.nickname)}</strong>.`
                : 'Start a speaking journey built around clear steps and useful practice.'
            }
          </p>
          <button class="btn btn-primary" type="button" data-action="start">
            ${profile ? 'Continue Training' : 'Start Training'}
          </button>
        </section>
      </main>
    `);
  }


  function showProfile(editMode = false) {
    const existing = SF.storage.getProfile();

    const nickname =
      editMode && existing
        ? existing.nickname
        : '';

    const pathway =
      editMode && existing
        ? existing.pathway
        : 'core';

    const rememberProgress =
      SF.storage.isRemembering();

    SF.app.setView(`
      <main class="app-shell">
        <section class="card">
          <p class="eyebrow">
            ${editMode ? 'Edit profile' : 'Create profile'}
          </p>

          <h1>
            ${
              editMode
                ? 'Update your learner profile'
                : 'Choose your learning path'
            }
          </h1>

          <p>
            You decide whether progress lasts only for this
            browser session or remains on this device.
          </p>

          <div class="field">
            <label for="nickname">Nickname</label>

            <input
              id="nickname"
              maxlength="24"
              value="${escapeHtml(nickname)}"
              placeholder="Example: Aina"
              autocomplete="off"
            >
          </div>

          <div class="field">
            <label for="pathway">Learning path</label>

            <select id="pathway">
              <option
                value="supported"
                ${pathway === 'supported' ? 'selected' : ''}
              >
                Supported — more hints
              </option>

              <option
                value="core"
                ${pathway === 'core' ? 'selected' : ''}
              >
                Core — balanced guidance
              </option>

              <option
                value="challenge"
                ${pathway === 'challenge' ? 'selected' : ''}
              >
                Challenge — fewer hints
              </option>
            </select>
          </div>

          <div class="field">
            <label class="choice">
              <input
                id="rememberProgress"
                type="checkbox"
                ${rememberProgress ? 'checked' : ''}
              >

              <span>
                Remember my progress on this device
              </span>
            </label>
          </div>

          <div
            id="storageNotice"
            class="tip-box"
          >
            ${
              rememberProgress
                ? `
                  <strong>Device storage is on</strong>

                  <p>
                    Your progress will remain on this browser
                    after you close the tab.
                  </p>
                `
                : `
                  <strong>Private session mode</strong>

                  <p>
                    Your progress will disappear when this browser
                    tab or session is closed.
                  </p>
                `
            }
          </div>

          <div class="button-row">
            <button
              class="btn btn-primary"
              type="button"
              data-action="save-profile"
            >
              ${editMode ? 'Save Changes' : 'Start My Journey'}
            </button>

            <button
              class="btn btn-secondary"
              type="button"
              data-action="welcome"
            >
              Back
            </button>
          </div>

          <p
            id="profileError"
            class="error-message"
            role="alert"
          ></p>
        </section>
      </main>
    `);

    const rememberCheckbox =
      document.getElementById('rememberProgress');

    const storageNotice =
      document.getElementById('storageNotice');

    rememberCheckbox?.addEventListener(
      'change',
      function () {
        if (!storageNotice) {
          return;
        }

        storageNotice.innerHTML =
          rememberCheckbox.checked
            ? `
                <strong>Device storage is on</strong>

                <p>
                  Your progress will remain on this browser
                  after you close the tab.
                </p>
              `
            : `
                <strong>Private session mode</strong>

                <p>
                  Your progress will disappear when this browser
                  tab or session is closed.
                </p>
              `;
      }
    );

    document.getElementById('nickname')?.focus();
  }


  function saveProfile() {
    const nicknameInput =
      document.getElementById('nickname');

    const pathwayInput =
      document.getElementById('pathway');

    const rememberInput =
      document.getElementById('rememberProgress');

    const errorElement =
      document.getElementById('profileError');

    const nickname =
      nicknameInput?.value.trim() || '';

    const pathway =
      pathwayInput?.value || 'core';

    const rememberProgress =
      Boolean(rememberInput?.checked);

    if (nickname.length < 2) {
      if (errorElement) {
        errorElement.textContent =
          'Enter a nickname with at least two characters.';
      }

      nicknameInput?.focus();
      return;
    }

    const existingProfile =
      SF.storage.getProfile();

    const profile =
      existingProfile ||
      SF.storage.defaultProfile();

    profile.nickname =
      nickname.slice(0, 24);

    profile.pathway =
      pathway;

    const modeChanged =
      SF.storage.setRememberProgress(
        rememberProgress
      );

    if (!modeChanged) {
      if (errorElement) {
        errorElement.textContent =
          'The storage setting could not be changed.';
      }

      return;
    }

    const saved =
      SF.storage.saveProfile(profile);

    if (!saved) {
      if (errorElement) {
        errorElement.textContent =
          'The profile could not be saved in this browser.';
      }

      return;
    }

    SF.utils.showToast(
      rememberProgress
        ? 'Progress will be remembered on this device'
        : 'Private session mode is active'
    );

    showDashboard();
  }

  function showDashboard() {
    const profile = SF.storage.getProfile();

    if (!profile) {
      showProfile();
      return;
    }

    const part1Done = Boolean(profile.part1?.completed);
    const part2Done = Boolean(profile.part2?.completed);
    const part3Done = Boolean(profile.part3?.completed);

    SF.app.setView(`
      <div class="app-shell">
        <header class="topbar">
          <div>
            <div class="brand">Speak FANCY</div>
            <small>Hello, ${escapeHtml(profile.nickname)}</small>
          </div>

          <div class="token-pill">⚡ ${Number(profile.tokens) || 0}</div>
        </header>

        <main>
          <section class="card hero">
            <p class="eyebrow">Current rank</p>
            <h1>${escapeHtml(profile.rank)}</h1>
            <p>
              Complete missions, practise actively,
              and make every answer stronger.
            </p>

            <div class="button-row">
              ${
                part1Done
                  ? '<span class="status-chip">✓ Part 1 completed</span>'
                  : ''
              }

              ${
                part2Done
                  ? '<span class="status-chip">✓ Part 2 completed</span>'
                  : ''
              }

              ${
                part3Done
                  ? '<span class="status-chip">✓ Part 3 completed</span>'
                  : ''
              }
            </div>
          </section>

          <section class="card">
            <p class="eyebrow">Learning path</p>
            <h2>Your speaking missions</h2>

            <div class="mission-grid">
              <article class="mission-card">
                <div class="mission-number">1</div>
                <h3>Introduction</h3>
                <p>Review the TAD–REES thinking engine.</p>
                <button
                  class="btn btn-secondary"
                  type="button"
                  data-action="introduction"
                >
                  Open Introduction
                </button>
              </article>

              <article class="mission-card">
                <div class="mission-number">2</div>
                <h3>Part 1: Interview</h3>
                <p>
                  Answer familiar questions with a direct answer
                  and a useful detail.
                </p>
                <button
                  class="btn btn-primary"
                  type="button"
                  data-action="part1"
                >
                  ${part1Done ? 'Review Part 1' : 'Start Part 1'}
                </button>
              </article>

              <article class="mission-card">
                <div class="mission-number">3</div>
                <h3>Part 2: Individual Long Turn</h3>
                <p>
                  Plan four connected TAD answers and develop them with REES.
                </p>
                <button
                  class="btn btn-primary"
                  type="button"
                  data-action="part2"
                >
                  ${part2Done ? 'Review Part 2' : 'Start Part 2'}
                </button>
              </article>

              <article class="mission-card">
                <div class="mission-number">4</div>
                <h3>Part 3: Collaborative Discussion</h3>
                <p>
                  Share ideas, respond to a partner,
                  and move a discussion towards an outcome.
                </p>
                <button
                  class="btn btn-primary"
                  type="button"
                  data-action="part3"
                >
                  ${part3Done ? 'Review Part 3' : 'Start Part 3'}
                </button>
              </article>
            </div>
          </section>

          <section class="card">
            <div class="button-row">
              <button
                class="btn btn-secondary"
                type="button"
                data-action="edit-profile"
              >
                Edit Profile
              </button>

              <button
                class="btn btn-danger"
                type="button"
                data-action="delete-profile"
              >
                Delete Profile
              </button>
            </div>
          </section>
        </main>
      </div>
    `);
  }

  function deleteProfile() {
    if (
      !window.confirm(
        'Delete your profile and saved progress on this device?'
      )
    ) {
      return;
    }

    SF.storage.removeProfile();
    showWelcome();
  }

  return {
    showWelcome,
    showProfile,
    saveProfile,
    showDashboard,
    deleteProfile
  };
})();

