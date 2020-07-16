import React from 'react';
import styled, { withTheme, css } from 'styled-components';
import { space, layout, position, color, shadow } from 'styled-system';
import Countdown from 'react-countdown-now';
import { connect } from 'react-redux';
import { Box, Button, Text } from '../../components';
import scaleBeat from '../../styles/keyframes';
import { pomodoroActions } from '../../../state/pomodoro';

const electron = window.require('electron');
const { ipcRenderer } = electron;

const Circle = styled.div`
  height: ${({ width }) => width};
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  ${({ animate }) =>
    animate
      ? css`
          animation: 0.5s ${scaleBeat} alternate infinite ease-in;
        `
      : ``};

  ${space};
  ${layout};
  ${position};
  ${color};
  ${shadow};
`;

const CustomTimerView = ({ hours, minutes, seconds }) => {
  const paddedHours = `0${hours}`.slice(-2);
  const paddedMinutes = `0${minutes}`.slice(-2);
  const paddedSeconds = `0${seconds}`.slice(-2);

  return (
    <Text variant="h2">{`${paddedHours}:${paddedMinutes}:${paddedSeconds}`}</Text>
  );
};

const Timer = ({ theme, skipFocusTimer, time, isFocusOn }) => {
  const stopTimer = () => {
    skipFocusTimer();
    ipcRenderer.send('SHOW_BREAK_PAGE');
  };

  return (
    <Box>
      <Circle width="32rem" bg="#2a1754" animate={isFocusOn}>
        <Circle
          width="24rem"
          bg="#45268b"
          boxShadow={`0 0 64px ${theme.colors.dark}`}
        >
          <Circle
            width="16rem"
            bg="#532ea7"
            boxShadow={`0 0 64px ${theme.colors.dark}`}
          >
            <Countdown
              date={isFocusOn ? time * 1000 : 0}
              renderer={CustomTimerView}
              controlled
            />
          </Circle>
        </Circle>
      </Circle>
      <Box mt={4}>
        <Button onClick={stopTimer} disabled={!isFocusOn}>
          Skip to break
        </Button>
      </Box>
    </Box>
  );
};

const mapStateToProps = ({ pomodoro }) => ({
  time: pomodoro.time,
  isFocusOn: pomodoro.isFocusOn,
});

const mapActionsToProps = {
  skipFocusTimer: pomodoroActions.skipFocusTimer,
};

export default connect(mapStateToProps, mapActionsToProps)(withTheme(Timer));
