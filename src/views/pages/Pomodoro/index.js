import React from 'react';
import { MainAppLayout } from '../../layouts';
import { Flex } from '../../components';
import PomodoroSettings from './PomodoroSettings';
import Timer from './Timer';

const Pomodoro = () => (
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
      <Timer time={300000} />
    </Flex>
  </MainAppLayout>
);

export default Pomodoro;
