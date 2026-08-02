
SF.part1 = (() => {
  'use strict';

  function getProfile() {
    const profile = SF.storage.getProfile();
    if (!profile) SF.dashboard.showProfile();
    return profile;
  }

  function show(requestedLesson) {
    const profile = getProfile();
    if (!profile) return;

    const total = SF.config.part1TotalLessons;
    const lessonNumber = SF.utils.clamp(
      requestedLesson || profile.part1.currentLesson || 1,
      1,
      total
    );

    profile.part1.currentLesson = lessonNumber;
    SF.storage.saveProfile(profile);

    const lesson = SF.data.part1Lessons[lessonNumber - 1];
    const progress = Math.round((lessonNumber / total) * 100);

    SF.app.setView(`
      <div class="app-shell">
        <header class="topbar">
          <div>
            <div class="brand">Part 1: Interview</div>
            <small>${SF.utils.escapeHtml(profile.nickname)} · Lesson ${lessonNumber} of ${total}</small>
          </div>
          <div class="token-pill">⚡ ${Number(profile.tokens) || 0}</div>
        </header>

        <main>
          <section class="card">
            <div class="lesson-nav">
              <span><strong>${progress}% complete</strong></span>
              <button class="btn btn-secondary" type="button" data-action="dashboard">🏠 Home</button>
            </div>
            <div class="progress-track" role="progressbar" aria-valuemin="0"
              aria-valuemax="100" aria-valuenow="${progress}">
              <div class="progress-fill" style="width:${progress}%"></div>
            </div>
          </section>

          <section class="card">
            <p class="eyebrow">${lesson.eyebrow}</p>
            <h1>${lesson.title}</h1>
            ${lesson.body}
            ${lesson.practice ? practiceMarkup(profile.pathway) : ''}
          </section>

          <section class="card">
            <div class="lesson-nav">
              ${lessonNumber > 1
                ? `<button class="btn btn-secondary" type="button"
                    data-action="part1-lesson" data-lesson="${lessonNumber - 1}">← Previous</button>`
                : `<button class="btn btn-secondary" type="button" data-action="dashboard">← Home</button>`}

              ${lessonNumber < total
                ? `<button class="btn btn-primary" type="button"
                    data-action="part1-next" data-lesson="${lessonNumber}">Complete & Continue →</button>`
                : `<button class="btn btn-success" type="button"
                    data-action="complete-part1">Complete Part 1</button>`}
            </div>
          </section>
        </main>
      </div>
    `);
  }

  function practiceMarkup(pathway) {
    const question = SF.data.part1Questions[
      Math.floor(Math.random() * SF.data.part1Questions.length)
    ];

    const supportedHint = pathway === 'supported'
      ? `<div class="tip-box">
          <strong>Support path:</strong>
          <p>Try: “For me, … because …” Add where, when, or who with.</p>
        </div>`
      : '';

    const challengeHint = pathway === 'challenge'
      ? `<div class="tip-box">
          <strong>Challenge path:</strong>
          <p>Add two connected details without using a fixed script.</p>
        </div>`
      : '';

    return `
      <div class="question-box">
        <strong>Your interview question</strong>
        <p id="part1Question">${SF.utils.escapeHtml(question)}</p>
      </div>

      ${supportedHint}${challengeHint}

      <div class="field">
        <label for="part1Transition">Transition</label>
        <select id="part1Transition">
          <option value="">No transition / choose one</option>
          ${SF.data.transitions.map(item =>
            `<option value="${SF.utils.escapeHtml(item)}">${SF.utils.escapeHtml(item)}</option>`
          ).join('')}
        </select>
      </div>

      <div class="field">
        <label for="part1Answer">Direct answer</label>
        <textarea id="part1Answer" placeholder="Write a complete answer."></textarea>
      </div>

      <div class="field">
        <label for="part1DetailType">Detail type</label>
        <select id="part1DetailType">
          <option value="">Choose one</option>
          ${Object.keys(SF.data.detailStarters).map(type =>
            `<option value="${type}">${type}</option>`
          ).join('')}
        </select>
      </div>

      <div class="field">
        <label for="part1Detail">Useful detail</label>
        <textarea id="part1Detail" placeholder="Add a reason, example, experience, or situation."></textarea>
      </div>

      <button class="btn btn-primary" type="button" data-action="check-part1-response">
        Check My Response
      </button>

      <div id="part1Feedback" aria-live="polite"></div>
      <div id="part1Preview" class="response-preview" hidden></div>

      ${SF.voice.render('part1-practice', {
        title: 'Record your Part 1 answer',
        instruction:
          'Build your response first. Then record one clear interview answer.',
        maxSeconds: 60
      })}
    `;
  }

  function completeLesson(lessonNumber) {
    const profile = getProfile();
    if (!profile) return;

    const lesson = Number(lessonNumber) || profile.part1.currentLesson;
    if (!profile.part1.completedLessons.includes(lesson)) {
      profile.part1.completedLessons.push(lesson);
    }

    profile.part1.currentLesson = Math.min(lesson + 1, SF.config.part1TotalLessons);
    SF.storage.saveProfile(profile);
    show(profile.part1.currentLesson);
  }

  function checkResponse() {
    const transition = document.getElementById('part1Transition')?.value.trim() || '';
    const answer = document.getElementById('part1Answer')?.value.trim() || '';
    const detailType = document.getElementById('part1DetailType')?.value.trim() || '';
    const detail = document.getElementById('part1Detail')?.value.trim() || '';
    const feedback = document.getElementById('part1Feedback');
    const preview = document.getElementById('part1Preview');

    const issues = [];
    if (SF.utils.countWords(answer) < 5) issues.push('Give a complete direct answer.');
    if (!detailType) issues.push('Choose a detail type.');
    if (SF.utils.countWords(detail) < 6) issues.push('Develop the detail with at least six words.');

    if (issues.length) {
      feedback.innerHTML = `
        <div class="feedback-box improve">
          <strong>One more step</strong>
          <ul>${issues.map(issue => `<li>${SF.utils.escapeHtml(issue)}</li>`).join('')}</ul>
        </div>
      `;
      preview.hidden = true;
      preview.dataset.valid = 'false';
      return;
    }

    const complete = [transition, answer, detail].filter(Boolean).join(' ');
    feedback.innerHTML = `
      <div class="feedback-box good">
        <strong>Strong structure!</strong>
        <p>You gave a direct answer and added a ${SF.utils.escapeHtml(detailType.toLowerCase())} detail.</p>
      </div>
    `;

    preview.innerHTML = `
      <h2>Your complete response</h2>
      <p>${SF.utils.escapeHtml(complete)}</p>
      <p class="small">Read it aloud once. Aim for a clear and natural voice.</p>
    `;
    preview.hidden = false;
    preview.dataset.valid = 'true';
    SF.utils.showToast('Response ready!');
  }

  function completePart1() {
    const profile = getProfile();
    if (!profile) return;

    const preview = document.getElementById('part1Preview');
    if (!profile.part1.completed && (!preview || preview.dataset.valid !== 'true')) {
      const feedback = document.getElementById('part1Feedback');
      if (feedback) {
        feedback.innerHTML = `
          <div class="feedback-box improve">
            <strong>Finish the challenge first</strong>
            <p>Build and check one complete response before collecting the reward.</p>
          </div>
        `;
      }
      return;
    }

    if (!profile.part1.completed) {
      profile.part1.completed = true;
      profile.part1.completedLessons = [1, 2, 3, 4, 5, 6];
      profile.tokens = (Number(profile.tokens) || 0) + SF.config.rewards.part1;

      if (!profile.badges.includes('Interview Explorer')) {
        profile.badges.push('Interview Explorer');
      }

      if (!profile.completedMissions.includes('part1')) {
        profile.completedMissions.push('part1');
      }

      SF.storage.saveProfile(profile);
      SF.utils.showToast(`Mission complete! +${SF.config.rewards.part1} tokens`);
    }

    SF.dashboard.showDashboard();
  }

  return { show, completeLesson, checkResponse, completePart1 };
})();

