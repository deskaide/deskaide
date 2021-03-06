export const A_MINUTE = 60 * 1000;
export const A_SECOND = 1000;

export const DEFAULT_SETTINGS = {
  selectedTheme: 'dark',
  autoStart: 'N',
  remoteDBUrl: '',
  isTrackingOn: 'N',
};

export const POMODORO_INITIAL_SETTINGS = {
  focusTime: 25,
  shortBreakTime: 5,
  longBreakTime: 15,
  remindBefore: 30,
};

export const apps = {
  pomodoro: 'POMODORO',
  notes: 'NOTES',
  journals: 'JOURNALS',
  links: 'LINKS',
  stats: 'STATS',
  settings: 'SETTINGS',
};

export const pomodoroSettingsId = 'pomodoro/settings';
export const appSettingsId = 'app/settings';
