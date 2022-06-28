import * as React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { DefaultLayout, WithSidebarLayout } from '../layouts';
import { Box, PomodoroClock, Button } from '../components';
import { useTimer } from '../hooks';
import { PomodoroSettings } from '../components/PomodoroSettings';
import type { RootState } from '../store';
import { setTimerType, TimerType } from '../store/timerSlice';
import { sendNotification, showBreakWindow } from '../utils';
import { defaultPomodoroSettings, A_MINUTE } from '../config';

export const Pomodoro: React.FC = () => {
  const timerType = useSelector((state: RootState) => state.timer.timerType);
  const dispatch = useDispatch();
  const { time, start, reset } = useTimer({
    type: 'DECREMENTAL',
    initialTime: 0,
    onTimeOver: () => {
      setTimerType(TimerType.BREAK_TIMER);
      reset();
      showBreakWindow();
    },
  });

  useEffect(() => {
    if (timerType === TimerType.POMODORO_TIMER) {
      // start(defaultPomodoroSettings.focusTime * A_MINUTE);
      start(A_MINUTE);
    }
    return () => {
      reset();
    };
  }, [dispatch, reset, start, timerType]);

  useEffect(() => {
    if (defaultPomodoroSettings.remindBefore === time) {
      sendNotification({
        title: 'Break Time!',
        body: 'Hey Buddy! A short break will start soon !!!',
      });
    }
  }, [time]);

  return (
    <DefaultLayout>
      <WithSidebarLayout
        sidebarTitle="Pomodoro Settings"
        sidebar={
          <Box padding={4}>
            <PomodoroSettings />
          </Box>
        }
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          textAlign="center"
          maxWidth="36vw"
          margin="0 auto"
        >
          <PomodoroClock time={time} />
          <Button mt={4} onClick={showBreakWindow}>
            Skip to Break
          </Button>
        </Box>
      </WithSidebarLayout>
    </DefaultLayout>
  );
};
