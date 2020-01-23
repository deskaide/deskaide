import React, { Component } from 'react';
import Countdown from 'react-countdown-now';
import { connect } from 'react-redux';
import { A_MINUTE } from '../../../config';
import { Box, Button, Text } from '../../components';
import { pomodoroActions } from '../../../state/pomodoro';

const electron = window.require('electron');
const { ipcRenderer } = electron;

const closeWindow = () => {
  ipcRenderer.send('HIDE_BREAK_PAGE');
};

const CustomTimerView = ({ hours, minutes, seconds }) => {
  const paddedMinutes = `0${minutes}`.slice(-2);
  const paddedSeconds = `0${seconds}`.slice(-2);

  return <Text variant="h2">{`${paddedMinutes}:${paddedSeconds}`}</Text>;
};

class Timer extends Component {
  stopTimer = () => {
    const { stopTimer, resetTimer, timerId } = this.props;
    stopTimer(timerId);
    resetTimer();
    closeWindow();
  };

  render() {
    const {
      totalDuration,
      timerTime,
      shortBreakOn,
      shortBreakTime,
    } = this.props;

    return (
      <Box>
        <Countdown
          date={
            shortBreakOn ? totalDuration - timerTime : shortBreakTime * A_MINUTE
          }
          renderer={CustomTimerView}
          controlled
        />
        <Box mt={4}>
          <Button onClick={this.stopTimer}>Skip break</Button>
        </Box>
      </Box>
    );
  }
}

const mapStateToProps = ({ pomodoro }) => ({
  timerId: pomodoro.timerId,
  timerOn: pomodoro.timerOn,
  timerTime: pomodoro.timerTime,
  shortBreakOn: pomodoro.shortBreakOn,
  shortBreakTime: pomodoro.settings.shortBreakTime,
  totalDuration: pomodoro.totalDuration,
});

const mapActionsToProps = {
  stopTimer: pomodoroActions.stopTimer,
  resetTimer: pomodoroActions.resetTimer,
};

export default connect(mapStateToProps, mapActionsToProps)(Timer);
