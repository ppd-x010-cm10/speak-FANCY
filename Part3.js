
SF.part3 = (() => {
  'use strict';

  let activeTopicIndex = 0;

  function getProfile() {
    const profile = SF.storage.getProfile();

    if (!profile) {
      SF.dashboard.showProfile();
      return null;
    }

    return profile;
  }

  function getTopic(index) {
    const total = SF.data.part3Topics.length;
    activeTopicIndex = ((Number(index) || 0) % total + total) % total;
    return SF.data.part3Topics[activeTopicIndex];
  }

  function show(requestedLesson) {
    const profile = getProfile();
    if (!profile) return;

    const total = SF.config.part3TotalLessons;
    const lessonNumber = SF.utils.clamp(
      requestedLesson || profile.part3.currentLesson || 1,
      1,
      total
    );

    profile.part3.currentLesson = lessonNumber;
    SF.storage.saveProfile(profile);

    const lesson = SF.data.part3Lessons[lessonNumber - 1];
    const progress = Math.round((lessonNumber / total) * 100);

    SF.app.setView(`
      <div class="app-shell">
        <header class="topbar">
          <div>
            <div class="brand">Part 3: Collaborative Discussion</div>
            <small>
              ${SF.utils.escapeHtml(profile.nickname)}
              · Lesson ${lessonNumber} of ${total}
            </small>
          </div>

          <div class="button-row">
            <div class="token-pill">⚡ ${Number(profile.tokens) || 0}</div>
            <button
              class="btn btn-secondary home-button"
              type="button"
              data-action="dashboard"
              aria-label="Return to Home"
            >
              🏠 Home
            </button>
          </div>
        </header>

        <main>
          <section class="card">
            <div class="lesson-nav">
              <span><strong>${progress}% complete</strong></span>
              <span class="small">Mission ${lessonNumber} of ${total}</span>
            </div>

            <div
              class="progress-track"
              role="progressbar"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow="${progress}"
            >
              <div class="progress-fill" style="width:${progress}%"></div>
            </div>
          </section>

          <section class="card">
            <p class="eyebrow">${lesson.eyebrow}</p>
            <h1>${lesson.title}</h1>

            ${lesson.body}
            ${lesson.practice ? practiceMarkup(profile) : ''}
            ${lesson.decision ? decisionMarkup(profile) : ''}
            ${lesson.challenge ? challengeMarkup(profile) : ''}
          </section>

          <section class="card">
            <div class="lesson-nav">
              ${
                lessonNumber > 1
                  ? `
                    <button
                      class="btn btn-secondary"
                      type="button"
                      data-action="part3-lesson"
                      data-lesson="${lessonNumber - 1}"
                    >
                      ← Previous
                    </button>
                  `
                  : `
                    <button
                      class="btn btn-secondary"
                      type="button"
                      data-action="dashboard"
                    >
                      ← Home
                    </button>
                  `
              }

              ${
                lessonNumber < total
                  ? `
                    <button
                      class="btn btn-primary"
                      type="button"
                      data-action="part3-next"
                      data-lesson="${lessonNumber}"
                    >
                      Complete & Continue →
                    </button>
                  `
                  : `
                    <button
                      class="btn btn-success"
                      type="button"
                      data-action="complete-part3"
                    >
                      Complete Part 3
                    </button>
                  `
              }
            </div>
          </section>
        </main>
      </div>
    `);
  }

  function topicCard(topic) {
    return `
      <div class="question-box">
        <strong>Discussion topic</strong>
        <h2>${SF.utils.escapeHtml(topic.title)}</h2>
        <ul>
          ${topic.options
            .map(option => `<li>${SF.utils.escapeHtml(option)}</li>`)
            .join('')}
        </ul>
      </div>
    `;
  }

  function supportNotice(pathway) {
    if (pathway === 'supported') {
      return `
        <div class="tip-box">
          <strong>Supported path</strong>
          <p>
            Use the sentence starters. Write one clear idea,
            one detail, and one question for your partner.
          </p>
        </div>
      `;
    }

    if (pathway === 'challenge') {
      return `
        <div class="tip-box">
          <strong>Challenge path</strong>
          <p>
            Respond naturally, vary your language,
            and compare more than one option.
          </p>
        </div>
      `;
    }

    return '';
  }

  function practiceMarkup(profile) {
    const topic = getTopic(activeTopicIndex);

    return `
      ${topicCard(topic)}
      ${supportNotice(profile.pathway)}

      <div class="button-row">
        <button
          class="btn btn-secondary"
          type="button"
          data-action="part3-change-topic"
          data-lesson="6"
        >
          Change Topic
        </button>
      </div>

      <div class="field">
        <label for="part3PartnerIdea">Your partner says</label>
        <select id="part3PartnerIdea">
          ${topic.options.map(option => `
            <option value="${SF.utils.escapeHtml(option)}">
              ${SF.utils.escapeHtml(option)}
            </option>
          `).join('')}
        </select>
      </div>

      <div class="field">
        <label for="part3ResponseMove">How will you respond?</label>
        <select id="part3ResponseMove">
          <option value="">Choose a response move</option>
          ${SF.data.part3InteractionMoves.respond.map(item => `
            <option value="${SF.utils.escapeHtml(item)}">
              ${SF.utils.escapeHtml(item)}
            </option>
          `).join('')}
        </select>
      </div>

      <div class="field">
        <label for="part3OwnIdea">Your view</label>
        <textarea
          id="part3OwnIdea"
          placeholder="State your view clearly."
        ></textarea>
      </div>

      <div class="field">
        <label for="part3Detail">Develop the idea</label>
        <textarea
          id="part3Detail"
          placeholder="Add a reason, example, experience, or situation."
        ></textarea>
      </div>

      <div class="field">
        <label for="part3Invite">Invite your partner</label>
        <select id="part3Invite">
          <option value="">Choose a question</option>
          ${SF.data.part3InteractionMoves.invite.map(item => `
            <option value="${SF.utils.escapeHtml(item)}">
              ${SF.utils.escapeHtml(item)}
            </option>
          `).join('')}
        </select>
      </div>

      <button
        class="btn btn-primary"
        type="button"
        data-action="check-part3-turn"
      >
        Check My Discussion Turn
      </button>

      <div id="part3Feedback" aria-live="polite"></div>
      <div id="part3Preview" class="response-preview" hidden></div>

      ${SF.voice.render('part3-turn-recording', {
        title: 'Record your discussion turn',
        instruction:
          'Read the partner idea, respond to it, develop your point, and invite a reply.',
        maxSeconds: 90
      })}
    `;
  }

  function decisionMarkup(profile) {
    const topic = getTopic(activeTopicIndex);

    return `
      ${topicCard(topic)}
      ${supportNotice(profile.pathway)}

      <div class="field">
        <label for="part3ChoiceA">First idea to compare</label>
        <select id="part3ChoiceA">
          ${topic.options.map(option => `
            <option value="${SF.utils.escapeHtml(option)}">
              ${SF.utils.escapeHtml(option)}
            </option>
          `).join('')}
        </select>
      </div>

      <div class="field">
        <label for="part3ChoiceB">Second idea to compare</label>
        <select id="part3ChoiceB">
          ${topic.options.map((option, index) => `
            <option
              value="${SF.utils.escapeHtml(option)}"
              ${index === 1 ? 'selected' : ''}
            >
              ${SF.utils.escapeHtml(option)}
            </option>
          `).join('')}
        </select>
      </div>

      <div class="field">
        <label for="part3Comparison">Compare the two ideas</label>
        <textarea
          id="part3Comparison"
          placeholder="Both ideas are useful, but..."
        ></textarea>
      </div>

      <div class="field">
        <label for="part3Decision">Shared decision</label>
        <textarea
          id="part3Decision"
          placeholder="After comparing the ideas, we would choose..."
        ></textarea>
      </div>

      <button
        class="btn btn-primary"
        type="button"
        data-action="check-part3-decision"
      >
        Check Our Decision
      </button>

      <div id="part3Feedback" aria-live="polite"></div>
      <div id="part3Preview" class="response-preview" hidden></div>

      ${SF.voice.render('part3-decision-recording', {
        title: 'Record the shared decision',
        instruction:
          'Compare the ideas aloud and finish with a clear group decision.',
        maxSeconds: 120
      })}
    `;
  }

  function challengeMarkup(profile) {
    const topic = getTopic(activeTopicIndex);

    return `
      ${topicCard(topic)}
      ${supportNotice(profile.pathway)}

      <div class="button-row">
        <button
          class="btn btn-secondary"
          type="button"
          data-action="part3-change-topic"
          data-lesson="8"
        >
          Change Boss Topic
        </button>
      </div>

      <div class="discussion-grid">
        <article class="mini-card">
          <p class="eyebrow">Turn 1 · Your idea</p>

          <div class="field">
            <label for="bossIdea">Share one option</label>
            <textarea
              id="bossIdea"
              placeholder="In my opinion..."
            ></textarea>
          </div>

          <div class="field">
            <label for="bossDetail">Develop it</label>
            <textarea
              id="bossDetail"
              placeholder="This is because... / For example..."
            ></textarea>
          </div>

          <div class="field">
            <label for="bossInvite">Invite your partner</label>
            <select id="bossInvite">
              <option value="">Choose one</option>
              ${SF.data.part3InteractionMoves.invite.map(item => `
                <option value="${SF.utils.escapeHtml(item)}">
                  ${SF.utils.escapeHtml(item)}
                </option>
              `).join('')}
            </select>
          </div>
        </article>

        <article class="mini-card">
          <p class="eyebrow">Turn 2 · Partner response</p>

          <div class="field">
            <label for="bossPartner">Partner's reply</label>
            <textarea
              id="bossPartner"
              placeholder="I agree because... / I understand, but..."
            ></textarea>
          </div>

          <div class="field">
            <label for="bossFollowUp">Your follow-up</label>
            <textarea
              id="bossFollowUp"
              placeholder="Respond to the partner and develop the discussion."
            ></textarea>
          </div>
        </article>

        <article class="mini-card">
          <p class="eyebrow">Turn 3 · Outcome</p>

          <div class="field">
            <label for="bossDecision">Shared decision</label>
            <textarea
              id="bossDecision"
              placeholder="After comparing the ideas, we would choose..."
            ></textarea>
          </div>
        </article>
      </div>

      <button
        class="btn btn-primary"
        type="button"
        data-action="check-part3-challenge"
      >
        Check Boss Challenge
      </button>

      <div id="part3Feedback" aria-live="polite"></div>
      <div id="part3Preview" class="response-preview" hidden></div>

      ${SF.voice.render('part3-boss-recording', {
        title: 'Record the Part 3 Boss Challenge',
        instruction:
          'Perform the full exchange with a partner. Include an idea, response, follow-up, and decision.',
        maxSeconds: 180
      })}
    `;
  }

  function showIssues(issues) {
    const feedback = document.getElementById('part3Feedback');
    const preview = document.getElementById('part3Preview');

    if (feedback) {
      feedback.innerHTML = `
        <div class="feedback-box improve">
          <strong>Improve the interaction</strong>
          <ul>
            ${issues.map(issue =>
              `<li>${SF.utils.escapeHtml(issue)}</li>`
            ).join('')}
          </ul>
        </div>
      `;

      feedback.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }

    if (preview) {
      preview.hidden = true;
      preview.dataset.valid = 'false';
    }
  }

  function showSuccess(title, text) {
    const feedback = document.getElementById('part3Feedback');
    const preview = document.getElementById('part3Preview');

    if (feedback) {
      feedback.innerHTML = `
        <div class="feedback-box good">
          <strong>${SF.utils.escapeHtml(title)}</strong>
          <p>
            Your contribution responds, develops the idea,
            and helps move the discussion forward.
          </p>
        </div>
      `;
    }

    if (preview) {
      preview.innerHTML = `
        <h2>Discussion preview</h2>
        <p>${SF.utils.escapeHtml(text)}</p>
        <p class="small">
          Read this aloud with a partner. Focus on listening
          and responding, not memorising every word.
        </p>
      `;

      preview.hidden = false;
      preview.dataset.valid = 'true';

      preview.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }

  function checkTurn() {
    const move =
      document.getElementById('part3ResponseMove')?.value.trim() || '';

    const idea =
      document.getElementById('part3OwnIdea')?.value.trim() || '';

    const detail =
      document.getElementById('part3Detail')?.value.trim() || '';

    const invite =
      document.getElementById('part3Invite')?.value.trim() || '';

    const issues = [];

    if (!move) {
      issues.push('Choose how you will respond to your partner.');
    }

    if (SF.utils.countWords(idea) < 5) {
      issues.push('State a clearer view.');
    }

    if (SF.utils.countWords(detail) < 7) {
      issues.push('Develop your idea with a useful detail.');
    }

    if (!invite) {
      issues.push('Invite your partner to respond.');
    }

    if (issues.length) {
      showIssues(issues);
      return;
    }

    showSuccess(
      'Good interaction move!',
      [move, idea, detail, invite].join(' ')
    );
  }

  function checkDecision() {
    const choiceA =
      document.getElementById('part3ChoiceA')?.value.trim() || '';

    const choiceB =
      document.getElementById('part3ChoiceB')?.value.trim() || '';

    const comparison =
      document.getElementById('part3Comparison')?.value.trim() || '';

    const decision =
      document.getElementById('part3Decision')?.value.trim() || '';

    const issues = [];

    if (choiceA === choiceB) {
      issues.push('Choose two different ideas to compare.');
    }

    if (SF.utils.countWords(comparison) < 10) {
      issues.push('Compare the two ideas in more detail.');
    }

    if (SF.utils.countWords(decision) < 8) {
      issues.push('Give a clear shared decision and reason.');
    }

    if (issues.length) {
      showIssues(issues);
      return;
    }

    showSuccess(
      'Shared decision ready!',
      `${comparison} ${decision}`
    );
  }

  function checkChallenge() {
    const idea =
      document.getElementById('bossIdea')?.value.trim() || '';

    const detail =
      document.getElementById('bossDetail')?.value.trim() || '';

    const invite =
      document.getElementById('bossInvite')?.value.trim() || '';

    const partner =
      document.getElementById('bossPartner')?.value.trim() || '';

    const followUp =
      document.getElementById('bossFollowUp')?.value.trim() || '';

    const decision =
      document.getElementById('bossDecision')?.value.trim() || '';

    const issues = [];

    if (SF.utils.countWords(idea) < 6) {
      issues.push('Turn 1: share a clear idea.');
    }

    if (SF.utils.countWords(detail) < 8) {
      issues.push('Turn 1: add a stronger detail.');
    }

    if (!invite) {
      issues.push('Turn 1: invite your partner.');
    }

    if (SF.utils.countWords(partner) < 7) {
      issues.push('Turn 2: write a meaningful partner response.');
    }

    if (SF.utils.countWords(followUp) < 8) {
      issues.push('Turn 2: respond and develop the interaction.');
    }

    if (SF.utils.countWords(decision) < 9) {
      issues.push('Turn 3: reach a clear shared decision.');
    }

    const profile = getProfile();

    if (issues.length) {
      if (profile) {
        profile.part3.challengePassed = false;
        SF.storage.saveProfile(profile);
      }

      showIssues(issues);
      return;
    }

    if (profile) {
      profile.part3.challengePassed = true;
      profile.part3.challengePassedAt = new Date().toISOString();
      SF.storage.saveProfile(profile);
    }

    showSuccess(
      'Boss Challenge passed!',
      [idea, detail, invite, partner, followUp, decision].join(' ')
    );

    SF.utils.showToast(
      'Boss Challenge passed — now click Complete Part 3'
    );
  }

  function changeTopic(lessonNumber) {
    activeTopicIndex =
      (activeTopicIndex + 1) % SF.data.part3Topics.length;

    show(Number(lessonNumber) || 6);
  }

  function completeLesson(lessonNumber) {
    const profile = getProfile();
    if (!profile) return;

    const lesson =
      Number(lessonNumber) || profile.part3.currentLesson;

    if (!profile.part3.completedLessons.includes(lesson)) {
      profile.part3.completedLessons.push(lesson);
    }

    profile.part3.currentLesson = Math.min(
      lesson + 1,
      SF.config.part3TotalLessons
    );

    SF.storage.saveProfile(profile);
    show(profile.part3.currentLesson);
  }

  function completePart3() {
    const profile = getProfile();
    if (!profile) return;

    if (
      !profile.part3.completed &&
      profile.part3.challengePassed !== true
    ) {
      showIssues([
        'Complete and check the Boss Challenge before collecting the reward.'
      ]);

      SF.utils.showToast(
        'Check the Boss Challenge before completing Part 3'
      );

      return;
    }

    if (!profile.part3.completed) {
      profile.part3.completed = true;
      profile.part3.completedLessons = [1, 2, 3, 4, 5, 6, 7, 8];

      profile.tokens =
        (Number(profile.tokens) || 0) + SF.config.rewards.part3;

      if (!profile.badges.includes('Discussion Collaborator')) {
        profile.badges.push('Discussion Collaborator');
      }

      if (!profile.completedMissions.includes('part3')) {
        profile.completedMissions.push('part3');
      }

      if (!SF.storage.saveProfile(profile)) {
        SF.utils.showToast('Part 3 progress could not be saved');
        return;
      }

      SF.utils.showToast(
        `Mission complete! +${SF.config.rewards.part3} tokens`
      );
    }

    SF.dashboard.showDashboard();
  }

  return {
    show,
    checkTurn,
    checkDecision,
    checkChallenge,
    changeTopic,
    completeLesson,
    completePart3
  };
})();

