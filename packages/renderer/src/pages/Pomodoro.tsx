import * as React from 'react';
import { useSelector } from 'react-redux';

import { DefaultLayout, WithSidebarLayout } from '../layouts';
import { Box, PomodoroClock, Button } from '../components';
import { PomodoroSettings } from '../components/PomodoroSettings';
import type { RootState } from '../store';
import { showBreakWindow } from '../utils';

export const Pomodoro: React.FC = () => {
  const currentFocusTime = useSelector(
    (state: RootState) => state.timer.currentFocusTime
  );

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
          <Button mt={4} onClick={showBreakWindow}>
            Skip to Break
          </Button>
        </Box>
      </WithSidebarLayout>
    </DefaultLayout>
  );
};
