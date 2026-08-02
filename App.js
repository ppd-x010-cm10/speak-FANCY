
SF.app = (() => {
  'use strict';

  const app = document.getElementById('app');

  function setView(html) {
    if (SF.voice) {
      SF.voice.cleanup();
    }

    app.innerHTML = html;

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  function route(action, button) {
    const routes = {
      welcome: () => SF.dashboard.showWelcome(),

      start: () =>
        SF.storage.getProfile()
          ? SF.dashboard.showDashboard()
          : SF.dashboard.showProfile(),

      'save-profile': () => SF.dashboard.saveProfile(),
      'edit-profile': () => SF.dashboard.showProfile(true),
      'delete-profile': () => SF.dashboard.deleteProfile(),
      dashboard: () => SF.dashboard.showDashboard(),
      introduction: () => SF.introduction.show(),

      part1: () => SF.part1.show(),

      'part1-lesson': () =>
        SF.part1.show(Number(button.dataset.lesson)),

      'part1-next': () =>
        SF.part1.completeLesson(Number(button.dataset.lesson)),

      'check-part1-response': () =>
        SF.part1.checkResponse(),

      'complete-part1': () =>
        SF.part1.completePart1(),

      part2: () => SF.part2.show(),

      'part2-lesson': () =>
        SF.part2.show(Number(button.dataset.lesson)),

      'part2-next': () =>
        SF.part2.completeLesson(Number(button.dataset.lesson)),

      'save-part2-plan': () =>
        SF.part2.savePlan(),

      'part2-change-topic': () =>
        SF.part2.changeTopic(),

      'check-part2-response': () =>
        SF.part2.checkResponse(
          button.dataset.challenge === 'true'
        ),

      'complete-part2': () =>
        SF.part2.completePart2(),

      part3: () => SF.part3.show(),

      'part3-lesson': () =>
        SF.part3.show(Number(button.dataset.lesson)),

      'part3-next': () =>
        SF.part3.completeLesson(Number(button.dataset.lesson)),

      'part3-change-topic': () =>
        SF.part3.changeTopic(Number(button.dataset.lesson)),

      'check-part3-turn': () =>
        SF.part3.checkTurn(),

      'check-part3-decision': () =>
        SF.part3.checkDecision(),

      'check-part3-challenge': () =>
        SF.part3.checkChallenge(),

      'complete-part3': () =>
        SF.part3.completePart3(),

      'voice-start': () =>
        SF.voice.start(button.dataset.recorderId),

      'voice-stop': () =>
        SF.voice.stop(button.dataset.recorderId),

      'voice-reset': () =>
        SF.voice.reset(button.dataset.recorderId)
    };

    const handler = routes[action];

    if (handler) {
      handler();
    }
  }

  app.addEventListener('click', event => {
    const button =
      event.target.closest('[data-action]');

    if (!button) {
      return;
    }

    route(
      button.dataset.action,
      button
    );
  });

  window.addEventListener('error', event => {
    console.error(
      event.error || event.message
    );

    setView(`
      <main class="app-shell">
        <section class="card">
          <h1>Speak FANCY could not start</h1>

          <p>
            A JavaScript error occurred.
          </p>

          <pre class="feedback-box improve">${SF.utils.escapeHtml(event.message)}
Line: ${event.lineno}
Column: ${event.colno}</pre>
        </section>
      </main>
    `);
  });

  function start() {
    const profile = SF.storage.getProfile();

    if (profile) {
      SF.dashboard.showDashboard();
    } else {
      SF.dashboard.showWelcome();
    }

    if (
      typeof google !== 'undefined' &&
      google.script?.run
    ) {
      google.script.run
        .withFailureHandler(function (error) {
          console.warn(
            'Health check failed:',
            error
          );
        })
        .getAppHealth();
    }
  }

  return {
    setView,
    start
  };
})();

SF.app.start();

