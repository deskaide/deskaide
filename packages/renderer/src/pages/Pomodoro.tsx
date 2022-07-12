import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { DefaultLayout, WithSidebarLayout } from '../layouts';
import { Box, PomodoroClock, Button } from '../components';
import { PomodoroSettings } from '../components/PomodoroSettings';
import type { RootState } from '../store';
import { setTimerType } from '../store/timerSlice';
import { showBreakWindow } from '../utils';
import { TimerType } from '../../../../types';

export const Pomodoro: React.FC = () => {
  const currentFocusTime = useSelector(
    (state: RootState) => state.timer.currentFocusTime
  );
  const dispatch = useDispatch();

  const handleSkipToBreak = () => {
    dispatch(setTimerType(TimerType.BreakTimer));
    showBreakWindow();
  };

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
          <PomodoroClock time={currentFocusTime} />
          <Button mt={4} onClick={handleSkipToBreak}>
            Skip to Break
          </Button>
        </Box>
      </WithSidebarLayout>
    </DefaultLayout>
  );
};
