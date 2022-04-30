import * as React from 'react';
import styled, { keyframes, css } from 'styled-components';
import PomodoroClockBG from './PomodoroClockBG';
import Text from './Text';

const animateHeart = keyframes`
   0% {
    transform: scale(1);
  }

  100% {
    transform: scale(0.9);
  }
`;

const Wrapper = styled.div<{ isAnimationOn: boolean }>`
  position: relative;

  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  ${({ isAnimationOn }) =>
    isAnimationOn &&
    css`
      animation: 0.5s ease-in 0s infinite alternate none running ${animateHeart};
    `};
`;

const PomodoroClock = ({
  bgBottomFill,
  bgMiddleFill,
  bgTopFill,
  time,
}: {
  bgBottomFill?: string;
  bgMiddleFill?: string;
  bgTopFill?: string;
  time: string;
}) => {
  return (
    <Wrapper isAnimationOn={true}>
      <PomodoroClockBG
        bgBottomFill={bgBottomFill}
        bgMiddleFill={bgMiddleFill}
        bgTopFill={bgTopFill}
        isRotateOn={true}
      />
      <span>
        <Text variant="h2">{time}</Text>
      </span>
    </Wrapper>
  );
};

export default PomodoroClock;
