
SF.data = Object.freeze({
  part1Questions: [
    'What do you usually do after school?',
    'What is your favourite school subject?',
    'How do you spend your weekends?',
    'Tell me about a hobby you enjoy.',
    'What food do you enjoy eating?',
    'How do you travel to school?',
    'Who do you usually spend time with?',
    'What place in Sabah would you recommend to a visitor?'
  ],

  transitions: [
    'To begin with,',
    'First of all,',
    'For me,',
    'In my opinion,',
    'As for my daily routine,'
  ],

  detailStarters: {
    Example: 'For example,',
    Experience: 'From my experience,',
    Situation: 'I usually do this when',
    Reason: 'This is because'
  },

  part1Lessons: [
    {
      title: 'Meet Part 1',
      eyebrow: 'Mission 1 · Know the task',
      body: `
        <p>
          In Part 1, you answer questions about yourself and familiar topics.
          The full speaking test guide gives about 3–4 minutes for this part.
        </p>
        <div class="tip-box">
          <strong>Your goal</strong>
          <p>Understand the question and give a clear, relevant response.</p>
        </div>
      `
    },
    {
      title: 'Build the TAD core',
      eyebrow: 'Mission 2 · Structure',
      body: `
        <p>TAD gives each answer a simple path.</p>
        <div class="tad-grid">
          <article class="mini-card formula-t">
            <h3>T — Transition</h3>
            <p>Start naturally or move to a new point.</p>
          </article>
          <article class="mini-card formula-a">
            <h3>A — Answer</h3>
            <p>Respond directly to the question.</p>
          </article>
          <article class="mini-card formula-d">
            <h3>D — Details</h3>
            <p>Add a reason, example, experience, or situation.</p>
          </article>
        </div>
      `
    },
    {
      title: 'Use the basic speaking rule',
      eyebrow: 'Mission 3 · Stronger answers',
      body: `
        <p>Avoid stopping after one word. Give a direct answer and add one useful detail.</p>
        <div class="question-box">
          <strong>Question:</strong>
          <p>What is your favourite subject?</p>
        </div>
        <div class="feedback-box improve">
          <strong>Too short:</strong>
          <p>English.</p>
        </div>
        <div class="feedback-box good">
          <strong>Stronger:</strong>
          <p>My favourite subject is English because I enjoy learning new words.</p>
        </div>
      `
    },
    {
      title: 'Grow the Details',
      eyebrow: 'Mission 4 · REES choices',
      body: `
        <p>Choose one detail that supports your answer. You do not need every REES type.</p>
        <div class="tad-grid">
          <article class="mini-card"><h3>Research</h3><p>A reliable fact or accepted idea.</p></article>
          <article class="mini-card"><h3>Example</h3><p>A clear example that shows your point.</p></article>
          <article class="mini-card"><h3>Experience</h3><p>Something you did, saw, or felt.</p></article>
          <article class="mini-card"><h3>Situation</h3><p>When, where, or with whom it happens.</p></article>
        </div>
      `
    },
    {
      title: 'Powerful starters',
      eyebrow: 'Mission 5 · Speak smoothly',
      body: `
        <p>Use a starter when it helps the answer sound clear. Do not force one into every short response.</p>
        <div class="question-box">
          <p><strong>Transitions:</strong> To begin with, · For me, · In my opinion, · As for my daily routine,</p>
          <p><strong>Detail links:</strong> because · for example · when · with my friends</p>
        </div>
      `
    },
    {
      title: 'Interview Challenge',
      eyebrow: 'Mission 6 · Guided practice',
      practice: true,
      body: `<p>Build one complete Part 1 response. Then read it aloud.</p>`
    }
  ],

  part2Prompts: [
    {
      topic: 'A useful gadget',
      question: 'Talk about a useful gadget.',
      prompts: [
        'What is the gadget?',
        'How often do you use it?',
        'What do you use it for?',
        'Why is it useful?'
      ]
    },
    {
      topic: 'A place you enjoy visiting',
      question: 'Talk about a place you enjoy visiting.',
      prompts: [
        'What is the place?',
        'Where is it?',
        'What do you do there?',
        'Why do you enjoy visiting it?'
      ]
    },
    {
      topic: 'An activity you enjoy',
      question: 'Talk about an activity you enjoy.',
      prompts: [
        'What is the activity?',
        'When do you do it?',
        'Who do you do it with?',
        'Why do you enjoy it?'
      ]
    },
    {
      topic: 'A person who inspires you',
      question: 'Talk about a person who inspires you.',
      prompts: [
        'Who is the person?',
        'How do you know this person?',
        'What has this person done?',
        'Why does this person inspire you?'
      ]
    },
    {
      topic: 'A local food you would recommend',
      question: 'Talk about a local food you would recommend.',
      prompts: [
        'What is the food?',
        'Where can people find it?',
        'What does it taste like?',
        'Why would you recommend it?'
      ]
    }
  ],

  part2Transitions: [
    'To begin with,',
    'Moving on,',
    'Besides that,',
    'Another important point is that',
    'Finally,'
  ],

  part2DetailTypes: {
    Research: 'Research or a generally accepted idea',
    Example: 'A clear example or list',
    Experience: 'Something you did, saw, or felt',
    Situation: 'When, where, with whom, or under what circumstances'
  },

  part2Lessons: [
    {
      title: 'Meet Part 2',
      eyebrow: 'Mission 1 · Understand the long turn',
      body: `
        <p>
          In Part 2, you speak for a longer turn about one topic.
          The speaking guide gives about 3–4 minutes for this part.
        </p>
        <div class="tip-box">
          <strong>Your mission</strong>
          <p>Answer every prompt, connect your ideas, and keep your response relevant.</p>
        </div>
      `
    },
    {
      title: 'Turn one card into four small answers',
      eyebrow: 'Mission 2 · Break down the task',
      body: `
        <p>
          Do not try to create one long speech immediately.
          Treat each prompt as one small TAD answer.
        </p>
        <div class="question-box">
          <strong>Example topic:</strong>
          <p>Talk about a useful gadget.</p>
          <ol>
            <li>What is it?</li>
            <li>How often do you use it?</li>
            <li>What do you use it for?</li>
            <li>Why is it useful?</li>
          </ol>
        </div>
      `
    },
    {
      title: 'Use TAD for every prompt',
      eyebrow: 'Mission 3 · Build the core',
      body: `
        <p>For each prompt, use a transition, a direct answer, and a useful detail.</p>
        <div class="tad-grid">
          <article class="mini-card formula-t"><h3>T</h3><p>Show that you are starting or moving to a new prompt.</p></article>
          <article class="mini-card formula-a"><h3>A</h3><p>Respond directly to the prompt.</p></article>
          <article class="mini-card formula-d"><h3>D</h3><p>Develop the answer with support.</p></article>
        </div>
        <div class="feedback-box good">
          <strong>Example:</strong>
          <p>Moving on, I use my smartphone every day. It is useful after school when I need to check assignments.</p>
        </div>
      `
    },
    {
      title: 'Power up Details with REES',
      eyebrow: 'Mission 4 · Expand ideas',
      body: `
        <p>
          Choose one or two useful details for each prompt.
          You do not need to use all four REES choices every time.
        </p>
        <div class="tad-grid">
          <article class="mini-card"><h3>Research</h3><p>A relevant fact or generally accepted idea.</p></article>
          <article class="mini-card"><h3>Example</h3><p>A clear example or list.</p></article>
          <article class="mini-card"><h3>Experience</h3><p>Something you have done, seen, or felt.</p></article>
          <article class="mini-card"><h3>Situation</h3><p>When, where, with whom, or under what circumstances.</p></article>
        </div>
      `
    },
    {
      title: 'Use a planning card',
      eyebrow: 'Mission 5 · Plan smart',
      planner: true,
      body: `
        <p>
          Write short notes, not a full memorised script.
          Your notes should help you remember the key answer and one detail for each prompt.
        </p>
      `
    },
    {
      title: 'Connect the long turn',
      eyebrow: 'Mission 6 · Speak smoothly',
      body: `
        <p>Use varied transitions to move from one prompt to the next.</p>
        <div class="question-box">
          <p><strong>Useful sequence:</strong></p>
          <p>To begin with, → Moving on, → Besides that, → Finally,</p>
        </div>
        <div class="tip-box">
          <strong>Avoid repetition</strong>
          <p>Do not begin every sentence with “And then”. Choose a transition that shows your direction.</p>
        </div>
      `
    },
    {
      title: 'Build a full response',
      eyebrow: 'Mission 7 · Guided rehearsal',
      rehearsal: true,
      body: `
        <p>
          Use your planning card to build four connected TAD answers.
          The app will check structure, coverage, and connection.
        </p>
      `
    },
    {
      title: 'Part 2 Boss Challenge',
      eyebrow: 'Mission 8 · Speak with confidence',
      challenge: true,
      body: `
        <p>
          Complete one final long-turn plan and rehearse it aloud.
          This practice does not provide an official SPM band.
        </p>
      `
    }
  ],

  part3Topics: [
    {
      title: 'Ways to encourage healthy living among teenagers',
      options: [
        'organise school sports activities',
        'teach healthy food choices',
        'reduce screen time',
        'create family exercise routines',
        'provide safe recreational spaces'
      ],
      decisionQuestion: 'Which way would have the greatest impact?'
    },
    {
      title: 'Ways to make a school more environmentally friendly',
      options: [
        'reduce single-use plastic',
        'plant more trees',
        'save electricity',
        'separate recyclable waste',
        'organise awareness campaigns'
      ],
      decisionQuestion: 'Which action should the school start first?'
    },
    {
      title: 'Ways to help students improve their English',
      options: [
        'join an English club',
        'watch suitable English videos',
        'read short English texts',
        'practise speaking with friends',
        'use learning applications'
      ],
      decisionQuestion: 'Which method is the most practical for students?'
    },
    {
      title: 'Ways to support tourism in Sabah',
      options: [
        'promote local food',
        'protect natural attractions',
        'improve public information',
        'support community businesses',
        'share responsible travel content'
      ],
      decisionQuestion: 'Which idea should receive the most support?'
    }
  ],

  part3InteractionMoves: {
    start: [
      'To begin with, I think ...',
      'In my opinion, ...',
      'I would suggest ...'
    ],
    develop: [
      'This is because ...',
      'For example, ...',
      'From my experience, ...',
      'In this situation, ...'
    ],
    invite: [
      'What do you think?',
      'Do you agree with this idea?',
      'Which option would you choose?'
    ],
    respond: [
      'I agree because ...',
      'I see your point, and I would add that ...',
      'I understand your idea, but I think ...',
      'That is possible. However, ...'
    ],
    clarify: [
      'Could you explain that further?',
      'What do you mean by ...?',
      'Can you give an example?'
    ],
    decide: [
      'We seem to agree that ...',
      'After comparing the ideas, we would choose ...',
      'The strongest option is ... because ...'
    ]
  },

  part3Lessons: [
    {
      title: 'Meet Part 3',
      eyebrow: 'Mission 1 · Know the discussion',
      body: `
        <p>
          Part 3 is a collaborative discussion. You share ideas,
          respond to a partner, develop the interaction, and work
          towards an outcome.
        </p>
        <div class="tip-box">
          <strong>Timing</strong>
          <p>The assessment guide gives about 4–5 minutes for Part 3.</p>
        </div>
      `
    },
    {
      title: 'Build your first contribution',
      eyebrow: 'Mission 2 · TAD in discussion',
      body: `
        <p>Use TAD to make one clear contribution.</p>
        <div class="tad-grid">
          <article class="mini-card formula-t">
            <h3>Transition</h3>
            <p>Show that you are starting, responding, or adding a point.</p>
          </article>
          <article class="mini-card formula-a">
            <h3>Answer</h3>
            <p>State your view or suggestion directly.</p>
          </article>
          <article class="mini-card formula-d">
            <h3>Details</h3>
            <p>Explain the idea so your partner can respond.</p>
          </article>
        </div>
      `
    },
    {
      title: 'Add useful REES details',
      eyebrow: 'Mission 3 · Develop your point',
      body: `
        <p>
          A discussion grows when you add relevant support.
          Choose Research, an Example, an Experience, or a Situation.
        </p>
        <div class="question-box">
          <strong>Example</strong>
          <p>
            In my opinion, schools should organise more sports activities.
            For example, short weekly games can help students become more active.
          </p>
        </div>
      `
    },
    {
      title: 'Listen and respond',
      eyebrow: 'Mission 4 · Connect with a partner',
      body: `
        <p>
          Do not give separate speeches. Show that you heard the other person.
        </p>
        <div class="planning-grid">
          <article class="mini-card">
            <h3>Agree and develop</h3>
            <p>I agree because ...</p>
            <p>I see your point, and I would add that ...</p>
          </article>
          <article class="mini-card">
            <h3>Disagree politely</h3>
            <p>I understand your idea, but I think ...</p>
            <p>That is possible. However, ...</p>
          </article>
          <article class="mini-card">
            <h3>Ask for more</h3>
            <p>Could you explain that further?</p>
            <p>Can you give an example?</p>
          </article>
          <article class="mini-card">
            <h3>Invite a view</h3>
            <p>What do you think?</p>
            <p>Which option would you choose?</p>
          </article>
        </div>
      `
    },
    {
      title: 'Keep the discussion moving',
      eyebrow: 'Mission 5 · Interaction loop',
      body: `
        <p>Use this simple loop:</p>
        <div class="question-box">
          <p><strong>Share → Develop → Invite → Respond → Compare</strong></p>
        </div>
        <p>
          This creates real interaction and helps both speakers
          maintain and develop the conversation.
        </p>
      `
    },
    {
      title: 'Practise one discussion turn',
      eyebrow: 'Mission 6 · Guided interaction',
      practice: true,
      body: `
        <p>
          Build one turn that responds to a partner and moves
          the discussion forward.
        </p>
      `
    },
    {
      title: 'Reach a shared decision',
      eyebrow: 'Mission 7 · Negotiate an outcome',
      decision: true,
      body: `
        <p>
          Compare two ideas, explain your choice, and write a closing decision.
        </p>
      `
    },
    {
      title: 'Part 3 Boss Challenge',
      eyebrow: 'Mission 8 · Collaborative discussion',
      challenge: true,
      body: `
        <p>
          Complete a short simulated exchange with a partner.
          Show a clear idea, useful detail, partner response,
          invitation, and shared decision.
        </p>
      `
    }
  ]

});

