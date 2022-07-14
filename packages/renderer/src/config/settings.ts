import type { IAppSettings, IPomodoroSettings } from '../types/Settings';

export const defaultAppSettings: IAppSettings = {
  activeTheme: 'dark',
  shouldOpenOnStart: false,
};

export const defaultPomodoroSettings: IPomodoroSettings = {
  focusTime: 25,
  shortBreakTime: 5,
  longBreakTime: 15,
  remindBefore: 30,
};
