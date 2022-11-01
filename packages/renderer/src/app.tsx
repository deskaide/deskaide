import { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { HashRouter as Router } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { manageTimer } from '#preload';

import * as themes from './styles/themes';
import { GlobalStyle } from './styles';
import Routes from './routes';
import type { RootState } from './store';
import { useAppDispatch, useTimer } from './hooks';
import { setCurrentFocusTime, setTimerType } from './store/timerSlice';
import { getAllSettings } from './store/settingsSlice';
import { sendNotification, showBreakWindow } from './utils';
import { A_MINUTE } from './config';
import { IpcEventTypes, TimerType } from '../../../types';

const App: React.FC = () => {
  const { timerType } = useSelector((state: RootState) => state.timer);
  const { pomodoroSettings, appSettings, isSettingsLoading } = useSelector(
    (state: RootState) => state.settings
  );
  const selectedTheme = appSettings?.theme as keyof typeof themes;
  const dispatch = useAppDispatch();

  const { currentTime, start, reset } = useTimer({
    type: 'DECREMENTAL',
    duration: 0,
    notificationTime: pomodoroSettings.remindBefore,
    onTimeOver: () => {
      dispatch(setTimerType(TimerType.BreakTimer));
      reset();
      showBreakWindow();
    },
    onShowNotification: () => {
      sendNotification({
        title: 'Break Time!',
        body: 'Hey Buddy! A short break will start soon !!!',
      });
    },
  });

  useEffect(() => {
    if (window.location.hash.includes('break')) {
      dispatch(setTimerType(TimerType.BreakTimer));
    }

    dispatch(getAllSettings());

    if (manageTimer) {
      manageTimer(IpcEventTypes.ToggleTimerType, (value) => {
        dispatch(setTimerType(value));
      });
    }
  }, [dispatch]);

  useEffect(() => {
    if (timerType === TimerType.PomodoroTimer) {
      start(pomodoroSettings.focusTime * A_MINUTE);
      // start(Math.floor(pomodoroSettings.focusTime * A_MINUTE * 0.025));
    }
    return () => {
      reset();
    };
  }, [pomodoroSettings.focusTime, reset, start, timerType]);

  useEffect(() => {
    if (timerType === TimerType.PomodoroTimer) {
      dispatch(setCurrentFocusTime(currentTime));
    } else {
      reset();
      dispatch(setCurrentFocusTime(0));
    }
    return () => {
      dispatch(setCurrentFocusTime(0));
    };
  }, [dispatch, timerType, currentTime, reset]);

  return (
    <>
      {!isSettingsLoading && selectedTheme ? (
        <ThemeProvider theme={themes[selectedTheme]}>
          <GlobalStyle />
          <Router>
            <Routes />
          </Router>
        </ThemeProvider>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default App;
