import React, { Component } from 'react';
import styled, { withTheme, css } from 'styled-components';
import { space, layout, position, color, shadow } from 'styled-system';
import Countdown from 'react-countdown-now';
import { Box, Button, Text } from '../../components';
import scaleBeat from '../../styles/keyframes';

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
          animation: 0.49s ${scaleBeat} alternate infinite ease-in;
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

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timerOn: false,
      timerStart: 0,
      timerTime: 0,
      position: 100,
    };
  }

  componentDidMount() {
    this.startTimer();
  }

  componentDidUpdate() {
    const { duration } = this.props;
    const { timerTime, timerOn } = this.state;

    if (timerOn && duration - timerTime < 1) {
      this.stopTimer();
    }
  }

  startTimer = () => {
    const { duration } = this.props;
    const { timerTime } = this.state;

    this.setState({
      timerOn: true,
      timerTime,
      timerStart: Date.now() - timerTime,
    });

    this.timer = setInterval(() => {
      this.setState(state => ({
        timerTime: Date.now() - state.timerStart,
        position: state.position - (100 * 10) / (duration * 1000),
      }));

      if (Math.floor(timerTime / 1000) === duration) {
        this.stopTimer();
      }
    }, 10);
  };

  stopTimer = () => {
    this.setState({
      timerOn: false,
    });
    clearInterval(this.timer);
  };

  resetTimer = () => {
    this.setState({
      timerStart: 0,
      timerTime: 0,
      position: 100,
    });
  };

  render() {
    const { timerTime, timerOn } = this.state;
    const { theme, duration } = this.props;

    return (
      <Box>
        <Circle width="32rem" bg="#2a1754" animate={timerOn}>
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
                date={duration - timerTime}
                renderer={CustomTimerView}
                controlled
              />
            </Circle>
          </Circle>
        </Circle>
        <Box mt={4}>
          <Button mr={4} onClick={this.startTimer} disabled={timerOn}>
            Start
          </Button>
          <Button mr={4} disabled={!timerOn} onClick={this.stopTimer}>
            Pause
          </Button>
          <Button onClick={this.resetTimer} disabled={timerOn}>
            Reset
          </Button>
        </Box>
      </Box>
    );
  }
}

export default withTheme(Timer);
