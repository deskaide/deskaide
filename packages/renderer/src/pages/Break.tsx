import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Button, Text } from '../components';
import type { RootState } from '../store';
import { setTimerType, TimerType } from '../store/timerSlice';
import { useTimer } from '../hooks';
import { getFormattedTime, showMainWindow } from '../utils';

export const Break: React.FC = () => {
  const { timerType } = useSelector((state: RootState) => state.timer);
  const { pomodoroSettings } = useSelector(
    (state: RootState) => state.settings
  );
  const dispatch = useDispatch();
  const { time, start, reset } = useTimer({
    type: 'DECREMENTAL',
    initialTime: 0,
    onTimeOver: () => {
      dispatch(setTimerType(TimerType.POMODORO_TIMER));
      reset();
      showMainWindow();
    },
  });

  useEffect(() => {
    if (timerType === TimerType.BREAK_TIMER) {
      start(pomodoroSettings.shortBreakTime);
    }
    return () => {
      reset();
    };
  }, [pomodoroSettings.shortBreakTime, reset, start, timerType]);
  const { minutes, seconds } = getFormattedTime(time);
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100vw"
      textAlign="center"
      margin="0 auto"
    >
      <Text variant="h2" mb={3}>{`${minutes}:${seconds}`}</Text>
      <Button variant="default" mb={0}>
        Skip Break
      </Button>
    </Box>
  );
};
