import styled, { keyframes, css } from 'styled-components';
import { PomodoroClockBG } from './PomodoroClockBG';
import { Text } from './Text';

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

interface Props {
  bgBottomFill?: string;
  bgMiddleFill?: string;
  bgTopFill?: string;
  seconds?: number;
}

export const PomodoroClock = ({
  bgBottomFill,
  bgMiddleFill,
  bgTopFill,
  seconds = 0,
}: Props) => {
  const paddedHours = `0${Math.floor(seconds / 3600)}`.slice(-2);
  const paddedMinutes = `0${Math.floor((seconds % 3600) / 60)}`.slice(-2);
  const paddedSeconds = `0${Math.floor((seconds % 3600) % 60)}`.slice(-2);

  return (
    <Wrapper isAnimationOn={seconds > 0}>
      <PomodoroClockBG
        bgBottomFill={bgBottomFill}
        bgMiddleFill={bgMiddleFill}
        bgTopFill={bgTopFill}
        isRotateOn={seconds > 0}
      />
      <span>
        <Text variant="h2">{`${paddedHours}:${paddedMinutes}:${paddedSeconds}`}</Text>
      </span>
    </Wrapper>
  );
};
