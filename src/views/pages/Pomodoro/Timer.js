import React, { Component } from 'react';
import styled, { withTheme } from 'styled-components';
import { space, layout, position, color, shadow } from 'styled-system';
import { Box, Button, Text } from '../../components';

const Circle = styled.div`
  height: ${({ width }) => width};
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  ${space};
  ${layout};
  ${position};
  ${color};
  ${shadow};
`;

class Timer extends Component {
  state = {
    timerOn: false,
    timerStart: 0,
    timerTime: 0,
    timerDuration: 90,
    position: 100,
  };

  componentDidMount() {
    this.setState({ timerDuration: this.props.time });
    this.startTimer();
  }

  componentDidUpdate() {}

  startTimer = () => {
    const { duration } = this.props;
    const { timerTime, timerStart, position } = this.state;

    this.setState({
      timerOn: true,
      timerTime: timerTime,
      timerStart: Date.now() - timerTime,
    });

    this.timer = setInterval(() => {
      this.setState({
        timerTime: Date.now() - this.state.timerStart,
        position: this.state.position - (100 * 10) / (duration * 1000),
      });

      if (Math.floor(this.state.timerTime / 1000) === duration) {
        this.stopTimer();
      }
    }, 10);
  };

  stopTimer = () => {
    this.setState({ timerOn: false });
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
    const { time = 0, theme } = this.props;
    const { timerTime } = this.state;

    console.log(Math.floor(time / 3600000));

    const seconds = `0${59 - (Math.floor(timerTime / 1000) % 60)}`.slice(-2);
    const minutes = `0${(Math.floor(time / 60000) % 60) -
      1 -
      (Math.floor(timerTime / 60000) % 60)}`.slice(-2);
    const hours = `0${Math.floor(timerTime / 3600000)}`.slice(-2);

    return (
      <Box>
        <Circle width="32rem" bg="#2a1754">
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
              <Text variant="h2" color="light">
                {`${hours}:${minutes}:${seconds}` || `00:00:00`}
              </Text>
            </Circle>
          </Circle>
        </Circle>
        <Box mt={4}>
          <Button mr={4}>Play</Button>
          <Button mr={4} disabled>
            Pause
          </Button>
          <Button>Stop</Button>
        </Box>
      </Box>
    );
  }
}

export default withTheme(Timer);
