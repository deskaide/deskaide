export interface IPomodoroSettings {
  focusTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  remindBefore: number;
}

export interface SettingsState {
  pomodoroSettings: IPomodoroSettings;
}
