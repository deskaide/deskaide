import * as React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { DefaultLayout, WithSidebarLayout } from '../layouts';
import { Box, PomodoroClock } from '../components';
import { useTimer } from '../hooks';
import { PomodoroSettings } from '../components/PomodoroSettings';
import type { RootState } from '../store';
import { setTimerType, TimerType } from '../store/timerSlice';
import { sendNotification } from '../utils';
import { defaultPomodoroSettings } from '../config';

export const Pomodoro: React.FC = () => {
  const timerType = useSelector((state: RootState) => state.timer.timerType);
  const dispatch = useDispatch();
  const { time, start, reset } = useTimer({
    type: 'DECREMENTAL',
    initialTime: 0,
    onTimeOver: () => {
      console.log('done');
      reset();
    },
  });

  useEffect(() => {
    dispatch(setTimerType(TimerType.POMODORO_TIMER));
    start(timerType === TimerType.POMODORO_TIMER ? 25 * 60 : 5);
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
        </Box>
      </WithSidebarLayout>
    </DefaultLayout>
  );
};
