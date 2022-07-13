import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Button, Text } from '../components';
import type { RootState } from '../store';
import { setTimerType } from '../store/timerSlice';
import { useTimer } from '../hooks';
import { getFormattedTime, hideBreakWindow } from '../utils';
import { A_MINUTE } from '../config';
import { IpcEventTypes, TimerType } from '../../../../types';

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
      dispatch(setTimerType(TimerType.PomodoroTimer));
      reset();
      hideBreakWindow();
    },
  });
  const { minutes, seconds } = getFormattedTime(time);

  useEffect(() => {
    if (timerType === TimerType.BreakTimer) {
      start(pomodoroSettings.shortBreakTime * A_MINUTE);
    } else {
      reset();
    }
    return () => {
      reset();
    };
  }, [pomodoroSettings.shortBreakTime, reset, start, timerType]);

  useEffect(() => {
    if (window.manageTimer) {
      window.manageTimer(IpcEventTypes.ToggleTimerType, (value) => {
        dispatch(setTimerType(value));
      });
    }
  }, [dispatch]);

  const handleSkipBreak = () => {
    dispatch(setTimerType(TimerType.PomodoroTimer));
    reset();
    hideBreakWindow();
  };

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
      <Button variant="default" mb={0} onClick={handleSkipBreak}>
        Skip Break
      </Button>
    </Box>
  );
};
