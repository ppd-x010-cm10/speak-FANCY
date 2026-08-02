
SF.part2 = (() => {
  'use strict';

  let activePromptIndex = 0;

  function getProfile() {
    const profile = SF.storage.getProfile();

    if (!profile) {
      SF.dashboard.showProfile();
      return null;
    }

    return profile;
  }

  function getPrompt(index) {
    const total = SF.data.part2Prompts.length;
    const safeIndex = ((Number(index) || 0) % total + total) % total;
    activePromptIndex = safeIndex;
    return SF.data.part2Prompts[safeIndex];
  }

  function show(requestedLesson) {
    const profile = getProfile();
    if (!profile) return;

    const total = SF.config.part2TotalLessons;
    const lessonNumber = SF.utils.clamp(
      requestedLesson || profile.part2.currentLesson || 1,
      1,
      total
    );

    profile.part2.currentLesson = lessonNumber;
    SF.storage.saveProfile(profile);

    const lesson = SF.data.part2Lessons[lessonNumber - 1];
    const progress = Math.round((lessonNumber / total) * 100);

    SF.app.setView(`
      <div class="app-shell">
        <header class="topbar">
          <div>
            <div class="brand">Part 2: Individual Long Turn</div>
            <small>
              ${SF.utils.escapeHtml(profile.nickname)}
              · Lesson ${lessonNumber} of ${total}
            </small>
          </div>
          <div class="token-pill">⚡ ${Number(profile.tokens) || 0}</div>
        </header>

        <main>
          <section class="card">
            <div class="lesson-nav">
              <span><strong>${progress}% complete</strong></span>
              <button class="btn btn-secondary" type="button" data-action="dashboard">
                Dashboard
              </button>
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
            ${lesson.planner ? plannerMarkup(profile) : ''}
            ${lesson.rehearsal ? rehearsalMarkup(profile, false) : ''}
            ${lesson.challenge ? rehearsalMarkup(profile, true) : ''}
          </section>

          <section class="card">
            <div class="lesson-nav">
              ${
                lessonNumber > 1
                  ? `
                    <button
                      class="btn btn-secondary"
                      type="button"
                      data-action="part2-lesson"
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
                      data-action="part2-next"
                      data-lesson="${lessonNumber}"
                    >
                      Complete & Continue →
                    </button>
                  `
                  : `
                    <button
                      class="btn btn-success"
                      type="button"
                      data-action="complete-part2"
                    >
                      Complete Part 2
                    </button>
                  `
              }
            </div>
          </section>
        </main>
      </div>
    `);
  }

  function plannerMarkup(profile) {
    const prompt = getPrompt(activePromptIndex);
    const saved = profile.part2.lastPlan || {};

    return `
      <div class="question-box">
        <strong>Planning topic</strong>
        <h2>${SF.utils.escapeHtml(prompt.question)}</h2>
      </div>

      <div class="button-row">
        <button
          class="btn btn-secondary"
          type="button"
          data-action="part2-change-topic"
        >
          Change Topic
        </button>
      </div>

      <div class="planning-grid">
        ${prompt.prompts.map((item, index) => `
          <article class="mini-card">
            <p class="eyebrow">Prompt ${index + 1}</p>
            <h3>${SF.utils.escapeHtml(item)}</h3>

            <div class="field">
              <label for="planAnswer${index}">Key answer</label>
              <input
                id="planAnswer${index}"
                value="${SF.utils.escapeHtml(saved.answers?.[index] || '')}"
                placeholder="Write a short note"
              >
            </div>

            <div class="field">
              <label for="planDetail${index}">One useful detail</label>
              <input
                id="planDetail${index}"
                value="${SF.utils.escapeHtml(saved.details?.[index] || '')}"
                placeholder="Reason, example, experience, or situation"
              >
            </div>
          </article>
        `).join('')}
      </div>

      <button
        class="btn btn-primary"
        type="button"
        data-action="save-part2-plan"
      >
        Save My Planning Card
      </button>

      <div id="part2PlanFeedback" aria-live="polite"></div>
    `;
  }

  function rehearsalMarkup(profile, isChallenge) {
    const prompt = getPrompt(
      profile.part2.lastPlan?.promptIndex ?? activePromptIndex
    );

    const pathway = profile.pathway || 'core';
    let support = '';

    if (pathway === 'supported') {
      support = `
        <div class="tip-box">
          <strong>Supported path</strong>
          <p>
            Write one direct sentence and one detail for each prompt.
            Use the transitions shown in each box.
          </p>
        </div>
      `;
    }

    if (pathway === 'challenge') {
      support = `
        <div class="tip-box">
          <strong>Challenge path</strong>
          <p>
            Vary your transitions and add a stronger REES detail to at least two prompts.
          </p>
        </div>
      `;
    }

    return `
      <div class="question-box">
        <strong>${isChallenge ? 'Boss topic' : 'Rehearsal topic'}</strong>
        <h2>${SF.utils.escapeHtml(prompt.question)}</h2>
      </div>

      ${support}

      <div class="planning-grid">
        ${prompt.prompts.map((item, index) => `
          <article class="mini-card">
            <p class="eyebrow">Prompt ${index + 1}</p>
            <h3>${SF.utils.escapeHtml(item)}</h3>

            <div class="field">
              <label for="part2Transition${index}">Transition</label>
              <select id="part2Transition${index}">
                ${SF.data.part2Transitions.map((transition, transitionIndex) => `
                  <option
                    value="${SF.utils.escapeHtml(transition)}"
                    ${transitionIndex === Math.min(index, SF.data.part2Transitions.length - 1) ? 'selected' : ''}
                  >
                    ${SF.utils.escapeHtml(transition)}
                  </option>
                `).join('')}
              </select>
            </div>

            <div class="field">
              <label for="part2Answer${index}">Direct answer</label>
              <textarea
                id="part2Answer${index}"
                placeholder="Answer the prompt directly."
              >${SF.utils.escapeHtml(profile.part2.lastPlan?.answers?.[index] || '')}</textarea>
            </div>

            <div class="field">
              <label for="part2DetailType${index}">REES detail</label>
              <select id="part2DetailType${index}">
                <option value="">Choose one</option>
                ${Object.entries(SF.data.part2DetailTypes).map(([type, description]) => `
                  <option value="${type}">
                    ${type} — ${SF.utils.escapeHtml(description)}
                  </option>
                `).join('')}
              </select>
            </div>

            <div class="field">
              <label for="part2Detail${index}">Develop the idea</label>
              <textarea
                id="part2Detail${index}"
                placeholder="Add a useful supporting detail."
              >${SF.utils.escapeHtml(profile.part2.lastPlan?.details?.[index] || '')}</textarea>
            </div>
          </article>
        `).join('')}
      </div>

      <button
        class="btn btn-primary"
        type="button"
        data-action="check-part2-response"
        data-challenge="${isChallenge ? 'true' : 'false'}"
      >
        Check My Long Turn
      </button>

      <div id="part2Feedback" aria-live="polite"></div>

      <div
        id="part2Preview"
        class="response-preview"
        hidden
      ></div>

      ${SF.voice.render(
        isChallenge
          ? 'part2-boss-recording'
          : 'part2-rehearsal-recording',
        {
          title: isChallenge
            ? 'Record your Part 2 Boss Challenge'
            : 'Record your Part 2 long turn',
          instruction:
            'Use your planning notes. Speak naturally and cover all four prompts.',
          maxSeconds: 180
        }
      )}
    `;
  }

  function collectPlan() {
    const prompt = getPrompt(activePromptIndex);
    const answers = [];
    const details = [];

    prompt.prompts.forEach((unused, index) => {
      answers.push(
        document.getElementById(`planAnswer${index}`)?.value.trim() || ''
      );

      details.push(
        document.getElementById(`planDetail${index}`)?.value.trim() || ''
      );
    });

    return {
      promptIndex: activePromptIndex,
      topic: prompt.topic,
      question: prompt.question,
      prompts: prompt.prompts.slice(),
      answers,
      details,
      savedAt: new Date().toISOString()
    };
  }

  function savePlan() {
    const profile = getProfile();
    if (!profile) return;

    const plan = collectPlan();
    const feedback = document.getElementById('part2PlanFeedback');
    const emptyAnswers = plan.answers.filter(answer => !answer).length;
    const emptyDetails = plan.details.filter(detail => !detail).length;

    if (emptyAnswers > 0 || emptyDetails > 0) {
      feedback.innerHTML = `
        <div class="feedback-box improve">
          <strong>Complete the planning card</strong>
          <p>
            Add a short answer and one detail for all four prompts.
          </p>
        </div>
      `;
      return;
    }

    profile.part2.lastPlan = plan;
    SF.storage.saveProfile(profile);

    feedback.innerHTML = `
      <div class="feedback-box good">
        <strong>Planning card saved!</strong>
        <p>
          You now have four small TAD ideas ready for rehearsal.
        </p>
      </div>
    `;

    SF.utils.showToast('Part 2 plan saved');
  }

  function changeTopic() {
    activePromptIndex =
      (activePromptIndex + 1) % SF.data.part2Prompts.length;

    const profile = getProfile();
    if (!profile) return;

    profile.part2.lastPlan = null;
    SF.storage.saveProfile(profile);
    show(5);
  }

  function completeLesson(lessonNumber) {
    const profile = getProfile();
    if (!profile) return;

    const lesson =
      Number(lessonNumber) || profile.part2.currentLesson;

    if (lesson === 5 && !profile.part2.lastPlan) {
      const feedback = document.getElementById('part2PlanFeedback');

      if (feedback) {
        feedback.innerHTML = `
          <div class="feedback-box improve">
            <strong>Save your plan first</strong>
            <p>Complete and save the planning card before moving on.</p>
          </div>
        `;
      }

      return;
    }

    if (!profile.part2.completedLessons.includes(lesson)) {
      profile.part2.completedLessons.push(lesson);
    }

    profile.part2.currentLesson = Math.min(
      lesson + 1,
      SF.config.part2TotalLessons
    );

    SF.storage.saveProfile(profile);
    show(profile.part2.currentLesson);
  }

  function collectLongTurn() {
    const profile = getProfile();
    const prompt = getPrompt(
      profile?.part2.lastPlan?.promptIndex ?? activePromptIndex
    );

    const responses = prompt.prompts.map((promptText, index) => ({
      prompt: promptText,
      transition:
        document.getElementById(`part2Transition${index}`)?.value.trim() || '',
      answer:
        document.getElementById(`part2Answer${index}`)?.value.trim() || '',
      detailType:
        document.getElementById(`part2DetailType${index}`)?.value.trim() || '',
      detail:
        document.getElementById(`part2Detail${index}`)?.value.trim() || ''
    }));

    return { prompt, responses };
  }

  function checkResponse(isChallenge) {
    const collected = collectLongTurn();
    const feedback = document.getElementById('part2Feedback');
    const preview = document.getElementById('part2Preview');
    const issues = [];
    let totalWords = 0;
    const transitions = new Set();
    const detailTypes = new Set();

    collected.responses.forEach((response, index) => {
      totalWords +=
        SF.utils.countWords(response.answer) +
        SF.utils.countWords(response.detail);

      if (SF.utils.countWords(response.answer) < 4) {
        issues.push(`Prompt ${index + 1}: give a clearer direct answer.`);
      }

      if (!response.detailType) {
        issues.push(`Prompt ${index + 1}: choose a REES detail.`);
      } else {
        detailTypes.add(response.detailType);
      }

      if (SF.utils.countWords(response.detail) < 6) {
        issues.push(`Prompt ${index + 1}: develop the detail further.`);
      }

      if (response.transition) {
        transitions.add(response.transition);
      }
    });

    if (totalWords < 55) {
      issues.push('Develop the full response to at least about 55 words.');
    }

    if (isChallenge && transitions.size < 3) {
      issues.push('Challenge: use at least three different transitions.');
    }

    if (isChallenge && detailTypes.size < 2) {
      issues.push('Challenge: use at least two different REES detail types.');
    }

    if (issues.length > 0) {
      feedback.innerHTML = `
        <div class="feedback-box improve">
          <strong>Improve your long turn</strong>
          <ul>
            ${issues
              .map(issue => `<li>${SF.utils.escapeHtml(issue)}</li>`)
              .join('')}
          </ul>
        </div>
      `;

      preview.hidden = true;
      preview.dataset.valid = 'false';

      if (isChallenge) {
        const profile = getProfile();

        if (profile) {
          profile.part2.challengePassed = false;
          SF.storage.saveProfile(profile);
        }
      }

      feedback.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });

      return;
    }

    const completeResponse = collected.responses
      .map(response =>
        [
          response.transition,
          response.answer,
          response.detail
        ].filter(Boolean).join(' ')
      )
      .join(' ');

    feedback.innerHTML = `
      <div class="feedback-box good">
        <strong>Long turn ready!</strong>
        <p>
          You answered all four prompts, used connected ideas,
          and developed each answer with a useful detail.
        </p>
      </div>
    `;

    preview.innerHTML = `
      <h2>Your complete Part 2 response</h2>
      <p>${SF.utils.escapeHtml(completeResponse)}</p>

      <div class="tip-box">
        <strong>Rehearsal step</strong>
        <p>
          Read the response once, then try again using only your planning notes.
          Speak naturally instead of memorising every word.
        </p>
      </div>

      <p class="small">
        Practice feedback only. Typed text cannot assess pronunciation,
        hesitation, or live spoken delivery.
      </p>
    `;

    preview.hidden = false;
    preview.dataset.valid = 'true';

    if (isChallenge) {
      const profile = getProfile();

      if (profile) {
        profile.part2.challengePassed = true;
        profile.part2.challengePassedAt = new Date().toISOString();
        SF.storage.saveProfile(profile);
      }
    }

    preview.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });

    SF.utils.showToast(
      isChallenge
        ? 'Boss Challenge passed — now click Complete Part 2'
        : 'Part 2 response ready'
    );
  }

  function completePart2() {
    const profile = getProfile();

    if (!profile) {
      return;
    }

    if (!profile.part2.completed && profile.part2.challengePassed !== true) {
      const feedback = document.getElementById('part2Feedback');

      if (feedback) {
        feedback.innerHTML = `
          <div class="feedback-box improve">
            <strong>Complete the Boss Challenge first</strong>
            <p>
              Fill in all four responses and click
              <strong>Check My Long Turn</strong>.
              When you see “Long turn ready”, click
              <strong>Complete Part 2</strong> again.
            </p>
          </div>
        `;

        feedback.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }

      SF.utils.showToast('Check the Boss Challenge before completing Part 2');
      return;
    }

    if (!profile.part2.completed) {
      profile.part2.completed = true;
      profile.part2.completedLessons = [1, 2, 3, 4, 5, 6, 7, 8];
      profile.tokens =
        (Number(profile.tokens) || 0) + SF.config.rewards.part2;

      if (!profile.badges.includes('Long Turn Navigator')) {
        profile.badges.push('Long Turn Navigator');
      }

      if (!profile.completedMissions.includes('part2')) {
        profile.completedMissions.push('part2');
      }

      if (!SF.storage.saveProfile(profile)) {
        SF.utils.showToast('Part 2 progress could not be saved');
        return;
      }

      SF.utils.showToast(
        `Mission complete! +${SF.config.rewards.part2} tokens`
      );
    }

    SF.dashboard.showDashboard();
  }

  return {
    show,
    savePlan,
    changeTopic,
    completeLesson,
    checkResponse,
    completePart2
  };
})();

