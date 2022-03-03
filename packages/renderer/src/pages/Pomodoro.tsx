import React from 'react';

import { DefaultLayout, WithSidebarLayout } from '../layouts';
import { Box, PomodoroClock } from '../components';
import PomodoroSettings from '../components/PomodoroSettings';

const Pomodoro: React.FC = () => {
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
          <PomodoroClock time="00:24:31" />
        </Box>
      </WithSidebarLayout>
    </DefaultLayout>
  );
};

export default Pomodoro;
