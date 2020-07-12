import React, { useEffect } from 'react';
import { MainAppLayout } from '../../layouts';
import { Flex, Text } from '../../components';
import PomodoroSettings from './PomodoroSettings';
import Timer from './Timer';
import { useTimer } from '../../../hooks';

const Pomodoro = () => {
  const { time, start, pause, reset, isRunning } = useTimer({
    type: 'DECREMENTAL',
    initialTime: 25 * 60,
  });

  useEffect(() => {
    start();
  }, []);

  return (
    <MainAppLayout appMenu={<PomodoroSettings />}>
      <Flex
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        height="100vh"
        width="100%"
      >
        <Timer duration={60 * 1000} newTime={time} />
        <div>
          <button type="button" onClick={start}>
            Start
          </button>
          <button type="button" onClick={pause}>
            Pause
          </button>
          <button type="button" onClick={reset}>
            Reset
          </button>
        </div>
        <Text>
          Elapsed time:
          {time}
        </Text>
        {isRunning && <p>Running...</p>}
      </Flex>
    </MainAppLayout>
  );
};

export default Pomodoro;
