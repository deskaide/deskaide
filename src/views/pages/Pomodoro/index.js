import React from 'react';
import { MainAppLayout } from '../../layouts';
import PomodoroSettings from './PomodoroSettings';

const Pomodoro = () => (
  <MainAppLayout appMenu={<PomodoroSettings />}>
    <p>Hello</p>
  </MainAppLayout>
);

export default Pomodoro;
