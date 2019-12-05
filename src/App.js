import React, { Suspense, useEffect } from 'react';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { dark, light } from './views/styles/themes';
import Routes from './routes';
import { pomodoroActions } from './redux/pomodoro';

import logo from './assets/images/logo.png';

const App = ({
  selectedTheme = 'dark',
  focusTime,
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
  breakOn,
  showNotification,
  resetNotification,
  notificationShown,
}) => {
  useEffect(() => {
    if (!timerId && focusOn) {
      startTimer();
      const newTimerId = setInterval(() => {
        updateTimer();
      }, 10);
      saveTimerId(newTimerId);
    }

    if (
      timerOn &&
      focusTime - timerTime >= remindBefore &&
      focusTime - timerTime <= remindBefore + 50 &&
      !notificationShown
    ) {
      showNotification({
        body: `Hey buddy! You've worked for a long time. Take a break!`,
        icon: logo,
      });
    }
    if (timerOn && focusTime - timerTime < 1) {
      stopTimer(timerId);
      resetTimer();
      resetNotification();
    }
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
    focusTime: pomodoro.settings.focusTime,
    remindBefore: pomodoro.settings.remindBefore,
    focusOn: pomodoro.focusOn,
    breakOn: pomodoro.breakOn,
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
