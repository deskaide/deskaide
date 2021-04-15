import React from 'react';
import Countdown from 'react-countdown-now';
import { connect } from 'react-redux';
import { Box, Button, Text } from '../../components';
import { pomodoroActions } from '../../../state/pomodoro';

const electron = window.require('electron');
const { ipcRenderer } = electron;

const CustomTimerView = ({ minutes, seconds }) => {
  const paddedMinutes = `0${minutes}`.slice(-2);
  const paddedSeconds = `0${seconds}`.slice(-2);

  return <Text variant="h2">{`${paddedMinutes}:${paddedSeconds}`}</Text>;
};

const Timer = ({ time, skipShortBreakTimer }) => {
  const closeWindow = () => {
    skipShortBreakTimer();
    ipcRenderer.send('HIDE_BREAK_PAGE');
  };

  return (
    <Box>
      <Countdown date={time * 1000} renderer={CustomTimerView} controlled />
      <Box mt={4}>
        <Button onClick={closeWindow}>Skip break</Button>
      </Box>
    </Box>
  );
};

const mapStateToProps = ({ pomodoro }) => ({
  time: pomodoro.time,
});

const mapActionsToProps = {
  skipShortBreakTimer: pomodoroActions.skipShortBreakTimer,
};

export default connect(mapStateToProps, mapActionsToProps)(Timer);
