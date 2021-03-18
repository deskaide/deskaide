import React, { Suspense, useEffect, useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './views/styles/GlobalStyle';
import { dark, light } from './views/styles/themes';
import Routes from './routes';
import { pomodoroActions } from './state/pomodoro';
import { useTimer } from './hooks';
import logo from './assets/images/logo.png';

const electron = window.require('electron');
const { ipcRenderer } = electron;

const App = ({
  selectedTheme = 'dark',
  startFocusTimer,
  skipFocusTimer,
  isFocusOn,
  isShortBreakOn,
  startShortBreakTimer,
  skipShortBreakTimer,
  updateTime,
  showNotification,
  resetNotification,
  hasNotificationShown,
  pomodoroSettings: { focusTime, shortBreakTime, remindBefore },
}) => {
  const history = useHistory();
  const [duration, setDuration] = useState(focusTime * 60);
  const [focusDuration, setFocusDuration] = useState(focusTime);

  const toggleTimer = () => {
    if (isFocusOn) {
      skipFocusTimer();
      ipcRenderer.send('SHOW_BREAK_PAGE');
    }

    if (isShortBreakOn) {
      skipShortBreakTimer();
      ipcRenderer.send('HIDE_BREAK_PAGE');
    }
  };
  const { time, start, reset } = useTimer({
    type: 'DECREMENTAL',
    initialTime: 0,
    onTimeOver: toggleTimer,
  });

  const startTimer = useCallback(
    (interval = 0) => {
      start(interval);
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
      setDuration(shortBreakTime * 60);
      startShortBreakTimer();
    } else {
      startFocusTimer();
    }

    ipcRenderer.on('GO_TO', (e, path) => {
      history.push(path);
    });

    ipcRenderer.on('START_FOCUS_TIMER', () => {
      setDuration(focusTime * 60);
      startFocusTimer();
    });
  }, [
    history,
    startFocusTimer,
    startShortBreakTimer,
    shortBreakTime,
    focusTime,
  ]);

  useEffect(() => {
    resetTimer();

    if (isFocusOn) {
      startTimer(duration);
      resetNotification();
    }

    if (isShortBreakOn) {
      startTimer(duration);
    }
  }, [
    isFocusOn,
    isShortBreakOn,
    startTimer,
    resetTimer,
    duration,
    resetNotification,
  ]);

  useEffect(() => {
    if (isFocusOn) {
      if (focusTime !== focusDuration) {
        setDuration(time - (focusDuration - focusTime) * 60);
        setFocusDuration(focusTime);
      }
      if (!hasNotificationShown && time === remindBefore) {
        showNotification('Break Reminder !!!', {
          body: `Hey buddy! A short break is going to start within ${remindBefore} seconds!`,
          icon: logo,
        });
      }
    }
  }, [
    isFocusOn,
    focusTime,
    focusDuration,
    time,
    setFocusDuration,
    startTimer,
    hasNotificationShown,
    showNotification,
    remindBefore,
  ]);

  useEffect(() => {
    updateCounterTime(time);
  }, [time, updateCounterTime]);

  return (
    <ThemeProvider theme={selectedTheme === 'light' ? light : dark}>
      <GlobalStyle />
      <Suspense fallback={<div>Loading</div>}>
        <Routes />
      </Suspense>
    </ThemeProvider>
  );
};

const mapStateToProps = ({ settings, pomodoro }) => ({
  selectedTheme: settings.selectedTheme,
  isFocusOn: pomodoro.isFocusOn,
  isShortBreakOn: pomodoro.isShortBreakOn,
  remindBefore: pomodoro.settings.remindBefore,
  hasNotificationShown: pomodoro.hasNotificationShown,
  pomodoroSettings: pomodoro.settings,
});

const mapActionsToProps = {
  startFocusTimer: pomodoroActions.startFocusTimer,
  skipFocusTimer: pomodoroActions.skipFocusTimer,
  startShortBreakTimer: pomodoroActions.startShortBreakTimer,
  skipShortBreakTimer: pomodoroActions.skipShortBreakTimer,
  updateTime: pomodoroActions.updateTime,
  showNotification: pomodoroActions.showNotification,
  resetNotification: pomodoroActions.resetNotification,
};

export default connect(mapStateToProps, mapActionsToProps)(App);
