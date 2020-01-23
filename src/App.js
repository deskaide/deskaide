import React, { Suspense, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { dark, light } from './views/styles/themes';
import Routes from './routes';
import { pomodoroActions } from './state/pomodoro';
import { getSeconds } from './utils/Time';

import logo from './assets/images/logo.png';

const electron = window.require('electron');
const { ipcRenderer } = electron;

const App = ({
  selectedTheme = 'dark',
  totalDuration,
  timerTime,
  startTimer,
  updateTimer,
  stopTimer,
  saveTimerId,
  timerId,
  timerOn,
  remindBefore,
  resetTimer,
  focusOn,
  shortBreakOn,
  showNotification,
  resetNotification,
  notificationShown,
}) => {
  const history = useHistory();

  useEffect(() => {
    ipcRenderer.on('GO_TO', (e, path) => {
      history.push(path);
    });
    ipcRenderer.on('START_FOCUS_TIMER', () => {
      startTimer();
    });
  }, [history, startTimer]);

  useEffect(() => {
    const breakTimerOn = history.location.pathname === '/breaks';
    if (!timerId && (focusOn || shortBreakOn || breakTimerOn)) {
      startTimer(breakTimerOn);
      const newTimerId = setInterval(() => {
        updateTimer();
      }, 10);
      saveTimerId(newTimerId);
    }

    if (
      timerOn &&
      focusOn &&
      getSeconds(totalDuration - timerTime) === remindBefore &&
      !notificationShown
    ) {
      showNotification({
        body: `Hey buddy! A short break is going to start within ${remindBefore} seconds!`,
        icon: logo,
      });
    }
    if (timerOn && totalDuration - timerTime < 1) {
      stopTimer(timerId);
      resetTimer();
      resetNotification();
      ipcRenderer.send(breakTimerOn ? 'HIDE_BREAK_PAGE' : 'SHOW_BREAK_PAGE');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });
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
    timerId: pomodoro.timerId,
    timerOn: pomodoro.timerOn,
    timerTime: pomodoro.timerTime,
    focusOn: pomodoro.focusOn,
    totalDuration: pomodoro.totalDuration,
    remindBefore: pomodoro.settings.remindBefore,
    shortBreakOn: pomodoro.shortBreakOn,
    notificationShown: pomodoro.notificationShown,
  };
};

const mapActionsToProps = {
  startTimer: pomodoroActions.startTimer,
  stopTimer: pomodoroActions.stopTimer,
  updateTimer: pomodoroActions.updateTimer,
  resetTimer: pomodoroActions.resetTimer,
  saveTimerId: pomodoroActions.saveTimerId,
  deleteTimerId: pomodoroActions.deleteTimerId,
  showNotification: pomodoroActions.showNotification,
  resetNotification: pomodoroActions.resetNotification,
};

export default connect(mapStateToProps, mapActionsToProps)(App);
