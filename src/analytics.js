const gtag = (...args) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(...args);
  }
};

export const trackEvent = (eventName, params = {}) => {
  gtag('event', eventName, params);
};

export const analytics = {
  register: () => trackEvent('sign_up', { method: 'email' }),
  login: () => trackEvent('login', { method: 'email' }),
  userStoryCreate: () => trackEvent('user_story_create'),
  userStoryUpdate: () => trackEvent('user_story_update'),
  userStoryDelete: () => trackEvent('user_story_delete'),
  kanbanDrag: (fromStatus, toStatus) => trackEvent('kanban_drag', { from_status: fromStatus, to_status: toStatus }),
};
