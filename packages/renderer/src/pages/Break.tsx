import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Box, Button, Text } from '../components';
import { setTimerType, TimerType } from '../store/timerSlice';
import { useTimer } from '../hooks';
import { defaultPomodoroSettings } from '../config';
import { getFormattedTime } from '../utils';

export const Break: React.FC = () => {
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
    dispatch(setTimerType(TimerType.BREAK_TIMER));
    start(defaultPomodoroSettings.shortBreakTime * 60);
    return () => {
      reset();
    };
  }, [dispatch, reset, start]);
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
