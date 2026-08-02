
SF.introduction = (() => {
  'use strict';

  function show() {
    const profile = SF.storage.getProfile();
    if (!profile) {
      SF.dashboard.showProfile();
      return;
    }

    SF.app.setView(`
      <div class="app-shell">
        <header class="topbar">
          <div><div class="brand">Speak FANCY</div><small>TAD–REES Introduction</small></div>
          <button
  class="btn btn-secondary"
  type="button"
  data-action="dashboard"
  aria-label="Return to Home"
>
  🏠 Home
</button>
        </header>

        <main>
          <section class="card hero">
            <p class="eyebrow">The thinking engine</p>
            <h1>TAD + REES</h1>
            <p>Use TAD to organise the response. Use REES to develop the Details.</p>
          </section>

          <section class="card">
            <div class="tad-grid">
              <article class="mini-card formula-t"><h2>Transition</h2><p>Begin or move smoothly.</p></article>
              <article class="mini-card formula-a"><h2>Answer</h2><p>Respond directly.</p></article>
              <article class="mini-card formula-d"><h2>Details</h2><p>Add support with REES.</p></article>
            </div>
            <div class="tip-box">
              <strong>REES:</strong>
              <p>Research · Examples · Experience · Situation</p>
            </div>
            <button class="btn btn-primary" type="button" data-action="part1">Continue to Part 1</button>
          </section>
        </main>
      </div>
    `);
  }

  return { show };
})();

