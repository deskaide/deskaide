import React, { Suspense, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { dark, light } from './views/styles/themes';
import Routes from './routes';
import { pomodoroActions } from './state/pomodoro';
import { useTimer } from './hooks';

const electron = window.require('electron');
const { ipcRenderer } = electron;

const App = ({
  selectedTheme = 'dark',
  startFocusTimer,
  startShortBreakTimer,
  stopFocusTimer,
  updateTime,
  isFocusOn,
  isShortBreakOn,
  pomodoroSettings: { focusTime, shortBreakTime },
}) => {
  const history = useHistory();
  const { time, start, reset } = useTimer({
    type: 'DECREMENTAL',
    initialTime: 0,
  });

  const startTimer = useCallback(
    (duration = 0) => {
      start(duration);
    },
    [start]
  );

  const resetTimer = useCallback(() => {
    reset();
  }, [reset]);

  const updateCounterTime = useCallback(
    (currentTime = 0) => {
      updateTime(currentTime);
    },
    [updateTime]
  );

  useEffect(() => {
    const isBreakWindow = history.location.pathname === '/breaks';
    if (isBreakWindow) {
      startShortBreakTimer();
    } else {
      startFocusTimer();
    }
    ipcRenderer.on('GO_TO', (e, path) => {
      history.push(path);
    });
    ipcRenderer.on('START_FOCUS_TIMER', () => {
      startFocusTimer();
    });
    ipcRenderer.on('SUSPEND_FOCUS_TIMER', () => {
      stopFocusTimer();
    });
  }, [history, startFocusTimer, stopFocusTimer, startShortBreakTimer]);

  useEffect(() => {
    resetTimer();

    if (isFocusOn) {
      startTimer(focusTime * 60);
    }

    if (isShortBreakOn) {
      startTimer(shortBreakTime * 60);
    }
  }, [
    isFocusOn,
    isShortBreakOn,
    startTimer,
    resetTimer,
    focusTime,
    shortBreakTime,
  ]);

  useEffect(() => {
    updateCounterTime(time);
  }, [time, updateCounterTime]);

  return (
    <ThemeProvider theme={selectedTheme === 'light' ? light : dark}>
      <Suspense fallback={<div>Loading</div>}>
        <Routes />
      </Suspense>
    </ThemeProvider>
  );
};

const mapStateToProps = ({ setting, pomodoro }) => {
  return {
    selectedTheme: setting.selectedTheme,
    isFocusOn: pomodoro.isFocusOn,
    isShortBreakOn: pomodoro.isShortBreakOn,
    remindBefore: pomodoro.settings.remindBefore,
    notificationShown: pomodoro.notificationShown,
    pomodoroSettings: pomodoro.settings,
  };
};

const mapActionsToProps = {
  startFocusTimer: pomodoroActions.startFocusTimer,
  startShortBreakTimer: pomodoroActions.startShortBreakTimer,
  startLongBreakTimer: pomodoroActions.startLongBreakTimer,
  stopFocusTimer: pomodoroActions.stopFocusTimer,
  updateTime: pomodoroActions.updateTime,
  showNotification: pomodoroActions.showNotification,
  resetNotification: pomodoroActions.resetNotification,
};

export default connect(mapStateToProps, mapActionsToProps)(App);
