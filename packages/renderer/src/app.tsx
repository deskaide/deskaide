import { useContext, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { HashRouter as Router } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import * as themes from './styles/themes';
import { ThemeContext } from './components/ThemeProvider';
import { GlobalStyle } from './styles';
import Routes from './routes';
import type { RootState } from './store';
import { useTimer } from './hooks';
import {
  setCurrentFocusTime,
  setTimerType,
  TimerType,
} from './store/timerSlice';
import { sendNotification, showBreakWindow } from './utils';
import { A_MINUTE } from './config';

const App: React.FC = () => {
  const context = useContext(ThemeContext);
  const selectedTheme = context?.colorMode as keyof typeof themes;
  const { timerType } = useSelector((state: RootState) => state.timer);
  const { pomodoroSettings } = useSelector(
    (state: RootState) => state.settings
  );
  const dispatch = useDispatch();
  const { time, start, reset } = useTimer({
    type: 'DECREMENTAL',
    initialTime: 0,
    onTimeOver: () => {
      dispatch(setTimerType(TimerType.BREAK_TIMER));
      reset();
      showBreakWindow();
    },
  });

  useEffect(() => {
    if (timerType === TimerType.POMODORO_TIMER) {
      // start(pomodoroSettings.focusTime * A_MINUTE);
      start(0.7 * A_MINUTE);
    }
    return () => {
      reset();
    };
  }, [pomodoroSettings.focusTime, reset, start, timerType]);

  useEffect(() => {
    if (timerType === TimerType.POMODORO_TIMER) {
      dispatch(setCurrentFocusTime(time));
    }
    return () => {
      dispatch(setCurrentFocusTime(0));
    };
  }, [dispatch, timerType, time]);

  useEffect(() => {
    if (pomodoroSettings.remindBefore === time) {
      sendNotification({
        title: 'Break Time!',
        body: 'Hey Buddy! A short break will start soon !!!',
      });
    }
  }, [pomodoroSettings.remindBefore, time]);

  return (
    <>
      {selectedTheme ? (
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
