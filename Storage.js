
SF.storage = (() => {
  'use strict';

  const PROFILE_KEY = SF.config.profileKey;
  const MODE_KEY = 'speakFancyStorageModeV1';

  function defaultProfile(nickname = '', pathway = 'core') {
    const now = new Date().toISOString();

    return {
      nickname,
      pathway,
      tokens: 0,
      rank: 'Voice Starter',
      badges: [],
      completedMissions: [],
      introductionCompleted: false,

      part1: {
        currentLesson: 1,
        completedLessons: [],
        completed: false
      },

      part2: {
        currentLesson: 1,
        completedLessons: [],
        completed: false,
        lastPlan: null,
        challengePassed: false,
        challengePassedAt: null
      },

      part3: {
        currentLesson: 1,
        completedLessons: [],
        completed: false,
        challengePassed: false,
        challengePassedAt: null
      },

      createdAt: now,
      updatedAt: now
    };
  }

  function normalizePart(savedPart, defaultPart) {
    const part = Object.assign({}, defaultPart, savedPart || {});

    part.completedLessons = Array.isArray(part.completedLessons)
      ? part.completedLessons
      : [];

    return part;
  }

  function normalizeProfile(rawProfile) {
    if (
      !rawProfile ||
      typeof rawProfile !== 'object' ||
      !rawProfile.nickname
    ) {
      return null;
    }

    const baseProfile = defaultProfile(
      String(rawProfile.nickname).slice(0, 24),
      rawProfile.pathway || 'core'
    );

    const profile = Object.assign({}, baseProfile, rawProfile);

    profile.badges = Array.isArray(rawProfile.badges)
      ? rawProfile.badges
      : [];

    profile.completedMissions = Array.isArray(
      rawProfile.completedMissions
    )
      ? rawProfile.completedMissions
      : [];

    profile.part1 = normalizePart(
      rawProfile.part1,
      baseProfile.part1
    );

    profile.part2 = normalizePart(
      rawProfile.part2,
      baseProfile.part2
    );

    profile.part3 = normalizePart(
      rawProfile.part3,
      baseProfile.part3
    );

    return profile;
  }

  function migrateLegacyProfile() {
    const savedMode = localStorage.getItem(MODE_KEY);

    if (savedMode) {
      return;
    }

    const oldLocalProfile = localStorage.getItem(PROFILE_KEY);

    if (oldLocalProfile) {
      localStorage.setItem(MODE_KEY, 'local');
    }
  }

  function isRemembering() {
    migrateLegacyProfile();

    return localStorage.getItem(MODE_KEY) === 'local';
  }

  function getActiveStorage() {
    return isRemembering()
      ? localStorage
      : sessionStorage;
  }

  function getProfile() {
    try {
      const savedProfile = getActiveStorage().getItem(PROFILE_KEY);

      if (!savedProfile) {
        return null;
      }

      return normalizeProfile(
        JSON.parse(savedProfile)
      );
    } catch (error) {
      console.error('Profile read failed:', error);
      return null;
    }
  }

  function saveProfile(profile) {
    try {
      const normalizedProfile = normalizeProfile(profile);

      if (!normalizedProfile) {
        return false;
      }

      normalizedProfile.updatedAt = new Date().toISOString();
      normalizedProfile.rank = SF.utils.getRank(
        normalizedProfile.tokens
      );

      getActiveStorage().setItem(
        PROFILE_KEY,
        JSON.stringify(normalizedProfile)
      );

      return true;
    } catch (error) {
      console.error('Profile save failed:', error);
      return false;
    }
  }

  function setRememberProgress(remember) {
    try {
      const currentProfile = getProfile();

      if (remember) {
        localStorage.setItem(MODE_KEY, 'local');

        if (currentProfile) {
          localStorage.setItem(
            PROFILE_KEY,
            JSON.stringify(currentProfile)
          );
        }

        sessionStorage.removeItem(PROFILE_KEY);
      } else {
        if (currentProfile) {
          sessionStorage.setItem(
            PROFILE_KEY,
            JSON.stringify(currentProfile)
          );
        }

        localStorage.removeItem(PROFILE_KEY);
        localStorage.removeItem(MODE_KEY);
      }

      return true;
    } catch (error) {
      console.error('Storage mode change failed:', error);
      return false;
    }
  }

  function removeProfile() {
    sessionStorage.removeItem(PROFILE_KEY);
    localStorage.removeItem(PROFILE_KEY);
    localStorage.removeItem(MODE_KEY);
  }

  return {
    defaultProfile,
    getProfile,
    saveProfile,
    removeProfile,
    isRemembering,
    setRememberProgress
  };
})();

