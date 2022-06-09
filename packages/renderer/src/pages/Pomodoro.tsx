import React, { useEffect } from 'react';

import { DefaultLayout, WithSidebarLayout } from '../layouts';
import { Box, PomodoroClock } from '../components';
import { useTimer } from '../hooks';
import PomodoroSettings from '../components/PomodoroSettings';

const Pomodoro: React.FC = () => {
  const { time, start, reset } = useTimer({
    type: 'DECREMENTAL',
    initialTime: 0,
    onTimeOver: () => {
      console.log('done');
    },
  });

  useEffect(() => {
    start(10);
    return () => {
      reset();
    };
  }, []);

  console.log(time);

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
          <PomodoroClock seconds={time} />
        </Box>
      </WithSidebarLayout>
    </DefaultLayout>
  );
};

export default Pomodoro;
