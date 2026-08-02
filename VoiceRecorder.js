
SF.voice = (() => {
  'use strict';

  const sessions = new Map();
  let activeId = null;

  function supportsRecording() {
    return Boolean(
      navigator.mediaDevices &&
      typeof navigator.mediaDevices.getUserMedia === 'function' &&
      typeof window.MediaRecorder === 'function'
    );
  }

  function render(id, options = {}) {
    const safeId = SF.utils.escapeHtml(id);
    const title = SF.utils.escapeHtml(
      options.title || 'Voice Practice'
    );
    const instruction = SF.utils.escapeHtml(
      options.instruction ||
      'Record your response, listen to it, and try again.'
    );
    const maxSeconds = Math.max(
      15,
      Math.min(Number(options.maxSeconds) || 120, 300)
    );

    return `
      <section
        class="voice-recorder"
        data-recorder-id="${safeId}"
        data-max-seconds="${maxSeconds}"
      >
        <div class="voice-recorder-heading">
          <div>
            <p class="eyebrow">Voice practice</p>
            <h2>${title}</h2>
          </div>

          <span
            id="${safeId}-status-chip"
            class="voice-status-chip"
          >
            Ready
          </span>
        </div>

        <p>${instruction}</p>

        <div class="voice-privacy-note">
          <strong>Privacy</strong>
          <p>
            Your recording stays in this browser tab.
            Speak FANCY does not upload or save it to a server.
          </p>
        </div>

        <div class="voice-meter" aria-hidden="true">
          <div
            id="${safeId}-meter-fill"
            class="voice-meter-fill"
            style="width: 0%"
          ></div>
        </div>

        <div class="voice-time-row">
          <span id="${safeId}-timer">00:00</span>
          <span>Maximum ${formatTime(maxSeconds)}</span>
        </div>

        <div class="button-row">
          <button
            class="btn btn-primary"
            type="button"
            data-action="voice-start"
            data-recorder-id="${safeId}"
          >
            🎙 Start Recording
          </button>

          <button
            class="btn btn-danger"
            type="button"
            data-action="voice-stop"
            data-recorder-id="${safeId}"
            disabled
          >
            ■ Stop
          </button>

          <button
            class="btn btn-secondary"
            type="button"
            data-action="voice-reset"
            data-recorder-id="${safeId}"
            disabled
          >
            ↻ Record Again
          </button>
        </div>

        <div
          id="${safeId}-message"
          class="voice-message"
          role="status"
          aria-live="polite"
        ></div>

        <div
          id="${safeId}-playback"
          class="voice-playback"
          hidden
        >
          <label for="${safeId}-audio">
            Listen to your recording
          </label>

          <audio
            id="${safeId}-audio"
            controls
            preload="metadata"
          ></audio>

          <a
            id="${safeId}-download"
            class="btn btn-secondary voice-download"
            href="#"
            download="speak-fancy-recording.webm"
          >
            Save a copy to this device
          </a>

          <div class="voice-self-check">
            <strong>Listen and check</strong>
            <label>
              <input type="checkbox">
              I answered the task clearly.
            </label>
            <label>
              <input type="checkbox">
              I developed my ideas with useful details.
            </label>
            <label>
              <input type="checkbox">
              My voice was clear and easy to follow.
            </label>
          </div>
        </div>
      </section>
    `;
  }

  function getElements(id) {
    const root = document.querySelector(
      `[data-recorder-id="${CSS.escape(id)}"]`
    );

    if (!root) {
      return null;
    }

    return {
      root,
      startButton: root.querySelector('[data-action="voice-start"]'),
      stopButton: root.querySelector('[data-action="voice-stop"]'),
      resetButton: root.querySelector('[data-action="voice-reset"]'),
      timer: document.getElementById(`${id}-timer`),
      status: document.getElementById(`${id}-status-chip`),
      message: document.getElementById(`${id}-message`),
      playback: document.getElementById(`${id}-playback`),
      audio: document.getElementById(`${id}-audio`),
      download: document.getElementById(`${id}-download`),
      meterFill: document.getElementById(`${id}-meter-fill`)
    };
  }

  function chooseMimeType() {
    const types = [
      'audio/webm;codecs=opus',
      'audio/webm',
      'audio/mp4',
      'audio/ogg;codecs=opus'
    ];

    return types.find(type =>
      MediaRecorder.isTypeSupported(type)
    ) || '';
  }

  async function start(id) {
    const elements = getElements(id);

    if (!elements) {
      return;
    }

    if (!supportsRecording()) {
      showMessage(
        elements,
        'Voice recording is not supported in this browser. Try the latest Chrome, Edge, Firefox, or Safari.',
        true
      );
      return;
    }

    await cleanupActive(id);

    try {
      showMessage(
        elements,
        'Allow microphone access when your browser asks.',
        false
      );

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        },
        video: false
      });

      const mimeType = chooseMimeType();
      const recorder = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream);

      const session = {
        id,
        stream,
        recorder,
        chunks: [],
        startedAt: Date.now(),
        timerId: null,
        meterId: null,
        audioContext: null,
        analyser: null,
        source: null,
        objectUrl: null
      };

      sessions.set(id, session);
      activeId = id;

      recorder.addEventListener('dataavailable', event => {
        if (event.data && event.data.size > 0) {
          session.chunks.push(event.data);
        }
      });

      recorder.addEventListener('stop', () => {
        finishRecording(id);
      });

      recorder.addEventListener('error', event => {
        showMessage(
          elements,
          event.error?.message || 'The recording could not continue.',
          true
        );
        stopTracks(session.stream);
      });

      recorder.start(250);

      elements.startButton.disabled = true;
      elements.stopButton.disabled = false;
      elements.resetButton.disabled = true;
      elements.playback.hidden = true;
      elements.status.textContent = 'Recording';
      elements.status.classList.add('recording');

      showMessage(
        elements,
        'Recording now. Speak clearly and at a natural pace.',
        false
      );

      startTimer(session, elements);
      startMeter(session, elements);
    } catch (error) {
      const message = getPermissionErrorMessage(error);

      showMessage(elements, message, true);
      resetButtons(elements);
    }
  }

  function stop(id) {
    const session = sessions.get(id);

    if (!session) {
      return;
    }

    if (session.recorder.state !== 'inactive') {
      session.recorder.stop();
    }
  }

  function reset(id) {
    const elements = getElements(id);
    const session = sessions.get(id);

    if (session) {
      if (session.recorder.state !== 'inactive') {
        session.recorder.stop();
      }

      stopTracks(session.stream);
      clearSessionTimers(session);
      revokeObjectUrl(session);
      sessions.delete(id);
    }

    if (!elements) {
      return;
    }

    if (elements.audio) {
      elements.audio.removeAttribute('src');
      elements.audio.load();
    }

    if (elements.download) {
      elements.download.removeAttribute('href');
    }

    elements.playback.hidden = true;
    elements.timer.textContent = '00:00';
    elements.meterFill.style.width = '0%';
    elements.status.textContent = 'Ready';
    elements.status.classList.remove('recording');
    elements.message.textContent = '';

    resetButtons(elements);
  }

  function finishRecording(id) {
    const session = sessions.get(id);
    const elements = getElements(id);

    if (!session) {
      return;
    }

    clearSessionTimers(session);
    stopTracks(session.stream);

    if (!elements) {
      revokeObjectUrl(session);
      sessions.delete(id);
      return;
    }

    const type =
      session.recorder.mimeType ||
      session.chunks[0]?.type ||
      'audio/webm';

    const blob = new Blob(session.chunks, { type });

    if (blob.size === 0) {
      showMessage(
        elements,
        'No audio was captured. Check your microphone and try again.',
        true
      );
      resetButtons(elements);
      sessions.delete(id);
      return;
    }

    revokeObjectUrl(session);
    session.objectUrl = URL.createObjectURL(blob);

    elements.audio.src = session.objectUrl;
    elements.download.href = session.objectUrl;
    elements.download.download =
      `speak-fancy-${id}-${new Date()
        .toISOString()
        .slice(0, 19)
        .replace(/[:T]/g, '-')}.${getExtension(type)}`;

    elements.playback.hidden = false;
    elements.startButton.disabled = true;
    elements.stopButton.disabled = true;
    elements.resetButton.disabled = false;
    elements.status.textContent = 'Recorded';
    elements.status.classList.remove('recording');
    elements.meterFill.style.width = '0%';

    showMessage(
      elements,
      'Recording complete. Listen, reflect, and record again when needed.',
      false
    );

    activeId = null;
  }

  function startTimer(session, elements) {
    const maxSeconds = Number(
      elements.root.dataset.maxSeconds
    ) || 120;

    const update = () => {
      const elapsed = Math.floor(
        (Date.now() - session.startedAt) / 1000
      );

      elements.timer.textContent = formatTime(elapsed);

      if (
        elapsed >= maxSeconds &&
        session.recorder.state !== 'inactive'
      ) {
        session.recorder.stop();

        showMessage(
          elements,
          `Maximum recording time reached (${formatTime(maxSeconds)}).`,
          false
        );
      }
    };

    update();
    session.timerId = window.setInterval(update, 250);
  }

  function startMeter(session, elements) {
    try {
      const AudioContext =
        window.AudioContext || window.webkitAudioContext;

      if (!AudioContext) {
        return;
      }

      const context = new AudioContext();
      const analyser = context.createAnalyser();
      const source =
        context.createMediaStreamSource(session.stream);

      analyser.fftSize = 256;
      source.connect(analyser);

      const data = new Uint8Array(
        analyser.frequencyBinCount
      );

      session.audioContext = context;
      session.analyser = analyser;
      session.source = source;

      const draw = () => {
        if (
          !sessions.has(session.id) ||
          session.recorder.state === 'inactive'
        ) {
          return;
        }

        analyser.getByteFrequencyData(data);

        const average =
          data.reduce((sum, value) => sum + value, 0) /
          data.length;

        const width = Math.min(
          100,
          Math.max(3, average * 1.4)
        );

        elements.meterFill.style.width = `${width}%`;
        session.meterId = requestAnimationFrame(draw);
      };

      draw();
    } catch (error) {
      console.warn('Audio meter unavailable:', error);
    }
  }

  async function cleanupActive(nextId = null) {
    if (!activeId || activeId === nextId) {
      return;
    }

    const current = sessions.get(activeId);

    if (!current) {
      activeId = null;
      return;
    }

    if (current.recorder.state !== 'inactive') {
      current.recorder.stop();
    }

    activeId = null;
  }

  function cleanup() {
    sessions.forEach(session => {
      try {
        if (session.recorder.state !== 'inactive') {
          session.recorder.stop();
        }
      } catch (error) {
        console.warn('Recorder cleanup failed:', error);
      }

      stopTracks(session.stream);
      clearSessionTimers(session);
      revokeObjectUrl(session);
    });

    sessions.clear();
    activeId = null;
  }

  function clearSessionTimers(session) {
    if (session.timerId) {
      clearInterval(session.timerId);
    }

    if (session.meterId) {
      cancelAnimationFrame(session.meterId);
    }

    if (session.source) {
      try {
        session.source.disconnect();
      } catch (error) {
        console.warn(error);
      }
    }

    if (
      session.audioContext &&
      session.audioContext.state !== 'closed'
    ) {
      session.audioContext.close().catch(() => {});
    }
  }

  function stopTracks(stream) {
    stream?.getTracks().forEach(track => track.stop());
  }

  function revokeObjectUrl(session) {
    if (session?.objectUrl) {
      URL.revokeObjectURL(session.objectUrl);
      session.objectUrl = null;
    }
  }

  function resetButtons(elements) {
    elements.startButton.disabled = false;
    elements.stopButton.disabled = true;
    elements.resetButton.disabled = true;
    elements.status.textContent = 'Ready';
    elements.status.classList.remove('recording');
  }

  function showMessage(elements, message, isError) {
    if (!elements.message) {
      return;
    }

    elements.message.textContent = message;
    elements.message.classList.toggle(
      'error-message',
      Boolean(isError)
    );
  }

  function getPermissionErrorMessage(error) {
    if (
      error?.name === 'NotAllowedError' ||
      error?.name === 'SecurityError'
    ) {
      return 'Microphone access was blocked. Allow microphone access in the browser settings, then try again.';
    }

    if (error?.name === 'NotFoundError') {
      return 'No microphone was found. Connect or enable a microphone, then try again.';
    }

    if (error?.name === 'NotReadableError') {
      return 'The microphone is busy or unavailable. Close other apps using it, then try again.';
    }

    return error?.message ||
      'The microphone could not be started. Try another browser or device.';
  }

  function formatTime(totalSeconds) {
    const seconds = Math.max(
      0,
      Math.floor(Number(totalSeconds) || 0)
    );

    const minutes = Math.floor(seconds / 60);
    const remainder = seconds % 60;

    return `${String(minutes).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`;
  }

  function getExtension(type) {
    if (type.includes('mp4')) {
      return 'm4a';
    }

    if (type.includes('ogg')) {
      return 'ogg';
    }

    return 'webm';
  }

  return {
    render,
    start,
    stop,
    reset,
    cleanup,
    supportsRecording
  };
})();
